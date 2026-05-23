import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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
      title: "Dietician",
      department: "Wellness",
      type: "Indeed Listing",
      description: "Provide nutrition guidance and wellness planning support.",
      skills: ["Nutrition", "Diet Planning", "Consultation"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Dietitian&jk=b15b0fa87647e60f&q=mindcurepath&xpse=SoAM67I3jqbLS1zCSZ0LbzkdCdPP&xfps=5368977a-202b-4f29-ab26-6e0a9f6a07c9&xkcb=SoC767M3jqbMFETC8R0LbzkdCdPP&vjs=3",
    },
    {
      title: "Maths Tutor",
      department: "Education",
      type: "Indeed Listing",
      description: "Teach and mentor students in mathematics effectively.",
      skills: ["Mathematics", "Teaching", "Mentoring"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Tutor&jk=1eaf2851a7bd56f1&q=mindcurepath&xpse=SoC967I3jqbBG7TNqh0LbzkdCdPP&xfps=ca1be697-335d-4232-a9ce-3f7154ca6b16&xkcb=SoAP67M3jqbMFETC8R0KbzkdCdPP&vjs=3",
    },
    {
      title: "Tutor",
      department: "Education",
      type: "Indeed Listing",
      description: "Deliver focused learning sessions and academic support.",
      skills: ["Teaching", "Communication", "Student Support"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Tutor&jk=e95003f758d0ed17&q=mindcurepath&xpse=SoDG67I3jqbeaSAYAD0LbzkdCdPP&xfps=ae2af9bb-2567-4032-bd60-dd737007c89d&xkcb=SoCS67M3jqbMFETC8R0JbzkdCdPP&vjs=3",
    },
    {
      title: "OCD",
      department: "Mental Health",
      type: "Indeed Listing",
      description: "Support clients with OCD-focused counselling services.",
      skills: ["Counselling", "Mental Health", "Client Support"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Ocd&jk=d8ed93407352d924&q=mindcurepath&xpse=SoBB67I3jqbeNxz5Rp0LbzkdCdPP&xfps=ada83522-aecd-4bc3-bce7-234ea5731f03&xkcb=SoAm67M3jqbMFETC8R0IbzkdCdPP&vjs=3",
    },
    {
      title: "Depression Counsellor",
      department: "Mental Health",
      type: "Indeed Listing",
      description: "Provide emotional support and depression counselling care.",
      skills: ["Counselling", "Psychology", "Empathy"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Counselor&jk=2fc6ff3cbd8f66a3&q=mindcurepath&xpse=SoAH67I3jqbd01z5Xx0LbzkdCdPP&xfps=ddfa93f5-04fa-474a-bdf9-b0438d291026&xkcb=SoCo67M3jqbMFETC8R0PbzkdCdPP&vjs=3",
    },
    {
      title: "Insurance Advisor",
      department: "Finance",
      type: "Indeed Listing",
      description: "Advise clients on policy selection and insurance planning.",
      skills: ["Insurance", "Advisory", "Client Relations"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Insurance+Advisor&jk=c1ed94f7e31780c5&q=mindcurepath&xpse=SoDR67I3jqbU-bz5Xx0LbzkdCdPP&xfps=fd482ef6-1f02-4e6d-a9e2-bcd314f1a428&xkcb=SoAc67M3jqbMFETC8R0ObzkdCdPP&vjs=3",
    },
    {
      title: "Physics Faculty/ Teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Teach physics concepts with structured lesson delivery.",
      skills: ["Physics", "Teaching", "Classroom Management"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Physics+Teacher&jk=c32e9bf0701ad327&q=mindcurepath&xpse=SoDt67I3jqbU5izNS50LbzkdCdPP&xfps=b94794e0-61b4-4cce-b9b9-f7e9c0358206&xkcb=SoCB67M3jqbMFETC8R0NbzkdCdPP&vjs=3",
    },
    {
      title: "English teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Improve language skills through engaging English lessons.",
      skills: ["English", "Teaching", "Communication"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=English+Teacher&jk=7d546e1ca1bebeec&q=mindcurepath&xpse=SoBg67I3jqbQjbTCwJ0PbzkdCdPP&xfps=28b6733d-49fb-4b69-828f-a0ae5741701e&xkcb=SoA167M3jqbMFETC8R0MbzkdCdPP&vjs=3",
    },
    {
      title: "Chartered Accountant",
      department: "Finance",
      type: "Indeed Listing",
      description: "Handle accounting, taxation, and compliance workflows.",
      skills: ["Accounting", "Taxation", "Compliance"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Accountant&jk=15a3d558c7609fdc&q=mindcurepath&xpse=SoB_67I3jqbQvSz4mp0LbzkdCdPP&xfps=99620e25-58e0-4119-971d-bc2d6d4a27e8&xkcb=SoDc67M3jqbMFETC8R0DbzkdCdPP&vjs=3",
    },
    {
      title: "Biology Teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Deliver biology instruction and student learning support.",
      skills: ["Biology", "Teaching", "Lesson Planning"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Teacher&jk=94bd8579c9947823&q=mindcurepath&xpse=SoDD67I3jqbQpMz4BB0LbzkdCdPP&xfps=5bb37ab8-245b-48f1-a2a7-b733a2d753be&xkcb=SoBo67M3jqbMFETC8R0CbzkdCdPP&vjs=3",
    },
    {
      title: "Physics Faculty teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Lead physics sessions with concept-first teaching methods.",
      skills: ["Physics", "Teaching", "Assessment"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Physics+Teacher&jk=c32e9bf0701ad327&q=mindcurepath&xpse=SoDt67I3jqbU5izNS50LbzkdCdPP&xfps=b94794e0-61b4-4cce-b9b9-f7e9c0358206&xkcb=SoCB67M3jqbMFETC8R0NbzkdCdPP&vjs=3",
    },
    {
      title: "French Tutor",
      department: "Education",
      type: "Indeed Listing",
      description: "Teach French language fundamentals and fluency skills.",
      skills: ["French", "Tutoring", "Communication"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Tutor&jk=9fe44f5b00cdef2b&q=mindcurepath&xpse=SoBn67I3jqbnINzDQR0LbzkdCdPP&xfps=f2d0bf46-37fd-4156-a556-5af4397b43a8&xkcb=SoD167M3jqbMFETC8R0BbzkdCdPP&vjs=3",
    },
    {
      title: "Spanish teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Conduct interactive Spanish classes for students.",
      skills: ["Spanish", "Teaching", "Language Skills"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Spanish+Teacher&jk=25ef6d619b25f7a4&q=mindcurepath&xpse=SoCc67I3jqbmhiz4KJ0LbzkdCdPP&xfps=dd2c5447-00ac-4f48-b075-47cb089b861a&xkcb=SoBB67M3jqbMFETC8R0AbzkdCdPP&vjs=3",
    },
    {
      title: "Urdu Teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Support Urdu learning with structured language instruction.",
      skills: ["Urdu", "Teaching", "Student Engagement"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Teacher&jk=2a9f387c10f72827&q=mindcurepath&xpse=SoCs67I3jqb_K2z4mp0LbzkdCdPP&xfps=ec956f26-27b7-4544-8b9d-e3dac9818569&xkcb=SoDP67M3jqbMFETC8R0HbzkdCdPP&vjs=3",
    },
    {
      title: "Social Science teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Teach social science topics through engaging lessons.",
      skills: ["Social Science", "Teaching", "Curriculum"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Science+Teacher&jk=49b39626a8dd118e&q=mindcurepath&xpse=SoC267I3jqb-0lzNS50LbzkdCdPP&xfps=dd69d882-1b9d-4922-aae4-841a3757a332&xkcb=SoB767M3jqbMFETC8R0GbzkdCdPP&vjs=3",
    },
    {
      title: "Japanese Teacher",
      department: "Education",
      type: "Indeed Listing",
      description: "Help students build Japanese reading and speaking skills.",
      skills: ["Japanese", "Teaching", "Language Learning"],
      applyLink:
        "https://in.indeed.com/viewjob?cmp=MINDCUREPATH-CONSULTANTING-PVT-LTD&t=Teacher&jk=27522f2332312aee&q=mindcurepath&xpse=SoCT67I3jqb-_bzCSZ0LbzkdCdPP&xfps=ca550e6b-b68f-4551-9393-d77cccbaed93&xkcb=SoDm67M3jqbMFETC8R0FbzkdCdPP&vjs=3",
    },
  ];

  const departmentFilters = useMemo(
    () => ["All", ...new Set(openRoles.map((role) => role.department))],
    [openRoles],
  );

  const filteredRoles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return openRoles.filter((role) => {
      const matchesDepartment =
        selectedDepartment === "All" || role.department === selectedDepartment;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        role.title.toLowerCase().includes(normalizedSearch) ||
        role.description.toLowerCase().includes(normalizedSearch) ||
        role.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch),
        );

      return matchesDepartment && matchesSearch;
    });
  }, [openRoles, searchTerm, selectedDepartment]);

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

          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search roles by title, description, or skills..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />

                <div className="flex flex-wrap gap-2">
                  {departmentFilters.map((department) => (
                    <button
                      key={department}
                      onClick={() => setSelectedDepartment(department)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        selectedDepartment === department
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-slate-700 border-slate-300 hover:border-emerald-300 hover:text-emerald-700"
                      }`}
                    >
                      {department}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-slate-600">
                  Showing {filteredRoles.length} of {openRoles.length} roles
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filteredRoles.length === 0 ? (
              <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
                <p className="text-slate-700 font-medium mb-2">
                  No roles found for this filter.
                </p>
                <p className="text-slate-500 text-sm">
                  Try another department or clear your search text.
                </p>
              </div>
            ) : (
              filteredRoles.map((role, index) => (
                <div
                  key={`${role.title}-${index}`}
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

                  <a
                    href={role.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center rounded-2xl bg-emerald-700 text-white py-3 font-medium hover:bg-emerald-800 transition-all duration-300 shadow-[0_8px_18px_-8px_rgba(5,150,105,0.8)]"
                  >
                    Apply on Indeed
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
