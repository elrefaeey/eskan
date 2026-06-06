"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import ElbadryTowersUnitsSection from "@/features/elbadry-towers/components/ElbadryTowersUnitsSection";
import useProjectMapImage from "@/features/elbadry-towers/hooks/useProjectMapImage";
import { Loader2 } from "lucide-react";

const blocks = [
  {
    id: "A",
    color: "bg-purple-600",
    text: "يقع علي واجهه رئيسيه علي شارع عبد السلام عارف وبواجهه رئيسيه علي شارع جانبي ١٠ متر",
  },
  {
    id: "B",
    color: "bg-green-600",
    text: "يقع علي واجهه مميزه علي الميدان الداخلي بمسطح 1000 متر وبواجهة جانبيه علي الشارع 10 متر وواجهه علي شارع خلفي",
  },
  {
    id: "C",
    color: "bg-yellow-500",
    text: "يقع علي واجهه مميزه علي الميدان الداخلي بمسطح ١٠٠٠ متر، واجهه جانبيه شارع البحر الصغير وبناصيه علي شارع داخلي بعرض ١٥ متر",
  },
  {
    id: "D",
    color: "bg-orange-500",
    text: "يقع علي واجهه رئيسيه علي شارع عبد السلام عارف وبواجهه جانبيه علي شارع البحر الصغير وبناصيه علي شارع داخلي بعرض ١٥ متر",
  },
];

const ElbadryToursUnits = () => {
  const { mapImage, isLoading } = useProjectMapImage();

  return (
    <>
      {/* ── موقع المشروع + البلوكات ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
        dir="rtl"
      >
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
          موقع المشروع السكني
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الخريطة */}
          <div className="relative w-full h-72 md:h-[480px] rounded-2xl overflow-hidden shadow-md">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Image
                src={mapImage?.img || "https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/Rauno8Hapl.png"}
                alt="موقع أبراج البدري"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {/* البلوكات */}
          <div className="flex flex-col gap-4">
            <p className="text-[#333] text-lg md:text-xl font-bold leading-relaxed">
              يتكون المشروع من أربع بلوكات مقسمة كالآتي:
            </p>
            <div className="flex flex-col gap-3">
              {blocks.map((block, i) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                >
                  <div className={`${block.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow`}>
                    <span className="text-white font-extrabold text-base">{block.id}</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm mb-0.5">بلوك {block.id}</p>
                    <p className="text-[#555] text-sm leading-relaxed">{block.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── الوحدات ── */}
      <div id="units-section">
        <ElbadryTowersUnitsSection />
      </div>
    </>
  );
};

export default ElbadryToursUnits;
