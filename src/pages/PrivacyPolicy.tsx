import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Check,
  XCircle,
  Mail,
  Phone,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MindCurePath</title>
        <meta
          name="description"
          content="Read MindCurePath's Privacy Policy to understand how we collect, use, and protect your personal information."
        />
      </Helmet>

      <div className="px-[20px]">
        <Navbar />
      </div>
      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0b1220] via-[#0f1d32] to-[#0a1528] py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              MindCurePath Consultancy Private Limited
            </p>
            <p className="mt-2 text-sm text-slate-400">
              CIN: U62090UP2025PTC239472
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Introduction */}
            <div className="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                MindCurePath Consultancy Private Limited (collectively referred
                to as "MindCurePath", "we", "our", or "us", including our
                affiliates). MindCurePath values your privacy and is committed
                to safeguarding your personal data. This Privacy Policy explains
                how we collect, use, store, share, and protect personal
                information of users accessing or using the MindCurePath
                Platform.
              </p>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mt-4">
                MindCurePath owns and operates the website www.mindcurepath.com,
                along with its mobile applications (upcoming), mobile website,
                digital tools, online platforms, products, and services
                (collectively referred to as the "MindCurePath Platform").
              </p>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mt-4 font-medium">
                By accessing or using the MindCurePath Platform, you agree to
                this Privacy Policy and the applicable Terms & Conditions.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                1. Purpose of This Privacy Policy
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.1 Legal Compliance Statement
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This Privacy Policy has been prepared in accordance with
                    applicable laws of India and reflects MindCurePath's
                    commitment to lawful, fair, and transparent collection, use,
                    processing, and protection of personal data.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This Privacy Policy is designed to align with the following
                    Indian laws and rules:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>
                        Section 43A of the Information Technology Act, 2000
                      </span>
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
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>Digital Personal Data Protection Act, 2023</span>
                    </li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    MindCurePath does not claim any certification, registration,
                    or governmental approval unless expressly required and
                    obtained. References to these laws are made solely for
                    transparency and compliance intent.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    This Policy explains:
                  </p>
                  <ul className="space-y-2 text-slate-600 mt-2">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>Types of personal data collected</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>
                        Purpose and methods of data collection and processing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>
                        Data storage, retention, and deletion practices
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>
                        Circumstances under which data may be disclosed
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.2 Force Majeure
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Force Majeure means any event or circumstance beyond the
                    reasonable control of MindCurePath or the User, which
                    prevents, delays, or interrupts the performance of
                    obligations under these Terms, including but not limited to
                    natural disasters, acts of government, system failures,
                    cyber incidents, or disruptions in communication networks.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.3 Registration
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Registration refers to the process by which a User enrolls
                    with MindCurePath by providing required information to
                    create an account for accessing the Platform and its
                    services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.4 Platform
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Platform means the digital infrastructure operated by
                    MindCurePath, including its website, applications (present
                    or future), tools, and services made available to Users for
                    accessing guidance, consultations, or related offerings.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.5 Site
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Site refers to the official website of MindCurePath through
                    which Users may obtain information, register, and connect
                    with practitioners, consultants, or service providers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    1.6 Consent & Acceptance
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    By accessing or using the MindCurePath Platform, submitting
                    your personal information, using any features of the
                    website, or completing a payment, you expressly agree to the
                    collection, storage, processing, use, sharing, and transfer
                    of your personal information in accordance with this Privacy
                    Policy.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    By voluntarily providing your information and accepting this
                    Privacy Policy, you authorize MindCurePath to contact you
                    through calls, messages, emails, or other communication
                    modes for service-related communication, appointment
                    coordination, support assistance, and to help you understand
                    or access the services available on the Platform.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    You confirm that all personal information shared by you is
                    provided willingly and without coercion. You may choose not
                    to provide certain information; however, such choice may
                    limit your access to specific features or services.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    You also have the right to withdraw your consent at any time
                    by notifying MindCurePath in writing at{" "}
                    <a
                      href="mailto:support@mindcurepath.com"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      support@mindcurepath.com
                    </a>
                    . Upon withdrawal of consent, MindCurePath may be unable to
                    continue providing certain services and may restrict or
                    discontinue your access to the Platform, to the extent
                    permitted by law.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                2. Collection of Personal Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    2.1 General
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Certain features of the Platform require collection of
                    information that identifies or may reasonably identify a
                    User. Information may be collected during registration,
                    service usage, communication with us, or interaction through
                    emails, calls, or forms.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    By using the Platform, you voluntarily consent to such
                    collection.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    2.2 Categories of Information Collected
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        a) Contact Information
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Name, email address, phone number.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        b) Demographic Information
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Age, gender, and similar non-sensitive details.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        c) Platform Usage Data
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Appointment history, interactions, and activity logs.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        d) Voluntarily Shared Information
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Information shared via uploads, feedback, forms, emails,
                        or correspondence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                3. Personal Information & Sensitive Personal Data
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.1 Personal Information
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Any information that directly or indirectly identifies an
                    individual.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    3.2 Sensitive / Wellness-Related Information
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    MindCurePath may collect limited wellness or health-related
                    information voluntarily shared by users strictly for
                    providing personalized guidance, assessments, or
                    consultations.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 mb-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" /> We Do
                      </p>
                      <ul className="space-y-2 text-green-700 text-sm">
                        <li>Access is restricted on a need-to-know basis</li>
                        <li>Shared only with authorized professionals</li>
                        <li>
                          Not disclosed without consent, except where legally
                          required
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" /> We Don't
                        Require
                      </p>
                      <ul className="space-y-2 text-red-700 text-sm">
                        <li>Aadhaar, PAN, passport, or government ID</li>
                        <li>Religion, caste, political opinion, or race</li>
                        <li>Unnecessary personal or sensitive details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                4. Publicly Available Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath may collect, access, or use information that is
                lawfully available in the public domain or made publicly
                accessible by the User, without requiring additional or separate
                consent. Such information may include content that the User has
                voluntarily shared on publicly accessible platforms,
                directories, professional profiles, social media platforms, or
                other open sources, where such access is permitted by applicable
                law.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Publicly available information may be used by MindCurePath
                solely for legitimate business purposes, including platform
                functionality, verification of publicly listed professional
                details, communication, service improvement, analytics,
                research, and compliance with legal obligations. MindCurePath
                does not combine publicly available information with sensitive
                personal data in a manner that violates applicable data
                protection laws.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Any use of publicly available information shall be carried out
                in a lawful, fair, and transparent manner, and MindCurePath
                shall not be responsible for the accuracy, completeness, or
                reliability of such information obtained from public sources.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nothing contained in this section permits MindCurePath to access
                or use private, restricted, or confidential information that is
                not lawfully available in the public domain.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                5. Nature of Data Processing
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                MindCurePath follows a structured and lawful approach to the
                collection, handling, and processing of personal data in order
                to ensure transparency, data security, and user trust. The
                nature of data processing carried out by MindCurePath includes
                the following:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    5.1 Collection
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Personal information is collected through secure digital
                    channels such as registration forms, service inquiries,
                    appointment bookings, assessments, and direct communication
                    during sessions or interactions on the Platform. Data is
                    collected only to the extent necessary for providing
                    services and complying with legal obligations.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    5.2 Usage
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Collected data is used for legitimate purposes, including
                    service delivery, appointment coordination, communication
                    with Users, customer support, internal analysis, and
                    platform improvement. Usage of data is limited to purposes
                    that are relevant, lawful, and clearly communicated to
                    Users.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    5.3 Storage
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    All personal information is stored using secure, encrypted,
                    and access-controlled systems. MindCurePath implements
                    reasonable technical and organizational measures to prevent
                    unauthorized access, alteration, loss, or misuse of data.
                    Access to stored data is restricted to authorized personnel
                    on a need-to-know basis.
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    5.4 Sharing
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Personal data is shared only with authorized personnel,
                    practitioners. Data may also be disclosed where required by
                    law, regulation, court order, or government authority.
                    MindCurePath does not share personal information without
                    user consent except in legally mandated circumstances.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                6. User Consent & Purpose of Use
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                By accessing, registering on, or using the MindCurePath
                Platform, and by voluntarily providing personal information,
                Users provide their free, informed, and explicit consent to the
                collection, processing, storage, and use of such information in
                accordance with this Privacy Policy and applicable laws.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Personal information collected by MindCurePath may be used for
                the following purposes:
              </p>
              <ul className="space-y-3 text-slate-600 mb-6">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>
                    To enable secure access to the Platform and deliver services
                    efficiently;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>
                    To facilitate appointment scheduling, confirmations,
                    rescheduling, and related communications;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>
                    To provide customer support, respond to inquiries, and
                    resolve service-related issues;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>
                    To process payments and complete lawful transactions;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>
                    To share important service-related updates, notifications,
                    or information, where the User has provided consent;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>
                    To improve platform functionality, user experience, and
                    service quality through lawful analytics and feedback.
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">
                MindCurePath processes personal data strictly for legitimate,
                specified, and transparent purposes and does not use such data
                in a manner inconsistent with this Privacy Policy.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                  6.1 Communication Consent
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  By providing contact details, Users consent to being contacted
                  by MindCurePath through calls, SMS, emails, or messaging
                  platforms for purposes including service delivery, appointment
                  coordination, support assistance, and essential
                  platform-related communications.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Users may withdraw their communication consent at any time by
                  writing to{" "}
                  <a
                    href="mailto:support@mindcurepath.com"
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    support@mindcurepath.com
                  </a>
                  . Please note that withdrawal of consent may limit or restrict
                  access to certain services that require communication for
                  effective delivery.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                7. Use, Disclosure & Sharing of Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath uses, discloses, and shares personal information
                only in a lawful, fair, and transparent manner and strictly in
                accordance with this Privacy Policy and applicable data
                protection laws. Information is shared only to the extent
                necessary for providing services, operating the Platform, or
                meeting legal obligations.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Personal information may be shared in the following
                circumstances:
              </p>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    <strong className="text-slate-800">
                      With Internal Teams and Professionals:
                    </strong>{" "}
                    Information may be accessed by MindCurePath employees,
                    practitioners, consultants, or authorized professionals on a
                    need-to-know basis for service delivery, consultation
                    support, administration, and quality improvement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    <strong className="text-slate-800">
                      Legal and Regulatory Disclosures:
                    </strong>{" "}
                    Information may be disclosed where required by applicable
                    law, regulation, court order, governmental authority, or
                    lawful request, or where necessary to enforce platform
                    policies or protect legal rights, safety, or security.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    <strong className="text-slate-800">
                      Business Transfers or Restructuring:
                    </strong>{" "}
                    In the event of a merger, acquisition, restructuring, or
                    transfer of business assets, user information may be
                    transferred to the relevant entity, subject to continued
                    protection under this Privacy Policy.
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                All third parties with whom information is shared are
                contractually obligated to maintain strict confidentiality,
                implement appropriate security safeguards, and use the
                information only for the purposes authorized by MindCurePath.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                8. Payment Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath facilitates payments through secure and reputable
                third-party payment gateway service providers to ensure safe and
                efficient transaction processing. All online payments made on
                the Platform are subject to the terms, conditions, and privacy
                policies of the respective payment gateway providers.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath does not store, process, or retain Users' debit
                card, credit card, UPI, or net banking details on its servers,
                except where such storage is required to comply with applicable
                laws or regulatory obligations. Sensitive payment information is
                handled directly by the authorized payment gateways using
                industry-standard security protocols and encryption measures.
              </p>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath may receive limited transaction-related
                information, such as payment confirmation, transaction
                identifiers, and billing status, solely for record-keeping,
                reconciliation, customer support, and legal compliance purposes.
                Users are advised to exercise caution while making online
                payments and ensure that they use secure devices and networks.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                9. Automatically Collected Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                IP address, browser type, device information, timestamps, and
                usage data may be collected for analytics, security, and system
                improvement. Whenever you access or use the MindCurePath
                Platform, certain information may be automatically collected by
                our systems or by authorized third-party service providers. This
                information may include details such as your device type, IP
                address, browser information, operating system, referral pages,
                pages visited on the Platform, time spent on such pages, search
                queries, date and time of access, and similar usage-related
                data.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Such information is collected for purposes including system
                security, performance monitoring, statistical analysis,
                understanding user behavior, improving platform functionality,
                enhancing user experience, and administering the services
                effectively. The data is generally analyzed in an aggregated or
                anonymized manner and is not used to personally identify Users
                unless required for security, legal, or operational reasons.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                10. Cookies Policy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath uses cookies and similar tracking technologies to
                collect limited information for functional and analytical
                purposes. Cookies are small text files stored on your device
                that help the Platform recognize your browser and improve your
                overall experience.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may use persistent cookies to remember login preferences and
                enhance convenience during future visits. We may also use
                session-based cookies to enable core website functions,
                understand user interaction patterns, monitor traffic flow, and
                improve Platform performance. Session cookies are automatically
                deleted once you log out and close your browser.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath may engage trusted third-party service providers
                that place or access cookies on your device to support
                analytics, performance optimization, or service enhancement. Use
                of such third-party services is governed by their respective
                privacy policies and terms, and MindCurePath shall not be
                responsible for the practices of such third parties.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You may control or disable cookies through your browser
                settings. Please note that restricting cookies may affect the
                availability or functionality of certain features of the
                Platform.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                11. Third-Party Links & User Content
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath is not responsible for privacy practices of
                external websites. Publicly shared user content is accessed at
                user discretion. The MindCurePath Platform may include links to
                third-party websites or resources for informational or
                convenience purposes. Such external websites are not owned,
                managed, or controlled by MindCurePath.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath does not assume responsibility for the content,
                accuracy, availability, updates, or practices of any third-party
                website, including any information, links, or materials provided
                on such websites. The presence of external links on the Platform
                does not imply endorsement, sponsorship, or association with the
                operators or owners of those websites.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you choose to access any third-party website through a link
                on the Platform, you do so at your own discretion and risk. Your
                use of such websites will be governed by their respective terms
                of use, privacy policies, and other applicable policies.
              </p>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath shall not be liable, directly or indirectly, for
                any loss, damage, or harm arising from or in connection with
                your access to or reliance on any content, services,
                advertisements, products, communications, or materials available
                on or through such external websites, including but not limited
                to offensive, misleading, defamatory, or unlawful content.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                12. Data Security
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath implements reasonable administrative, technical,
                and physical safeguards to protect personal information under
                its control against unauthorized access, misuse, alteration, or
                disclosure. Personal data is handled through systems and
                procedures designed in accordance with generally accepted
                industry standards for data privacy and information security.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath does not record online video-based sessions
                conducted through the Platform, unless expressly communicated
                and consented to by the User.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Despite the security measures in place, Users are advised to
                exercise caution and avoid sharing personal or sensitive
                information in public areas of the Platform, including
                discussion forums, comment sections, or any other publicly
                accessible spaces, as such information may be visible to others.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                13. Confidentiality & Exceptions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath is committed to maintaining the confidentiality and
                privacy of all information shared by Users during consultations,
                assessments, or interactions on the Platform. Any personal or
                wellness-related information disclosed during a consultation is
                treated as confidential and is protected in accordance with
                applicable laws and this Privacy Policy.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Confidentiality may be limited or information may be disclosed
                only under the following circumstances:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Where a MindCurePath practitioner or the platform reasonably
                    believes that there is a serious, real, or imminent risk to
                    the health, safety, or life of the User or any other
                    individual, or to public safety;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Where disclosure is required under applicable law,
                    regulation, court order, or direction of a lawful authority;
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                Except in the situations stated above, personal information
                shared on MindCurePath shall not be disclosed to any third party
                without the prior consent of the User, which may be provided
                verbally or through written or electronic communication.
              </p>
              <p className="text-slate-600 leading-relaxed">
                All employees, practitioners, consultants, trainees, and
                authorized third-party service providers engaged by MindCurePath
                are contractually obligated to adhere to strict confidentiality
                and data protection standards while handling User information.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                14. Third-Party Disclosure
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath does not sell, rent, or trade Users' personal
                information, including sensitive or wellness-related data, to
                third parties for commercial purposes. Any sharing of personal
                information is carried out strictly in accordance with this
                Privacy Policy and applicable data protection laws.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Personal information may be shared with trusted third-party
                service providers, such as website hosting partners, technology
                vendors, payment processors, and operational support providers,
                solely for the purpose of operating the Platform, delivering
                services, and improving user experience. All such parties are
                contractually bound to maintain confidentiality and implement
                appropriate data security measures.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath may also disclose personal information where such
                disclosure is required to:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Comply with applicable laws, regulations, or legal
                    processes;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>Enforce Platform policies or contractual terms;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Protect the rights, property, or safety of MindCurePath, its
                    Users, or the public.
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Information that does not personally identify Users, and which
                is aggregated or anonymized, may be used or shared for
                analytics, research, marketing insights, or statistical
                purposes.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                15. Account Deactivation & Data Retention
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Users may request account deletion by contacting{" "}
                <a
                  href="mailto:support@mindcurepath.com"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  support@mindcurepath.com
                </a>
                .
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Data is retained only:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>As long as necessary for service delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>As required under applicable law</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Session and scheduling data is ordinarily deleted or anonymized
                within a reasonable period unless legally required.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                16. Practitioners & End-Users
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    16.1 Practitioner Information
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Information provided by practitioners, including
                    professional details, qualifications, experience, and
                    service offerings, is collected and used solely for the
                    purpose of creating and displaying practitioner profiles on
                    the MindCurePath Platform. This information helps users
                    understand available services, make informed choices, and
                    enables smooth delivery of consultations, guidance, and
                    related professional services. Practitioner data may also be
                    used for verification, quality control, administrative
                    communication, and platform operations, in accordance with
                    applicable laws and this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    16.2 End-User Information
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Information collected from end-users is used to facilitate
                    access to the Platform, manage appointments, deliver
                    services, provide customer support, and enhance overall user
                    experience. End-user data may also be analyzed internally to
                    improve platform functionality, optimize service delivery,
                    resolve technical issues, and ensure effective operation of
                    MindCurePath's digital services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    16.3 Anonymized and Aggregated Data
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    MindCurePath may use anonymized or aggregated data derived
                    from practitioner and end-user information for research,
                    analytics, service improvement, performance evaluation, and
                    business insights. Such data does not identify any
                    individual user or practitioner and is used strictly for
                    lawful purposes, including improving platform quality,
                    understanding usage trends, and enhancing service
                    effectiveness.
                  </p>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  All practitioner and end-user data is handled in accordance
                  with this Privacy Policy, applicable data protection laws, and
                  reasonable security practices to ensure confidentiality,
                  integrity, and responsible use of information.
                </p>
              </div>
            </section>

            {/* Section 17 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                17. Children, Minors, and Legal Guardianship
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The MindCurePath Platform is generally accessible to users of
                all age groups. However, use of the Platform and its services by
                individuals below the age of eighteen (18) years requires the
                discretion, supervision, and prior consent of a parent or legal
                guardian.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                By allowing a minor or any individual who is legally incapable
                of providing valid consent (including persons of unsound mind)
                to access or use the MindCurePath Platform, it shall be deemed
                and represented that the parent or legal guardian has reviewed,
                approved, and consented to such access and use, and that
                appropriate parental or guardian supervision is being exercised
                at all times.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath shall not be responsible or liable for any
                accident, injury, loss, harm, damage, or adverse consequence of
                any nature, including loss of life, arising from or related to
                the access or use of the Platform or its services by a minor or
                legally incapacitated person, to the maximum extent permitted
                under applicable law.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If MindCurePath becomes aware that personal information of a
                minor has been collected without valid parental or guardian
                consent, such information shall be deleted or anonymized within
                a reasonable period, unless retention of such information is
                required under applicable law, regulation, or legal obligation.
              </p>
            </section>

            {/* Section 18 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                18. Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath reserves the right to modify, update, or revise
                this Privacy Policy at any time in order to reflect changes in
                legal requirements, business practices, or the manner in which
                personal information is processed.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If any material changes are made to this Privacy Policy,
                particularly those affecting how Users' personal data is
                collected, used, or shared, MindCurePath will provide reasonable
                notice by displaying an update on the Platform or by
                communicating the changes through email or other appropriate
                means. Users are encouraged to review the updated Privacy Policy
                before continuing to use the Platform.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If a User does not agree with any revised terms of this Privacy
                Policy, the User may choose to discontinue use of the Platform
                and may request account deactivation by contacting{" "}
                <a
                  href="mailto:support@mindcurepath.com"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  support@mindcurepath.com
                </a>
                .
              </p>
              <p className="text-slate-600 leading-relaxed">
                Unless otherwise stated, the revised Privacy Policy shall apply
                to all personal information held by MindCurePath at the time of
                the update. Continued access to or use of the Platform after the
                revised Privacy Policy has been published or notified shall be
                deemed acceptance of the updated terms.
              </p>
            </section>

            {/* Section 19 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                19. Grievance Redressal / Data Protection Contact
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong className="text-slate-800">
                  Grievance Redressal Mechanism
                </strong>
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                In compliance with the provisions of the Information Technology
                Act, 2000 and the rules framed thereunder, MindCurePath has
                established a structured grievance redressal mechanism to
                address concerns or complaints raised by Users regarding the
                Platform or its services.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any complaints, concerns, or dissatisfaction related
                to the services, data handling, or user experience on
                MindCurePath, you may contact our designated Grievance Redressal
                Contact at:
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
                MindCurePath is committed to acknowledging and resolving user
                grievances in a fair and timely manner. We aim to respond to all
                valid complaints within a reasonable period, not exceeding
                thirty (30) days from the date of receipt of the grievance.
              </p>
            </section>

            {/* Section 20 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                20. Jurisdiction & Governing Law
              </h2>
              <p className="text-slate-600 leading-relaxed">
                This Privacy Policy shall be governed by and interpreted in
                accordance with the laws of India. All rights, obligations, and
                disputes arising out of or in connection with this Policy,
                including its interpretation, validity, or enforcement, shall be
                subject to the exclusive jurisdiction of the competent courts
                located at Shamli, Uttar Pradesh, India.
              </p>
            </section>

            {/* Section 21 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                21. Medical Disclaimer
              </h2>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                <p className="text-amber-800 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Medical Disclaimer
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                This Privacy Policy is intended solely to explain how personal
                data is collected, used, processed, and protected on the
                MindCurePath Platform. Nothing contained in this Privacy Policy
                shall be construed as medical advice, diagnosis, treatment,
                emergency care, or healthcare guidance of any kind.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath does not provide medical, clinical, or therapeutic
                services and does not practice medicine, psychology, or
                healthcare. The platform functions solely as a
                technology-enabled interface to facilitate access to independent
                professionals. Any interaction, consultation, advice, or
                services provided by such professionals are rendered
                independently and are not supervised, controlled, or guaranteed
                by MindCurePath.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                To the maximum extent permitted under applicable law,
                MindCurePath, its directors, officers, employees, agents, and
                affiliates shall not be responsible or liable for any physical
                injury, emotional distress, disability, loss, harm, or death
                that may arise, directly or indirectly, from the use of the
                Platform or from reliance on any services, advice, or
                interactions with independent professionals.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Further, MindCurePath shall not be liable for any costs,
                damages, losses, expenses, claims, or consequences, including
                any medical expenses or incidental or consequential losses,
                arising from unforeseen circumstances, professional
                interactions, or user decisions. Any consideration, fees, or
                payments made on the Platform shall be governed strictly by the
                applicable rescheduling policies, where applicable and as
                permitted under law.
              </p>
            </section>

            {/* Section 22 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                22. Emergency and Crisis Disclaimer
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
              <p className="text-slate-600 leading-relaxed mb-4">
                You should not rely on the MindCurePath Platform, its content,
                or any professionals accessed through the Platform for emergency
                or crisis support.
              </p>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath shall not be responsible or liable for any delay,
                inability to access services, or outcomes arising from reliance
                on the Platform or its professionals in emergency or crisis
                situations. Use of the Platform does not replace or substitute
                professional emergency care, diagnosis, or treatment.
              </p>
            </section>

            {/* Section 23 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                23. Contact Information
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                For any queries, support requests, or concerns related to this
                Privacy Policy or the MindCurePath Platform, you may contact us
                using the details provided below:
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
                        href="tel:+918447537710"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        +91 84475 37710
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
