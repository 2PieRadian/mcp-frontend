import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Layers3,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Rocket,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const digitalServices = [
  {
    icon: Code2,
    title: "Website Design & Development",
    description:
      "We design and develop modern, responsive, and performance-focused websites that help businesses build credibility and engage customers effectively.",
    label: "Services include:",
    items: [
      "Corporate Websites",
      "Business Websites",
      "Portfolio Websites",
      "Educational Platforms",
      "Healthcare Websites",
      "Booking & Appointment Systems",
      "Landing Pages",
      "Customer Portals",
      "Admin Dashboards",
      "Progressive Web Applications (PWA)",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "We develop feature-rich mobile applications designed to improve customer engagement and business efficiency.",
    label: "Solutions include:",
    items: [
      "Android Applications",
      "iOS Applications",
      "Cross-Platform Applications",
      "Customer-Facing Apps",
      "Business Management Apps",
      "Service Booking Applications",
      "E-commerce Mobile Applications",
      "Enterprise Mobility Solutions",
    ],
  },
  {
    icon: Settings2,
    title: "Custom Software Development",
    description:
      "Every business has unique operational requirements. We develop custom software solutions tailored to specific business workflows and objectives.",
    label: "Examples include:",
    items: [
      "CRM Systems",
      "ERP Solutions",
      "Inventory Management Systems",
      "Workforce Management Platforms",
      "Learning Management Systems",
      "Healthcare Management Software",
      "Business Automation Tools",
      "Internal Enterprise Applications",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "We create intuitive and user-centered digital experiences that improve usability and customer satisfaction.",
    label: "Services include:",
    items: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "User Interface Design",
      "Design Systems",
      "Mobile App Design",
      "Website Experience Design",
      "Accessibility Improvements",
    ],
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Solutions",
    description:
      "Launch and scale your online business with secure and user-friendly e-commerce platforms.",
    label: "Features include:",
    items: [
      "Online Stores",
      "Product Catalog Management",
      "Payment Gateway Integration",
      "Order Management Systems",
      "Customer Account Systems",
      "Inventory Integration",
      "Multi-Vendor Marketplace Solutions",
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Solutions",
    description:
      "Our digital marketing services help businesses improve online visibility and connect with their target audience.",
    label: "Services include:",
    items: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Content Marketing",
      "Online Advertising Support",
      "Brand Visibility Strategies",
      "Local Business Marketing",
      "Analytics & Reporting",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Technology Infrastructure",
    description:
      "Modern businesses require scalable and reliable technology infrastructure.",
    label: "Services include:",
    items: [
      "Cloud Migration Assistance",
      "Cloud Deployment Solutions",
      "Database Management",
      "API Development & Integration",
      "Performance Optimization",
      "Infrastructure Monitoring",
      "Backup & Recovery Planning",
    ],
  },
];

const industries = [
  "Healthcare",
  "Education",
  "Wellness & Mental Health",
  "Professional Services",
  "E-Commerce",
  "Real Estate",
  "Hospitality",
  "Logistics",
  "Cleaning & Home Services",
  "Startups & Technology Companies",
];

const processSteps = [
  {
    title: "Requirement Discovery",
    text: "We understand business goals, challenges, and project requirements.",
  },
  {
    title: "Planning & Solution Design",
    text: "Our team prepares technical architecture, project roadmap, and implementation strategy.",
  },
  {
    title: "Design & Prototyping",
    text: "User interfaces and workflows are designed for optimal user experience.",
  },
  {
    title: "Development",
    text: "The solution is developed using modern technologies and development practices.",
  },
  {
    title: "Testing & Quality Assurance",
    text: "Applications undergo testing to improve functionality, security, and reliability.",
  },
  {
    title: "Deployment & Support",
    text: "We assist with deployment and provide ongoing technical support where applicable.",
  },
];

const chooseReasons = [
  {
    icon: Building2,
    title: "Business-Focused Approach",
    text: "We focus on understanding business objectives rather than simply delivering software.",
  },
  {
    icon: Layers3,
    title: "Modern Technology Stack",
    text: "Our solutions utilize contemporary technologies and development frameworks suitable for business needs.",
  },
  {
    icon: Rocket,
    title: "Scalable Solutions",
    text: "Applications are designed with future growth and evolving requirements in mind.",
  },
  {
    icon: UsersRound,
    title: "Dedicated Project Support",
    text: "We maintain transparent communication throughout the project lifecycle.",
  },
  {
    icon: ShieldCheck,
    title: "Security-Conscious Development",
    text: "We incorporate industry-standard development and security practices where appropriate.",
  },
];

const technologyCapabilities = [
  {
    icon: MonitorSmartphone,
    title: "Frontend",
    items: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    icon: Workflow,
    title: "Backend",
    items: ["Node.js", "Express.js", "Java", "Spring Boot"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    items: ["React Native", "Flutter"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "CI/CD Pipelines", "Cloud Infrastructure Services"],
  },
];

const engagementModels = [
  "Dedicated Development Teams",
  "Project-Based Development",
  "Technical Consulting",
  "Staff Augmentation",
  "White-Label Development Partnerships",
];

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

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[22px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#149373] sm:text-[28px]">
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
      <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0d1f36] sm:text-[42px] lg:text-[50px]">
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

function DigitalTechnologySolutions() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Digital & Technology Solutions | MindCurePath</title>
        <meta
          name="description"
          content="MindCurePath provides website development, mobile apps, custom software, UI/UX, e-commerce, digital marketing, cloud infrastructure, and technology partnership services."
        />
        <link
          rel="canonical"
          href="https://mindcurepath.com/digital-technology-solutions"
        />
      </Helmet>

      <ScrollToTopButton />
      <div className="px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
      </div>

      <main className="overflow-hidden text-[#263548]">
        <section className="relative bg-white">
          <WaveShape className="right-[-160px] top-[60px] h-[520px] w-[980px]" />
          <DotPattern className="left-[6%] top-[120px]" />
          <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
            <div>
              <SectionLabel>Digital & Technology Solutions</SectionLabel>
              <h1 className="mt-8 max-w-[760px] text-[44px] font-extrabold leading-[1.04] tracking-[-0.055em] text-[#0d1f36] sm:text-[64px] lg:text-[78px]">
                Empowering Businesses Through{" "}
                <span className="text-[#159374]">Technology</span>
              </h1>
              <div className="mt-8 max-w-[680px] space-y-5 text-[18px] leading-[1.7] text-[#5d6672] sm:text-[20px]">
                <p>
                  MindCurePath provides professional digital and technology
                  solutions designed to help businesses establish a strong
                  digital presence, streamline operations, improve customer
                  engagement, and support long-term growth.
                </p>
                <p>
                  We work with startups, small and medium-sized businesses,
                  enterprises, educational institutions, healthcare providers,
                  service-based organizations, and technology partners to
                  deliver tailored technology solutions aligned with business
                  objectives.
                </p>
                <p>
                  Our team combines technical expertise, industry best
                  practices, and modern development methodologies to create
                  scalable, secure, and user-focused digital products.
                </p>
              </div>
              <Link
                to="/technology-contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#149373] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_42px_rgba(20,147,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#107b60]"
              >
                Start a Technology Project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#dff3ee] blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-[#d8eee8] bg-linear-to-br from-[#f8fffc] via-white to-[#e9f5ef] p-8 shadow-[0_28px_80px_rgba(15,54,48,0.13)]">
                <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-[#149373]/15 blur-2xl" />
                <img
                  src="/career-domains/it-services.svg"
                  alt="Digital and technology solutions"
                  className="mx-auto h-[260px] w-full object-contain"
                />
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    "Scalable Products",
                    "Modern UX",
                    "Secure Systems",
                    "Business Growth",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#d8eee8] bg-white/80 px-4 py-3 text-sm font-bold text-[#0d1f36] shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[#f7fbfa] px-6 py-20 sm:px-8 lg:py-24">
          <DotPattern className="right-[7%] top-10" />
          <div className="mx-auto max-w-[1280px]">
            <Heading>Our Digital Services</Heading>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {digitalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group relative overflow-hidden rounded-[28px] border border-[#d8eee8] bg-white p-7 shadow-[0_20px_55px_rgba(15,54,48,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,54,48,0.12)]"
                  >
                    <div className="absolute right-[-36px] top-[-36px] h-28 w-28 rounded-full bg-[#dff3ee] transition group-hover:scale-125" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#149373] text-white shadow-[0_16px_32px_rgba(20,147,115,0.22)]">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="relative mt-6 text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-[#0d1f36]">
                      {service.title}
                    </h3>
                    <p className="relative mt-3 text-[15px] leading-relaxed text-[#5d6672]">
                      {service.description}
                    </p>
                    <p className="relative mt-6 text-sm font-bold uppercase tracking-[0.12em] text-[#149373]">
                      {service.label}
                    </p>
                    <ul className="relative mt-4 grid gap-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[14px] leading-relaxed text-[#435160]"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#149373]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionLabel>Industries We Serve</SectionLabel>
              <Heading centered={false}>
                Technology solutions for multiple industries
              </Heading>
              <p className="mt-7 text-[18px] leading-[1.7] text-[#5d6672]">
                We provide technology solutions for businesses across multiple
                industries, including:
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-3 rounded-2xl border border-[#d8eee8] bg-white px-5 py-4 shadow-[0_14px_38px_rgba(15,54,48,0.06)]"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#149373]" />
                  <span className="font-bold text-[#0d1f36]">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[#0d1f36] px-6 py-20 text-white sm:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,147,115,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(98,175,155,0.18),transparent_34%)]" />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[22px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#6ee7c2] sm:text-[28px]">
                Our Development Process
              </p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[42px] lg:text-[50px]">
                From discovery to deployment
              </h2>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[26px] border border-white/10 bg-white/6 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#149373] text-lg font-extrabold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/72">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <Heading>Why Choose MindCurePath?</Heading>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {chooseReasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <article
                    key={reason.title}
                    className="rounded-[26px] border border-[#d8eee8] bg-white p-6 shadow-[0_18px_50px_rgba(15,54,48,0.07)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f5ef] text-[#149373]">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold leading-tight text-[#0d1f36]">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5d6672]">
                      {reason.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f7fbfa] px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionLabel>Technology Capabilities</SectionLabel>
                <Heading centered={false}>
                  Modern tools for scalable digital products
                </Heading>
                <p className="mt-7 text-[18px] leading-[1.7] text-[#5d6672]">
                  Our team works with a range of modern technologies,
                  including:
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {technologyCapabilities.map((capability) => {
                  const Icon = capability.icon;
                  return (
                    <article
                      key={capability.title}
                      className="rounded-[26px] border border-[#d8eee8] bg-white p-6 shadow-[0_18px_50px_rgba(15,54,48,0.07)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#149373] text-white">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#0d1f36]">
                          {capability.title}
                        </h3>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {capability.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#149373]/15 bg-[#e9f5ef] px-3 py-1.5 text-sm font-bold text-[#0F5A4E]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[34px] bg-linear-to-br from-[#0d1f36] via-[#12362f] to-[#149373] p-8 text-white shadow-[0_28px_80px_rgba(15,54,48,0.22)] sm:p-12">
            <Sparkles className="h-10 w-10 text-[#6ee7c2]" aria-hidden />
            <h2 className="mt-6 text-[32px] font-extrabold leading-tight tracking-[-0.04em] sm:text-[46px]">
              Project Outsourcing & Technology Partnerships
            </h2>
            <p className="mt-5 max-w-3xl text-[18px] leading-[1.7] text-white/78">
              MindCurePath also collaborates with agencies, startups,
              consulting firms, and technology partners by providing technology
              development support and project execution services.
            </p>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-[#6ee7c2]">
              Engagement models may include:
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {engagementModels.map((model) => (
                <span
                  key={model}
                  className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur"
                >
                  {model}
                </span>
              ))}
            </div>
            <Link
              to="/technology-contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-[#0d1f36] transition hover:-translate-y-0.5 hover:bg-[#f7fbfa]"
            >
              Discuss Your Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DigitalTechnologySolutions;
