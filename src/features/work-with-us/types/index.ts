export interface WorkWithUsData {
  name: string;
  phone: string;
  address: string;
  job: string;
  face_book_active?: "نعم" | "لا";
  work_background?: "نعم" | "لا";
  has_wide_netWork?: "نعم" | "لا";
}

export interface WorkWithUsResponse {
  success: boolean;
  message: string;
  data?: any;
}
