"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Clock, FileText, Stethoscope, BookOpen, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const contractTypes = [
  { id: "rental", label: "عقد جاري", desc: "إيجار شهري ثابت بعائد مضمون", icon: Clock },
  { id: "ownership", label: "عقد بيع", desc: "تملك حصة استثمارية في المشروع", icon: FileText },
];

const floors = [
  {
    id: "f1",
    label: "الدور الأول",
    desc: "عيادات طبية",
    icon: Stethoscope,
    image: "/assets/projects/abrag-elmadina/step1.webp",
    price: "يبدأ من 500,000 جنيه",
    area: "من 30م² إلى 80م²",
    features: ["تشطيب كامل", "مدخل مستقل", "عائد إيجاري مضمون", "عقد موثق"],
    color: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "f2",
    label: "الدور الثاني",
    desc: "مراكز تعليمية",
    icon: BookOpen,
    image: "/assets/projects/abrag-elmadina/step2.webp",
    price: "يبدأ من 400,000 جنيه",
    area: "من 40م² إلى 120م²",
    features: ["مساحات مرنة", "تجهيزات تعليمية", "عائد شهري ثابت", "عقد موثق"],
    color: "border-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

const timeOptions = ["صباحاً (9 - 12)", "ظهراً (12 - 3)", "مساءً (3 - 6)", "مساءً (6 - 9)"];

interface FormData { name: string; phone: string; job: string; time: string; }

export default function InvestmentUnits() {
  const [contractType, setContractType] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<typeof floors[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", job: "", time: "" });
  const [submitted, setSubmitted] = useState(false);

  const resetModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setForm({ name: "", phone: "", job: "", time: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
      dir="rtl"
    >
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
        احجز حصتك الاستثمارية
      </h2>

      {/* نوع العقد */}
      <div className="mb-6">
        <p className="text-gray-500 font-semibold text-sm mb-3">اختر نوع العقد:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contractTypes.map((ct) => (
            <button
              key={ct.id}
              onClick={() => setContractType(ct.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-right transition-all duration-200 ${
                contractType === ct.id ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/40"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                contractType === ct.id ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
              }`}>
                <ct.icon className="w-6 h-6" />
              </div>
              <div>
                <p className={`font-extrabold text-base ${contractType === ct.id ? "text-primary" : "text-gray-700"}`}>
                  {ct.label}
                </p>
                <p className="text-gray-400 text-sm">{ct.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* كروت الأدوار */}
      <AnimatePresence>
        {contractType && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-gray-500 font-semibold text-sm mb-4">اختر الدور:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {floors.map((floor) => (
                <div
                  key={floor.id}
                  className={`rounded-2xl overflow-hidden border-2 bg-white shadow-sm flex flex-col ${floor.color}`}
                >
                  {/* الصورة */}
                  <div className="relative h-48 w-full">
                    <Image src={floor.image} alt={floor.label} fill className="object-cover" />
                    <div className={`absolute top-3 end-3 flex items-center gap-1.5 ${floor.iconBg} ${floor.iconColor} font-bold text-sm px-3 py-1.5 rounded-xl`}>
                      <floor.icon className="w-4 h-4" />
                      {floor.desc}
                    </div>
                  </div>

                  {/* التفاصيل */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="text-primary font-extrabold text-xl">{floor.label}</h3>
                      <p className="text-gray-500 text-sm">{floor.desc}</p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <p className="text-xs text-gray-400">السعر</p>
                        <p className="text-primary font-extrabold text-base">{floor.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">المساحة</p>
                        <p className="text-gray-700 font-bold text-base">{floor.area}</p>
                      </div>
                    </div>

                    <ul className="grid grid-cols-2 gap-1.5">
                      {floor.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-gray-600 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => { setSelectedFloor(floor); setShowModal(true); }}
                      className="mt-auto bg-primary text-white font-bold rounded-xl py-3 text-base hover:bg-primary/90 transition-colors"
                    >
                      احجز هذه الوحدة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal الفورم */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && resetModal()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
              dir="rtl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-primary font-extrabold text-xl">حجز وحدة</h2>
                <button onClick={resetModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-primary font-extrabold text-xl">تم استلام طلبك!</h3>
                  <p className="text-gray-500">سيتواصل معك فريقنا في أقرب وقت.</p>
                  <button onClick={resetModal} className="bg-primary text-white font-bold rounded-xl px-8 py-3 hover:bg-primary/90 transition-colors">
                    حسناً
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                  {selectedFloor && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-primary font-semibold">
                      {selectedFloor.label} — {selectedFloor.desc} | {selectedFloor.price}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">الاسم الكامل</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">رقم الهاتف</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">المهنة</label>
                    <input value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })}
                      placeholder="أدخل مهنتك"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">وقت التواصل المفضل</label>
                    <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right outline-none focus:border-primary transition-colors bg-white">
                      <option value="">اختر الوقت المناسب</option>
                      {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="mt-2 bg-primary text-white font-bold rounded-xl py-4 hover:bg-primary/90 transition-colors">
                    تأكيد الحجز
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
