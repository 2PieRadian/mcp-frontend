import { useTranslation } from "react-i18next";

type AuthImageProps = {
  altTextKey?: string;
  objectPosition?: string;
};

export default function AuthImage({
  altTextKey = "login",
  objectPosition = "0% 50%",
}: AuthImageProps) {
  const { t } = useTranslation("common");

  return (
    <div className="hidden [@media(min-width:960px)]:block flex-1 overflow-hidden h-[600px] animate-float-1 shadow-[0_20px_40px_rgba(0,0,0,0.35)] rounded-lg">
      <img
        src="./images/login_image.png"
        alt={t(altTextKey) + " Image"}
        className="border rounded-lg w-full h-full object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
