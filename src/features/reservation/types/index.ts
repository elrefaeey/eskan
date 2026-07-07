export interface CreateReservationData {
  name: string;
  phone: string;
  job: string;
  contact_time: string;
  project_id: number;
  unit_id: number;
}

export interface CreateReservationResponse {
  success: boolean;
  message: string;
  data?: any;
}
