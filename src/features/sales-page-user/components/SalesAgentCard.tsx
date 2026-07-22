"use client";

import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import type { SalesUser } from "../types";
import { AGENT_CARD_DELAY } from "../animations";

interface SalesAgentCardProps {
  user: SalesUser;
}

export default function SalesAgentCard({ user }: SalesAgentCardProps) {
  const hasUserImage =
    user.img && user.img !== "null" && user.img !== "undefined";

  return (
    <AnimatedSection
      delay={AGENT_CARD_DELAY}
      className="overflow-hidden rounded-2xl border border-primary/10 bg-white/90 shadow-[0_20px_50px_-24px_rgba(31,80,59,0.45)] backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-center">
          {hasUserImage ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-primary/15 md:h-28 md:w-28">
              <Image
                src={user.img!}
                alt={user.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary ring-4 ring-primary/15 md:h-28 md:w-28">
              <FaUserTie className="text-4xl text-white" />
            </div>
          )}

          <div className="text-center sm:text-start">
            <p className="text-sm font-medium text-primary/70">مسؤل مبيعات</p>
            <h2 className="mt-0.5 text-xl font-bold text-primary md:text-2xl">
              {user.name}
            </h2>
            <a
              href={`tel:${user.phone}`}
              className="mt-2 inline-flex items-center gap-2 text-base text-[#414141] transition-colors hover:text-primary"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FiPhone className="size-4" />
              </span>
              {user.phone}
            </a>
          </div>
        </div>

        <Image
          src="/assets/layout/logo.png"
          alt="إسكان المنصورة"
          width={72}
          height={72}
          className="hidden object-contain opacity-90 sm:block"
        />
      </div>
    </AnimatedSection>
  );
}
