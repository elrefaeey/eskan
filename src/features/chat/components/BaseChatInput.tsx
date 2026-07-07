import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { BaseChatField } from "./BaseChatField";

type BaseChatInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
};

export const BaseChatInput = forwardRef<HTMLInputElement, BaseChatInputProps>(
  (
    {
      hasError = false,
      className = "",
      inputClassName = "",
      label,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseChatField
        hasError={hasError}
        className={className}
        label={label}
        labelClassName={labelClassName}
      >
        <input
          ref={ref}
          {...props}
          className={`w-full bg-transparent outline-none placeholder:text-gray-400 ${inputClassName}`}
        />
      </BaseChatField>
    );
  },
);

BaseChatInput.displayName = "BaseChatInput";
