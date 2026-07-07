# =============================================================================
# Dockerfile — Production-ready, security-hardened Next.js build
# =============================================================================
# Multi-stage build:
#   Stage 1 (deps)    — Install production + dev dependencies
#   Stage 2 (builder) — Build the Next.js app
#   Stage 3 (runner)  — Minimal runtime image with only what's needed
# =============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Install dependencies
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps

# Security: run package install as root but in isolated dir
WORKDIR /app

# Copy only package manifests first (Docker layer caching)
COPY package.json package-lock.json ./

# Install ALL dependencies (dev + prod) — needed for the build step
# --ignore-scripts  prevents arbitrary post-install scripts from running
# --no-audit        skips network calls to npm audit (faster, no info leak)
RUN npm ci --ignore-scripts --no-audit

# ---------------------------------------------------------------------------
# Stage 2: Build the application
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set production environment for the build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application (standalone output)
# Use next build directly — avoids --turbopack flag from package.json script
# which can be unreliable in headless CI/Docker environments
RUN npx next build

# ---------------------------------------------------------------------------
# Stage 3: Production runner — minimal attack surface
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runner

# Metadata
LABEL maintainer="eskanelmansoura"
LABEL description="Production Next.js app — security hardened"

WORKDIR /app

# ------- Security hardening -------

# 1. Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3007
ENV HOSTNAME="0.0.0.0"

# 2. Remove unnecessary packages & caches to reduce attack surface
#    Install tini for proper PID 1 signal handling (zombie reaping)
#    Install dumb-init alternative or tini
RUN apk update && \
    apk add --no-cache tini && \
    apk del --purge apk-tools && \
    rm -rf /var/cache/apk/* /tmp/* /root/.npm /root/.node-gyp

# 3. Create a non-root user/group with no shell and no home directory
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs --no-create-home --shell /sbin/nologin nextjs

# 4. Copy only the standalone build output (no dev deps, no source code)
#    Next.js standalone output includes only what's needed to run
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 5. Set restrictive file permissions
#    Directories: 755 (read+execute for all)
#    Files:       644 (read-only for all)
RUN find /app -type d -exec chmod 755 {} \; && \
    find /app -type f -exec chmod 644 {} \;

# 6. Create and own the Next.js cache directory (needs write access)
RUN mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app/.next/cache && \
    chmod -R 770 /app/.next/cache

# 7. Switch to non-root user — CRITICAL security measure
USER nextjs

# 8. Expose the application port (documentation; actual binding in compose)
EXPOSE 3007

# 9. Use tini as PID 1 — proper signal forwarding & zombie process reaping
ENTRYPOINT ["/sbin/tini", "--"]

# 10. Start the Next.js server
CMD ["node", "server.js"]
