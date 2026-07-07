"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { InvestmentSectionHeading } from "@/features/invesrtment/components/InvestmentSectionHeading";
import { AnimateInView } from "@/components/common/animations";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/ReusableComponents/FormInput";
import SuccessModal from "@/components/ui/SuccessModal";
import { useContactUs } from "@/features/contact-us/hooks/useContactUs";
import { showErrorToast } from "@/lib/toast";

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9\s+]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  investment_amount: z
    .string()
    .min(1, "مبلغ الاستثمار مطلوب")
    .regex(/^[0-9,.\s]+$/, "أدخل مبلغاً صحيحاً"),
});

type FormValues = z.infer<typeof formSchema>;

export function GpiSharesSection() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", investment_amount: "" },
  });

  const { handleSubmit, reset } = methods;
  const { mutate: submitForm, isPending } = useContactUs();

  const onSubmit = (data: FormValues) => {
    submitForm(
      {
        name: data.name,
        phone: data.phone,
        unit_type: "اخر",
        job: "-",
        breif: `معهد إعداد الخريجين (GPI) — مبلغ المراد استثماره: ${data.investment_amount} جنيه`,
      },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
          reset();
        },
        onError: (error: any) => {
          showErrorToast(
            error?.response?.data?.message || error.message || "حدث خطأ، حاول مرة أخرى",
          );
        },
      },
    );
  };

  return (
    <section id="investment-shares" className="mb-10 scroll-mt-24" dir="rtl">
      <AnimateInView>
        <InvestmentSectionHeading
          title="الوحدات المتاحة"
          level="section"
          centered
          className="mb-6 sm:mb-8"
          titleClassName="text-2xl sm:text-3xl"
        />

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-8 text-center md:px-10 md:py-10 mb-6">
            <p className="text-primary text-lg md:text-xl font-extrabold leading-relaxed">
              سيتم الإعلان عن الوحدات المتاحة قريبًا.
            </p>
            <p className="text-[#555] text-body-base md:text-lg leading-relaxed mt-3">
              سجّل بياناتك الآن، وسيقوم فريقنا بالتواصل معك.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormInput name="name" placeholder="الاسم" />
                <FormInput name="phone" placeholder="رقم الهاتف" type="tel" />
                <FormInput
                  name="investment_amount"
                  placeholder="مبلغ المراد استثماره"
                  type="text"
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-12 text-white font-bold w-full bg-primary hover:bg-primary/90 rounded-xl transition-all duration-300 text-base"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      جاري الإرسال...
                    </span>
                  ) : (
                    "إرسال الطلب"
                  )}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </AnimateInView>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم الإرسال بنجاح"
        message="شكراً لتسجيل بياناتك، سنتواصل معك قريباً"
      />
    </section>
  );
}
