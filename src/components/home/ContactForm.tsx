"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { FormInput } from "../ui/ReusableComponents/FormInput";
import { FormTextarea } from "../ui/ReusableComponents/FormTextarea";
import { FormSelect } from "../ui/ReusableComponents/FormSelect";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { motion } from "framer-motion";

const formSchema = z.object({
  type: z.string().min(1, "نوع العقار مطلوب"),
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(5, "رقم الهاتف مطلوب"),
  brief: z.string().min(2, "الوصف مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  { icon: Phone, label: "اتصل بنا", value: "01000000000" },
  { icon: MessageCircle, label: "واتساب", value: "01000000000" },
  { icon: MapPin, label: "العنوان", value: "المنصورة، الدقهلية، مصر" },
];

export default function ContactForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { type: "", name: "", phone: "", brief: "" },
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;
  const onSubmit = () => { reset(); };

  return (
    <section id="contact-form" className="py-16 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-3">
            نحن هنا لمساعدتك
          </span>
          <h2 className="text-primary text-3xl md:text-4xl font-extrabold mb-3">تواصل معنا</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            سجل بياناتك وخلي فريقنا يساعدك تختار العقار اللي يناسب احتياجك وميزانيتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Left - contact info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-extrabold mb-2">استشارة مجانية</h3>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                هنقدملك استشارة مجانية ونرشحلك أفضل الخيارات المتاحة حسب رغبتك
              </p>
              <div className="flex flex-col gap-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">{item.label}</p>
                      <p className="text-white font-bold text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "17+", label: "سنة خبرة" },
                { num: "+500", label: "عميل سعيد" },
                { num: "5", label: "مشاريع ناجحة" },
                { num: "100%", label: "استشارة مجانية" },
              ].map((s) => (
                <div key={s.label} className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                  <p className="text-primary font-extrabold text-2xl">{s.num}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8"
          >
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput name="name" placeholder="الاسم" />
                  <FormInput name="phone" placeholder="رقم الهاتف" />
                </div>
                <FormSelect
                  name="type"
                  placeholder="اختر نوع المشروع"
                  options={[
                    { value: "customer", label: "سكنى" },
                    { value: "contractor", label: "تجارى" },
                    { value: "A", label: "إداري" },
                    { value: "B", label: "طبي" },
                    { value: "C", label: "اخر" },
                  ]}
                />
                <FormTextarea name="brief" placeholder="الوصف" />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 text-white font-bold w-full bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 text-base"
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
                </Button>
              </form>
            </FormProvider>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
