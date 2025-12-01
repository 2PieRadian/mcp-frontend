import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

type ExpertCardProps = {
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  specialization: string;
  tags: string;
  languages: string;
  nextSlot: string;
  price: number;
};

export default function ExpertCard({
  name,
  image,
  rating,
  ratingCount,
  specialization,
  tags,
  languages,
  nextSlot,
  price,
}: ExpertCardProps) {
  const { t } = useTranslation("common");
  return (
    <div className="Expert-Card border flex flex-col justify-between border-[#B5B5B5] transform hover:scale-[1.011] duration-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all p-[15px] min-[800px]:p-[15px] relative rounded-[15px] w-full">
      <div className="flex items-start justify-between gap-[16px] min-[800px]:gap-[20px]">
        <div className="Profile-Image flex flex-col flex-1">
          <img src={image} alt={`${name} Image`} className="self-start" />

          <div className="w-full border border-[#44666C] hover:bg-[#44666C] hover:text-white transition-colors duration-200 text-[#44666C] text-center cursor-pointer text-xs sm:text-sm font-medium rounded-[20px] py-[4px] mt-[8px]">
            {t("viewProfile")}
          </div>
        </div>

        <div className="Profile-Details flex flex-col flex-2">
          <div className="Name-Container flex items-center justify-between">
            <h1 className="Name text-[16px] min-[800px]:text-[18px] font-medium">
              {name}
            </h1>

            <div className="Rating-Container flex items-center gap-[5px]">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="Rating-Value text-yellow-400">{rating}</span>
              <span className="Rating-Count text-gray-500 text-[11px] min-[800px]:text-xs">
                ({ratingCount})
              </span>
            </div>
          </div>

          <div className="Specialization-Container text-[#8F9EA0] text-[11px] min-[800px]:text-sm">
            {specialization}
          </div>

          <div className="Tags-Container text-[#516A6E] text-xs min-[800px]:text-sm mt-[8px]">
            {tags}
          </div>

          <div className="Languages-Container text-[#516A6E] mt-[8px] text-xs min-[800px]:text-sm">
            {languages}
          </div>

          <div className="Next-Available-Slot mt-[8px] text-xs min-[800px]:text-sm">
            <span className="font-light text-[#8F9EA0]">
              {t("nextAvailableSlot")}
            </span>{" "}
            <span className="font-medium text-[#516A6E]">{nextSlot}</span>
          </div>

          <div className="Price-Container flex items-center gap-[8px] mt-[8px]">
            <p className="text-xl min-[800px]:text-[24px] font-medium">
              ₹ {price}
            </p>
            <p className="text-[11px] min-[800px]:text-sm text-gray-500">
              {t("for60MinConsultation")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[16px] bg-[#44666C] text-white text-center cursor-pointer text-sm min-[800px]:text-base font-medium rounded-[20px] py-[8px]">
        {t("bookASession")}
      </div>
    </div>
  );
}
