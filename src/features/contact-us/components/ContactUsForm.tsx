"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { showErrorToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/ReusableComponents/FormInput";
import { FormTextarea } from "@/components/ui/ReusableComponents/FormTextarea";
import { FormSelect } from "@/components/ui/ReusableComponents/FormSelect";
import SuccessModal from "@/components/ui/SuccessModal";
import { useContactUs } from "../hooks/useContactUs";

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(7, "رقم الهاتف مطلوب").regex(/^[0-9\s\+]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  unit_type: z.enum(["سكنى", "تجارى", "إداري", "طبي", "اخر"], { message: "يرجى اختيار نوع المشروع" }),
  breif: z.string().min(2, "الوصف مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUsForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", breif: "" },
  });

  const { handleSubmit, reset } = methods;
  const { mutate: submitForm, isPending } = useContactUs();

  const onSubmit = async (data: FormValues) => {
    submitForm(
      { ...data, job: "-" },
      {
        onSuccess: () => { setShowSuccessModal(true); reset(); },
        onError: (error: any) => {
          showErrorToast(error?.response?.data?.message || error.message || "حدث خطأ، حاول مرة أخرى");
        },
      }
    );
  };

  return (
    <section id="contact-form" className="relative py-14 overflow-hidden mb-10" dir="rtl">
      {/* Background image */}
      <Image
        src="/assets/footer/back33.png"
        alt="Contact Background"
        fill
        className="object-cover z-0"
        quality={80}
        sizes="100vw"
        priority={false}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3">تواصل معنا</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            سجل بياناتك وخلي فريقنا يساعدك تختار العقار اللي يناسب احتياجك وميزانيتك
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8"
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput name="name" placeholder="الاسم" />
                <FormInput name="phone" placeholder="رقم الهاتف" />
              </div>
              <FormSelect
                name="unit_type"
                placeholder="اختر نوع المشروع"
                options={[
                  { value: "سكنى", label: "سكنى" },
                  { value: "تجارى", label: "تجارى" },
                  { value: "إداري", label: "إداري" },
                  { value: "طبي", label: "طبي" },
                  { value: "اخر", label: "اخر" },
                ]}
              />
              <FormTextarea name="breif" placeholder="الوصف" />
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 text-white font-bold w-full bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 text-base"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جاري الإرسال...
                  </span>
                ) : "إرسال الطلب"}
              </Button>
            </form>
          </FormProvider>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم الإرسال بنجاح"
        message="شكراً لتواصلك معنا، سيتم الرد عليك في أقرب وقت"
      />
    </section>
  );
};

export default ContactUsForm;
