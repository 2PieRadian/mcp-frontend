import { lazy } from "react";

import { EXPERTS } from "../../lib/constants";
const ExpertCard = lazy(() => import("../ExpertCard"));

export default function TherapistsCardsSection() {
  return (
    <div className="max-w-[1350px] mx-auto mt-[40px]">
      <div className="grid grid-cols-1 min-[930px]:grid-cols-2 gap-[20px]">
        {EXPERTS.map((expert) => (
          <ExpertCard
            key={expert.id}
            name={expert.name}
            image={expert.image}
            rating={expert.rating}
            ratingCount={expert.ratingCount}
            specialization={expert.specialization}
            tags={expert.tags}
            languages={expert.languages}
            nextSlot={expert.nextSlot}
            price={expert.price}
          />
        ))}
      </div>
    </div>
  );
}
