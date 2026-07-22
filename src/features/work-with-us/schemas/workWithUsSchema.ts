import { z } from "zod";
import { WORK_WITH_US_YES_NO_OPTIONS } from "../constants";

const yesNoEnum = z.enum(WORK_WITH_US_YES_NO_OPTIONS, {
  message: "هذا الحقل مطلوب",
});

export const workWithUsSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم مطلوب")
    .regex(/^[\u0600-\u06FF\sA-Za-z]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط"),
  address: z.string().min(2, "محل الإقامة مطلوب"),
  job: z.string().min(2, "المهنة مطلوبة"),
  face_book_active: yesNoEnum.optional().refine((val) => val !== undefined, {
    message: "هذا الحقل مطلوب",
  }),
  work_background: yesNoEnum.optional().refine((val) => val !== undefined, {
    message: "هذا الحقل مطلوب",
  }),
  has_wide_netWork: yesNoEnum.optional().refine((val) => val !== undefined, {
    message: "هذا الحقل مطلوب",
  }),
});

export type WorkWithUsFormValues = z.infer<typeof workWithUsSchema>;
