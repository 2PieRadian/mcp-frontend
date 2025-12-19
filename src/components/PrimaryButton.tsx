import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
};

export default function PrimaryButton({
  children,
  isLoading = false,
  loadingText = "Loading",
  disabled,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full bg-primary font-medium text-light-100 rounded-[7px] px-[20px] py-[10px] mt-[30px] cursor-pointer text-[clamp(14px,2vw,16px)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] disabled:hover:translate-y-0 disabled:hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
