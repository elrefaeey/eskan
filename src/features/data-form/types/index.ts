export interface RelatedUnitProject {
  name?: string;
  location?: string;
}

export interface RelatedUnitImages {
  unit_img?: string;
  block_img?: string;
}

export interface RelatedUnit {
  id: number;
  name?: string;
  unit_type?: string;
  img?: string;
  levelimg?: string;
  images?: RelatedUnitImages | string;
  meter_price?: string | number;
  space?: string | number;
  installment?: string | number;
  advance?: string | number;
  duration?: string | null;
  contract?: boolean | number;
  appear?: number;
  project?: RelatedUnitProject;
  level_id?: { name?: string } | string | null;
}

export interface AreaOption {
  downPayment: string;
  downPaymentText?: string;
  installment?: string;
  installmentText?: string;
  label?: string;
}

export type UnitType = "سكني" | "تجاري" | "طبي" | "استثمار" | "";

export interface DataFormValues {
  name: string;
  phone: string;
  category: UnitType;
  investment_goal?: string;
  residential_type?: string;
  commercial_type?: string;
  installment_period?: string;
}

export interface InvestmentLeadPayload {
  name: string;
  phone: string;
  category: string;
  responsible: string;
  down_payment?: string;
  unit_id?: number;
  bazar_id?: number;
  investment_goal?: string;
  installment_period?: string;
}
