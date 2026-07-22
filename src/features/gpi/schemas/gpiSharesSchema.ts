import z from "zod";

export const gpiSharesSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9\s+]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  value: z
    .string()
    .min(1, "مبلغ الاستثمار مطلوب")
    .regex(/^[0-9,.\s]+$/, "أدخل مبلغاً صحيحاً"),
});

export type GpiSharesFormValues = z.infer<typeof gpiSharesSchema>;
