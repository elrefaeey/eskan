export interface InvestmentFlowStep {
  step: string;
  title: string;
  desc: string;
}

export const HOW_IT_WORKS: InvestmentFlowStep[] = [
  { step: "1", title: "اختر هدفك", desc: "دخل شهري أو ربح من إعادة البيع" },
  { step: "2", title: "شوف المشروع المناسب", desc: "نحلّل اختيارك ونعرضلك أفضل فرصة" },
  { step: "3", title: "احجز حصتك", desc: "اختر الحصة وسجّل بياناتك — فريقنا يتواصل معاك" },
];

export const BOOKING_STEPS: InvestmentFlowStep[] = [
  { step: "1", title: "اختر الحصة", desc: "من الوحدات المتاحة" },
  { step: "2", title: "احجز الآن", desc: "سجّل بياناتك" },
  { step: "3", title: "تواصل معاك", desc: "خلال 24 ساعة" },
];
