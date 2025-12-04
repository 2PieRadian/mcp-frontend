import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ExpertsHeroSection from "../components/ExpertsHeroSection";

export default function YogaExperts() {
  return (
    <div className="px-[20px] mb-[80px]">
      <ResponsiveNavbar />

      <ExpertsHeroSection
        subtitle="Trusted wellness transformation"
        title="Find your flow — inner peace starts here."
        description="Connect with certified yoga experts to nurture mind, body, and spirit through personalized, stress-relieving, and grounding yoga practices."
        badgeText="Personalized yoga sessions"
        badgeDescription="Verified Indian instructors · Online classes · Flexible timings"
        imageSrc="/images/health/yoga.png"
        imageAlt="Yoga practice illustration"
        imageSize={300}
        maxWidth={300}
      />
    </div>
  );
}
