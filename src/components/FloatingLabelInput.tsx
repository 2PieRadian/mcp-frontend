import { useState } from "react";
import type { InputHTMLAttributes } from "react";

type FloatingLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  variant?: "default" | "with-border";
};

export default function FloatingLabelInput({
  label,
  variant = "default",
  value,
  className = "",
  onFocus,
  onBlur,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && String(value).length > 0;
  const isFloating = isFocused || hasValue;

  const baseClasses =
    "rounded-full px-[clamp(15px,3vw,20px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-transparent w-full outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200";

  const variantClasses =
    variant === "with-border" ? "border border-border-light" : "border";

  const labelClasses = `absolute left-[clamp(15px,3vw,20px)] pointer-events-none transition-all duration-200 ${
    isFloating
      ? "top-[-8px] text-[11px] text-primary bg-input-bg px-[6px]"
      : "top-[50%] translate-y-[-50%] text-[clamp(14px,2vw,16px)] text-input-placeholder"
  }`;

  return (
    <div className="relative w-full">
      <input
        className={`${variantClasses} ${baseClasses} ${className} ${
          isFloating ? "py-[10px]" : "py-[clamp(10px,2vw,12px)]"
        }`}
        style={{
          lineHeight: "normal",
        }}
        value={value}
        placeholder={label}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />
      <label className={labelClasses}>{label}</label>
    </div>
  );
}
