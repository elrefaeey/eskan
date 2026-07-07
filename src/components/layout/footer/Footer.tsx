"use client";

import Image from "next/image";
import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <footer className="bg-[#1f503b] text-white" dir="rtl">
      <div className="relative min-h-[220px] overflow-hidden sm:min-h-[260px] lg:min-h-[300px]">
        <Image
          src="/assets/footer/footer_vl.png"
          alt=""
          width={960}
          height={600}
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 26vw"
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[42%] max-w-[320px] translate-y-4 mix-blend-lighten opacity-80 sm:w-[34%] sm:max-w-[360px] lg:w-[26%] lg:max-w-none lg:translate-y-5"
          aria-hidden
        />
        <Image
          src="/assets/footer/footer_vr.png"
          alt=""
          width={960}
          height={600}
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 26vw"
          className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[42%] max-w-[320px] translate-y-4 mix-blend-lighten opacity-80 sm:w-[34%] sm:max-w-[360px] lg:w-[26%] lg:max-w-none lg:translate-y-5"
          aria-hidden
        />
        <FooterContent />
      </div>
      <div className="border-t border-white/10 py-4 text-center text-white/40 text-sm">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لشركة إسكان المنصورة
      </div>
    </footer>
  );
}
