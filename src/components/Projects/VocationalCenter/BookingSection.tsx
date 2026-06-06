"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Clock, FileText } from "lucide-react";

const contractTypes = [
  { id: "rental", label: "عقد جاري", desc: "إيجار شهري ثابت بعائد مضمون", icon: Clock },
  { id: "ownership", label: "عقد دائم", desc: "تملك حصة استثمارية في المشروع", icon: FileText },
];

const floors: Record<string, { id: string; label: string; desc: string }[]> = {
  rental: [
    { id: "f1", label: "الدور الأول", desc: "عيادات طبية" },
    { id: "f2", label: "الدور الثاني", desc: "مراكز تعليمية" },
  ],
  ownership: [
    { id: "f1", label: "الدور الأول", desc: "عيادات طبية" },
    { id: "f2", label: "الدور الثاني", desc: "مراكز تعليمية" },
  ],
};

const timeOptions = ["صباحاً (9 - 12)", "ظهراً (12 - 3)", "مساءً (3 - 6)", "مساءً (6 - 9)"];

interface FormData {
  name: string;
  phone: string;
  job: string;
  time: string;
}

export default function BookingSection() {
  const [open, setOpen] = useState(false);
  const [contractType, setContractType] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", job: "", time: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleFloorClick = (floorId: string) => {
    setSelectedFloor(floorId);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setSelectedFloor(null);
    setSubmitted(false);
    setForm({ name: "", phone: "", job: "", time: "" });
  };

  const selectedFloorData = contractType
    ? floors[contractType]?.find((f) => f.id === selectedFloor)
    : null;

  return (
    <div dir="rtl">
      {/* زرار احجز */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-primary text-white font-bold text-base rounded-xl px-6 py-3 hover:bg-primary/90 transition-colors w-full md:w-fit"
      >
        <GraduationCap className="w-5 h-5" />
        احجز حصتك الاستثمارية الآن
      </button>

      {/* Section الحجز */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-6"
          >
            {/* نوع العقد */}
            <div className="mb-6">
              <p className="text-gray-600 font-semibold text-base mb-3">اختر نوع العقد:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contractTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => { setContractType(ct.id); setSelectedFloor(null); }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-right transition-all duration-200 ${
                      contractType === ct.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 bg-white hover:border-primary/40"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      contractType === ct.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      <ct.icon className="w-5 h-5" />
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

            {/* الأدوار */}
            <AnimatePresence>
              {contractType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-600 font-semibold text-base mb-3">اختر الدور:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {floors[contractType].map((floor) => (
                      <button
                        key={floor.id}
                        onClick={() => handleFloorClick(floor.id)}
                        className="flex flex-col items-start gap-1 p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-primary hover:bg-primary/5 transition-all duration-200 text-right"
                      >
                        <span className="font-extrabold text-primary text-lg">{floor.label}</span>
                        <span className="text-gray-500 text-sm">{floor.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-primary font-extrabold text-xl">حجز وحدة</h2>
                <button onClick={resetModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-primary font-extrabold text-xl">تم استلام طلبك!</h3>
                  <p className="text-gray-500 text-base">سيتواصل معك فريقنا في أقرب وقت.</p>
                  <button
                    onClick={resetModal}
                    className="mt-2 bg-primary text-white font-bold rounded-xl px-8 py-3 hover:bg-primary/90 transition-colors"
                  >
                    حسناً
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                  {selectedFloorData && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-primary font-semibold">
                      {selectedFloorData.label} — {selectedFloorData.desc}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">الاسم الكامل</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right text-base outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">رقم الهاتف</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right text-base outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">المهنة</label>
                    <input
                      value={form.job}
                      onChange={(e) => setForm({ ...form, job: e.target.value })}
                      placeholder="أدخل مهنتك"
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right text-base outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600 text-sm font-medium">وقت التواصل المفضل</label>
                    <select
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-right text-base outline-none focus:border-primary transition-colors bg-white appearance-none"
                    >
                      <option value="">اختر الوقت المناسب</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 bg-primary text-white font-bold rounded-xl py-4 text-base hover:bg-primary/90 transition-colors"
                  >
                    تأكيد الحجز
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
