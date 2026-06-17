"use client";

import { AiFillTikTok, AiFillLinkedin, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/eskanelmansoura/",                          icon: <AiFillInstagram />, label: "Instagram" },
  { href: "https://www.tiktok.com/@eskanelmansoura?_r=1&_t=ZS-91wXV8yosiX",    icon: <AiFillTikTok />,    label: "TikTok"    },
  { href: "https://www.facebook.com/Eskan.ElMansoura?mibextid=LQQJ4d",          icon: <AiFillFacebook />,  label: "Facebook"  },
  { href: "http://linkedin.com/company/eskan-elmansoura/",                       icon: <AiFillLinkedin />,  label: "LinkedIn"  },
];

export default function FooterContent() {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-6 flex flex-col items-center text-center gap-3">

      <AnimatedSection duration={0.6}>
        <Image
          src="/assets/layout/whitelogo.png"
          alt="إسكان المنصورة"
          width={160}
          height={120}
          quality={60}
          className="h-auto mx-auto"
        />
      </AnimatedSection>

      <div className="w-12 h-px bg-white/20" />

      <AnimatedSection as="p" delay={0.1} duration={0.6} className="text-white text-body-sm leading-relaxed max-w-md">
        نبني ثقتك قبل أن نبني عقارك — شريكك الموثوق في الاستثمار العقاري بالمنصورة والدلتا منذ أكثر من 17 عاماً
      </AnimatedSection>

      <AnimatedSection
        delay={0.2}
        duration={0.6}
        className="group flex items-center gap-2 border border-white/30 hover:border-white/70 hover:bg-white/10 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 text-sm"
      >
        <a href="tel:01095665809" className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
          اتصل بنا
        </a>
      </AnimatedSection>

      <AnimatedSection delay={0.3} duration={0.6} className="flex gap-4 justify-center">
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="transition-all duration-300 hover:scale-110 hover:opacity-90 text-white"
          >
            <span className="text-3xl">{icon}</span>
          </Link>
        ))}
      </AnimatedSection>

    </div>
  );
}
