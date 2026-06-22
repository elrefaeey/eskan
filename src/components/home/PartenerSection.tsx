"use client";

import Link from "next/link";
import { Zap, Building2, DollarSign, Users, FileArchive } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnceAmount } from "@/lib/animations";

const features = [
  {
    title: "عمولات مجزية",
    desc: "نقدم عمولات مجزية ونظام تعاون واضح ومنظم",
    icon: <DollarSign size={20} />,
  },

  {
    title: "مشاريع مميزة",
    desc: " توفير منتجات عقارية مميزة بمشروعات الشركة",
    icon: <Building2 size={20} />,
  },
  {
    title: "دعم تسويقي",
    desc: "توفير مواد اعلانية وفريق من مصممين الجرافيك والميديا ",
    icon: <Zap size={20} />,
  },
];
function PartenerSection() {
  return (
    <motion.div
      id="partner-section"
      className="container scroll-mt-20 lg:scrollmt-24"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceAmount(0.2)}
      variants={staggerContainer}
    >
      <div className="rounded-3xl overflow-hidden bg-primary flex flex-col items-stretch lg:flex-row">
        <motion.div
          className="mb-0 flex min-w-0 flex-1 flex-col gap-4 bg-primary p-6 pb-6 md:p-8 lg:p-10 lg:pb-10"
          variants={fadeUp}
        >
          <motion.h2
            className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl"
            variants={fadeUp}
          >
            سجّل كشريك تسويق معنا
          </motion.h2>
          <motion.p className="p max-w-3xl text-white/95 leading-relaxed" variants={fadeUp}>
            نعلن عن فتح باب التعاون مع مكاتب التسويق والوساطة العقارية في مراكز
            محافظة الدقهلية مثل شربين - بلقاس -نبروه - دكرنس - أجا - منية النصر
            - المطرية وغيرها. قم بتسجيل بيانات مكتبك وسيتواصل معك فريقنا قريباً.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6"
            variants={staggerContainer}
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-1 rounded-3xl border border-white/5 bg-white/10 p-4 text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <motion.div
                  className="flex rounded-xs w-fit p-1 bg-[#3F5C32]  text-yellow-300"
                  whileHover={{ rotate: 3, scale: 1.06 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold ">{item.title}</h3>

                {/* Description */}
                <p className="text-body-lg text-[#F0F0F0] leading-normal">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link
              href="/partner-registration"
              className="bg-white py-3  md:px-14! md:w-fit rounded-xl
           h-fit font-bold md:font-extrabold mt-2 md:mt-5 hover:bg-white cursor-pointer hover:opacity-45 w-full
            text-primary text-xl  flex items-center gap-2 justify-center"
            >
              <FileArchive size={28} /> تسجيل البيانات
            </Link>
          </motion.div>
        </motion.div>
        <motion.section
          className="relative flex w-full shrink-0 items-center justify-center overflow-hidden border-t border-white/10 bg-[#2D5A4280]/50 px-5 py-12 sm:px-8 md:py-16 lg:w-[min(100%,26rem)] lg:border-t-0 lg:border-s lg:px-10 lg:py-20 xl:w-[28rem]"
          variants={fadeUp}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
              linear-gradient(to right, #246751 3px, transparent 2px),
              linear-gradient(to bottom, #246751 3px, transparent 2px)
            `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="relative w-full text-center text-white"
            variants={staggerContainer}
          >
            {/* Icon */}
            <motion.div className="mb-4 flex justify-center" variants={fadeUp}>
              <motion.div
                className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-[#FFFFFF1A] bg-white/10 shadow-lg backdrop-blur-md sm:h-20 sm:w-20"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Users className="text-yellow-400" size={28} />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-3 text-base font-extrabold leading-tight max-[359px]:whitespace-normal min-[360px]:whitespace-nowrap sm:text-2xl lg:text-[1.75rem] xl:text-3xl"
              variants={fadeUp}
            >
              شبكة المكاتب المعتمدة
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mx-auto max-w-[22rem] text-sm leading-relaxed text-[#F5F9F7] sm:text-base md:text-lg lg:max-w-none"
              variants={fadeUp}
            >
              كن جزءاً من منظومة التطوير العقاري الأكبر في الدلتا
            </motion.p>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default PartenerSection;
