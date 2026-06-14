"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workWithUsSchema, WorkWithUsSchema } from "@/schemas/workWithUsSchema";
import FormInput from "../ui/Form/FormInput";
import FormRadioGroup from "../ui/Form/FormRadioGroup";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

const WorkWithUsForm = () => {
  const methods = useForm<WorkWithUsSchema>({
    resolver: zodResolver(workWithUsSchema),
  });
  const { handleSubmit, reset } = methods;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: WorkWithUsSchema) => {
    console.log(data);
    setIsLoading(true);
    try {
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <FormProvider {...methods}>
      <motion.form
        ref={formRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="bg-[#EFEFEF] md:px-8 p-4 lg:px-16 lg:py-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="text-primary mt-4 mb-4 md:mb-8 text-center text-xl md:text-3xl lg:text-[1.9em] font-bold"
        >
          للانضمام معنا سجل بياناتك
        </motion.h2>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <FormInput
            name="name"
            label="الاسم"
            placeholder="أدخل اسمك الثلاثي"
          />
          <FormInput
            name="phone"
            label="رقم الموبايل"
            placeholder="أدخل رقم الهاتف"
          />
          <FormInput
            name="address"
            label="محل الاقامة"
            placeholder="أدخل مكان المشروع المقترح"
          />
          <FormInput name="job" label="المهنة" placeholder="أدخل المهنة" />

          <FormRadioGroup
            name="face_book_active"
            label="هل لديك حساب علي الفيس بوك؟"
            options={["نعم", "لا"]}
          />
          <FormRadioGroup
            name="work_background"
            label="هل عملت من قبل في مجال العقارات؟"
            options={["نعم", "لا"]}
          />
          <FormRadioGroup
            name="has_wide_netWork"
            label="هل تمتلك شبكة علاقات واسعة؟"
            options={["نعم", "لا"]}
          />
        </motion.div>

        <motion.button
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          type="submit"
          disabled={isLoading}
          className="bg-[#5fac23] cursor-pointer text-white rounded-xl hover:opacity-70 transition-all duration-300
           mt-8 lg:w-[720px] w-full mx-auto h-fit py-2 md:py-3 flex items-center justify-center"
        >
          {!isLoading ? "تسجيل" : "تحميل ..."}
        </motion.button>
      </motion.form>
    </FormProvider>
  );
};
export default WorkWithUsForm;