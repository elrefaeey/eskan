import axios from "axios";

export interface ReserveCityCenterUnitData {
  name: string;
  phone: string;
  national_id: string;
  contact_time: string;
  bazar_number: string;
  section: string;
}

export const reserveCityCenterUnit = async (
  data: ReserveCityCenterUnitData
): Promise<void> => {
  await axios.post("/api/bazar_customer", data);
};
