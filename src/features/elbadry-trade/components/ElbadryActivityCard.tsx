"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { ElbadryTradeActivity } from "../constants";

interface ElbadryActivityCardProps {
  activity: ElbadryTradeActivity;
}

export default function ElbadryActivityCard({ activity }: ElbadryActivityCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col border-2 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white w-full"
      style={{ borderColor: `${activity.accent}33` }}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={activity.img}
          alt={activity.title}
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-4 flex-1">
        <h4 className="font-extrabold text-lg" style={{ color: activity.accent }}>
          {activity.title}
        </h4>
        <p className="text-[#555] text-body-sm leading-relaxed">{activity.description}</p>
        <Link
          href={activity.link}
          onClick={() => window.scrollTo(0, 0)}
          className="mt-auto flex items-center justify-center gap-2 text-white font-bold rounded-xl px-4 py-2.5 text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: activity.accent }}
        >
          التفاصيل
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
