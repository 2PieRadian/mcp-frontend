import ExpertsHeroSection from "../components/ExpertsHeroSection";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ExpertsTitle from "../components/ExpertsTitle";

export default function Dieticians() {
  return (
    <div className="px-[20px] mb-[80px]">
      <ResponsiveNavbar />

      <ExpertsHeroSection
        subtitle="Trusted nutrition guidance"
        title="Nourish your body, transform your health—sustainably."
        description="Connect with certified dieticians who turn complex nutrition into simple, sustainable habits—no restrictive diets, just personalized guidance to help you reach your wellness goals."
        badgeText="Personalized meal plans"
        badgeDescription="Verified Indian dieticians · Online consultations · Sustainable approach"
        imageSrc="/images/health/diet.jpg"
        imageAlt="Nutrition and diet consultation illustration"
        imageSize={420}
        maxWidth={420}
      />

      <ExpertsTitle sector="dieticians" />
    </div>
  );
}
