"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Clock, Loader2, Layers, Home, ChevronDown } from "lucide-react";
import MadinaTowersUnits from "@/components/Projects/MadinaTowers/MadinaTowersUnits";
import { useLenis } from "@/hooks/useLenis";
import useMadinaProjectDetails from "@/features/abrag-elmadina/hooks/useMadinaProjectDetails";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { GoVideo } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  { label: "عمارة", value: "14", icon: Building2 },
  { label: "مرحلة", value: "4", icon: Layers },
  { label: "وحدة سكنية", value: "+200", icon: Home },
  { label: "سنوات تقسيط", value: "6", icon: Clock },
];

export default function ResidentialPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const unitsRef = useRef<HTMLDivElement>(null);
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

  return (
    <section className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <section className="mb-10 bg-white border-b border-gray-100">
        <div className="rounded-2xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">

          {/* الصورة - شمال */}
          <div className="relative h-80 max-h-80 md:h-auto md:min-h-[300px] md:max-h-none order-1 rounded-2xl overflow-hidden">
            <ProjectImgsSlider images={projectDetails.imgs.map((i) => i.img)} height="h-full md:!h-full" rounded={false} />
          </div>

          {/* النص - يمين */}
          <div className="flex flex-col justify-between gap-4 p-6 md:p-8 order-2">
            <div>
              <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full mb-3">
                وحدات سكنية
              </span>
              <h1 className="text-primary text-3xl md:text-4xl font-extrabold mb-2 leading-snug">أبراج المدينة</h1>
              <div className="flex items-center gap-1.5 text-[#555] text-sm mb-4">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{projectDetails.location}</span>
              </div>
              <div className="w-10 h-1 bg-primary rounded mb-4" />
              <p className="text-[#444] text-base md:text-lg leading-[1.9]">
                مجتمع عمراني متكامل على مساحة 15 ألف متر (سكني - تجاري - عيادات طبية - مجمع تعليمي - إداري)
                يتكون من عدد 14 عمارة مقسمة على 4 مراحل وعدد يزيد عن 200 وحدة سكنية تتميز بمساحات
                تناسب الأسرة المصرية تبدأ من 58 متر حتى 159 متر، حيث يحقق المشروع المعادلة الصعبة
                التي تعطى مساحة وحدة سكنية صغيرة ومتوسطة بمقدم يبدأ من 25% وبالتقسيط على 6 سنوات وبدون فوايد.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center gap-2 bg-primary text-white font-bold text-base rounded-xl px-5 py-3 hover:bg-primary/90 transition-colors w-full md:w-fit">
                    <GoVideo className="size-5" />
                    مشاهدة فيديو المشروع
                  </button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-4xl p-0 overflow-hidden sm:rounded-2xl">
                  <DialogHeader className="px-4 pt-4 sm:px-6">
                    <DialogTitle className="text-base sm:text-lg">فيديو المشروع</DialogTitle>
                  </DialogHeader>
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/jWCRs6Oc_0g&t"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center gap-2 text-center">
              <p className="text-primary text-3xl font-extrabold">{s.value}</p>
              <p className="text-[#555] text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── موقع المشروع ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-2xl bg-primary/5 grid grid-cols-1 md:grid-cols-2 items-stretch"
        >
          <div className="relative w-full order-1 md:order-2 self-stretch min-h-[300px]">
            <Image src="/assets/projects/abrag-elmadina/aaa.png" alt="مخطط أبراج المدينة" fill className="object-cover object-top" />
          </div>
          <div className="flex flex-col gap-5 p-6 md:p-10 order-2 md:order-1">
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold flex items-center gap-2">
              <MapPin className="w-6 h-6 shrink-0" />
              موقع المشروع
            </h2>
            <div className="w-10 h-1 bg-primary rounded" />
            <p className="text-[#333] text-base md:text-lg leading-[2]">
              يتمتع مشروع أبراج المدينة بموقع عبقري واستراتيجي، دقيقة واحدة فقط من شارع قناة السويس،
              و10 دقائق من جامعة المنصورة، و5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات
              والمرافق الحيوية. يقع المشروع في الاتجاه المقابل لـ كوبري جديلة، مما يمنحه سهولة
              وصول استثنائية من مختلف أنحاء المنصورة كذلك الدلتا.
            </p>
            {/* dropdown اختر المرحلة */}
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
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
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
          </div>
        </motion.div>

        {/* ── الوحدات ── */}
        <div ref={unitsRef}>
          {selectedStep ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <MadinaTowersUnits />
            </motion.div>
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
