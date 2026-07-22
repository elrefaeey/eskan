export { HOW_IT_WORKS, BOOKING_STEPS, type InvestmentFlowStep } from "./flow-steps";
export {
  GOAL_LABELS,
  RENTAL_GOAL_VALUE,
  RENTAL_INSTALLMENT_VALUE,
  INVESTMENT_STEPS,
} from "./steps";

export const INVESTMENT_HERO = {
  title: "استثمر مع",
  brandHighlight: "اسكان المنصورة",
  subtitle: "خطوة واحدة ونوصّيك بأفضل فرصة استثمارية تناسبك",
} as const;

export const INVESTMENT_HOW_IT_WORKS = {
  title: "إزاي تستثمر معانا؟",
} as const;

export const INVESTMENT_QUERY = {
  START: "start",
  RESUME: "resume",
  VIEW: "view",
} as const;

export const INVESTMENT_VIEW = {
  RENTAL: "rental",
  RENTAL_METHOD: "rental-method",
  RESULTS: "results",
} as const;

export const INVESTMENT_ROUTES = {
  investment: "/investment",
  rentalRedirect: "/bazar-level",
  rentalShares: `/investment?view=rental`,
  results: `/investment?view=results`,
} as const;

export const INVESTMENT_TIMING = {
  stepTransitionMs: 300,
  submitDelayMs: 400,
  pageLoadAnimationMs: 100,
  stepChangeAnimationMs: 200,
} as const;

export const INVESTMENT_FORM_DEFAULTS = {
  goal: "",
  budget: "",
  payment: "",
} as const;
