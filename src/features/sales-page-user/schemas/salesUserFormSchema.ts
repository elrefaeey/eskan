import { z } from "zod";

export const salesUserFormSchema = z.object({
  name: z
    .string()
    .min(1, "الاسم مطلوب")
    .regex(/^[\u0600-\u06FF\sA-Za-z]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(5, "تاكد من الهاتف والاسم")
    .regex(/^[0-9٠-٩+]+$/, "يجب أن يحتوي على أرقام فقط"),
  date: z.string().min(1, "اختر وقت التواصل"),
});

export type SalesUserFormValues = z.infer<typeof salesUserFormSchema>;
