type ExpertsTitleProps = {
  specialization?: string;
  sector?: string;
};

export default function ExpertsTitle({
  specialization,
  sector,
}: ExpertsTitleProps) {
  const displayTitle =
    specialization || (sector ? `${sector} Experts` : "Experts");

  return (
    <div className="max-w-[1350px] mx-auto">
      <h1 className="text-white text-[16px] md:text-[20px] font-medium bg-experts-hero-bg text-center py-[10px] rounded-[30px] my-[10px]">
        {displayTitle}
      </h1>
    </div>
  );
}
