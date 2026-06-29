import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PremiumAnimatedBackground from "../components/PremiumAnimatedBackground";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Mail, Phone, AlertTriangle, AlertCircle } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <>
      <ScrollToTopButton />
      <Helmet>
        <title>Terms and Conditions | MindCurePath Consultancy</title>
        <meta
          name="description"
          content="Review MindCurePath's Terms and Conditions. Understand the legal agreement governing your use of our mental wellness, education, and finance platform."
        />
        <meta
          name="keywords"
          content="terms and conditions, user agreement, legal terms, MindCurePath consultancy, wellness platform terms"
        />
        <link
          rel="canonical"
          href="https://mindcurepath.com/terms-and-conditions"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mindcurepath.com/terms-and-conditions"
        />
        <meta
          property="og:title"
          content="Terms and Conditions | MindCurePath Consultancy"
        />
        <meta
          property="og:description"
          content="Legal terms and conditions for using the MindCurePath platform and services."
        />
        <meta
          property="og:image"
          content="https://mindcurepath.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://mindcurepath.com/terms-and-conditions"
        />
        <meta
          name="twitter:title"
          content="Terms and Conditions | MindCurePath Consultancy"
        />
        <meta
          name="twitter:description"
          content="Legal terms and conditions for using the MindCurePath platform and services."
        />
        <meta
          name="twitter:image"
          content="https://mindcurepath.com/og-image.jpg"
        />
      </Helmet>

      <div className="px-[16px] sm:px-[20px]">
        <Navbar />
      </div>

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#187360] via-[#115e4c] to-[#0d3f33] animate-gradient-x py-16 sm:py-20 md:py-24 relative overflow-hidden">
          <PremiumAnimatedBackground />
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              Terms and Conditions
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              MindCurePath Consultancy Private Limited
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Introduction */}
            <div className="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                MindCurePath Consultancy Private Limited, on its own behalf and
                on behalf of its affiliates and group companies operating under
                the brand name "MindCurePath" (collectively referred to as
                "MindCurePath"), owns, operates, and manages the digital
                platform accessible at www.mindcurepath.com.
              </p>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mt-4">
                The MindCurePath Platform includes, without limitation, the
                website, mobile applications (existing or forthcoming), mobile
                website, software programs, digital tools, and other related or
                ancillary applications, products, and online services. All such
                services and digital assets are collectively referred to as the
                "MindCurePath Platform."
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                1. Nature and Applicability of Terms
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.1
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Please carefully read these Terms of Use ("Terms") along
                    with the Privacy Policy available on{" "}
                    <a
                      href="/privacy-policy"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      https://mindcurepath.com/privacy-policy
                    </a>{" "}
                    before accessing the website or using any services offered
                    through the MindCurePath Platform.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    These Terms and the Privacy Policy together form a legally
                    binding agreement ("Agreement") between you and MindCurePath
                    Consultancy Private Limited ("MindCurePath", "we", "us", or
                    "our") governing your access to and use of the website and
                    platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.2
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This Agreement applies to all users of the Website and the
                    MindCurePath Platform, including but not limited to:
                  </p>

                  <div className="space-y-4 ml-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        1.2.1 Practitioners
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Mental health professionals and other service providers,
                        such as psychologists, counselors, therapists, life
                        coaches, wellness experts, Dieticians, Yoga therapists,
                        Academic counselors/experts, Career path finder,
                        Financial experts, Accounts and GST and Taxation Expert,
                        or similar professionals or institutions (whether
                        individuals or organizations), including their
                        authorized representatives, who seek to be listed or are
                        already listed on the Website.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        1.2.2 End-Users
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Individuals, clients, patients, or their representatives
                        or affiliates who search for, interact with, or avail
                        services from Practitioners through the Website.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        1.2.3 Other Users
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Any other visitor or user accessing or using the Website
                        or Platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.3
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This Agreement governs all services provided or made
                    available by MindCurePath through the Website, whether
                    offered free of charge or for consideration (collectively
                    referred to as the "MindCurePath Platform"), including but
                    not limited to:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">
                        For Practitioners
                      </h4>
                      <p className="text-teal-700 text-sm">
                        Creation, display, and publication of Practitioner
                        profiles, professional details, and contact information
                        for visibility to other Users and visitors on the
                        Website.
                      </p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                      <h4 className="font-semibold text-teal-800 mb-2">
                        For Other Users
                      </h4>
                      <p className="text-teal-700 text-sm">
                        Facilities to register and manage user accounts, search
                        for Practitioners, book or schedule sessions, and access
                        tools, resources, content, or features provided on the
                        Platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.4 - 1.5
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The features, structure, or services of the MindCurePath
                    Platform may be modified, updated, enhanced, or discontinued
                    from time to time at the sole discretion of MindCurePath.
                    This Agreement shall apply to your continued access to and
                    use of the Website and Platform, as well as to all
                    information provided by you at any point in time.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    If you have any questions or concerns regarding this
                    Agreement, you may contact us at{" "}
                    <a
                      href="mailto:support@mindcurepath.com"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      support@mindcurepath.com
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.6 - 1.9
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    By accessing, browsing, registering on, or using the Website
                    or the MindCurePath Platform, you acknowledge that you have
                    read, understood, and irrevocably accepted these Terms, the
                    Privacy Policy, and any applicable subscription or
                    service-specific terms available on the Website.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    MindCurePath reserves the right to amend, update, modify, or
                    discontinue any part of this Agreement at any time, for any
                    reason. Any material changes shall be communicated through
                    appropriate means. Your continued use of the Website or
                    Platform after such changes constitutes your acceptance of
                    the revised Agreement.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Access to the Website and use of the MindCurePath Platform
                    is provided at the sole discretion of MindCurePath, and we
                    reserve the right to restrict, suspend, or terminate access
                    without notice, subject to applicable law.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.10 Governing Laws
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This Agreement is published in accordance with, and shall be
                    governed by and interpreted under, the laws of India,
                    including but not limited to:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>The Indian Contract Act, 1872</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>The Information Technology Act, 2000</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>
                        Information Technology (Reasonable Security Practices
                        and Procedures and Sensitive Personal Data or
                        Information) Rules, 2011
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>
                        Information Technology (Intermediary Guidelines) Rules,
                        2011
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                2. Conditions of Use
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    2.1 Eligibility and Legal Capacity
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    You must be eighteen (18) years of age or older to access,
                    register on, or use the Website or any services offered
                    through the MindCurePath Platform. By accessing,
                    registering, or using the Website or accepting this
                    Agreement, you represent and confirm to MindCurePath that
                    you are at least 18 years old and possess the legal right,
                    authority, and capacity to enter into this Agreement and to
                    comply with its terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    2.2 Use on Behalf of Another Person or Entity
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    If you access or use the MindCurePath Platform on behalf of
                    another individual (including a minor, child, ward, or
                    dependent) or on behalf of an organization or entity (such
                    as an employer or institution), you confirm that you are
                    duly authorized to do so. You further represent that you are
                    empowered to accept this Agreement and the Privacy Policy on
                    behalf of such individual or entity, and provide valid
                    consent for the collection, use, processing, and disclosure
                    of information relating to such individual or entity.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    2.3 Corporate Users
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    MindCurePath may offer specific features, programs, tools,
                    or services designed for organizations, institutions, or
                    enterprises, including but not limited to corporate offices,
                    factories, educational institutions, and other workplaces
                    (each referred to as a "Corporate User").
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Such services may include personalized wellness content,
                    workshops, therapy programs, structured assessments, and
                    evidence-based employee assistance programs, along with
                    analytical tools to help assess organizational well-being.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                3. Terms Applicable to Users Other Than Practitioners
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.2 End-User Accounts and Data Privacy
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The terms "Personal Information" and "Sensitive Personal
                    Data or Information" shall have the meanings assigned to
                    them under applicable Indian laws, including the Information
                    Technology (Reasonable Security Practices and Procedures and
                    Sensitive Personal Data or Information) Rules, 2011, and are
                    further detailed in the Privacy Policy.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Users are responsible for maintaining the confidentiality of
                    their account credentials. All activities conducted through
                    a User's account shall be deemed to be performed by the
                    User. Any suspected or actual unauthorized access must be
                    immediately reported to MindCurePath.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    If any information provided by a User is false, misleading,
                    outdated, or incomplete, MindCurePath reserves the right to
                    suspend or terminate the User's access to the Platform at
                    its sole discretion.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.3 Practitioner Listing & Relevance Algorithm
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Practitioner listings on the MindCurePath Platform are
                    generated through an automated system based on multiple
                    factors, including profile details, availability, and User
                    inputs such as feedback. These listings do not constitute
                    rankings, recommendations, or endorsements by MindCurePath.
                    MindCurePath does not guarantee the accuracy, order, or
                    relevance of such listings.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.4 Listing Content and Information Disclaimer
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    MindCurePath displays Practitioner-provided information such
                    as qualifications, specialization, fees, location, and
                    availability. While reasonable efforts are made to verify
                    and update such information, MindCurePath does not guarantee
                    its completeness or accuracy.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    The Platform is provided on an "as is" and "as available"
                    basis without warranties of any kind. MindCurePath disclaims
                    all express or implied warranties, including accuracy,
                    fitness for purpose, or non-infringement, to the fullest
                    extent permitted by law.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.5 Booking Consultations
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Users may connect with Practitioners through online booking,
                    tele-consultation (chat, audio, or video), or other
                    communication channels supported by the Platform.
                    MindCurePath acts solely as a facilitator and does not
                    provide medical advice or treatment.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    MindCurePath shall not be liable for Practitioner conduct,
                    treatment quality, fees, cancellations, or outcomes of
                    consultations. All cancellations, rescheduling, and refunds
                    shall be governed by the MindCurePath Rescheduling, Refund &
                    Cancellation Policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.6 Rescheduling Policy
                  </h3>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                    <p className="text-amber-800 font-medium flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Important Policy Notice
                    </p>
                  </div>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        A minimum 24-hour notice is required for rescheduling.
                        Late rescheduling or not attending a booked session
                        without notice may result in full session charges.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        If a Practitioner cancels or fails to attend a paid
                        session, Users may contact support@mindcurepath.com
                        within five (5) days. Eligible reschedule shall be
                        processed within six (6) business days.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        All rescheduling requests must be made via the Platform
                        or official email. Requests outside business hours shall
                        be processed on the next working day.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.7 No Doctor-Patient Relationship; Emergency Disclaimer
                  </h3>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200 mb-4">
                    <p className="text-red-800 font-medium flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Critical Information
                    </p>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Information on the Platform is for informational purposes
                    only and does not establish a doctor-patient or
                    therapist-client relationship with MindCurePath.
                    MindCurePath makes no guarantees regarding the accuracy or
                    outcomes of information provided.
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    The Platform is not intended for emergency use. In case of
                    immediate risk or suicidal thoughts, Users must contact
                    local emergency services (India: 112) or visit the nearest
                    hospital.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                4. Terms Applicable to Practitioners
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    4.1 Listing Policy
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    MindCurePath may collect, directly or indirectly,
                    information relating to a Practitioner's profile,
                    professional details, contact information, and practice for
                    the purpose of facilitating interaction with End-Users and
                    other Users.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    MindCurePath reserves the right to publish, modify, suspend,
                    or remove any Practitioner profile, with or without prior
                    notice. Practitioners are required to promptly inform
                    MindCurePath of any incorrect or outdated information
                    displayed on their profile.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    4.2 Profile Ownership and Editing Rights
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    MindCurePath provides tools enabling Practitioners to
                    request updates to their profile information.
                    Notwithstanding the foregoing, MindCurePath retains
                    ownership and control over Practitioner profiles and
                    associated content displayed on the Platform and reserves
                    the right to approve, modify, or reject requested changes at
                    its sole discretion.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    4.5 Practitioner Undertakings
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The Practitioner represents, warrants, and undertakes that:
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        They are appropriately registered, licensed, and
                        qualified under applicable Indian laws to provide their
                        respective services.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        They possess the requisite training, competence,
                        experience, and professional expertise to deliver
                        services with due skill, care, and diligence.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        They shall maintain high standards of ethics,
                        professionalism, courtesy, and service quality at all
                        times.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span>
                        They shall be solely responsible for compliance with all
                        applicable laws governing their respective services.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                5. MindCurePath Feed
              </h2>

              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  The MindCurePath Feed is a digital content environment
                  available on the Website where registered Practitioners may
                  log in and share content for informational and educational
                  purposes. Content shared on the Feed does not constitute
                  medical advice and must not be interpreted as diagnosis or
                  treatment.
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    5.4 Intellectual Property Representations
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Practitioners represent and warrant that they are the
                    original creators or lawful owners of the Content uploaded
                    by them and that such Content does not infringe any
                    third-party intellectual property or proprietary rights.
                    MindCurePath may remove any Content that it reasonably
                    believes violates intellectual property rights.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    5.7 Prohibited Content
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Practitioners and Users must ensure that Content and
                    responses are not unlawful, harmful, harassing, defamatory,
                    obscene, pornographic, hateful, invasive of privacy, or
                    otherwise objectionable. Content must not threaten the
                    unity, integrity, security, or sovereignty of India,
                    friendly relations with foreign states, public order, or
                    incite the commission of any cognizable offence.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6-7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                6-7. Specific Terms & Content Rights
              </h2>

              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  Users may be subject to additional terms, conditions, usage
                  rules, incentive plans, subscription plans, or fair usage
                  policies applicable to specific features, services, or
                  offerings made available on the MindCurePath Platform from
                  time to time ("Specific Terms").
                </p>

                <p className="text-slate-600 leading-relaxed">
                  MindCurePath maintains a strict content governance framework
                  in accordance with applicable Indian laws. Users are solely
                  responsible for ensuring that any content shared, uploaded, or
                  transmitted through the Platform is lawful, accurate,
                  respectful, and does not infringe the rights of any
                  individual, entity, or authority.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  MindCurePath reserves the right to monitor, restrict, disable,
                  or remove any content that is found to be in violation of
                  these Terms or applicable law. MindCurePath may retain
                  relevant records and information for a minimum period of
                  ninety (90) days and cooperate with lawful governmental or
                  regulatory investigations as required.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                8. Termination
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath reserves the right to suspend, restrict, or
                permanently terminate a User's access to the Website and the
                MindCurePath Platform, with or without prior notice, in the
                event that:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    The User violates any provision of these Terms of Use or the
                    Agreement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    A third party reports or alleges infringement of its rights
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    MindCurePath is unable to verify information provided by the
                    User
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    The User has engaged in illegal, fraudulent, abusive, or
                    unethical conduct
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Upon termination, the User shall immediately cease all use of
                the Website and Platform. The User will no longer have access to
                any data, messages, files, or other materials stored on the
                Platform. Users are solely responsible for maintaining
                independent backups of any personal or health-related records.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                9. Limitation of Liability
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                To the maximum extent permitted under applicable law,
                MindCurePath shall not be liable to you or to any third party
                for any indirect, incidental, consequential, special, exemplary,
                or punitive damages arising out of or in connection with your
                access to, use of, or inability to use the Website, the
                MindCurePath Platform, or any services made available thereon.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Under no circumstances shall the total aggregate liability of
                MindCurePath for all claims exceed the total amount actually
                paid by you to MindCurePath for the specific service giving rise
                to such claim, if any.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nothing in this clause shall exclude or limit MindCurePath's
                liability for death or personal injury caused by its proven
                negligence, fraud or fraudulent misrepresentation, or any
                liability which cannot be excluded or limited under applicable
                law.
              </p>
            </section>

            {/* Section 10-13 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                10-13. Retention, Indemnification & Severability
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    10. Retention and Removal
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    MindCurePath may retain information collected from Users for
                    such duration as is reasonably necessary, having regard to
                    the nature of the information, the purpose and manner in
                    which it is processed, and the requirements of applicable
                    laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    11. Indemnification
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    You agree to indemnify, defend, and hold harmless
                    MindCurePath, along with its directors, officers, employees,
                    representatives, and agents, from and against any and all
                    claims, demands, actions, liabilities, damages, losses,
                    costs, or expenses arising out of your access to or use of
                    the Website and Platform, breach of these Terms, or
                    violation of any third-party rights.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    12. Changes to These Terms
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    MindCurePath reserves the right to revise, update, modify,
                    or replace these Terms of Use at any time, at its sole
                    discretion, without prior notice. Any such changes shall
                    become effective immediately upon being published on the
                    Website.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    13. Severability
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    If any provision of these Terms of Use is held to be
                    unlawful, invalid, void, or unenforceable, such provision
                    shall be severed from the Terms and shall not affect the
                    validity, legality, or enforceability of the remaining
                    provisions.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                14. Grievance Redressal
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                In accordance with the provisions of the Information Technology
                Act, 2000 and the rules made thereunder, MindCurePath has
                established a structured grievance redressal mechanism to
                address concerns, complaints, or grievances raised by Users.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you are dissatisfied with any aspect of the services or have
                any grievance regarding the Platform, you may contact the
                Grievance Redressal Officer at:
              </p>
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 mb-4">
                <p className="text-teal-800 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email:</span>
                  <a
                    href="mailto:support@mindcurepath.com"
                    className="text-teal-700 hover:text-teal-800 underline"
                  >
                    support@mindcurepath.com
                  </a>
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath is committed to addressing and resolving all valid
                grievances in a time-bound manner, and in any case, within a
                period not exceeding one (1) month from the date of receipt of
                the complaint.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                15. Jurisdiction
              </h2>

              <p className="text-slate-600 leading-relaxed">
                These jurisdictional provisions are framed in accordance with
                and subject to the laws of India. Any dispute, claim, or legal
                proceeding arising out of or in connection with this policy, the
                Website, the services offered, or the interpretation of these
                Terms shall be subject to the exclusive jurisdiction of the
                competent courts located in Shamli, UP, India.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                16. Medical Disclaimer
              </h2>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                <p className="text-amber-800 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Medical Disclaimer
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Nothing contained in these Terms shall be construed as medical
                advice, diagnosis, treatment, emergency care, or healthcare
                guidance of any kind. MindCurePath does not provide medical,
                clinical, or therapeutic services and does not practice
                medicine, psychology, or healthcare.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The platform functions solely as a technology-enabled interface
                to facilitate access to independent professionals. Any
                interaction, consultation, advice, or services provided by such
                professionals are rendered independently and are not supervised,
                controlled, or guaranteed by MindCurePath.
              </p>
              <p className="text-slate-600 leading-relaxed">
                To the maximum extent permitted under applicable law,
                MindCurePath, its directors, officers, employees, agents, and
                affiliates shall not be responsible or liable for any physical
                injury, emotional distress, disability, loss, harm, or death
                that may arise from the use of the Platform or from reliance on
                any services, advice, or interactions with independent
                professionals.
              </p>
            </section>

            {/* Section 17 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                17. Emergency and Crisis Disclaimer
              </h2>

              <div className="p-4 bg-red-50 rounded-xl border border-red-200 mb-4">
                <p className="text-red-800 font-medium flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Notice
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath is not designed to provide emergency services or
                immediate medical, psychological, or crisis intervention. The
                Platform should not be used in situations requiring urgent
                medical attention, mental health emergencies, or
                life-threatening circumstances.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you are experiencing a medical emergency, severe
                psychological distress, thoughts of self-harm, harm to others,
                or any situation that requires immediate assistance, you should
                immediately contact local emergency services, a qualified
                medical professional, or a recognized emergency helpline.
              </p>
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 mb-4">
                <p className="text-slate-800 font-medium mb-2">
                  For immediate assistance in India:
                </p>
                <p className="text-slate-700 text-lg font-semibold">
                  National Mental Health Helpline: 1800-599-0019
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath shall not be responsible or liable for any delay,
                inability to access services, or outcomes arising from reliance
                on the Platform or its professionals in emergency or crisis
                situations. Use of the Platform does not replace or substitute
                professional emergency care, diagnosis, or treatment.
              </p>
            </section>

            {/* Section 18 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                18. Contact Information
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                For any queries, support requests, or concerns related to these
                Terms and Conditions or the MindCurePath Platform, you may
                contact us using the details provided below:
              </p>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Registered Office Address:
                </h3>
                <div className="space-y-3 text-slate-700">
                  <p className="font-medium text-slate-900">
                    MindCurePath Consultancy Private Limited
                  </p>
                  <p>Thanabhawan, Shamli,</p>
                  <p>Uttar Pradesh, India – 247777</p>
                  <div className="pt-3 mt-3 border-t border-slate-200">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">Phone:</span>
                      <a
                        href="tel:7078497263"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        7078497263
                      </a>
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Email:</span>
                      <a
                        href="mailto:support@mindcurepath.com"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        support@mindcurepath.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                MindCurePath endeavors to respond to all legitimate
                communications within a reasonable timeframe.
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
