import { useTranslation } from "react-i18next";

type AuthImageProps = {
  altTextKey?: string;
  objectPosition?: string;
};

export default function AuthImage({ altTextKey = "login" }: AuthImageProps) {
  const { t } = useTranslation("common");

  return (
    <div className="[@media(max-width:959px)]:hidden [@media(min-width:960px)]:flex flex-[1.5] overflow-hidden animate-float-1 rounded-lg border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] items-center justify-center">
      <img
        src="./images/login_image.png"
        alt={t(altTextKey) + " Image"}
        className="rounded-lg w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />
    </div>
  );
}
