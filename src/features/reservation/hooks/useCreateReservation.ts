import { useMutation } from "@tanstack/react-query";
import { createReservation } from "@/services/reservation";
import { CreateReservationData } from "../types";

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: (data: CreateReservationData) => createReservation(data),
  });
};
