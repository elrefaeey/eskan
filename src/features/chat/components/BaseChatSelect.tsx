import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { BaseChatField } from "./BaseChatField";

type BaseChatSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  selectClassName?: string;
  label?: string;
  labelClassName?: string;
};

export const BaseChatSelect = forwardRef<
  HTMLSelectElement,
  BaseChatSelectProps
>(
  (
    {
      hasError = false,
      className = "",
      selectClassName = "",
      label,
      labelClassName,
      children,
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
        <select
          ref={ref}
          {...props}
          className={`w-full bg-transparent outline-none cursor-pointer appearance-none ${selectClassName}`}
        >
          {children}
        </select>
      </BaseChatField>
    );
  },
);

BaseChatSelect.displayName = "BaseChatSelect";
