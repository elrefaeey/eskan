"use client";

import {
  AiFillTikTok,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import {
  footerItemVariant,
  footerStaggerContainerVariant,
  inViewOnce,
} from "@/lib/animations";
import {
  FOOTER_PHONE,
  FOOTER_TAGLINE,
  SOCIAL_LINKS,
  type SocialPlatform,
} from "./constants";

const SOCIAL_ICONS: Record<SocialPlatform, React.ReactNode> = {
  instagram: <AiFillInstagram />,
  tiktok: <AiFillTikTok />,
  facebook: <AiFillFacebook />,
  linkedin: <AiFillLinkedin />,
};

export default function FooterContent() {
  return (
    <motion.div
      className="relative z-10 max-w-3xl mx-auto px-6 py-6 flex flex-col items-center text-center gap-3"
      variants={footerStaggerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      <motion.div variants={footerItemVariant}>
        <Image
          src="/assets/layout/whitelogo.png"
          alt="إسكان المنصورة"
          width={160}
          height={120}
          quality={60}
          className="h-auto mx-auto"
        />
      </motion.div>

      <motion.div
        variants={footerItemVariant}
        className="w-12 h-px bg-white/20"
      />

      <motion.p
        variants={footerItemVariant}
        className="text-white text-body-sm leading-relaxed max-w-md"
      >
        {FOOTER_TAGLINE}
      </motion.p>

      <motion.div
        variants={footerItemVariant}
        className="group flex items-center gap-2 border border-white/30 hover:border-white/70 hover:bg-white/10 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 text-sm"
      >
        <a href={`tel:${FOOTER_PHONE}`} className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
          اتصل بنا
        </a>
      </motion.div>

      <motion.div
        variants={footerItemVariant}
        className="flex gap-4 justify-center"
      >
        {SOCIAL_LINKS.map(({ href, label, platform }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="transition-all duration-300 hover:scale-110 hover:opacity-90 text-white"
          >
            <span className="text-3xl">{SOCIAL_ICONS[platform]}</span>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
