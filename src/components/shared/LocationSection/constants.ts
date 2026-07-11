export const containerVariantMap = {
  gray:            "mb-12 bg-[#f5f5f5] rounded-2xl overflow-hidden",
  "gray-flat":     "bg-[#f5f5f5] rounded-2xl overflow-hidden",
  "primary-light": "mb-10 rounded-2xl bg-primary/5",
  "primary-flat":  "rounded-2xl bg-primary/5",
  card:            "mb-10 bg-[#f8f8f8] rounded-2xl border border-gray-100",
  "card-flat":     "bg-[#f8f8f8] rounded-2xl border border-gray-100",
} as const;

/** مشترك بين صفحات الخريطة ذات التنسيق الرمادي */
export const GRAY_MAP_LOCATION_DEFAULTS = {
  mediaPosition: "start",
  containerVariant: "gray",
  mediaSlotClassName: "h-64 md:h-auto shadow-md rounded-xl overflow-hidden",
} as const;

export const MAP_LOCATION_DESCRIPTION_CLASS = "text-lg md:text-xl leading-[2]";
