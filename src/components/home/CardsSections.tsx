"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

function CardsSections() {
  const cards = [
    {
      title: "الإستثمار العقاري",
      description:
        "الأسلوب الأضمن لتحقيق أعلى عائد استثماري هو الاستثمار العقاري من خلال شراء وحدات تجارية وطبية في المشروعات العقارية المرخصة مع تحقيق عوائد مزدوجة من البيع والإيجار، حيث يمكن للمستثمر الاستفادة من زيادة قيمة الوحدة  على المدى الطويل والحصول على دخل ثابت من تأجيرها  أو عائد من اعادة البيع .",
      bgColor: "bg-[#1F503B]",
      textColor: "text-white",
      polygon: "/assets/eskan-wallet/home/green-polygon.svg",
      buttonColor: "text-white",
      link: "/investment",
    },
    {
      title: " علاقاتك استثمارك",
      description:
        "عميلنا العزيز إذا كنت من هؤلاء الذين يتميزون بشبكة علاقات واسعة ودائرة معارف كبيرة ولديك قدرة على التواصل مع الأخرين، فيمكنك تحويل هذه الميزة إلى أرباح مالية رائعة من خلال برنامج حق السعي. لمعرفة التفاصيل تواصل معنا",
      bgColor: "bg-[#DFDFDF]",
      textColor: "text-[#1F503B]",
      polygon: "/assets/eskan-wallet/home/gray-polygon.svg",
      buttonColor: "text-[#1F503B]",
      link: "/work-with-us",
    },
  ];

  return (
    <section className="container sec-padding leading-[1.7]!">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Card
                className={`relative overflow-hidden rounded-2xl border-0 shadow-xl
                     hover:shadow-2xl transition-shadow duration-300 p-0 h-full ${card.bgColor}`}
              >
                <Image
                  alt="polygon"
                  src={card.polygon}
                  fill
                  className="absolute inset-0 object-cover opacity-90"
                />

                <CardContent
                  className={`relative z-10 p-4 lg:p-6 flex flex-col gap-3 lg:gap-0 h-full ${card.textColor}`}
                >
                  <motion.h3
                    className="text-2xl  lg:text-4xl font-extrabold
          tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {card.title}
                  </motion.h3>

                  <p className="text-xl md:text-[30px] leading-relaxed opacity-90">
                    {card.description}
                  </p>

                  <div className="mt-auto">
                    <Link href={card.link}>
                      <Button
                        variant="link"
                        className={`px-0 p-0 cursor-pointer mt-2 md:mt-6 gap-2 text-xl lg:text-3xl
                         font-bold ${card.buttonColor}`}
                      >
                        معرفة المزيد
                        <ArrowLeft className="size-6 lg:size-10" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>

                {/* subtle overlay for aesthetic depth */}
                <div className="absolute inset-0 bg-linear-to-b from-black/5 to-transparent z-0"></div>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CardsSections;
