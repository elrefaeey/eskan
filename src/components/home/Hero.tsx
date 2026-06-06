"use client";
import Image from "next/image";
import styles from "./Hero.module.css";
import React from "react";
import { ActionButton } from "../ui/ReusableComponents/ActionButton";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import useHeroImages from "@/features/home/hooks/useHeroImages";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.15,
    },
  }),
};

const GRID_COLS = 6;
const GRID_ROWS = 5;
const TOTAL_TILES = GRID_COLS * GRID_ROWS;

// Default fallback images
const defaultHeroImages = [
  "/assets/eskan-wallet/home/hero/hero1.jpg",
  "/assets/eskan-wallet/home/hero/hero2.jpg",
  "/assets/eskan-wallet/home/hero/hero3.jpg",
  "/assets/eskan-wallet/home/hero/hero4.jpg",
];

function Hero() {
  const { heroImages: apiHeroImages, isLoading, error } = useHeroImages();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [animationKey, setAnimationKey] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    if (window.innerWidth < 768) {
      setCurrentImageIndex(-1);
    }

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroImages = React.useMemo(() => {
    if (apiHeroImages && apiHeroImages.length > 0) {
      return apiHeroImages.map((image) => image.img);
    }
    return defaultHeroImages;
  }, [apiHeroImages]);

  const nextImageIndex =
    currentImageIndex === -1 ? 0 : (currentImageIndex + 1) % heroImages.length;

  const tileOffsets = React.useMemo(
    () => Array.from({ length: TOTAL_TILES }).map(() => Math.random() * 0.02),
    [],
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      setCurrentImageIndex((prev) => {
        if (prev === -1) return 0;
        return (prev + 1) % heroImages.length;
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, heroImages.length]);

  return (
    <section className="relative flex flex-col gap-6 lg:flex-row lg:min-h-[calc(100vh-98px)] overflow-hidden">
      <div className="order-1 lg:order-0 container flex flex-col justify-center py-5 lg:py-0 z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="lg:w-120 xl:max-w-130 3xl:max-w-150 w-full lg:mx-0 lg:text-right"
        >
          <motion.p
            custom={0}
            variants={textVariants}
            className="text-text text-lg lg:text-2xl mb-1 font-semibold md:block hidden"
          >
            في إسكان المنصورة
          </motion.p>

          <motion.h1
            custom={1}
            variants={textVariants}
            className="hidden md:block text-center md:text-start text-2xl
             lg:text-4xl xl:text-[44px] leading-normal! font-bold md:font-extrabold text-primary lg:mb-4 mb-2"
          >
            نسعي للتطوير العقاري بفكر جديد ورؤية مختلفة{" "}
          </motion.h1>
          <motion.p
            custom={2}
            variants={textVariants}
            className="text-text text-lg lg:text-[28px] mb-4 lg:mb-6  md:block hidden"
          >
            ابراج سكنية ومولات تجارية تناسب كل الاحتياجات مع انظمة سداد مرنة
            واطول فترة تقسيط بدون فوائد
          </motion.p>
          <motion.div
            custom={3}
            variants={textVariants}
            className="flex flex-col md:flex-row justify-center md:justify-start gap-3 w-full"
          >
            <Link href={"/data-form"} className="block ">
              <ActionButton
                className="lg:px-10 block w-full py-4"
                onClick={() => {}}
              >
                اتحاد الملاك
              </ActionButton>
            </Link>
            <Link href="/investment" className=" block">
              <ActionButton
                variant="secondary"
                className="lg:px-10 block w-full py-4"
              >
                ارباح عقارية{" "}
              </ActionButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="relative order-0 lg:order-0 lg:self-auto self-end
        lg:absolute lg:inset-y-0 lg:left-0 w-full lg:w-[50%] xl:w-[57%] 2xl:w-[55%]
         3xl:w-[48%]
        h-104 lg:h-auto md:mt-6 lg:mt-0 overflow-hidden
         shadow-[16px_21px_30px_0px_#00000040_inset]
        lg:rounded-br-[12px] lg:rounded-tr-[180px] "
      >
        <div
          className="absolute top-0 left-0 w-full h-full z-50
        lg:rounded-tr-[180px] shadow-[1px_2px_20px_4px_#00000080_inset]"
        />

        {isLoading && (
          <div className="absolute inset-0 z-5 bg-linear-to-br from-gray-200 via-gray-300 to-gray-400 rounded-tr-[60px] rounded-br-[12px] lg:rounded-tr-[180px]">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-400/30 border-t-primary rounded-full animate-spin" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-transparent border-b-primary rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 font-semibold text-lg animate-pulse">
              جاري التحميل...
            </div>
          </div>
        )}

        <div className="absolute inset-0">
          {currentImageIndex >= 0 && (
            <motion.div
              key={`current-${currentImageIndex}`}
              className="relative w-full h-full"
              initial={{ scale: 1.1, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 1 }}
              transition={{
                scale: { duration: 7, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt={`Hero Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
                quality={40}
                sizes="(max-width: 768px) 94vw, (max-width: 1024px) 50vw, 57vw"
              />
            </motion.div>
          )}
        </div>

        <div className="absolute inset-0 z-10">
          <motion.div
            key={`next-${nextImageIndex}`}
            initial={{
              scale: currentImageIndex === -1 ? 1 : 1.1,
              opacity: 0.8,
            }}
            animate={{ scale: currentImageIndex === -1 ? 1 : 1.3, opacity: 1 }}
            transition={{
              scale: { duration: 7, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.6, ease: "easeInOut" },
            }}
            className="relative w-full h-full"
          >
            {currentImageIndex === -1 ? (
              <div className="flex items-center justify-center flex-col h-full relative">
                <div className="bg-[#00000094] absolute left-0 top-0 w-full h-full z-5"></div>
                <Image
                  src={"/assets/eskan-wallet/home/main.png"}
                  alt="Hero Image"
                  fill
                  className="object-cover"
                  priority
                  quality={40}
                  sizes="(max-width: 768px) 94vw, (max-width: 1024px) 50vw, 57vw"
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
                    src={"/assets/eskan-wallet/home/hero/Group9004.png"}
                    alt={"eskan"}
                    width={220}
                    height={60}
                    className="w-[220px] h-auto relative z-10"
                  />
                </div>
                <h3 className="text-white relative z-6 mt-2 text-xl font-bold">
                  المطور العقاري الاول في الدلتا
                </h3>
              </div>
            ) : (
              <Image
                src={heroImages[nextImageIndex]}
                alt={`Hero Image ${nextImageIndex + 1}`}
                fill
                className="object-cover"
                quality={40}
                sizes="(max-width: 768px) 94vw, (max-width: 1024px) 50vw, 57vw"
              />
            )}
          </motion.div>
        </div>

        <div
          key={animationKey}
          className="absolute inset-0 grid pointer-events-none z-20"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: TOTAL_TILES }).map((_, i) => {
            const row = Math.floor(i / GRID_COLS);
            const col = i % GRID_COLS;
            const delay =
              (GRID_COLS - 1 - col) * 0.045 + row * 0.035 + tileOffsets[i];

            return (
              <motion.div
                key={i}
                initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                animate={{ scaleY: 0, scaleX: 0, opacity: 0 }}
                transition={{
                  scaleY: {
                    duration: 0.9,
                    delay: delay,
                    ease: [0.65, 0, 0.35, 1],
                  },
                  scaleX: {
                    duration: 0.9,
                    delay: delay + 0.05,
                    ease: [0.65, 0, 0.35, 1],
                  },
                  opacity: {
                    duration: 0.5,
                    delay: delay + 0.3,
                    ease: "easeOut",
                  },
                }}
                className="bg-primary origin-center"
                style={{
                  boxShadow: "0 0 3px rgba(0,0,0,0.15)",
                  willChange: "transform, opacity",
                }}
              />
            );
          })}
        </div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 bg-[#364138] pointer-events-none mix-blend-multiply"
        />
      </div>
    </section>
  );
}

export default Hero;
