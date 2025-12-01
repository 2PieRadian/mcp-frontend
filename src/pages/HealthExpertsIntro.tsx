import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  link: string;
}

function ExpertCategoryCard({
  title,
  description,
  link,
  exploreText,
}: ExpertCategoryCardProps & { exploreText: string }) {
  return (
    <div className="flex flex-col justify-between shadow-none hover:scale-[1.018] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.28)] transition-all duration-150 cursor-pointer gap-[10px] border py-[15px] px-[20px] rounded-[10px] border-[#9ba5ab] w-full md:w-auto md:flex-1 h-full">
      <div>
        <h1 className="text-[20px] md:text-[25px] font-medium text-center text-[#374750]">
          {title}
        </h1>
        <p className="text-[14px] md:text-base mt-[15px] text-[#3d4950]">
          {description}
        </p>
      </div>

      <Link
        to={link}
        className="flex items-center justify-center mt-[20px] bg-[#304048] hover:bg-[#304048]/90 transition-colors duration-150 cursor-pointer text-white rounded-[30px] py-[7px] px-[20px] text-sm md:text-base"
      >
        {exploreText}
      </Link>
    </div>
  );
}

export default function WellnessExpertsIntro() {
  const { t } = useTranslation(["experts", "common"]);

  const categories = [
    {
      title: t("therapists", { ns: "experts" }),
      description: t("therapistsDescription", { ns: "experts" }),
      link: "/wellness-experts/therapists",
    },
    {
      title: t("yogaExperts", { ns: "experts" }),
      description: t("yogaExpertsDescription", { ns: "experts" }),
      link: "/wellness-experts/yoga-experts",
    },
    {
      title: t("dieticians", { ns: "experts" }),
      description: t("dieticiansDescription", { ns: "experts" }),
      link: "/wellness-experts/dieticians",
    },
  ];

  return (
    <div className="max-w-[1350px] mx-auto px-[20px] mb-[40px]">
      <ResponsiveNavbar />

      <div className="h-[240px]">
        <img
          src="/images/wellness/wellness.jpg"
          alt=""
          className="w-full h-full object-cover rounded-[30px]"
        />
      </div>

      <div className="categories mt-[40px] flex flex-col md:flex-row items-stretch md:justify-between gap-[20px]">
        {categories.map((category) => (
          <ExpertCategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            link={category.link}
            exploreText={t("explore", { ns: "common" })}
          />
        ))}
      </div>
    </div>
  );
}
