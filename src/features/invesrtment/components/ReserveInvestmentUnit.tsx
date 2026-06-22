"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { FormInput } from "@/components/Projects/FormInput";
import { InvestmentUnit } from "@/services/investment";
import SuccessModal from "@/components/ui/SuccessModal";
import { useReserveInvestmentUnit } from "../hooks/useReserveInvestmentUnit";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم مطلوب")
    .regex(/^[a-zA-Zء-ي\s]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),
  shares_num: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: "عدد الحصص مطلوب" })
      .min(1, "عدد الحصص يجب أن يكون على الأقل 1"),
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface ReserveInvestmentUnitProps {
  unitData: InvestmentUnit;
  txt?: string;
  withShareNum: boolean;
  externalShareNum?: number;
}

const ReserveInvestmentUnit = ({
  unitData,
  txt = "إحجز الان !",
  withShareNum,
  externalShareNum,
}: ReserveInvestmentUnitProps) => {
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      phone: "",
      shares_num: externalShareNum || 1,
    },
  });

  const { handleSubmit, reset } = methods;
  const { mutate: reserveUnit, isPending } = useReserveInvestmentUnit();

  const availableShares = unitData.shares_num - unitData.contracted_shares;

  const onSubmit = async (data: FormValues) => {
    const finalShareNum = externalShareNum || data.shares_num;

    if (finalShareNum > availableShares) {
      alert(`عدد الحصص المتاح هو ${availableShares}`);
      return;
    }

    reserveUnit(
      { ...data, shares_num: finalShareNum, investment_unit_id: unitData.id },
      {
        onSuccess: () => {
          setOpen(false);
          setShowSuccessModal(true);
          reset();
        },
        onError: (error) => {
          alert(error.message || "حدث خطأ، حاول مرة أخرى");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-primary cursor-pointer  text-white text-base sm:text-lg rounded-lg w-full py-[8px]  block mx-auto font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
          {txt}
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-2xl p-5 sm:p-6 shadow-2xl">
        <DialogHeader className="pb-3 mb-1 border-b">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-primary">
            حجز حصص استثمارية
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-xl text-center">
          لحجز الحصص الاستثمارية برجاء تسجيل بياناتك
        </DialogDescription>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

            {withShareNum && (
              <FormInput
                name="shares_num"
                label={`عدد الحصص (المتاح ${availableShares})`}
                placeholder="ادخل عدد الحصص"
                type="number"
                min={1}
                max={availableShares}
              />
            )}

            {!withShareNum && externalShareNum && (
              <div className="text-center py-2 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold">
                  عدد الحصص المختار:{" "}
                </span>
                <span className="text-2xl font-bold text-primary">
                  {externalShareNum}
                </span>
              </div>
            )}

            <div className="pt-2 mt-4 border-t">
              <ActionButton
                type="submit"
                variant="primary"
                className="w-full px-0
                 !text-lg rounded-xl h-fit !py-1  
                 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2 !text-base ">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    جاري الإرسال...
                  </span>
                ) : (
                  "تأكيد الحجز"
                )}
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </DialogContent>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم الحجز بنجاح"
        message="تمت عملية التسجيل والحجز بنجاح برجاء التوجه إلى مقر الشركة لاستكمال عملية التعاقد"
      />
    </Dialog>
  );
};

export default ReserveInvestmentUnit;
