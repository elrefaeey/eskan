import z from "zod";
import { UNIT_TYPE_VALUES } from "../constants";

export const contactUsSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9\s\+]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  unit_type: z.enum(UNIT_TYPE_VALUES, { message: "يرجى اختيار نوع المشروع" }),
  breif: z.string().min(2, "الوصف مطلوب"),
});

export type ContactUsFormValues = z.infer<typeof contactUsSchema>;
