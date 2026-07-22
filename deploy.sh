#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Production deployment script for eskanelmansoura
# =============================================================================
# Usage:   chmod +x deploy.sh && ./deploy.sh
# Purpose: Safely stop, rebuild, and restart the Docker container
# =============================================================================

# ---- Safety flags ----
set -euo pipefail   # -e: exit on error, -u: error on unset vars, -o pipefail: catch pipe failures
IFS=$'\n\t'         # Safer word splitting

# ---- Configuration ----
readonly APP_NAME="eskanelmansoura"
readonly COMPOSE_FILE="docker-compose.yml"
readonly LOG_FILE="deploy-$(date +%Y%m%d-%H%M%S).log"

# ---- Colors for terminal output ----
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ---- Logging functions ----
log_info()    { echo -e "${BLUE}[INFO]${NC}    $(date '+%H:%M:%S') — $*"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $(date '+%H:%M:%S') — $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC}    $(date '+%H:%M:%S') — $*"; }
log_error()   { echo -e "${RED}[ERROR]${NC}   $(date '+%H:%M:%S') — $*" >&2; }

# ---- Error handler ----
on_error() {
    local exit_code=$?
    log_error "Deployment FAILED at line $1 (exit code: ${exit_code})"
    log_error "Check the log file: ${LOG_FILE}"
    exit "${exit_code}"
}
trap 'on_error ${LINENO}' ERR

# ---- Pre-flight checks ----
preflight_checks() {
    log_info "Running pre-flight checks..."

    # Check Docker is installed and running
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running. Please start Docker."
        exit 1
    fi

    # Check docker compose is available
    if ! docker compose version &> /dev/null; then
        log_error "Docker Compose (v2) is not available. Please install it."
        exit 1
    fi

    # Check compose file exists
    if [[ ! -f "${COMPOSE_FILE}" ]]; then
        log_error "${COMPOSE_FILE} not found in current directory."
        exit 1
    fi

    # Check Dockerfile exists
    if [[ ! -f "Dockerfile" ]]; then
        log_error "Dockerfile not found in current directory."
        exit 1
    fi

    log_success "Pre-flight checks passed."
}

# ---- Stop existing container ----
stop_container() {
    log_info "Stopping existing container (if running)..."

    if docker compose -f "${COMPOSE_FILE}" ps --quiet 2>/dev/null | grep -q .; then
        docker compose -f "${COMPOSE_FILE}" down --timeout 30 2>&1 | tee -a "${LOG_FILE}"
        log_success "Container stopped and removed."
    else
        log_info "No running container found. Skipping stop."
    fi
}

# ---- Clean up old images ----
cleanup_old_images() {
    log_info "Cleaning up dangling images..."
    docker image prune -f 2>&1 | tee -a "${LOG_FILE}"
    log_success "Cleanup complete."
}

# ---- Build new image ----
build_image() {
    log_info "Building new Docker image..."
    log_info "This may take a few minutes..."

    # Build with no cache to ensure fresh image
    # Remove --no-cache if you want faster builds with layer caching
    docker compose -f "${COMPOSE_FILE}" build --pull 2>&1 | tee -a "${LOG_FILE}"

    log_success "Docker image built successfully."
}

# ---- Start container ----
start_container() {
    log_info "Starting container in detached mode..."

    docker compose -f "${COMPOSE_FILE}" up -d 2>&1 | tee -a "${LOG_FILE}"

    log_success "Container started."
}

# ---- Verify deployment ----
verify_deployment() {
    log_info "Verifying deployment..."

    # Wait for health check to pass
    local max_attempts=12
    local attempt=0

    while [[ ${attempt} -lt ${max_attempts} ]]; do
        attempt=$((attempt + 1))
        log_info "Health check attempt ${attempt}/${max_attempts}..."

        if docker inspect --format='{{.State.Health.Status}}' "${APP_NAME}" 2>/dev/null | grep -q "healthy"; then
            log_success "Container is healthy!"
            break
        fi

        if [[ ${attempt} -eq ${max_attempts} ]]; then
            log_warn "Container did not become healthy within expected time."
            log_warn "Check logs with: docker logs ${APP_NAME}"
            log_warn "Container may still be starting up..."
        fi

        sleep 10
    done

    # Show container status
    log_info "Container status:"
    docker compose -f "${COMPOSE_FILE}" ps

    # Show last few log lines (sanitized — no env vars)
    log_info "Recent container logs:"
    docker logs --tail 20 "${APP_NAME}" 2>&1 | grep -v -E "(API_KEY|SECRET|TOKEN|PASSWORD)" || true
}

# ---- Print summary ----
print_summary() {
    echo ""
    echo "========================================"
    log_success "Deployment complete!"
    echo "========================================"
    echo ""
    log_info "App:       ${APP_NAME}"
    log_info "Port:      3007 (bound to 127.0.0.1)"
    log_info "Log file:  ${LOG_FILE}"
    echo ""
    log_info "Useful commands:"
    echo "  View logs:     docker logs -f ${APP_NAME}"
    echo "  Stop:          docker compose down"
    echo "  Restart:       docker compose restart"
    echo "  Shell:         docker exec -it ${APP_NAME} sh"
    echo "  Status:        docker compose ps"
    echo ""
    log_warn "Reminder: Set up a reverse proxy (Nginx/Caddy) to serve on ports 80/443."
    echo ""
}

# =============================================================================
# Main execution
# =============================================================================
main() {
    echo ""
    echo "========================================"
    log_info "Starting deployment of ${APP_NAME}"
    echo "========================================"
    echo ""

    preflight_checks
    log_info "Syncing latest code from GitHub..."
    git fetch origin main && git reset --hard origin/main
    stop_container
    build_image
    start_container
    cleanup_old_images
    verify_deployment
    print_summary
}

# Run main (redirect all output to both terminal and log file)
main "$@" 2>&1 | tee -a "${LOG_FILE}"
