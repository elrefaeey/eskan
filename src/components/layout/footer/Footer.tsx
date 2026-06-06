"use client";

import SkylineContainer from "./SkylineContainer";
import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <footer className="bg-[#1f503b] text-white" dir="rtl">
      <div className="relative overflow-hidden">
        <SkylineContainer />
        <FooterContent />
      </div>
      <div className="border-t border-white/10 py-4 text-center text-white/40 text-sm">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لشركة إسكان المنصورة
      </div>
    </footer>
  );
}
