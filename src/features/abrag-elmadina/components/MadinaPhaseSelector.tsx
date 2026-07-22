"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { dropdownVariant } from "@/lib/animations";
import { useClickOutside } from "@/hooks/useClickOutside";
import { MADINA_PHASE_OPTIONS } from "../constants/residential";

export default function MadinaPhaseSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedStep = searchParams.get("step");
  const selectedLabel = MADINA_PHASE_OPTIONS.find((p) => p.value === selectedStep)?.label;

  useClickOutside(containerRef, () => setDropdownOpen(false), dropdownOpen);

  const handleSelectPhase = (step: string) => {
    setDropdownOpen(false);
    router.push(`?step=${step}`);
  };

  return (
    <div ref={containerRef} className="relative w-fit">
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="flex items-center gap-3 bg-primary text-white font-bold text-base rounded-xl px-6 py-3 hover:bg-primary/90 transition-colors"
      >
        <span>{selectedLabel ?? "اختر المرحلة"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            variants={dropdownVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 right-full ml-2 me-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-[180px]"
          >
            {MADINA_PHASE_OPTIONS.map((p) => (
              <button
                key={p.value}
                onClick={() => handleSelectPhase(p.value)}
                className={`w-full text-right px-5 py-3 text-base font-bold hover:bg-primary/5 transition-colors ${
                  selectedStep === p.value ? "text-primary bg-primary/5" : "text-[#333]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
