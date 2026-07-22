export type CardVariant = "primary" | "light";
export type CardBackground = "network" | "growth";
export type CardBackgroundTone = "dark" | "light";

export const variantStyles = {
  primary: {
    card: "text-white border-white/10 shadow-[0_16px_48px_rgba(15,46,34,0.35)]",
    icon: "bg-white/15 text-white ring-1 ring-white/20",
    highlight: "bg-white/10 text-white/95 border-white/20",
    cta: "text-white border-white/35 bg-white/10 hover:bg-white/20 hover:border-white/55",
    title: "text-white",
    body: "text-white/88",
  },
  light: {
    card: "text-primary border-primary/10 shadow-[0_12px_40px_rgba(31,80,59,0.1)]",
    icon: "bg-primary/10 text-primary ring-1 ring-primary/15",
    highlight: "bg-white/90 text-[#1a4634] border-primary/35 font-bold",
    cta: "text-primary border-primary/25 bg-white/80 hover:bg-white hover:border-primary/40",
    title: "text-primary",
    body: "text-[#1f503b]/90",
  },
} as const;
