"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { showErrorToast } from "@/lib/toast";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/ReusableComponents/FormInput";
import { FormTextarea } from "@/components/ui/ReusableComponents/FormTextarea";
import { FormSelect } from "@/components/ui/ReusableComponents/FormSelect";
import SuccessModal from "@/components/ui/SuccessModal";
import { contactUsHeaderVariant, contactUsFormVariant } from "../animations";
import { UNIT_TYPE_OPTIONS } from "../constants";
import { contactUsSchema, type ContactUsFormValues } from "../schemas/contactUsSchema";
import { useContactUs } from "../hooks/useContactUs";

const ContactUsForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: { name: "", phone: "", breif: "" },
  });

  const { handleSubmit, reset } = methods;
  const { mutate: submitForm, isPending } = useContactUs();

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const onSubmit = async (data: ContactUsFormValues) => {
    submitForm(
      { ...data, job: "-" },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
          reset();
        },
        onError: (error: any) => {
          showErrorToast(
            error?.response?.data?.message || error.message || "حدث خطأ، حاول مرة أخرى"
          );
        },
      }
    );
  };

  return (
    <section id="contact-form" className="relative py-14 overflow-hidden mb-10" dir="rtl">
      <Image
        src="/assets/footer/back33.png"
        alt="Contact Background"
        fill
        className="object-cover z-0"
        quality={80}
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <AnimatedSection variant={contactUsHeaderVariant} className="text-center mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3">تواصل معنا</h2>
          <p className="text-white/70 text-body-base md:text-lg leading-relaxed">
            سجل بياناتك وخلي فريقنا يساعدك تختار العقار اللي يناسب احتياجك وميزانيتك
          </p>
        </AnimatedSection>

        <AnimatedSection
          variant={contactUsFormVariant}
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
                options={[...UNIT_TYPE_OPTIONS]}
              />
              <FormTextarea name="breif" placeholder="الوصف" />
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 text-white font-bold w-full bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 text-base"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    جاري الإرسال...
                  </span>
                ) : (
                  "إرسال الطلب"
                )}
              </Button>
            </form>
          </FormProvider>
        </AnimatedSection>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="تم الإرسال بنجاح"
        message="شكراً لتواصلك معنا، سيتم الرد عليك في أقرب وقت"
      />
    </section>
  );
};

export default ContactUsForm;
