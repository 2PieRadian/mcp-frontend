import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Heart,
  Languages,
  Lock,
  MessageCircleHeart,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  Video,
  Eye,
} from "lucide-react";
import Footer from "../components/Footer";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const stats = [
  { icon: UsersRound, value: "10+", label: "Domains Covered" },
  { icon: ShieldCheck, value: "100+", label: "Verified Experts" },
  { icon: CalendarDays, value: "1000+", label: "Successful Sessions" },
  { icon: Heart, value: "Trusted by", label: "Thousands of Users" },
];

const workingSteps = [
  {
    icon: Search,
    title: "Discover Experts",
    text: "Browse expert profiles, explore areas of specialization, review available services, and identify professionals that best match your needs.",
  },
  {
    icon: UsersRound,
    title: "Choose Expert",
    text: "Evaluate knowledge, experience, credibility, and service fit before selecting the right professional for your journey.",
  },
  {
    icon: CalendarDays,
    title: "Schedule a Session",
    text: "Select available time slots and schedule appointments through a streamlined booking experience.",
  },
  {
    icon: Video,
    title: "Connect and Engage",
    text: "Participate in personalized sessions through supported communication channels and formats.",
  },
  {
    icon: TrendingUp,
    title: "Feedback and Improve",
    text: "Share feedback after services to help maintain quality standards and support future users.",
  },
];

const services = [
  { icon: GraduationCap, title: "Academic Tutoring and Subject Expertise" },
  { icon: BriefcaseBusiness, title: "Career Guidance and Mentorship" },
  { icon: BookOpen, title: "Skill Development and Learning Programs" },
  { icon: Languages, title: "Language Learning Support" },
  { icon: MessageCircleHeart, title: "Wellness and Counseling Services" },
  { icon: ShieldCheck, title: "Professional Consultation Services" },
  {
    icon: Sparkles,
    title: "Workshops, Training Sessions, and Interactive Learning Experiences",
  },
  { icon: TrendingUp, title: "Personal and Professional Development Support" },
];

const chooseReasons = [
  {
    title: "Trusted Expertise",
    text: "We strive to onboard qualified professionals who bring relevant knowledge, experience, and subject matter expertise to the platform.",
  },
  {
    title: "Personalized Support",
    text: "Every individual's goals, challenges, and circumstances are different. Our platform enables users to seek guidance tailored to their specific needs.",
  },
  {
    title: "Accessibility and Convenience",
    text: "Users can connect with experts from the comfort of their homes without geographical limitations.",
  },
  {
    title: "Technology-Driven Experience",
    text: "Our platform is designed to simplify discovery, booking, communication, and overall service management.",
  },
  {
    title: "Transparency and Trust",
    text: "We believe in fostering a professional environment built on clear communication, accountability, and user confidence.",
  },
  {
    title: "Continuous Improvement",
    text: "We are committed to enhancing our platform, processes, and user experience through ongoing innovation and feedback.",
  },
];

const missionPoints = [
  "Expanding access to quality guidance and professional support",
  "Creating meaningful opportunities for learning and growth",
  "Building trust through transparency and reliability",
  "Supporting experts in reaching and serving a wider audience",
  "Delivering a seamless and user-focused digital experience",
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[24px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#149373] sm:text-[30px]">
      {children}
    </p>
  );
}

function Heading({
  children,
  centered = true,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0d1f36] sm:text-[44px] lg:text-[52px]">
        {children}
      </h2>
      <span
        className={`mt-6 block h-[3px] w-[72px] rounded-full bg-[#149373] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-[120px] w-[150px] opacity-20 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(20,147,115,0.55) 1.6px, transparent 1.8px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

function WaveShape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute text-[#dff3ee] ${className}`}
      viewBox="0 0 900 360"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 280C162 120 254 218 386 186C535 150 556 15 720 50C802 68 858 136 898 176V360H0C0 360 -10 312 18 280Z"
        fill="currentColor"
        opacity="0.62"
      />
      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={index}
          d={`M${10 + index * 4} ${270 - index * 14}C160 ${
            110 - index * 2
          } 255 ${210 - index * 9} 390 ${178 - index * 12}C535 ${
            142 - index * 13
          } 560 ${18 + index * 2} 716 ${54 + index * 8}C802 ${
            72 + index * 8
          } 854 ${132 + index * 5} 898 ${170 + index * 6}`}
          stroke="#b7dfd5"
          strokeWidth="1"
          opacity="0.45"
        />
      ))}
    </svg>
  );
}

function StoryIllustration() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[28px] bg-[#e9f5ef] shadow-[0_26px_70px_rgba(15,54,48,0.12)]">
        <img
          src="/about-story-consultation.png"
          alt="MindCurePath expert consultation session"
          className="h-[440px] w-full object-cover"
        />
      </div>
      <div className="absolute -bottom-8 left-5 flex items-center gap-4 rounded-[20px] bg-white px-6 py-5 shadow-[0_22px_50px_rgba(13,31,54,0.16)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#159374] text-white">
          <UsersRound size={27} fill="currentColor" strokeWidth={1.7} />
        </span>
        <p className="text-[15px] font-bold leading-snug text-[#13243b]">
          Guided by experts,
          <br />
          <span className="text-[#159374]">driven by care.</span>
        </p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About MindCurePath | Expert Guidance Platform</title>
        <meta
          name="description"
          content="Learn about MindCurePath, a professional digital platform making expert guidance, learning, wellness support, and consultation more accessible."
        />
        <link rel="canonical" href="https://mindcurepath.com/about" />
      </Helmet>

      <ScrollToTopButton />
      <div className="px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
      </div>

      <main className="overflow-hidden text-[#263548]">
        <section className="relative min-h-[760px] bg-white">
          <WaveShape className="right-[-80px] top-[115px] h-[580px] w-[1040px]" />
          <div className="relative mx-auto flex max-w-[1280px] flex-col px-6 pb-24 pt-16 sm:px-8 sm:pt-20 lg:pt-24">
            <div className="max-w-[570px]">
              <SectionLabel>About Us</SectionLabel>
              <h1 className="mt-9 text-[56px] font-extrabold leading-[1.06] tracking-[-0.055em] text-[#0d1f36] sm:text-[74px] lg:text-[86px]">
                About
                <br />
                Mind<span className="text-[#159374]">Cure</span>Path
              </h1>
              <p className="mt-8 max-w-[560px] text-[22px] leading-[1.55] text-[#5d6672]">
                MindCurePath is a professional digital platform dedicated to
                making quality guidance, learning opportunities, wellness
                support, and expert consultation more accessible to people
                everywhere.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-white pb-24 pt-2 sm:pb-28 sm:pt-4">
          <DotPattern className="left-5 top-10" />
          <WaveShape className="bottom-[-210px] left-[-160px] h-[420px] w-[720px]" />
          <div className="relative mx-auto grid max-w-[1230px] items-center gap-20 px-6 sm:px-8 lg:grid-cols-[1fr_1.08fr]">
            <StoryIllustration />

            <div>
              <SectionLabel>Our Story</SectionLabel>
              <Heading centered={false}>
                Why MindCurePath
                <br />
                <span className="text-[#149373]">Exists</span>
              </Heading>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.72] text-[#445162]">
                <p>
                  We live in a world where information is abundant, yet
                  trustworthy guidance remains difficult to find. Many
                  individuals struggle to identify the right expert, evaluate
                  credibility, schedule consultations, and receive personalized
                  support that aligns with their unique goals and circumstances.
                  MindCurePath was created to address this challenge.
                </p>
                <p>
                  Our platform serves as a bridge between individuals seeking
                  guidance and qualified professionals who possess the
                  knowledge, experience, and expertise to help them make
                  informed decisions, develop new skills, overcome challenges,
                  and pursue personal or professional growth.
                </p>
                <p>
                  By combining technology with human expertise, we aim to create
                  a reliable, transparent, and user-centric ecosystem where
                  meaningful guidance is only a few clicks away.
                </p>
              </div>

              <div className="mt-11 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
                {stats.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`px-4 text-center ${
                        index > 0 ? "lg:border-l lg:border-[#d8e1de]" : ""
                      }`}
                    >
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f8f4] text-[#149373]">
                        <Icon size={29} strokeWidth={2.4} />
                      </span>
                      <p className="mt-4 text-[25px] font-extrabold leading-none text-[#0d1f36]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[15px] leading-tight text-[#576273]">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-white py-24">
          <DotPattern className="right-8 top-48" />
          <WaveShape className="left-[-260px] top-[175px] h-[360px] w-[760px]" />
          <div className="relative mx-auto max-w-[1230px] px-6 text-center sm:px-8">
            <SectionLabel>Our Concept</SectionLabel>
            <Heading>
              Empowering Individuals Through{" "}
              <span className="text-[#149373]">Expert Guidance</span>
            </Heading>
            <div className="mx-auto mt-8 max-w-[920px] space-y-5 text-[17px] leading-[1.75] text-[#4c5968]">
              <p>
                The foundation of MindCurePath is built on a simple belief:
                <strong className="font-extrabold text-[#0d1f36]">
                  {" "}
                  The right guidance at the right time can create meaningful
                  opportunities for growth.
                </strong>
              </p>
              <p>
                Whether someone is seeking academic support, career direction,
                professional advice, skill enhancement, wellness guidance, or
                personal development assistance, access to experienced
                professionals can significantly improve decision-making and
                confidence.
              </p>
              <p>
                MindCurePath provides a structured digital environment where
                users can discover, connect with, and book sessions with experts
                across multiple domains. Our role is to simplify the process of
                finding professional support while creating a seamless and
                secure experience for both users and experts.
              </p>
              <p>
                We believe that expertise should not be limited by geography,
                availability, or traditional barriers. Through technology, we
                make professional guidance more accessible, convenient, and
                efficient.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-white py-24">
          <DotPattern className="right-[70px] top-[190px]" />
          <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
            <div className="text-center">
              <SectionLabel>Our Working Model</SectionLabel>
              <Heading>
                How MindCurePath <span className="text-[#149373]">Works</span>
              </Heading>
              <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.55] text-[#5d6672]">
                MindCurePath operates as a technology-enabled platform that
                facilitates connections between users and independent
                professionals across various fields.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-5">
              {workingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {index < workingSteps.length - 1 && (
                      <div className="absolute left-[calc(100%-10px)] top-[82px] z-10 hidden w-11 border-t-2 border-dashed border-[#149373] lg:block">
                        <span className="absolute -right-1 -top-[5px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-[#149373]" />
                      </div>
                    )}
                    <div className="flex min-h-[335px] flex-col items-center rounded-[22px] border border-[#e5ebe9] bg-white px-6 pb-8 pt-8 text-center shadow-[0_18px_40px_rgba(22,45,59,0.07)]">
                      <div className="relative">
                        <span className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#e9f6f2] text-[#149373]">
                          <Icon size={48} strokeWidth={2.3} />
                        </span>
                        <span className="absolute -bottom-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#cfe9e2] bg-white text-[16px] font-extrabold text-[#149373]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-12 text-[22px] font-extrabold text-[#102039]">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.58] text-[#66707e]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex items-center gap-7 rounded-[22px] border border-[#dcefeb] bg-[#f5fbf9] px-8 py-7 shadow-[0_14px_36px_rgba(20,147,115,0.06)]">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#def5ef] text-[#149373]">
                <ShieldCheck size={34} />
              </span>
              <div className="text-left">
                <h3 className="text-[21px] font-extrabold text-[#149373]">
                  Safe, Secure & Confidential
                </h3>
                <p className="mt-2 text-[15px] text-[#5c6672]">
                  This model enables professionals to focus on delivering their
                  expertise while allowing users to access guidance through a
                  secure, organized, and technology-driven platform.
                </p>
              </div>
              <Lock
                className="ml-auto hidden text-[#149373] sm:block"
                size={38}
              />
            </div>
          </div>
        </section>

        <section className="relative bg-white py-24">
          <DotPattern className="left-6 top-16" />
          <DotPattern className="right-20 top-40" />
          <WaveShape className="bottom-[-180px] left-[-190px] h-[440px] w-[760px]" />
          <div className="relative mx-auto max-w-[1160px] px-6 sm:px-8">
            <div className="text-center">
              <SectionLabel>Our Vision & Mission</SectionLabel>
              <Heading>
                Driven by <span className="text-[#149373]">Purpose</span>,
                Committed to You
              </Heading>
              <p className="mx-auto mt-6 max-w-[650px] text-[17px] leading-[1.7] text-[#586474]">
                Our vision inspires what we aim to achieve. Our mission guides
                how we serve every individual on their journey.
              </p>
            </div>

            <div className="mt-11 grid gap-10 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-[26px] bg-[#0d7b60] p-10 text-white shadow-[0_24px_65px_rgba(17,92,77,0.19)]">
                <div className="absolute right-[-80px] top-[-90px] h-72 w-72 rounded-full bg-white/8" />
                <div className="absolute bottom-0 right-0 h-44 w-64 bg-[#0b5846] [clip-path:polygon(35%_100%,60%_40%,76%_100%)] opacity-40" />
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e9f8f4] text-[#149373]">
                  <Eye size={53} />
                </span>
                <span className="mt-7 block h-[3px] w-[66px] rounded-full bg-white/55" />
                <h3 className="mt-6 text-[34px] font-extrabold">
                  Our <span className="text-white/55">Vision</span>
                </h3>
                <p className="mt-6 max-w-[430px] text-[17px] leading-[1.8] text-white/92">
                  To become a trusted global platform that empowers individuals
                  by providing accessible pathways to education, professional
                  expertise, wellness support, skill development, and personal
                  growth.
                </p>
                <p className="mt-5 max-w-[430px] text-[16px] leading-[1.75] text-white/86">
                  We envision a future where quality guidance is not limited by
                  location, background, or circumstance, but is available to
                  anyone seeking to learn, improve, and achieve their goals.
                </p>
                <span className="mt-9 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#149373]">
                  <ArrowRight size={25} />
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[26px] border border-[#e7eceb] bg-white p-10 shadow-[0_22px_60px_rgba(17,36,56,0.08)]">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e9f8f4] text-[#149373] shadow-[0_18px_34px_rgba(20,147,115,0.18)]">
                  <Target size={53} />
                </span>
                <span className="mt-7 block h-[3px] w-[66px] rounded-full bg-[#bfe4db]" />
                <h3 className="mt-6 text-[34px] font-extrabold text-[#0d1f36]">
                  Our <span className="text-[#149373]">Mission</span>
                </h3>
                <p className="mt-6 text-[17px] leading-[1.72] text-[#516070]">
                  Our mission is to bridge the gap between individuals and
                  professional expertise through a secure, accessible, and
                  technology-driven platform.
                </p>
                <ul className="mt-5 space-y-3">
                  {missionPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#516070]"
                    >
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-[#149373]"
                        size={18}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="relative mt-5 text-[15px] leading-[1.65] text-[#516070]">
                  Through these efforts, we aim to create lasting value for both
                  users and professionals while contributing to a more informed,
                  skilled, and empowered society.
                </p>
                <div className="absolute bottom-0 right-0 h-36 w-72 rounded-tl-[120px] bg-[#d8f0e9]" />
                <span className="relative mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#d3ebe5] bg-white text-[#149373]">
                  <ArrowRight size={25} />
                </span>
              </div>
            </div>

            <div className="mt-9 flex items-center gap-5 rounded-[20px] border border-[#e3efeb] bg-white px-8 py-7 shadow-[0_15px_40px_rgba(19,42,58,0.05)]">
              <Quote
                className="shrink-0 text-[#149373]"
                size={42}
                fill="#149373"
              />
              <p className="text-[21px] font-semibold text-[#2e4051]">
                At MindCurePath, we're more than a platform - we're a partner in
                your growth.
              </p>
              <Heart
                className="ml-auto hidden text-[#b8ddd4] sm:block"
                size={33}
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f7fbfa] py-24">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <div className="text-center">
              <SectionLabel>What We Do</SectionLabel>
              <Heading>
                Expert-Led Services Across{" "}
                <span className="text-[#149373]">Multiple Domains</span>
              </Heading>
              <p className="mx-auto mt-7 max-w-[780px] text-[17px] leading-[1.7] text-[#586474]">
                Our objective is to create a centralized platform where
                individuals can access trusted expertise across multiple domains
                through a convenient and user-friendly experience.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="rounded-[22px] border border-[#e5eeee] bg-white p-6 shadow-[0_14px_35px_rgba(17,36,56,0.05)]"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f8f4] text-[#149373]">
                      <Icon size={27} />
                    </span>
                    <h3 className="mt-5 text-[18px] font-extrabold leading-snug text-[#102039]">
                      {service.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <div className="text-center">
              <SectionLabel>Why Choose MindCurePath</SectionLabel>
              <Heading>
                Built for <span className="text-[#149373]">Trust</span>,
                Clarity, and Growth
              </Heading>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {chooseReasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className="rounded-[24px] border border-[#e4eceb] bg-white p-7 shadow-[0_18px_42px_rgba(17,36,56,0.06)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f8f4] text-[18px] font-extrabold text-[#149373]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[22px] font-extrabold text-[#102039]">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-[#586474]">
                    {reason.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7fbfa] py-24">
          <WaveShape className="right-[-240px] top-[-80px] h-[430px] w-[760px]" />
          <div className="relative mx-auto max-w-[1000px] px-6 text-center sm:px-8">
            <SectionLabel>Our Commitment</SectionLabel>
            <Heading>
              More Accessible, More Transparent,{" "}
              <span className="text-[#149373]">More Impactful</span>
            </Heading>
            <div className="mt-9 rounded-[28px] border border-[#dfecea] bg-white p-8 text-left shadow-[0_24px_60px_rgba(17,36,56,0.07)] sm:p-11">
              <div className="space-y-6 text-[18px] leading-[1.82] text-[#4b5968]">
                <p>
                  At MindCurePath, we understand that guidance can influence
                  important personal, educational, and professional decisions.
                  For this reason, we are committed to maintaining a platform
                  that prioritizes professionalism, accessibility, respect, and
                  continuous improvement.
                </p>
                <p>
                  Our focus is not merely on facilitating appointments. Our
                  focus is on creating an ecosystem where individuals can
                  confidently access expertise, explore opportunities, acquire
                  knowledge, and move forward with greater clarity and
                  confidence.
                </p>
                <p className="font-bold text-[#102039]">
                  MindCurePath is dedicated to building a future where guidance,
                  learning, and professional support are more accessible, more
                  transparent, and more impactful for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;
