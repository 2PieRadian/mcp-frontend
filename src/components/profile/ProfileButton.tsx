import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ProfileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function ProfileButton({
  variant = "secondary",
  children,
  className = "",
  ...props
}: ProfileButtonProps) {
  const baseClasses =
    "cursor-pointer font-medium rounded-[10px] px-[10px] sm:px-[12px] py-[6px] sm:py-[4px] transition-all duration-200 hover:-translate-y-1";

  const variantClasses = {
    primary:
      "bg-primary text-light-100 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] disabled:hover:translate-y-0 disabled:hover:shadow-none",
    secondary:
      "border border-gray-300 text-light-text hover:bg-hover-bg shadow-[0_2px_4px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ fontSize: "14px" }}
      {...props}
    >
      {children}
    </button>
  );
}
