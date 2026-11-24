import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  Handshake,
  Mail,
  MessageSquareText,
  Phone,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Footer";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const inquiryTopics = [
  "Website Design & Development",
  "Mobile Application Development",
  "Custom Software Development",
  "SaaS Product Development",
  "Enterprise Software Solutions",
  "Cloud & Infrastructure Services",
  "API Development & Integrations",
  "E-Commerce Solutions",
  "UI/UX Design",
  "Digital Marketing & SEO",
  "Technology Consulting",
  "Dedicated Development Teams",
  "Project Outsourcing & Partnerships",
];

const inquirySections = [
  {
    icon: Building2,
    title: "Organization Information",
    items: [
      "Company / Organization Name",
      "Industry or Business Domain",
      "Company Website (if available)",
      "Primary Contact Person",
      "Designation or Role",
    ],
  },
  {
    icon: MessageSquareText,
    title: "Project Overview",
    intro: "Please provide a brief description covering:",
    items: [
      "Business problem you are trying to solve",
      "Project objectives",
      "Target users or customers",
      "Existing systems or processes (if applicable)",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Services Required",
    intro: "Examples include:",
    items: [
      "Website Development",
      "Mobile Application Development",
      "Software Development",
      "System Modernization",
      "UI/UX Design",
      "SEO & Digital Marketing",
      "Cloud Migration",
      "Technical Consulting",
    ],
  },
  {
    icon: ClipboardList,
    title: "Project Scope",
    intro: "Where applicable, please share:",
    items: [
      "Key features required",
      "User roles and permissions",
      "Integrations with third-party services",
      "Payment gateway requirements",
      "Reporting and analytics requirements",
      "Security or compliance requirements",
    ],
  },
  {
    icon: CalendarClock,
    title: "Timeline Expectations",
    intro: "Please indicate your preferred timeline:",
    items: [
      "Immediate / Urgent",
      "Within 1 Month",
      "Within 3 Months",
      "Within 6 Months",
      "Flexible",
    ],
  },
  {
    icon: Sparkles,
    title: "Budget Range (Optional)",
    intro:
      "Providing a budget range helps us recommend suitable approaches and technologies.",
    items: [
      "Under ₹1,00,000",
      "₹1,00,000 – ₹2,00,000",
      "₹2,00,000 – ₹10,00,000",
      "₹10,00,000+",
      "To Be Discussed",
    ],
  },
  {
    icon: FileText,
    title: "Existing Documentation",
    intro: "If available, please include:",
    items: [
      "Requirement Documents",
      "Project Briefs",
      "Wireframes",
      "Design Files",
      "Technical Specifications",
      "Existing Software Screenshots",
      "Process Flow Diagrams",
    ],
  },
];

const engagementSteps = [
  {
    title: "Initial Discussion",
    text: "We review your requirements and assess project objectives.",
  },
  {
    title: "Discovery & Analysis",
    text: "Our team evaluates technical feasibility, scope, risks, and implementation considerations.",
  },
  {
    title: "Solution Proposal",
    text: "Where appropriate, we may provide recommendations regarding architecture, technologies, development approach, estimated timelines, and engagement models.",
  },
  {
    title: "Commercial Discussion",
    text: "Project scope, deliverables, responsibilities, pricing, and terms are discussed before any work begins.",
  },
  {
    title: "Project Initiation",
    text: "Work commences after mutual agreement and execution of applicable contractual documentation.",
  },
];

const partners = [
  "Startups",
  "Agencies",
  "Product Companies",
  "Consultants",
  "Educational Institutions",
  "Healthcare Organizations",
  "Technology Service Providers",
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

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[22px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#149373] sm:text-[28px]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0d1f36] sm:text-[42px] lg:text-[50px]">
        {title}
      </h2>
      <span className="mx-auto mt-6 block h-[3px] w-[72px] rounded-full bg-[#149373]" />
      {description ? (
        <p className="mt-6 text-[17px] leading-[1.7] text-[#5d6672]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function TechnologyContact() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Our Technology Team | MindCurePath</title>
        <meta
          name="description"
          content="Contact MindCurePath's technology team for software engineering, technology consulting, digital transformation, product development, and technology partnerships."
        />
        <link
          rel="canonical"
          href="https://mindcurepath.com/technology-contact"
        />
      </Helmet>

      <ScrollToTopButton />
      <div className="px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
      </div>

      <main className="overflow-hidden text-[#263548]">
        <section className="relative bg-white">
          <div className="absolute inset-0 bg-linear-to-b from-[#f7fbfa] via-white to-white" />
          <DotPattern className="left-[6%] top-[120px]" />
          <DotPattern className="right-[8%] top-[220px]" />
          <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
            <div>
              <p className="text-[22px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#149373] sm:text-[28px]">
                Contact Our Technology Team
              </p>
              <h1 className="mt-8 max-w-[760px] text-[44px] font-extrabold leading-[1.04] tracking-[-0.055em] text-[#0d1f36] sm:text-[64px] lg:text-[78px]">
                Let's Discuss Your{" "}
                <span className="text-[#159374]">Project</span>
              </h1>
              <div className="mt-8 max-w-[720px] space-y-5 text-[18px] leading-[1.7] text-[#5d6672] sm:text-[20px]">
                <p>
                  MindCurePath provides professional software engineering,
                  technology consulting, digital transformation, and product
                  development services for startups, businesses, organizations,
                  and enterprises.
                </p>
                <p>
                  Whether you are planning to build a new digital product,
                  modernize an existing system, automate business processes,
                  improve customer experiences, or scale your technology
                  infrastructure, our team is available to discuss your
                  requirements and explore potential solutions.
                </p>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:support@mindcurepath.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#149373] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_42px_rgba(20,147,115,0.22)] transition hover:-translate-y-0.5 hover:bg-[#107b60]"
                >
                  Email Technology Team
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="tel:7078497263"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8eee8] bg-white px-7 py-3.5 text-[15px] font-bold text-[#0d1f36] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7fbfa]"
                >
                  Call Our Team
                </a>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[34px] border border-[#d8eee8] bg-white p-5 shadow-[0_28px_80px_rgba(15,54,48,0.13)] sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,147,115,0.14),transparent_34%)]" />
              <div className="relative grid gap-4">
                <a
                  href="mailto:support@mindcurepath.com"
                  className="group rounded-[28px] border border-[#d8eee8] bg-[#f8fffc] p-6 transition hover:-translate-y-1 hover:border-[#149373]/35 hover:bg-white hover:shadow-[0_22px_55px_rgba(15,54,48,0.11)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#149373] text-white shadow-[0_14px_30px_rgba(20,147,115,0.22)]">
                      <Mail className="h-6 w-6" aria-hidden />
                    </span>
                    <span>
                      <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#149373]">
                        Email
                      </span>
                      <span className="mt-2 block break-all text-[22px] font-extrabold leading-tight text-[#0d1f36]">
                        support@mindcurepath.com
                      </span>
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[#5d6672]">
                    For project inquiries, technical consultations, partnership
                    opportunities, or business discussions.
                  </p>
                </a>

                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="tel:7078497263"
                    className="group rounded-[26px] border border-[#d8eee8] bg-white p-5 transition hover:-translate-y-1 hover:border-[#149373]/35 hover:shadow-[0_18px_45px_rgba(15,54,48,0.1)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f5ef] text-[#149373] transition group-hover:bg-[#149373] group-hover:text-white">
                      <Phone className="h-6 w-6" aria-hidden />
                    </span>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#149373]">
                      Phone
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-[#0d1f36]">
                      7078497263
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#5d6672]">
                      Speak with our team during business hours.
                    </p>
                  </a>

                  <div className="rounded-[26px] border border-[#d8eee8] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f5ef] text-[#149373]">
                      <CalendarClock className="h-6 w-6" aria-hidden />
                    </span>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#149373]">
                      Business Hours
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-[#0d1f36]">
                      Monday - Saturday
                    </p>
                    <p className="mt-3 rounded-full bg-[#f7fbfa] px-4 py-2 text-sm font-bold text-[#0F766E]">
                      9:00 AM - 6:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#f7fbfa] px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading
              eyebrow="We Welcome Inquiries"
              title="Technology services we can discuss"
              description="We welcome inquiries related to:"
            />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inquiryTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 rounded-2xl border border-[#d8eee8] bg-white px-5 py-4 shadow-[0_14px_38px_rgba(15,54,48,0.06)]"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#149373]" />
                  <span className="font-bold text-[#0d1f36]">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading
              eyebrow="Information To Include"
              title="Help us evaluate your requirements"
              description="To help us evaluate your requirements and respond effectively, please include as much relevant information as possible."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {inquirySections.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.title}
                    className="relative overflow-hidden rounded-[28px] border border-[#d8eee8] bg-white p-7 shadow-[0_20px_55px_rgba(15,54,48,0.08)]"
                  >
                    <div className="absolute right-[-36px] top-[-36px] h-28 w-28 rounded-full bg-[#dff3ee]" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#149373] text-white shadow-[0_16px_32px_rgba(20,147,115,0.22)]">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="relative mt-6 text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-[#0d1f36]">
                      {section.title}
                    </h3>
                    {section.intro ? (
                      <p className="relative mt-3 text-[15px] leading-relaxed text-[#5d6672]">
                        {section.intro}
                      </p>
                    ) : null}
                    <ul className="relative mt-5 grid gap-2">
                      {section.items.map((item) => (
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

        <section className="relative bg-[#0d1f36] px-6 py-20 text-white sm:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,147,115,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(98,175,155,0.18),transparent_34%)]" />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[22px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#6ee7c2] sm:text-[28px]">
                Our Engagement Process
              </p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[42px] lg:text-[50px]">
                How project conversations move forward
              </h2>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {engagementSteps.map((step, index) => (
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
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[22px] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#149373] sm:text-[28px]">
                Technology Partnerships
              </p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0d1f36] sm:text-[42px] lg:text-[50px]">
                Collaboration models for teams and organizations
              </h2>
              <span className="mt-6 block h-[3px] w-[72px] rounded-full bg-[#149373]" />
              <p className="mt-7 text-[18px] leading-[1.7] text-[#5d6672]">
                We also collaborate with startups, agencies, product companies,
                consultants, educational institutions, healthcare organizations,
                and technology service providers.
              </p>
              <p className="mt-5 text-[18px] leading-[1.7] text-[#5d6672]">
                Partnership opportunities may include project outsourcing,
                white-label development, staff augmentation, technical
                consulting, and long-term technology collaboration.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="flex items-center gap-3 rounded-2xl border border-[#d8eee8] bg-white px-5 py-4 shadow-[0_14px_38px_rgba(15,54,48,0.06)]"
                >
                  <Handshake className="h-5 w-5 shrink-0 text-[#149373]" />
                  <span className="font-bold text-[#0d1f36]">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-8 lg:pb-24">
          <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[34px] border border-[#f0d7d7] bg-[#fff8f8] p-8 shadow-[0_24px_70px_rgba(80,20,20,0.08)] sm:p-10">
            <ShieldAlert className="h-10 w-10 text-[#b45353]" aria-hidden />
            <h2 className="mt-5 text-[30px] font-extrabold tracking-[-0.04em] text-[#0d1f36] sm:text-[42px]">
              Important Notice
            </h2>
            <div className="mt-5 space-y-4 text-[16px] leading-[1.75] text-[#5d6672]">
              <p>
                Submitting an inquiry, sending an email, making a phone call,
                participating in consultations, receiving estimates, or engaging
                in preliminary discussions does not establish a client
                relationship, partnership, service agreement, or contractual
                obligation.
              </p>
              <p>
                Any timelines, estimates, recommendations, technical opinions,
                pricing indications, or project discussions provided during
                initial communications are preliminary in nature and subject to
                further evaluation, feasibility assessment, resource
                availability, and formal written agreement.
              </p>
              <p>
                MindCurePath reserves the right to accept, decline, postpone, or
                discontinue discussions regarding any proposed engagement at its
                sole discretion.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
