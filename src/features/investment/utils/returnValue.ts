import type { InvestmentUnit } from "@/services/investment";

/**
 * API may send rental_return_value as a percentage (e.g. "15")
 * when rental_return_type === "percentage", while return_value
 * holds the actual EGP amount (e.g. "32850").
 */
export function getUnitReturnEgp(
  unit: Pick<
    InvestmentUnit,
    "return_value" | "rental_return_value" | "rental_return_type"
  >,
): number {
  const isPercentage =
    unit.rental_return_type?.toLowerCase() === "percentage";

  const raw = isPercentage
    ? unit.return_value
    : unit.rental_return_value || unit.return_value;

  return Number(raw) || 0;
}
