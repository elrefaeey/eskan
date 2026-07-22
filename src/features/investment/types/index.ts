export type InvestmentFormData = {
  goal: string;
  budget: string;
  payment: string;
};

export type StepOption = {
  value: string;
  label: string;
  description?: string;
};

export type InvestmentStep = {
  id: number;
  title: string;
  field: keyof InvestmentFormData;
  options: StepOption[];
};
