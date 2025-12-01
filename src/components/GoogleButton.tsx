import googleIcon from "../assets/google.svg";

type GoogleButtonProps = {
  text?: string;
  onClick?: () => void;
};

export default function GoogleButton({
  text = "Google",
  onClick,
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      className="w-full bg-white font-medium text-primary rounded-full px-[20px] py-[7px] mt-[10px] cursor-pointer text-[clamp(14px,2vw,16px)] border border-border-light flex items-center justify-center gap-[10px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
      onClick={onClick}
    >
      <img src={googleIcon} alt="Google" className="w-[27px]" />
      {text}
    </button>
  );
}
