"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ActionButton } from "../ui/ReusableComponents/ActionButton";

function OwnersAssociation() {
  return (
    <section className="sec-padding container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-br from-[#F5F5F5] to-[#E9E9E9] shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-2xl
         p-4 lg:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex-1 space-y-2"
        >
          <h3
            className=" text-3xl lg:text-5xl font-extrabold
         text-primary tracking-tight"
          >
            المزاد العقاري{" "}
          </h3>

          <p className="text-text text-[19px] text-justify lg:text-3xl leading-relaxed text-[#3F3F3F]">
            مزاد اتحاد الملاك هو تجربة تفاعلية فريدة تتميز بالشفافية الكاملة
            وتتيح لك امتلاك وحدتك السكنية بأفضل سعر ممكن! كل ما عليك هو تحديد
            عرضك لقيمة المقدم الذي ترغب في دفعه (حتى 50%)، وكلما زادت نسبة
            المقدم، انخفض سعر المتر تلقائيًا، لكي تحصل في النهاية علي افضل سعر
            للوحدة
          </p>

          <ActionButton
            className=" px-10   transition-transform mt-2 md:mt-4"
            variant="primary"
            onClick={() => window.open("https://mazzad.ai/", "_blank")}
          >
            عرض المزاد{" "}
          </ActionButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full lg:w-[400px]  xl:w-[600px] h-[280px] lg:h-[300px] xl:h-[400px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/assets/eskan-wallet/home/OwnersAssociation.png"
            alt="Owners Association Image"
            fill
            className="object-cover"
            quality={45}
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="w-12 h-12  absolute bottom-2 right-2">
            <Image
              src="/assets/eskan-wallet/home/mazad.png"
              alt="Mazad  Image"
              width={48}
              height={48}
              className="object-cover w-12 aspect-square"
              quality={40}
              sizes="48px"
            />
          </div>

          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default OwnersAssociation;
