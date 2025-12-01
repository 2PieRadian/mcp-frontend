import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "with-border";
};

export default function FormInput({
  variant = "default",
  className = "",
  ...props
}: FormInputProps) {
  const baseClasses =
    "rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full outline-none focus:ring-2 focus:ring-primary/30";

  const variantClasses =
    variant === "with-border" ? "border border-border-light" : "border";

  return (
    <input
      className={`${variantClasses} ${baseClasses} ${className}`}
      {...props}
    />
  );
}
