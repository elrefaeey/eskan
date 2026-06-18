"use client";

import Image from "next/image";
import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <footer className="bg-[#1f503b] text-white" dir="rtl">
      <div className="relative overflow-hidden">
        <Image
          src="/assets/footer/footer_vl.png"
          alt=""
          width={960}
          height={600}
          quality={60}
          sizes="26vw"
          className="absolute bottom-0 left-0 z-0 h-auto w-[26%] max-w-full translate-y-5 pointer-events-none opacity-30"
          aria-hidden
        />
        <Image
          src="/assets/footer/footer_vr.png"
          alt=""
          width={960}
          height={600}
          quality={60}
          sizes="26vw"
          className="absolute bottom-0 right-0 z-0 h-auto w-[26%] max-w-full translate-y-5 pointer-events-none opacity-30"
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
