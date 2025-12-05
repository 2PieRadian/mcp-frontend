import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { REVIEWS } from "../lib/constants/landingPage";

function ReviewCard({
  name,
  review,
  rating,
}: {
  name: string;
  review: string;
  rating: number;
}) {
  return (
    <div className="flex justify-between flex-col border border-[#B5B5B5] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:scale-[0.99] trasition-scale-transform transition-shadow p-[25px] relative rounded-[15px] mt-[40px] w-full md:max-w-[calc(50%-10px)] lg:max-w-[calc(33.333%-14px)] flex-shrink-0">
      <div>
        <div className="flex gap-[5px] mb-[15px]">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-[#4F5B64] mb-[20px]">{review}</p>
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
    </div>
  );
}

export default function WhatOurUsersSay() {
  const { t } = useTranslation("sectors");

  // Map review IDs to translation keys
  const getReviewData = (id: number) => {
    const reviewMap: Record<number, { name: string; review: string }> = {
      1: {
        name: t("whatOurUsersSay.reviews.sarah.name"),
        review: t("whatOurUsersSay.reviews.sarah.review"),
      },
      2: {
        name: t("whatOurUsersSay.reviews.john.name"),
        review: t("whatOurUsersSay.reviews.john.review"),
      },
      3: {
        name: t("whatOurUsersSay.reviews.james.name"),
        review: t("whatOurUsersSay.reviews.james.review"),
      },
    };
    return reviewMap[id] || { name: "", review: "" };
  };

  return (
    <div className="py-[50px] max-w-[1350px] mx-auto mt-[50px]">
      <div>
        <h1 className="text-3xl font-bold text-center">
          {t("whatOurUsersSay.title")}
        </h1>
        <p className="text-center mt-[10px] text-[#4F5B64]">
          {t("whatOurUsersSay.subtitle")}
        </p>
      </div>

      <div className="flex gap-[20px] mt-[10px] overflow-x-auto pb-[10px] py-[4px] px-[4px] scrollbar-hide">
        {REVIEWS.map((review) => {
          const reviewData = getReviewData(review.id);
          return (
            <ReviewCard
              key={review.id}
              name={reviewData.name || review.name}
              review={reviewData.review || review.review}
              rating={review.rating}
            />
          );
        })}
      </div>
    </div>
  );
}
