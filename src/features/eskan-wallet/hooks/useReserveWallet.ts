import { useMutation } from "@tanstack/react-query";
import { reserveWalletUnit } from "@/services/eskan-wallet";

interface ReserveData {
  name: string;
  phone: string;
  shares_num: number;
  walletunit_id: number;
}

export const useReserveWallet = () => {
  return useMutation({
    mutationFn: async (data: ReserveData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("shares_num", data.shares_num.toString());
      formData.append("walletunit_id", data.walletunit_id.toString());

      return await reserveWalletUnit(formData);
    },
  });
};
