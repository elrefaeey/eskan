"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import CountUp from "react-countup";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.25,
    },
  }),
};

function Page() {
  return (
    <div className="page py-4 bg-[#FCFCFC] ">
      {" "}
      <section className="relative bg-[#FCFCFC] flex flex-col lg:flex-row xl:h-[600px] 2xl:min-h-[700px] overflow-hidden">
        {/* النصوص */}
        <div className="order-1 lg:order-0 container flex flex-col lg:py-0 z-10">
          <div className="lg:w-[480px] xl:max-w-[520px] 3xl:max-w-[600px] mx-auto lg:mx-0 lg:text-right">
            {/* عنوان مع أنيميشن */}
            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="h2 text-[#1F503B] py-2 lg:py-4"
            >
              من نحن
            </motion.h2>

            {/* فقرة مع أنيميشن */}
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="p mb-2 lg:mb-6"
            >
              شركة مساهمة مصرية تعمل تحت مظلة هيئة الاستثمار في مجال التطوير
              العقاري وإدارة المشروعات والاستشارات العقارية الفنية والإدارية
              وتتميز الشركة بخبرتها الواسعة التي تتجاوز 17 عامًا في هذا المجال
              مما جعلها تنفرد بسمعة وخبرة ممتازة في مجالها.
            </motion.p>

            <motion.div
              custom={2}
              className="lg:p-5 lg:pt-7 py-2 pb-4 bg-white pr-0 lg:w-[700px] relative z-[200] rounded-tl-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="grid grid-cols-3 gap-4 shadow-[0px_4px_4px_0px_#00000040] 
      bg-[linear-gradient(91.69deg,#269867_-8.37%,#227350_47.21%,#1F503B_99.68%)]
      rounded-xl p-6"
              >
                {[
                  { number: 200, suffix: "M+", label: "استثمارات عملائنا" },
                  { number: 2000, label: "وحدة مباعة", suffix: "+" },
                  { number: 4, label: "مشاريع قيد التنفيذ", suffix: "+" },
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2}
                        separator=","
                      />
                      {stat.suffix}
                    </p>

                    <p className="text-xs md:text-sm text-green-50 text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* الصورة الخلفية + أنيميشن */}
        <div
          className="relative order-2 lg:order-0 lg:self-auto self-end
        lg:absolute lg:inset-y-0 lg:left-0 w-[94%] lg:w-[50%] xl:w-[57%] 2xl:w-[55%] 3xl:w-[50%] min-w-[2200px]:w-[55%]

        h-[400px] lg:h-[564px] xl:h-[566px] 2xl:h-[690px] md:mt-6 lg:mt-0 overflow-hidden
        rounded-tr-[60px] lg:rounded-tr-[180px]"
        >
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.25 }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          >
            <Image
              src="/assets/about-us/about-us.png"
              alt="Aboutus Image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* طبقة ظل */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute inset-0 bg-[#364138] pointer-events-none mix-blend-multiply"
          />
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 container sec-padding lg:gap-16 gap-4">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-1 lg:space-y-5"
        >
          <h2 className="h2 text-[#1F503B]">فريق عملنا المتميز</h2>
          <p className="p">
            فريق عمل إسكان المنصورة يضم نخبة من الأقسام المحترفة التي تعمل في
            تناغم لانتاج منتج عقاري محترف ومتميز.
            <br />
            كما تعمل الشركة علي مواكبة التطورات في مجال التكنولوجيا و تقديم حلول
            برمجية ترفع من كفاءة العمل و تساعد العميل في الحصول علي تجربة متميزة
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          className="relative w-full h-full rounded-md shadow-md overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              alt="images"
              src="/assets/about-us/images.png"
              className="object-cover w-full"
              width={600}
              height={600}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
