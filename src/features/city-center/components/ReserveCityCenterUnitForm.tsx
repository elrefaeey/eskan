"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { FormInput } from "@/components/Projects/FormInput";
import { FormSelect } from "@/components/Projects/FormSelect";
import SuccessModal from "@/components/ui/SuccessModal";
import { useReserveCityCenterUnit } from "@/features/city-center/hooks/useReserveCityCenterUnit";
import { showErrorToast } from "@/lib/toast";
import {
  CITY_CENTER_CONTACT_TIME_OPTIONS,
  cityCenterReservationSchema,
  type CityCenterReservationFormValues,
} from "../schemas/reservationSchema";

interface ReserveCityCenterUnitFormProps {
  section: string;
  unitNum: number | string;
}

export function ReserveCityCenterUnitForm({ section, unitNum }: ReserveCityCenterUnitFormProps) {
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: reserveUnit, isPending } = useReserveCityCenterUnit();

  const methods = useForm<CityCenterReservationFormValues>({
    resolver: zodResolver(cityCenterReservationSchema),
    defaultValues: {
      name: "",
      phone: "",
      national_id: "",
      contact_time: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: CityCenterReservationFormValues) => {
    reserveUnit(
      {
        ...data,
        bazar_number: String(unitNum),
        section,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
          setShowSuccessModal(true);
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          showErrorToast(
            err?.response?.data?.message || err.message || "حدث خطأ أثناء الحجز",
          );
        },
      },
    );
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-linear-to-r cursor-pointer from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-base sm:text-lg text-white rounded-xl w-full py-2.5 sm:py-3 mt-4 block mx-auto transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02]">
          حجز الوحدة
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
            <FormInput
              name="name"
              label="الاسم الكامل"
              placeholder="أدخل اسمك الكامل"
            />

            <FormInput
              name="phone"
              label="رقم الهاتف"
              placeholder="01XXXXXXXXX"
              type="tel"
            />

            <FormInput
              name="national_id"
              label="الرقم القومي"
              placeholder="XXXXXXXXXXXXXX"
              type="tel"
            />

            <FormSelect
              name="contact_time"
              label="وقت التواصل المفضل"
              placeholder="اختر الوقت المناسب"
              options={[...CITY_CENTER_CONTACT_TIME_OPTIONS]}
            />

            <div className="pt-2 mt-4 border-t">
              <ActionButton
                onClick={handleSubmit(onSubmit)}
                variant="primary"
                disabled={isPending}
                className="w-full px-0 text-base rounded-xl disabled:opacity-50 py-1! disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2 text-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
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

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="تم الحجز بنجاح"
        message="شكراً لك، سيتم التواصل معك في أقرب وقت لتأكيد الحجز"
      />
    </Dialog>
  );
}
