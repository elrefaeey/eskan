import { Api } from "./api";
import {
  CreateReservationData,
  CreateReservationResponse,
} from "@/features/reservation/types";

export const createReservation = async (data: CreateReservationData) => {
  const response = await Api.post<CreateReservationResponse>(
    "/reservation",
    data
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء الحجز");
  }

  return response.data;
};
