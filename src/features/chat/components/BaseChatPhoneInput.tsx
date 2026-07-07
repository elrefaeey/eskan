"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { type CountryData } from "react-phone-input-2";
import arLocalization from "react-phone-input-2/lang/ar.json";
import * as libphonenumber from "google-libphonenumber";
import type { ChatFormData } from "../types";
import { BaseChatField } from "./BaseChatField";

interface BaseChatPhoneInputProps {
  hasError?: boolean;
  className?: string;
  inputClassName?: string;
  defaultCountry?: string;
  label?: string;
  labelClassName?: string;
}

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const isCountryData = (value: CountryData | {}): value is CountryData => {
  return Boolean(
    value &&
    typeof value === "object" &&
    "countryCode" in value &&
    "dialCode" in value,
  );
};

const normalizeRegionCode = (countryCode?: string) =>
  countryCode ? countryCode.toUpperCase() : undefined;

const validatePhoneNumber = (
  value: string,
  countryCode?: string,
  countryDialCode?: string,
  defaultCountry?: string,
) => {
  if (!value?.trim()) {
    return true;
  }

  const normalizedRegion = normalizeRegionCode(countryCode ?? defaultCountry);
  const normalizedValue = value.startsWith("+") ? value : `+${value}`;

  try {
    const parsedNumber = normalizedRegion
      ? phoneUtil.parseAndKeepRawInput(normalizedValue, normalizedRegion)
      : phoneUtil.parseAndKeepRawInput(normalizedValue);

    const parsedRegion = phoneUtil.getRegionCodeForNumber(parsedNumber);

    if (normalizedRegion && parsedRegion !== normalizedRegion) {
      return "رقم الهاتف لا يطابق الدولة المختارة";
    }

    if (
      normalizedRegion &&
      !phoneUtil.isValidNumberForRegion(parsedNumber, normalizedRegion)
    ) {
      return "رقم الهاتف لا يطابق الدولة المختارة";
    }

    if (countryDialCode) {
      const parsedCountryCode = String(parsedNumber.getCountryCode());

      if (parsedCountryCode !== countryDialCode) {
        return "رقم الهاتف لا يطابق الدولة المختارة";
      }
    }

    if (!phoneUtil.isValidNumber(parsedNumber)) {
      return "رقم الهاتف غير صحيح";
    }

    return true;
  } catch {
    return "رقم الهاتف غير صحيح";
  }
};

export const BaseChatPhoneInput = ({
  hasError = false,
  className = "",
  inputClassName = "",
  defaultCountry = "eg",
  label = "رقم الهاتف",
  labelClassName = "text-sm font-medium text-gray-700",
}: BaseChatPhoneInputProps) => {
  const { control } = useFormContext<ChatFormData>();
  const [selectedCountryData, setSelectedCountryData] = useState<CountryData>();

  return (
    <Controller<ChatFormData, "phone">
      name="phone"
      control={control}
      rules={{
        required: "رقم الهاتف مطلوب",
        validate: (value) =>
          validatePhoneNumber(
            value,
            selectedCountryData?.countryCode,
            selectedCountryData?.dialCode,
            defaultCountry,
          ),
      }}
      render={({ field }) => (
        <BaseChatField
          hasError={hasError}
          className={`p-0!  ${className}`}
          label={label}
          labelClassName={labelClassName}
        >
          <div dir="ltr" className="w-full relative">
            <PhoneInput
              country={defaultCountry}
              value={field.value}
              onChange={(value, data) => {
                field.onChange(value);

                if (isCountryData(data)) {
                  setSelectedCountryData(data);
                }
              }}
              onBlur={field.onBlur}
              onMount={(_, data) => {
                if (isCountryData(data)) {
                  setSelectedCountryData(data);
                }
              }}
              enableSearch
              disableCountryGuess
              countryCodeEditable={false}
              autoFormat
              localization={arLocalization}
              searchPlaceholder="ابحث عن الدولة"
              searchNotFound="لا توجد دول مطابقة"
              placeholder="رقم الهاتف"
              containerClass="!w-full !relative"
              inputClass={`!w-full min-h-[42px] bg-transparent outline-none text-sm sm:text-base placeholder:text-gray-400 ${inputClassName}`}
              buttonClass="!border-0 !absolute !left-0  !bg-transparent !px-2 sm:!px-3 !min-h-[42px]"
              dropdownClass="!left-0 top-[100%] !w-[200px] !absolute !rounded-lg !border !border-gray-200 !shadow-2xl !overflow-y-auto !bg-white !z-50"
              searchClass="!w-full !rounded-lg !border !border-gray-200 !bg-gray-50 !px-3 !py-2 !text-sm sm:!text-base"
              inputProps={{
                name: field.name,
                autoComplete: "tel",
                dir: "ltr",
              }}
            />
          </div>
        </BaseChatField>
      )}
    />
  );
};
