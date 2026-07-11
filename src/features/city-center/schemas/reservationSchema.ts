import z from "zod";

export const cityCenterReservationSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم مطلوب")
    .regex(/^[a-zA-Zء-ي\s]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(5, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),
  national_id: z
    .string()
    .min(10, "الرقم القومي مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي الرقم القومي على أرقام فقط"),
  contact_time: z.string().min(1, "وقت التواصل مطلوب"),
});

export type CityCenterReservationFormValues = z.infer<typeof cityCenterReservationSchema>;

export const CITY_CENTER_CONTACT_TIME_OPTIONS = [
  { value: "من 10 صباحا الي 2 مساء", label: "من 10 صباحا الي 2 مساء" },
  { value: "من 2 ظهرا الي 7 مساء", label: "من 2 ظهرا الي 7 مساء" },
  { value: "من 7 مساء الي 10 مساء", label: "من 7 مساء الي 10 مساء" },
] as const;
