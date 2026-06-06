import { reserveInvestmentUnit } from "@/services/investment";
import { useMutation } from "@tanstack/react-query";

interface ReserveInvestmentUnitData {
  name: string;
  phone: string;
  shares_num: number;
  investment_unit_id: number;
}

export const useReserveInvestmentUnit = () => {
  return useMutation({
    mutationFn: async (data: ReserveInvestmentUnitData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("shares_num", data.shares_num.toString());
      formData.append("InvestmentUnit_id", data.investment_unit_id.toString());

      return reserveInvestmentUnit(formData);
    },
  });
};
