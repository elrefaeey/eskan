"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import type { ChatFormData, Message } from "../types";
import { PROJECT_TYPE_OPTIONS } from "../constants";
import { BaseChatInput } from "./BaseChatInput";
import { BaseChatPhoneInput } from "./BaseChatPhoneInput";
import { BaseChatTextarea } from "./BaseChatTextarea";
import { BaseChatSelect } from "./BaseChatSelect";
import { ChatFormField } from "./ChatFormField";

interface ChatFormProps {
  message: Message;
  chatId: string;
  onSubmit: (data: ChatFormData, message: Message) => void;
}

export const ChatForm = ({ message, chatId, onSubmit }: ChatFormProps) => {
  const methods = useForm<ChatFormData>();
  const { register, handleSubmit, control } = methods;

  const handleFormSubmit = (data: ChatFormData) => {
    onSubmit(data, message);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white rounded-xl px-3.5 py-2.5 max-w-[85%] shadow-sm border border-gray-100 mb-3">
        <p className="text-start text-lg">{message.text}</p>
      </div>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-2.5 rounded-xl p-3.5 w-full max-w-[85%]
            bg-white border border-gray-100 shadow-sm"
          onSubmit={handleSubmit(handleFormSubmit)}
          style={{ direction: "rtl" }}
        >
          <ChatFormField name="name">
            {(hasError) => (
              <BaseChatInput
                type="text"
                placeholder="الاسم الثلاثي"
                label="الاسم الثلاثي"
                hasError={hasError}
                {...register("name", { required: true })}
              />
            )}
          </ChatFormField>

          <ChatFormField name="phone">
            {(hasError) => (
              <BaseChatPhoneInput hasError={hasError} label="رقم الهاتف" />
            )}
          </ChatFormField>

          {message.show_unavailable_preference_form && (
            <ChatFormField name="description">
              {(hasError) => (
                <BaseChatTextarea
                  placeholder="مواصفات الوحدة"
                  label="مواصفات الوحدة"
                  hasError={hasError}
                  className="min-h-20"
                  {...register("description", { required: true })}
                />
              )}
            </ChatFormField>
          )}

          {message.show_form && !message.show_unavailable_preference_form && (
            <ChatFormField
              name="type"
              errorClassName="text-xs text-red-500 -mt-1 block"
            >
              {(hasError) => (
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <BaseChatSelect
                      value={field.value?.[0]?.value || ""}
                      hasError={hasError}
                      label="نوع المشروع"
                      selectClassName="text-gray-900"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange([{ value, label: value }]);
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      name={field.name}
                    >
                      <option value="" className="text-gray-400">
                        نوع المشروع
                      </option>
                      {PROJECT_TYPE_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="py-2 text-gray-900 bg-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </BaseChatSelect>
                  )}
                />
              )}
            </ChatFormField>
          )}

          <button
            type="submit"
            className="bg-[#1F503B] hover:bg-[#164029] transition-colors
              text-white text-sm rounded-lg px-4 py-2 mt-1 font-medium shadow-sm"
          >
            إرسال
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
