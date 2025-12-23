import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function ContactCard() {
  const { user } = useAuth();
  const { t } = useTranslation("profile");

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.contact")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {t("labels.email")}
          </p>
          <p className="font-medium break-all text-[16px] sm:text-[17px]">
            {user?.email}
          </p>
        </div>
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {t("labels.phone")}
          </p>
          <p className="font-medium text-[16px] sm:text-[17px]">
            {user?.phoneNumber || t("values.notAdded")}
          </p>
        </div>
      </div>
    </div>
  );
}
