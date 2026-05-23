import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.fromTo(
      heroRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    );
  }, []);

  const openRoles = [
    {
      title: "Full Stack Developer",
      department: "IT Services",
      type: "Remote",
      description: "Build scalable digital products and web platforms.",
      skills: ["React", "Node.js", "MongoDB"],
    },

    {
      title: "OCD / ADHD Counsellor",
      department: "Mental Health",
      type: "Freelance",
      description:
        "Provide structured counselling and mental wellness support.",
      skills: ["Psychology", "RCI", "Counselling"],
    },

    {
      title: "Tutor",
      department: "Education",
      type: "Remote",
      description: "Deliver engaging online teaching and mentoring sessions.",
      skills: ["Teaching", "Mentoring", "Communication"],
    },

    {
      title: "CA GST & Tax Expert",
      department: "Finance",
      type: "Freelance",
      description: "Handle GST filing and financial compliance services.",
      skills: ["GST", "Taxation", "Compliance"],
    },

    {
      title: "Dietician",
      department: "Wellness",
      type: "Freelance",
      description: "Provide personalized nutrition and wellness guidance.",
      skills: ["Nutrition", "Diet Planning", "Consultation"],
    },

    {
      title: "Yoga Expert",
      department: "Wellness",
      type: "Remote",
      description: "Conduct yoga and lifestyle wellness sessions online.",
      skills: ["Yoga", "Meditation", "Fitness"],
    },

    {
      title: "Academic Counselor",
      department: "Education",
      type: "Freelance",
      description: "Guide students in academics and career development.",
      skills: ["Counselling", "Education", "Mentorship"],
    },

    {
      title: "Mutual Fund Expert",
      department: "Finance",
      type: "Freelance",
      description: "Assist clients in investments and portfolio planning.",
      skills: ["NISM", "Investments", "Portfolio"],
    },

    {
      title: "Insurance Expert",
      department: "Finance",
      type: "Commission Based",
      description: "Guide users in selecting suitable insurance products.",
      skills: ["IRDAI", "Insurance", "Claims"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-white/90 backdrop-blur px-[16px] sm:px-[20px] border-b border-emerald-100">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-6xl mx-auto px-[16px] sm:px-[20px] pb-24">
        {/* Hero Section */}
        <div ref={heroRef} className="relative pt-20 pb-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-emerald-200 blur-3xl opacity-55" />

            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-sky-200 blur-3xl opacity-50" />

            <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-violet-200 blur-2xl opacity-45" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-900 text-sm font-semibold mb-6 border border-emerald-200">
              Join Our Growing Team
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Careers at MindCurePath
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Build meaningful impact through wellness, education, finance, and
              technology while working with a fast-growing digital consultancy
              ecosystem.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-5 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <p className="text-sm text-emerald-700">Work Type</p>
                <h3 className="font-semibold text-slate-900">
                  Remote & Flexible
                </h3>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-sky-50 border border-sky-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <p className="text-sm text-sky-700">Domains</p>
                <h3 className="font-semibold text-slate-900">Multi-Industry</h3>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-violet-50 border border-violet-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <p className="text-sm text-violet-700">Opportunities</p>
                <h3 className="font-semibold text-slate-900">
                  Internship & Freelance
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Career Domains Section */}
        <div className="pb-24 px-2 sm:px-0">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Explore Career Domains
            </h2>

            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Join a growing ecosystem of experts, innovators, educators, and
              technology professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🧠",
                title: "Mental Health",
                description:
                  "Support emotional wellness and counselling services.",
                tags: ["Counsellor", "OCD/ADHD", "Depression"],
                color: "bg-violet-100",
                tagColor: "bg-violet-100 text-violet-800",
              },

              {
                icon: "📚",
                title: "Education",
                description:
                  "Help students through mentoring and academic counselling.",
                tags: ["Tutor", "Academic Counselor"],
                color: "bg-sky-100",
                tagColor: "bg-sky-100 text-sky-800",
              },

              {
                icon: "💰",
                title: "Finance",
                description:
                  "Guide clients with taxation, investments, and insurance.",
                tags: ["CA", "Mutual Funds", "Insurance"],
                color: "bg-emerald-100",
                tagColor: "bg-emerald-100 text-emerald-800",
              },

              {
                icon: "🧘",
                title: "Wellness",
                description:
                  "Promote healthy lifestyles through wellness expertise.",
                tags: ["Yoga Expert", "Dietician"],
                color: "bg-amber-100",
                tagColor: "bg-amber-100 text-amber-800",
              },

              {
                icon: "💻",
                title: "IT Services",
                description:
                  "Build scalable digital products and AI solutions.",
                tags: ["Full Stack", "UI/UX", "AI Automation"],
                color: "bg-teal-100",
                tagColor: "bg-teal-100 text-teal-800",
              },
            ].map((domain, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:border-emerald-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${domain.color} ring-1 ring-white flex items-center justify-center mb-5`}
                >
                  <span className="text-2xl">{domain.icon}</span>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  {domain.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-5">
                  {domain.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {domain.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm ${domain.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles Section */}
        <div className="pb-24 px-2 sm:px-0">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Open Opportunities
            </h2>

            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explore exciting opportunities across wellness, education,
              finance, and technology domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {openRoles.map((role, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                      {role.title}
                    </h3>

                    <p className="text-slate-600">{role.department}</p>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                    {role.type}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {role.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {role.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm ${
                        idx % 3 === 0
                          ? "bg-emerald-100 text-emerald-800"
                          : idx % 3 === 1
                            ? "bg-sky-100 text-sky-800"
                            : "bg-violet-100 text-violet-800"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full rounded-2xl bg-emerald-700 text-white py-3 font-medium hover:bg-emerald-800 transition-all duration-300 shadow-[0_8px_18px_-8px_rgba(5,150,105,0.8)]">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
