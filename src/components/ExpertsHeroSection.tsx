export default function ExpertsHeroSection() {
  return (
    <div className="expert-hero-gradient mt-[10px] max-w-[1350px] mx-auto rounded-[30px]">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-[24px] font-light text-[#304048] italic">
          You Care for Others. We Care for You.
        </h1> */}

        <img
          src="/images/experts/expert-image.png"
          alt="Experts Hero Section"
          className="rounded-[30px] w-full max-h-[250px] object-cover"
        />
      </div>
    </div>
  );
}
