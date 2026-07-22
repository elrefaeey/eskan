import { cn } from "@/lib/utils";
import type { CardBackgroundTone } from "../constants/variantStyles";

interface GrowthPatternBackgroundProps {
  tone: CardBackgroundTone;
}

export default function GrowthPatternBackground({ tone }: GrowthPatternBackgroundProps) {
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
      {isDark ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,#2a6b4e_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_0%_100%,#0f2e22_0%,transparent_50%)]" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_100%_0%,#e2f0e9_0%,transparent_50%)]" />
      )}

      <svg
        className={cn(
          "absolute bottom-0 left-0 h-[58%] w-full",
          isDark ? "opacity-[0.14]" : "opacity-[0.22] text-primary",
        )}
        viewBox="0 0 480 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 220V175H72V140H144V108H216V72H288V48H360V20H480V0V220H0Z"
          fill={isDark ? "white" : "currentColor"}
          fillOpacity={isDark ? 1 : 0.12}
        />
        <path
          d="M0 220V190H48V165H96V142H144V118H192V95H240V72H288V52H336V32H384V16H432V4H480"
          stroke={isDark ? "white" : "currentColor"}
          strokeWidth="1.5"
          strokeOpacity={0.35}
        />
      </svg>

      <div
        className={cn("absolute inset-0", isDark ? "opacity-[0.07]" : "opacity-[0.12]")}
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, #fff 1px, transparent 1px)"
            : "radial-gradient(circle, #1f503b 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div
        className={cn(
          "absolute -top-10 -right-10 size-44 rounded-full border",
          isDark ? "border-white/10" : "border-primary/15",
        )}
      />
      <div
        className={cn(
          "absolute top-6 right-6 size-24 rounded-full border",
          isDark ? "border-white/15" : "border-primary/20",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-14 -left-14 size-56 rounded-full blur-3xl",
          isDark ? "bg-[#3d8f68]/20" : "bg-primary/10",
        )}
      />
    </div>
  );
}
