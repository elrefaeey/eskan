"use client";
import { useRef, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Building2, Clock, Layers, Home, ChevronDown, Loader2 } from "lucide-react";
import MadinaTowersUnits from "@/components/Projects/MadinaTowers/MadinaTowersUnits";
import { useLenis } from "@/hooks/useLenis";
import useMadinaProjectDetails from "@/features/abrag-elmadina/hooks/useMadinaProjectDetails";
import { ProjectHero, StatsGrid } from "@/components/shared";
import MapSection from "@/components/shared/MapSection";

const phasesData = [
  {
    title: "المرحلة الأولى",
    description: "7 عمارات بإجمالي 112 وحدة سكنية و36 محل تجاري و24 عيادة طبية — مساحات 100م² — 3 غرف وصالة قطعتين.",
    image: "/assets/projects/abrag-elmadina/step1.webp",
    closed: true,
    step: null,
  },
  {
    title: "المرحلة الثانية",
    description: "عمارتان بعدد 50 وحدة سكنية و25 محل تجاري — مساحات من 115م² حتى 130م² — 3 غرف وصالة قطعتين أو ثلاث.",
    image: "/assets/projects/abrag-elmadina/step2.webp",
    closed: false,
    step: "ثانيه",
  },
  {
    title: "المرحلة الثالثة",
    description: "8 أبراج سكنية تجارية — 180 وحدة سكنية و66 محل تجاري — مساحات من 84م² حتى 150م² — تقسيط حتى 6 سنوات.",
    image: "/assets/projects/abrag-elmadina/step3.webp",
    closed: false,
    step: "ثالثه",
  },
];

const phaseOptions = phasesData.filter((p) => !p.closed).map((p) => ({ value: p.step!, label: p.title }));

const stats = [
  { label: "عمارة",       value: "14",   icon: Building2 },
  { label: "مرحلة",       value: "4",    icon: Layers    },
  { label: "وحدة سكنية", value: "+200", icon: Home      },
  { label: "سنوات تقسيط", value: "6",    icon: Clock     },
];

export default function ResidentialPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const unitsRef     = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { projectDetails, isLoading } = useMadinaProjectDetails();
  const selectedStep = searchParams.get("step");

  useLenis();

  useEffect(() => {
    if (selectedStep && unitsRef.current) {
      const t = setTimeout(() => {
        unitsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [selectedStep]);

  const handleSelectPhase = (step: string) => {
    setDropdownOpen(false);
    router.push(`?step=${step}`);
  };

  if (isLoading) {
    return (
      <div className="container page flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) return null;

  const selectedLabel = phaseOptions.find((p) => p.value === selectedStep)?.label;

  // ── Dropdown المرحلة — يُمرَّر كـ extraContent إلى MapSection ──────────────
  const phasesDropdown = (
    <div className="relative w-fit">
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="flex items-center gap-3 bg-primary text-white font-bold text-base rounded-xl px-6 py-3 hover:bg-primary/90 transition-colors"
      >
        <span>{selectedLabel ?? "اختر المرحلة"}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
            transition={{ duration: 0.15 }}
            className="absolute top-0 right-full ml-2 me-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-[180px]"
          >
            {phaseOptions.map((p) => (
              <button
                key={p.value}
                onClick={() => handleSelectPhase(p.value)}
                className={`w-full text-right px-5 py-3 text-base font-bold hover:bg-primary/5 transition-colors
                  ${selectedStep === p.value ? "text-primary bg-primary/5" : "text-[#333]"}`}
              >
                {p.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={projectDetails.imgs.map((i) => i.img)}
        badge={{ text: "وحدات سكنية", color: "primary" }}
        title="أبراج المدينة"
        location={projectDetails.location}
        description="مجتمع عمراني متكامل على مساحة 15 ألف متر (سكني - تجاري - عيادات طبية - مجمع تعليمي - إداري) يتكون من عدد 14 عمارة مقسمة على 4 مراحل وعدد يزيد عن 200 وحدة سكنية تتميز بمساحات تناسب الأسرة المصرية تبدأ من 58 متر حتى 159 متر، حيث يحقق المشروع المعادلة الصعبة التي تعطى مساحة وحدة سكنية صغيرة ومتوسطة بمقدم يبدأ من 25% وبالتقسيط على 6 سنوات وبدون فوايد."
        videoId="jWCRs6Oc_0g"
        className="mb-10 border-b border-gray-100"
      />

      <div className="container px-4">

        {/* ── Stats ── */}
        <StatsGrid
          stats={stats}
          colorScheme="primary"
          className="mb-10 mt-8"
        />

        {/* ── موقع المشروع ── */}
        <MapSection
          visualType="image"
          imageSrc="/assets/projects/abrag-elmadina/aaa.png"
          imageAlt="مخطط أبراج المدينة"
          description="يتمتع مشروع أبراج المدينة بموقع عبقري واستراتيجي، دقيقة واحدة فقط من شارع قناة السويس، و10 دقائق من جامعة المنصورة، و5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية. يقع المشروع في الاتجاه المقابل لـ كوبري جديلة، مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة كذلك الدلتا."
          mapPosition="map-left"
          showDivider={true}
          titleIconClassName="w-6 h-6"
          containerVariant="primary-light"
          textContainerClassName="gap-5"
          extraContent={phasesDropdown}
        />

        {/* ── الوحدات ── */}
        <div ref={unitsRef}>
          {selectedStep ? (
            <AnimatedSection duration={0.4} className="mb-10">
              <MadinaTowersUnits />
            </AnimatedSection>
          ) : (
            <div className="text-center py-16 text-[#888] text-lg border-2 border-dashed border-gray-200 rounded-2xl mb-10">
              <Clock className="w-10 h-10 mx-auto mb-3 text-primary/40" />
              اختر المرحلة من الأعلى لعرض الوحدات المتاحة
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
