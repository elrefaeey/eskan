"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { FormInput } from "../ui/ReusableComponents/FormInput";
import { FormTextarea } from "../ui/ReusableComponents/FormTextarea";
import { FormSelect } from "../ui/ReusableComponents/FormSelect";
import Image from "next/image";
import { motion } from "framer-motion";

const formSchema = z.object({
  type: z.string().min(1, " نوع العقار مطلوب"),
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(5, "رقم الهاتف مطلوب"),
  brief: z.string().min(2, "الوصف مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      name: "",
      phone: "",
      brief: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = () => {
    reset();
  };

  return (
    <section
      id="contact-form"
      className="relative py-10 sm:py-14 mb-12 overflow-hidden"
    >
      <Image
        src={"/assets/home/contactImage.jpg"}
        alt={"Contact Image"}
        fill
        className="z-[-1] object-cover"
        priority={false}
        quality={40}
        sizes="100vw"
      />
      <div className="absolute w-full top-0 left-0 h-full bg-[#22342CB2] z-1" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold"
        >
          تواصل معنا{" "}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-center md:mt-4 text-lg sm:text-xl
           lg:text-[28px] font-medium leading-relaxed max-w-[1100px] mx-auto px-2"
        >
          سجل بياناتك دلوقتي وخلي فريقنا يساعدك تختار العقار اللي يناسب احتياجك
          وميزانيتك.  هنقدملك استشارة مجانية ونرشحلك أفضل الخيارات المتاحة حسب
          رغبتك{" "}
        </motion.p>

        <FormProvider {...methods}>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-[1100px] mx-auto gap-4 sm:gap-6 p-4 sm:p-6
             mt-4 md:mt-10  rounded-2xl flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-x-14 sm:gap-y-7">
              <FormInput name="name" placeholder="الاسم" />
              <FormSelect
                name="type"
                placeholder="اختر نوع المشروع"
                options={[
                  { value: "customer", label: "سكنى" },
                  { value: "contractor", label: "تجارى" },
                  { value: "A", label: "إداري" },
                  { value: "B", label: "طبي" },
                  { value: "C", label: "اخر" },
                ]}
              />
              <FormInput name="phone" placeholder="رقم الهاتف" />
              <FormTextarea name="brief" placeholder="الوصف" />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-14 text-white font-semibold w-full lg:w-[900px]

               cursor-pointer bg-[#1F503B]  mx-auto hover:bg-[#21845b]
                rounded-xl transition-all duration-300 text-lg sm:text-2xl"
            >
              {isSubmitting ? "جاري الإرسال..." : "تسجيل"}
            </Button>
          </motion.form>
        </FormProvider>
      </div>
    </section>
  );
}
