import Link from "next/link";
import { motion } from "framer-motion";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { heroTextVariants } from "../animations";

export default function HeroContent() {
  return (
    <div className="order-1 lg:order-0 container flex flex-col justify-center py-5 lg:py-0 z-10">
      <motion.div
        initial="hidden"
        animate="visible"
        className="lg:w-120 xl:max-w-130 3xl:max-w-150 w-full lg:mx-0 lg:text-right"
      >
        <motion.p
          custom={0}
          variants={heroTextVariants}
          className="text-text text-lg lg:text-2xl mb-1 font-semibold md:block hidden"
        >
          في إسكان المنصورة
        </motion.p>

        <motion.h1
          custom={1}
          variants={heroTextVariants}
          className="hidden md:block text-center md:text-start text-2xl lg:text-4xl xl:text-[44px] leading-normal! font-bold md:font-extrabold text-primary lg:mb-4 mb-2"
        >
          نسعي للتطوير العقاري بفكر جديد ورؤية مختلفة{" "}
        </motion.h1>

        <motion.p
          custom={2}
          variants={heroTextVariants}
          className="text-text text-lg lg:text-[28px] mb-4 lg:mb-6 md:block hidden"
        >
          ابراج سكنية ومولات تجارية تناسب كل الاحتياجات مع انظمة سداد مرنة واطول فترة
          تقسيط بدون فوائد
        </motion.p>

        <motion.div
          custom={3}
          variants={heroTextVariants}
          className="flex flex-col md:flex-row justify-center md:justify-start gap-3 w-full"
        >
          <Link href="/data-form" className="block">
            <ActionButton className="lg:px-10 block w-full py-4" onClick={() => {}}>
              اتحاد الملاك
            </ActionButton>
          </Link>
          <Link href="/investment?start=1" className="block">
            <ActionButton variant="secondary" className="lg:px-10 block w-full py-4">
              ارباح عقارية{" "}
            </ActionButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
