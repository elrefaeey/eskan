export interface ContactUsData {
  name: string;
  phone: string;
  unit_type: "سكنى" | "تجارى" | "إداري" | "طبي" | "اخر";
  job: string;
  breif: string;
}

export interface ContactUsResponse {
  success: boolean;
  message: string;
  data?: any;
}
