"use client";

import { Building2, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import {
  CITY_CENTER_CONTRACT,
  CITY_CENTER_CONTRACT_STEPS,
  CITY_CENTER_MANAGEMENT_ITEMS,
} from "../constants";

export function CityCenterContractSection() {
  return (
    <AnimatedSection variant={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 sec-padding">
      <div className="bg-[#f8f8f8] border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col gap-4">
        <h2 className="text-primary text-2xl font-extrabold flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 shrink-0" />
          {CITY_CENTER_CONTRACT.title}
        </h2>
        <p className="text-[#555] text-body-base leading-relaxed">{CITY_CENTER_CONTRACT.intro}</p>
        <ul className="flex flex-col gap-3">
          {CITY_CENTER_CONTRACT_STEPS.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-2 text-[#333] text-body-base leading-relaxed"
            >
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-primary rounded-2xl p-4 md:p-6 flex flex-col gap-4 text-white">
        <h2 className="text-2xl font-extrabold flex items-center gap-2">
          <Building2 className="w-6 h-6 shrink-0" />
          {CITY_CENTER_CONTRACT.managementTitle}
        </h2>
        <div className="flex flex-col gap-3 text-white/90 text-body-base leading-[2]">
          {CITY_CENTER_MANAGEMENT_ITEMS.map((item) => (
            <p key={item.label}>
              <span className="font-bold text-white">{item.label}</span> {item.text}
            </p>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
