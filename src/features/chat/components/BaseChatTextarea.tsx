import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { BaseChatField } from "./BaseChatField";

type BaseChatTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  textareaClassName?: string;
  label?: string;
  labelClassName?: string;
};

export const BaseChatTextarea = forwardRef<
  HTMLTextAreaElement,
  BaseChatTextareaProps
>(
  (
    {
      hasError = false,
      className = "",
      textareaClassName = "",
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
        <textarea
          ref={ref}
          {...props}
          className={`w-full bg-transparent outline-none placeholder:text-gray-400 resize-none ${textareaClassName}`}
        />
      </BaseChatField>
    );
  },
);

BaseChatTextarea.displayName = "BaseChatTextarea";
