// lib/validation/workWithUsSchema.ts
import * as z from "zod";

export const workWithUsSchema = z.object({
  name: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .regex(/^[\u0600-\u06FF\sA-Za-z]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .nonempty("هذا الحقل مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط"),
  address: z.string().nonempty("هذا الحقل مطلوب"),
  job: z.string().nonempty("هذا الحقل مطلوب"),
  face_book_active: z.enum(["نعم", "لا"], "هذا الحقل مطلوب"),
  work_background: z.enum(["نعم", "لا"], "هذا الحقل مطلوب"),
  has_wide_netWork: z.enum(["نعم", "لا"], "هذا الحقل مطلوب"),
});

export type WorkWithUsSchema = z.infer<typeof workWithUsSchema>;
