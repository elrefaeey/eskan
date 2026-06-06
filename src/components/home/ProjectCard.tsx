"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Building2, Star, Phone } from "lucide-react";

interface ProjectSegment {
  label: string;
  tag: string;
  href?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  location: string;
  image: string;
  buttonText?: string;
  buttonClick?: () => void;
  reverse?: boolean;
  link: string;
  type: string;
  priority?: boolean;
  segments?: ProjectSegment[];
}

function ProjectCard({
  title,
  description,
  location,
  image,
  reverse = false,
  link,
  type,
  priority = false,
  segments,
}: ProjectCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();

  const handleNavigate = () => router.push(link);

  // split description into bullet points — max 3 fixed bullets
  const allSentences = description
    .split(/(?<=[.،])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const sentences = allSentences.length > 0 ? allSentences : [description];
  const visibleSentences = expanded ? sentences : sentences.slice(0, 3);

  const bulletIcons = [Building2, MapPin, Star];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div
        onClick={handleNavigate}
        className={`cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 transition-shadow duration-300 flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
        dir="rtl"
      >
        {/* ── الصورة ── */}
        <div className="relative w-full md:w-[45%] shrink-0 h-64 md:h-auto min-h-[280px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            quality={50}
            priority={priority}
            {...(priority && { fetchPriority: "high" as const })}
          />
          {/* badge النوع */}
          <div className="absolute top-4 end-4 flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow">
            <Building2 className="w-4 h-4" />
            {type}
          </div>
        </div>

        {/* ── المحتوى ── */}
        <div className="flex flex-col justify-between gap-4 p-5 md:p-7 flex-1">
          {/* العنوان والموقع */}
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-2 leading-snug">
              {title}
            </h2>
            <div className="flex items-center gap-1.5 text-[#555] text-sm md:text-base">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{location}</span>
            </div>
          </div>

          {/* النقاط */}
          <div className="flex flex-col gap-3 flex-1">
            {visibleSentences.map((sentence, i) => {
              const Icon = bulletIcons[i % bulletIcons.length];
              return (
                <div key={i} className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[#333] text-base md:text-lg leading-relaxed">
                    {sentence}
                  </p>
                </div>
              );
            })}

            {sentences.length > 2 && null}
          </div>

          {/* segments أو type row */}
          {segments && segments.length > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col gap-2 w-full"
            >
              {segments.map((seg) => (
                <div
                  key={seg.label}
                  onClick={(e) => { e.stopPropagation(); seg.href && router.push(seg.href); }}
                  className={`flex items-center justify-between w-full border border-primary/30 bg-primary/5 rounded-lg px-4 py-2.5 transition-colors duration-150 ${
                    seg.href ? "cursor-pointer hover:bg-primary/10 hover:border-primary/60" : ""
                  }`}
                >
                  <span className="text-primary font-bold text-sm">{seg.label}</span>
                  <span className="text-xs text-white bg-primary rounded-full px-2.5 py-1">
                    {seg.tag}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {/* الأزرار */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 flex-wrap"
          >
            <button
              onClick={handleNavigate}
              className="flex-1 min-w-[120px] bg-primary text-white font-bold text-base rounded-xl px-5 py-3 hover:bg-primary/90 transition-colors duration-200"
            >
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
