type ErrorMessageProps = {
  message: string | null;
  className?: string;
};

export default function ErrorMessage({
  message,
  className = "",
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p className={`mt-[10px] text-[13px] text-red-600 ${className}`}>
      {message}
    </p>
  );
}
