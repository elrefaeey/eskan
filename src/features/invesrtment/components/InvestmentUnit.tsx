import Image from "next/image";
import { LuCheck } from "react-icons/lu";
import { motion } from "framer-motion";
import InvestProjectCard from "./InvestProjectCard";
import ShareCard from "./ShareCard";
import { InvestmentResponseData } from "@/services/investment";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

interface InvestmentUnitProps {
  investmentData: InvestmentResponseData | null;
  onReanalyze?: () => void;
  onProjectSelect?: (data: InvestmentResponseData) => void;
}

function InvestmentUnit({
  investmentData,
  onReanalyze,
  onProjectSelect,
}: InvestmentUnitProps) {
  if (!investmentData) {
    return (
      <main className="page">
        <div className="container py-8 text-center">
          <p className="text-xl">جاري تحميل البيانات...</p>
        </div>
      </main>
    );
  }

  const { project, units, message, suggested_projects } = investmentData;
  return (
    <main className="page">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="flex flex-col pt-4 md:flex-row justify-between items-start md:items-center container py-3 sm:py-4 gap-3"
      >
        <div className="flex gap-2 pt-6 sm:gap-3 items-start w-full md:w-auto">
          <Image
            src="/assets/investment/23c75235c104df3af9fdf3ca6f071a8d38bc5dc3.png"
            alt="نافع"
            width={100}
            height={100}
            className="rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xl md:text-2xl text-[#2D2D2D] font-medium">
              مستشارك العقاري
            </h3>
            <p className="text-body-sm text-[#1E1E1E]">
              خبير استثمار - اسكان المنصورة
            </p>
          </div>
        </div>

        <button
          onClick={onReanalyze}
          className="text-[#1F503B] underline text-base md:text-lg w-full md:w-auto text-right md:text-center"
        >
          ارغب في إعادة التحليل
        </button>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 container"
      >
        <p className="bg-[#F3FAF6] rounded-lg relative text-body-lg p-4 leading-relaxed">
          {message}
          <Image
            src="/assets/investment/Vector.png"
            alt=""
            width={80}
            height={80}
            className="absolute left-0 bottom-0 w-12 sm:w-16"
          />
        </p>
      </motion.div>

      <div className="container sec-padding">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-xl overflow-hidden"
        >
          <Image
            src={project.img}
            alt={project.project_name}
            className="w-full h-[350px] xl:h-150 object-cover"
            width={1200}
            height={600}
            priority
          />

          <Image
            src="/assets/investment/gradient.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            width={1200}
            height={600}
          />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
            {/* Badges */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mb-3"
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="px-3 py-1 rounded-[44px] flex items-center gap-1 text-xs sm:text-sm bg-[#2B2B2B7D]"
              >
                <LuCheck size={16} color="#FBFBFB" />
                {project.project_type}
              </motion.div>
              {project.installment_options &&
                project.installment_options !== "null" && (
                  <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    className="px-3 py-1 rounded-[44px] flex items-center gap-1 text-xs sm:text-sm bg-[#2B2B2B7D]"
                  >
                    <LuCheck size={16} color="#FBFBFB" />
                    متاح التقسيط
                  </motion.div>
                )}
              {project.profit_rate && (
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="px-3 py-1 rounded-[44px] flex items-center gap-1 text-xs sm:text-sm bg-[#1F503B]"
                >
                  <LuCheck size={16} color="#FBFBFB" />
                  {project.profit_rate}%
                </motion.div>
              )}
            </motion.div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              حصص ب{project.share_type} - {project.name ?? project.project_name}
            </h2>

            <p className="text-body-sm mt-2 flex items-center gap-1">
              <Image
                src="/assets/investment/location.svg"
                alt=""
                width={16}
                height={16}
              />
              {project.location}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ===== Available Units ===== */}
      {units && units.length > 0 && (
        <div className="container sec-padding">
          <h2 className="h2 text-[#1F503B] text-2xl md:text-3xl">
            الوحدات المتاحة
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
          >
            {units.map((unit) => (
              <motion.div key={unit.id} variants={fadeUp}>
                <ShareCard unit={unit} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ===== Alternatives ===== */}
      {suggested_projects && suggested_projects.length > 0 && (
        <div className="container sec-padding">
          <h2 className="h2 text-[#1F503B] text-2xl md:text-3xl">
            بدائل استثمارية مقترحة
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
          >
            {suggested_projects.map((suggestedProject) => (
              <motion.div key={suggestedProject.id} variants={fadeUp}>
                <InvestProjectCard
                  project={suggestedProject}
                  onProjectSelect={onProjectSelect}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </main>
  );
}

export default InvestmentUnit;
