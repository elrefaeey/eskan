"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  heroBadgeVariants,
  heroImageAnimate,
  heroImageInitial,
  heroImageTransition,
  heroTitleVariants,
} from "../animations";

interface SalesPageHeroProps {
  name: string;
  img: string;
}

export default function SalesPageHero({ name, img }: SalesPageHeroProps) {
  return (
    <section className="relative h-[42vh] min-h-[280px] max-h-[480px] w-full overflow-hidden md:h-[52vh]">
      <motion.div
        initial={heroImageInitial}
        animate={heroImageAnimate}
        transition={heroImageTransition}
        className="absolute inset-0"
      >
        <Image
          src={img}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />

      <div className="absolute inset-x-0 bottom-4 z-10 px-4 pb-10 pt-16 md:px-8 md:pb-14">
        <div className="container mx-auto">
   
          <motion.h1
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl text-2xl font-extrabold leading-snug text-white md:text-4xl lg:text-5xl"
          >
            {name}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
