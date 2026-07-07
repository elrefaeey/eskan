"use client";

import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FormInput from "@/components/ui/Form/FormInput";
import SubmitButton from "@/components/ui/Form/SubmitFormButton";
import SuccessModal from "@/components/ui/SuccessModal";

import UnitTypeSelector from "./UnitTypeSelector";
import InvestmentGoalSelector from "./InvestmentGoalSelector";
import RelatedUnitsGrid from "./RelatedUnitsGrid";

import { useRelatedUnits } from "../hooks/useRelatedUnits";
import { useSubmitLead } from "../hooks/useSubmitLead";
import type { UnitType } from "../types";
import {
  RESIDENTIAL_OPTIONS,
  COMMERCIAL_OPTIONS,
  MEDICAL_DURATION_OPTIONS,
  INVESTMENT_GOAL_OPTIONS,
  formatNumber,
  parseDownPaymentRange,
} from "../constants";
import FormNativeSelect from "./FormNativeSelect";

// ---------- Schema ----------
const formSchema = z.object({
  name: z
    .string()
    .min(1, "هذا الحقل مطلوب")
    .regex(/^[\u0600-\u06FF\sA-Za-z]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(1, "هذا الحقل مطلوب")
    .regex(/^[0-9٠-٩]+$/, "يجب أن يحتوي على أرقام فقط"),
  category: z.string().min(1, "هذا الحقل مطلوب"),
  investment_goal: z.string().optional(),
  residential_type: z.string().optional(),
  commercial_type: z.string().optional(),
  installment_period: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ---------- Helpers ----------
function buildResidentialOptions() {
  return Object.entries(RESIDENTIAL_OPTIONS).map(([key, opt]) => {
    const [min, max] = parseDownPaymentRange(opt.downPayment);
    return {
      value: key,
      label: `من ${formatNumber(min)} حتى ${formatNumber(max)}`,
    };
  });
}

function buildCommercialOptions() {
  return Object.entries(COMMERCIAL_OPTIONS).map(([key, opt]) => {
    const [min, max] = parseDownPaymentRange(opt.downPayment);
    return {
      value: key,
      label: `من ${formatNumber(min)} حتى ${formatNumber(max)}`,
    };
  });
}

// ---------- Component ----------
interface DataFormProps {
  salesId?: string;
}

function DataForm({ salesId }: DataFormProps) {
  // Local UI state for conditional rendering
  const [unitType, setUnitType] = useState<UnitType>("");
  const [residentialArea, setResidentialArea] = useState("");
  const [commercialArea, setCommercialArea] = useState("");
  const [medicalDuration, setMedicalDuration] = useState("");
  const [investmentGoal, setInvestmentGoal] = useState("");

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      category: "",
      investment_goal: "",
      residential_type: "",
      commercial_type: "",
      installment_period: "",
    },
  });

  const { handleSubmit, reset: resetForm } = methods;

  const {
    relatedUnits,
    selectedUnitId,
    isLoading: unitsLoading,
    handleSelectUnit,
    resetUnits,
  } = useRelatedUnits(
    unitType,
    residentialArea,
    commercialArea,
    medicalDuration,
  );

  const {
    isSubmitting,
    showSuccessModal,
    submitLead,
    handleCloseSuccessModal,
  } = useSubmitLead({ salesId, relatedUnits });

  // Handle unit type change — reset dependent fields
  const handleUnitTypeChange = useCallback(
    (type: UnitType) => {
      setUnitType(type);
      setResidentialArea("");
      setCommercialArea("");
      setMedicalDuration("");
      setInvestmentGoal("");
      resetUnits();
    },
    [resetUnits],
  );

  const onSubmit = async (data: FormValues) => {
    await submitLead({
      name: data.name,
      phone: data.phone,
      unitType,
      residentialArea,
      commercialArea,
      medicalDuration,
      investmentGoal,
      selectedUnitId,
    });

    // Reset everything on success
    resetForm();
    setUnitType("");
    setResidentialArea("");
    setCommercialArea("");
    setMedicalDuration("");
    setInvestmentGoal("");
    resetUnits();
  };

  const showInvestmentGoal = unitType === "تجاري" || unitType === "طبي";

  return (
    <FormProvider {...methods}>
      <form
        className=" py-4 lg:py-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-[#1F503B] mb-4 md:mb-8 text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          منصة اسكان المنصورة ترحب بك
        </h2>

        <div className="flex flex-col gap-10">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
            <FormInput
              name="name"
              label="الاسم"
              placeholder="أدخل اسمك الثلاثي"
              required
            />
            <FormInput
              name="phone"
              label="رقم الموبايل"
              placeholder="أدخل رقم الهاتف"
              required
            />

            {/* Unit type selector */}
            <UnitTypeSelector onTypeChange={handleUnitTypeChange} />
          </div>

          {/* ===== تجاري Section ===== */}
          {unitType === "تجاري" && (
            <>
              <InvestmentGoalSelector onGoalChange={setInvestmentGoal} />

              <FormNativeSelect
                name="commercial_type"
                label="اختار المقدم:"
                placeholder="اختر نطاق المقدم"
                options={buildCommercialOptions()}
                onChange={(val) => {
                  setCommercialArea(val);
                  handleSelectUnit(0); // reset selection
                }}
                required
              />

              {commercialArea && (
                <RelatedUnitsGrid
                  units={relatedUnits}
                  isLoading={unitsLoading}
                  selectedUnitId={selectedUnitId}
                  onSelect={handleSelectUnit}
                />
              )}
            </>
          )}

          {/* ===== استثمار Section ===== */}
          {unitType === "استثمار" && (
            <FormNativeSelect
              name="investment_goal"
              label="اختار نوع الاستثمار:"
              placeholder="اختر هدف الاستثمار"
              options={INVESTMENT_GOAL_OPTIONS}
              onChange={setInvestmentGoal}
              required
            />
          )}

          {/* ===== طبي Section ===== */}
          {unitType === "طبي" && (
            <>
              <InvestmentGoalSelector onGoalChange={setInvestmentGoal} />

              <FormNativeSelect
                name="installment_period"
                label="اختار مدة التقسيط:"
                placeholder="اختر مدة التقسيط"
                options={MEDICAL_DURATION_OPTIONS}
                onChange={(val) => {
                  setMedicalDuration(val);
                }}
                required
              />

              {medicalDuration === "تقسيط علي 6 سنين (استلام بعد سنتين)" && (
                <RelatedUnitsGrid
                  units={relatedUnits}
                  isLoading={unitsLoading}
                  selectedUnitId={selectedUnitId}
                  onSelect={handleSelectUnit}
                />
              )}
            </>
          )}

          {/* ===== سكني Section ===== */}
          {unitType === "سكني" && (
            <>
              <FormNativeSelect
                name="residential_type"
                label="اختار المقدم:"
                placeholder="اختر نطاق المقدم"
                options={buildResidentialOptions()}
                onChange={setResidentialArea}
                required
              />

              <RelatedUnitsGrid
                units={relatedUnits}
                isLoading={unitsLoading}
                selectedUnitId={selectedUnitId}
                onSelect={handleSelectUnit}
              />
            </>
          )}

          {/* Submit */}
          <SubmitButton
            isLoading={isSubmitting}
            label="تسجيل"
            className="lg:w-full py-2! h-fit font-bold"
          />
        </div>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="تم تسجيل بياناتك بنجاح"
        message="سيتم التواصل معك قريباً"
      />
    </FormProvider>
  );
}

export default DataForm;
