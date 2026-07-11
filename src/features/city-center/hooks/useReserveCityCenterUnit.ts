import { useMutation } from "@tanstack/react-query";
import {
  reserveCityCenterUnit,
  type ReserveCityCenterUnitData,
} from "@/services/city-center-reservation";

export const useReserveCityCenterUnit = () => {
  return useMutation({
    mutationFn: (data: ReserveCityCenterUnitData) => reserveCityCenterUnit(data),
  });
};
