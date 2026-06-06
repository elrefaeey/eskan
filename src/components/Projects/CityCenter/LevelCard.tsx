import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import Image from "next/image";

export interface LevelCardProps {
  title: string;
  units?: number;
  area?: number;
  link?: string;
  img?: string;
  loading?: boolean;
  status?: string;
  years?: number;
  advance?: number;
}

const LevelCard: React.FC<LevelCardProps> = ({
  title,
  units,
  area,
  link = "",
  img = "",
  loading,
  status,
  years,
  advance,
}) => {
  const isSold = !!status;

  return (
    <div className={`rounded-2xl overflow-hidden flex flex-col border-2 transition-shadow duration-200 ${isSold ? "border-gray-200 bg-gray-50 opacity-75" : "border-primary/20 bg-white shadow-sm hover:shadow-md"}`}>
      {/* الصورة */}
      <div className="relative h-40 w-full overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-primary/10 animate-pulse" />
        ) : (
          <Image src={img} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        )}
        {isSold && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white/90 rounded-xl px-4 py-2">
              <Lock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 font-bold text-sm">تم الانتهاء من التعاقد</span>
            </div>
          </div>
        )}
      </div>

      {/* المحتوى */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <h4 className={`font-extrabold text-lg ${isSold ? "text-gray-400" : "text-primary"}`}>
          {title}
        </h4>

        {!isSold && units && (
          <div className="flex flex-col gap-1.5">
            {link === "/restaurant" ? (
              <p className="text-[#555] text-sm">
                <span className="font-bold text-[#333]">{units}</span> وحدة — مساحات تبدأ من <span className="font-bold text-[#333]">{area}م</span>
              </p>
            ) : (
              <>
                <p className="text-[#555] text-sm">
                  مساحة تبدأ من <span className="font-bold text-[#333]">{area}م²</span>
                </p>
                <p className="text-[#555] text-sm">
                  مقدم من <span className="font-bold text-primary">{advance} ألف</span> — تقسيط حتى <span className="font-bold text-[#333]">{years} سنوات</span>
                </p>
              </>
            )}
          </div>
        )}

        {!isSold && link && (
          <Link
            href={link}
            className="mt-auto flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl px-4 py-2.5 text-sm hover:bg-primary/90 transition-colors"
          >
            التفاصيل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LevelCard;
