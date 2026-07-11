"use client";

import { useRouter } from "next/navigation";
import type { ElbadryProjectCardData } from "../constants";

interface ElbadryProjectCardProps {
  card: ElbadryProjectCardData;
}

export default function ElbadryProjectCard({ card }: ElbadryProjectCardProps) {
  const router = useRouter();
  const Icon = card.icon;

  return (
    <div
      onClick={() => router.push(card.href)}
      className={`cursor-pointer ${card.cardBg} border-2 ${card.border} rounded-2xl p-6 flex flex-col gap-5 shadow-md hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center shadow`}
        >
          <Icon className="text-white w-7 h-7" />
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${card.tagClass}`}>
          {card.tag}
        </span>
      </div>

      <div>
        <h3 className="font-extrabold text-xl text-[#1a1a1a] mb-2">{card.title}</h3>
        <p className="text-[#555] text-body-base leading-relaxed">{card.desc}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(card.href);
        }}
        className={`${card.btnClass} text-white font-bold rounded-xl px-4 py-3 mt-auto transition-colors duration-200 w-full text-base`}
      >
        {card.btn}
      </button>
    </div>
  );
}
