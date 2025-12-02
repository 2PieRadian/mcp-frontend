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
  type,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hasValue = value && String(value).length > 0;
  const isFloating = isFocused || hasValue;
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseClasses =
    "rounded-full px-[clamp(15px,3vw,20px)] text-[clamp(14px,2vw,16px)] bg-white placeholder:text-transparent w-full outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200";

  const variantClasses =
    variant === "with-border" ? "border border-border-light" : "border";

  const labelClasses = `absolute left-[clamp(15px,3vw,20px)] pointer-events-none transition-all duration-200 ${
    isFloating
      ? "top-[8px] text-[11px] text-primary px-[4px]"
      : "top-[50%] translate-y-[-50%] text-[clamp(14px,2vw,16px)] text-input-placeholder"
  }`;

  const paddingRight = isPassword ? "pr-[45px]" : "";

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        className={`${variantClasses} ${baseClasses} ${className} ${paddingRight} ${
          isFloating ? "pt-[24px] pb-[10px]" : "py-[clamp(10px,2vw,12px)]"
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
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-[clamp(15px,3vw,20px)] top-[50%] translate-y-[-50%] text-input-placeholder hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full p-1 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 01-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
