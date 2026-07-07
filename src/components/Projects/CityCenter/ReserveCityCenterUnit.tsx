"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { FormInput } from "../FormInput";
import { FormSelect } from "../FormSelect";
import { useReserveCityCenterUnit } from "@/features/city-center/hooks/useReserveCityCenterUnit";
import SuccessModal from "@/components/ui/SuccessModal";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "الأسم مطلوب")
    .regex(/^[a-zA-Zء-ي\s]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),

  phone: z
    .string()
    .min(5, "رقم التليفون مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),

  national_id: z
    .string()
    .min(10, "الرقم القومي مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي الرقم القومي على أرقام فقط"),

  contact_time: z.string().min(1, "وقت التواصل مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

const times = [
  { value: "من 10 صباحا الي 2 مساء", label: "من 10 صباحا الي 2 مساء" },
  { value: "من 2 ظهرا الي 7 مساء", label: "من 2 ظهرا الي 7 مساء" },
  { value: "من 7 مساء الي 10 مساء", label: "من 7 مساء الي 10 مساء" },
];

interface Props {
  section: string;
  unitNum: number | string;
}

const ReserveCityCenterUnitForm = ({ section, unitNum }: Props) => {
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: reserveUnit, isPending } = useReserveCityCenterUnit();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      national_id: "",
      contact_time: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: FormValues) => {
    reserveUnit(
      {
        ...data,
        bazar_number: String(unitNum),
        section: section,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
          setShowSuccessModal(true);
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-linear-to-r cursor-pointer
         from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
         text-base sm:text-base text-white rounded-lg w-full py-2 sm:py-2
          mt-4 block mx-auto transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            {section === "بازار" ? "احصل علي عرض مميز" : "حجز"}
          </button>
        </DialogTrigger>

        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white border-0 shadow-2xl rounded-2xl p-5 sm:p-6 gap-0">
          <DialogHeader className="pb-3 mb-3 border-b">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-primary">
              حجز وحدة
            </DialogTitle>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <FormInput name="name" label="الاسم" placeholder="أدخل اسمك" />

              <FormInput
                name="phone"
                label="رقم التليفون"
                type="tel"
                placeholder="01XXXXXXXXX"
              />

              <FormInput
                name="national_id"
                label="الرقم القومي"
                type="tel"
                placeholder="XXXXXXXXXXXXXX"
              />

              <FormSelect
                name="contact_time"
                label="وقت التواصل"
                placeholder="اختر وقت للتواصل"
                options={times}
              />

              <div className="pt-2 mt-4 border-t">
                <ActionButton
                  onClick={handleSubmit(onSubmit)}
                  variant="primary"
                  className="w-full px-0 text-base rounded-xl disabled:opacity-50  py-1!"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2 text-lg ">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span>جاري الإرسال...</span>
                    </span>
                  ) : (
                    <span className="text-lg">تأكيد الحجز</span>
                  )}
                </ActionButton>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم الحجز بنجاح!"
        message="شكراً لك! سنتواصل معك قريباً في الوقت المحدد"
      />
    </>
  );
};

export default ReserveCityCenterUnitForm;
