import { cn } from "@/lib/utils";
import type { CardBackgroundTone } from "../constants/variantStyles";

interface NetworkPatternBackgroundProps {
  tone: CardBackgroundTone;
}

export default function NetworkPatternBackground({ tone }: NetworkPatternBackgroundProps) {
  const isDark = tone === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[#1a4634]"
            : "bg-linear-to-br from-[#f7fbf9] via-white to-[#edf5f0]",
        )}
      />
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,#2d6b4f_0%,transparent_50%),radial-gradient(ellipse_50%_45%_at_100%_100%,#0f2e22_0%,transparent_45%)]" />
      )}

      <svg
        className={cn(
          "absolute inset-0 h-full w-full",
          isDark ? "text-white/25" : "text-primary/20",
        )}
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <line x1="72" y1="58" x2="168" y2="98" stroke="currentColor" strokeWidth="1" />
        <line x1="168" y1="98" x2="290" y2="72" stroke="currentColor" strokeWidth="1" />
        <line x1="168" y1="98" x2="210" y2="178" stroke="currentColor" strokeWidth="1" />
        <line x1="210" y1="178" x2="118" y2="210" stroke="currentColor" strokeWidth="1" />
        <line x1="210" y1="178" x2="320" y2="198" stroke="currentColor" strokeWidth="1" />
        <line x1="290" y1="72" x2="320" y2="198" stroke="currentColor" strokeWidth="1" />
        <circle cx="72" cy="58" r="7" fill="currentColor" fillOpacity="0.35" />
        <circle cx="168" cy="98" r="9" fill="currentColor" fillOpacity="0.45" />
        <circle cx="290" cy="72" r="6" fill="currentColor" fillOpacity="0.3" />
        <circle cx="210" cy="178" r="8" fill="currentColor" fillOpacity="0.4" />
        <circle cx="118" cy="210" r="5" fill="currentColor" fillOpacity="0.25" />
        <circle cx="320" cy="198" r="6" fill="currentColor" fillOpacity="0.3" />
      </svg>

      <div
        className={cn(
          "absolute top-0 left-0 h-full w-2/5",
          isDark
            ? "bg-linear-to-r from-white/[0.04] to-transparent"
            : "bg-linear-to-r from-primary/[0.04] to-transparent",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-16 -right-10 size-52 rounded-full blur-3xl",
          isDark ? "bg-[#3d8f68]/15" : "bg-primary/[0.06]",
        )}
      />
      <div
        className={cn(
          "absolute top-8 left-8 size-20 rotate-12 rounded-2xl border",
          isDark ? "border-white/12" : "border-primary/10",
        )}
      />
    </div>
  );
}
