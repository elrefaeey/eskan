export const UNIT_TYPE_OPTIONS = [
  { value: "سكنى", label: "سكنى" },
  { value: "تجارى", label: "تجارى" },
  { value: "إداري", label: "إداري" },
  { value: "طبي", label: "طبي" },
  { value: "اخر", label: "اخر" },
] as const;

export const UNIT_TYPE_VALUES = UNIT_TYPE_OPTIONS.map((option) => option.value) as [
  "سكنى",
  "تجارى",
  "إداري",
  "طبي",
  "اخر",
];
