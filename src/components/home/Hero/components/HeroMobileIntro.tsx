import Image from "next/image";
import { HERO_IMAGE_SIZES } from "@/features/home/constants/hero";

export default function HeroMobileIntro() {
  return (
    <div className="flex items-center justify-center flex-col h-full relative">
      <div className="bg-[#00000094] absolute left-0 top-0 w-full h-full z-5" />
      <Image
        src="/assets/home/main.png"
        alt="Hero Image"
        fill
        className="object-cover"
        priority
        quality={40}
        sizes={HERO_IMAGE_SIZES}
      />
      <Image
        src="/assets/layout/whitelogo.png"
        alt="Logo"
        className="w-28 h-28 mb-2 z-6"
        width={220}
        height={60}
      />
      <div className="!bg-white flex items-center gap-2 z-10 px-1">
        <span className="text-lg font-bold text-primary relative z-10">
          مرحبا بكم في
        </span>
        <Image
          src="/assets/home/hero/Group9004.png"
          alt="eskan"
          width={220}
          height={60}
          className="w-[220px] h-auto relative z-10"
        />
      </div>
      <h3 className="text-white relative z-6 mt-2 text-xl font-bold">
        المطور العقاري الاول في الدلتا
      </h3>
    </div>
  );
}
