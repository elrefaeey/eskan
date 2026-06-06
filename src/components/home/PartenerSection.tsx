"use client";

import Link from "next/link";
import { Zap, Building2, DollarSign, Users, FileArchive } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

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
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="rounded-3xl overflow-hidden  bg-primary  flex lg:flex-row flex-col  items-stretch">
        <motion.div
          className=" p-6 lg:p-8 mb-0 bg-primary pb-6 lg:pb-7  flex flex-col gap-3 grow"
          variants={fadeUp}
        >
          <motion.h2
            className="text-2xl lg:text-4xl font-extrabold text-white "
            variants={fadeUp}
          >
            سجّل كشريك تسويق معنا
          </motion.h2>
          <motion.p className="p text-white" variants={fadeUp}>
            نعلن عن فتح باب التعاون مع مكاتب التسويق والوساطة العقارية في مراكز
            محافظة الدقهلية مثل شربين - بلقاس -نبروه - دكرنس - أجا - منية النصر
            - المطرية وغيرها. قم بتسجيل بيانات مكتبك وسيتواصل معك فريقنا قريباً.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
            variants={staggerContainer}
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 border border-white/5 rounded-3xl p-3 flex flex-col gap-0.5
               text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
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
                <p className="text-lg text-[#F0F0F0] leading-normal">
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
          className="relative bg-[#2D5A4280]/50 flex items-center  py-16 overflow-hidden shrink-0"
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
            className="relative container mx-auto px-4  text-center  text-white"
            variants={staggerContainer}
          >
            {/* Icon */}
            <motion.div className="flex justify-center mb-3" variants={fadeUp}>
              <motion.div
                className="w-16 h-16 flex items-center justify-center rounded-2xl
                          border-[#FFFFFF1A] border bg-white/10 backdrop-blur-md   shadow-lg"
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
              className="text-2xl lg:text-3xl font-extrabold mb-1"
              variants={fadeUp}
            >
              شبكة المكاتب المعتمدة{" "}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-[#F5F9F7B2] text-sm md:text-lg"
              variants={fadeUp}
            >
              كن جزءاً من منظومة التطوير العقاري الأكبر في الدلتا{" "}
            </motion.p>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default PartenerSection;
