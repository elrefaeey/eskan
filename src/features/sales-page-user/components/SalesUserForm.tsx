"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MessageCircle } from "lucide-react";

import FormInput from "@/components/ui/Form/FormInput";
import FormSelect from "@/components/ui/Form/FormSelect";
import SuccessModal from "@/components/ui/SuccessModal";
import { Button } from "@/components/ui/button";
import { showErrorToast } from "@/lib/toast";

import { CONTACT_TIME_OPTIONS } from "../constants";
import {
  salesUserFormSchema,
  type SalesUserFormValues,
} from "../schemas/salesUserFormSchema";
import { useSubmitSalesClient } from "../hooks/useSubmitSalesClient";
import type { SalesUser } from "../types";

interface SalesUserFormProps {
  userId: string;
  projectId: string;
  user: SalesUser;
}

function SalesUserForm({ userId, projectId, user }: SalesUserFormProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const methods = useForm<SalesUserFormValues>({
    resolver: zodResolver(salesUserFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "اي وقت",
    },
  });

  const { mutate: submitClient, isPending } = useSubmitSalesClient();

  const onSubmit = (values: SalesUserFormValues) => {
    submitClient(
      {
        name: values.name,
        phone: values.phone,
        date: values.date || "اى وقت",
        user_id: userId,
        sellproject_id: projectId,
      },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
          setShowWhatsApp(true);
          methods.reset({ name: "", phone: "", date: "اي وقت" });
        },
        onError: (error: Error) => {
          showErrorToast(error.message || "حدث خطأ، حاول مرة أخرى");
        },
      },
    );
  };

  const whatsappPhone = user.phone?.replace(/\D/g, "") ?? "";

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary shadow-[0_24px_60px_-28px_rgba(31,80,59,0.55)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_45%)]"
        />

        <div className="relative p-5 sm:p-7 md:p-9">
          <div className="mb-6 max-w-2xl md:mb-8">
            <p className="mb-2 text-sm font-medium text-white/70">
              احجز استشارتك
            </p>
            <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
              سجل بياناتك وسيتم التواصل معك
            </h3>
            <p className="mt-2 text-sm text-white/75 md:text-base">
              لمعرفة المزيد من التفاصيل عن المشروع، اترك بياناتك واختر الوقت
              المناسب للتواصل.
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="rounded-2xl bg-white/95 p-4 backdrop-blur-sm sm:p-6 md:p-7"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <FormInput
                  name="name"
                  label="الاسم"
                  placeholder="أدخل إسمك الثلاثى"
                  required
                />
                <FormInput
                  name="phone"
                  label="رقم الهاتف"
                  placeholder="أدخل رقم الهاتف"
                  type="tel"
                  required
                />
                <div className="md:col-span-2">
                  <FormSelect
                    name="date"
                    label="الوقت المناسب للتواصل معك"
                    options={[...CONTACT_TIME_OPTIONS]}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="mt-6 h-12 w-full rounded-xl bg-primary text-base font-bold text-white transition-all duration-300 hover:bg-primary/90 md:h-14"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    جاري التسجيل...
                  </span>
                ) : (
                  "تسجيل"
                )}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      <AnimatePresence>
        {showWhatsApp && whatsappPhone && (
          <motion.a
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/+2${whatsappPhone}`}
            className="fixed bottom-20 end-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 md:bottom-24 md:end-8"
            aria-label="تواصل عبر واتساب"
          >
            <span className="relative flex size-10 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="size-5 fill-white text-white" />
              <span className="absolute -end-0.5 -top-0.5 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-white" />
              </span>
            </span>
            <span className="pe-1 text-sm font-bold">تواصل واتساب</span>
          </motion.a>
        )}
      </AnimatePresence>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم التسجيل بنجاح"
        message="سيتم التواصل معك قريباً"
      />
    </>
  );
}

export default SalesUserForm;
