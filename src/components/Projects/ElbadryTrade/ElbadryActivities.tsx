import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import {
  CHINESE_MARKET_ACCENT,
  CHINESE_MARKET_ACCENT_LIGHT,
  CHINESE_MARKET_CARD_DESCRIPTION,
  CHINESE_MARKET_CARD_IMAGE,
} from "@/constants/chineseMarket";

const ElbadryActivities = () => {
  const activities = [
    {
      title: "سوق اسطنبول",
      description: "مساحات تبدأ من 29م ومقدم يبدأ من 600 ألف جنية",
      link: "/elbadry-souq-istanbul",
      img: "/assets/projects/elbadry-trade/istanbulCardImg.png",
      accent: "#d23a2e",
      accentLight: "#d23a2e15",
    },
    {
      title: "مطاعم وكافيهات",
      description: "مساحات تبدأ من 29م ومقدم يبدأ من 760 ألف جنية",
      link: "/elbadry-cafe-restaurants",
      img: "/assets/projects/elbadry-trade/cafeCardImg.png",
      accent: "#1F503B",
      accentLight: "#1F503B15",
    },
    {
      title: "سوق الصين العظيم",
      description: CHINESE_MARKET_CARD_DESCRIPTION,
      link: "/elbadry-chinese-market",
      img: CHINESE_MARKET_CARD_IMAGE,
      accent: CHINESE_MARKET_ACCENT,
      accentLight: CHINESE_MARKET_ACCENT_LIGHT,
    },
  ];

  return (
    <>
      {activities.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden flex flex-col border-2 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white w-full"
          style={{ borderColor: item.accent + "33" }}
        >
          {/* الصورة */}
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={item.img}
              alt={item.title}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>

          {/* المحتوى */}
          <div className="flex flex-col gap-3 p-4 flex-1">
            <h4 className="font-extrabold text-lg" style={{ color: item.accent }}>
              {item.title}
            </h4>
            <p className="text-[#555] text-body-sm leading-relaxed">{item.description}</p>
            <Link
              href={item.link}
              onClick={() => window.scrollTo(0, 0)}
              className="mt-auto flex items-center justify-center gap-2 text-white font-bold rounded-xl px-4 py-2.5 text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: item.accent }}
            >
              التفاصيل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ElbadryActivities;
