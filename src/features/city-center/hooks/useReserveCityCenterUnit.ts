import { useMutation } from "@tanstack/react-query";
import {
  reserveCityCenterUnit,
  type ReserveCityCenterUnitData,
} from "@/services/city-center-reservation";
import toast from "react-hot-toast";

export const useReserveCityCenterUnit = () => {
  return useMutation({
    mutationFn: (data: ReserveCityCenterUnitData) =>
      reserveCityCenterUnit(data),

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء الحجز. حاول مرة أخرى";
      toast.error(errorMessage);
    },
  });
};
