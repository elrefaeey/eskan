import z from "zod";

export const jobFormSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب ويجب أن يكون أكثر من 3 حروف"),
  phone: z
    .string()
    .min(8, "رقم الهاتف غير صالح")
    .max(15, "رقم الهاتف غير صالح"),

  facebookLink: z.string().url("لينك فيسبوك غير صالح").optional(),
  project_info: z.string().optional(),

  cv: z
    .any()
    .refine((file) => file instanceof File, "يرجى رفع ملف الـ CV")
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(
          file?.type
        ),
      "صيغة الملف يجب أن تكون PDF أو JPG أو PNG"
    ),

  last_project: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        (Array.isArray(files) &&
          (files as File[]).every((f: File) => f instanceof File)),
      "اختر ملفات صحيحة"
    )
    .refine(
      (files) =>
        !files ||
        (files as File[]).every((file: File) =>
          ["image/jpeg", "image/png"].includes(file.type)
        ),
      "الصيغ المسموحة لآخر 3 تصاميم هي JPG و PNG فقط"
    ),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
