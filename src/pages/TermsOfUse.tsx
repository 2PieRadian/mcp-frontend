import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Mail, AlertTriangle } from "lucide-react";

export default function TermsOfUse() {
  return (
    <>
      <ScrollToTopButton />
      <Helmet>
        <title>Terms of Use | MindCurePath</title>
        <meta
          name="description"
          content="Read MindCurePath's Terms of Use governing your access to and use of our platform and services."
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
              Terms of Use
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              MindCurePath
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Acceptance of Terms of Use
              </h2>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  Please read these Terms of Use carefully before accessing or
                  using the Website. By accessing, browsing, registering on, or
                  otherwise using the Website, you confirm that you have read,
                  understood, and agreed to be legally bound by these Terms of
                  Use and the associated Privacy Policy. If you do not agree
                  with any provision of these Terms, you must immediately
                  discontinue use of the Website.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                To become a registered user ("User", "you", or "your") and to
                access the services, features, tools, and functionalities
                offered through the Website ("MindCurePath Services"), you are
                required to accept these Terms of Use in their entirety, along
                with the Privacy Policy. Your continued use of the Website,
                including availing of any services or completing any
                transactions through the Website, shall constitute your explicit
                consent and acceptance of these Terms.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nothing contained in these Terms shall be construed as creating
                any rights, benefits, or obligations in favor of any third
                party, unless expressly stated otherwise under applicable law.
              </p>
            </section>

            {/* Modification of Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Modification of Terms
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath reserves the right to amend, revise, update, or
                modify these Terms of Use at any time, at its sole discretion,
                without prior notice. Such changes may be made to reflect,
                including but not limited to, updates in business operations,
                technological developments, changes in applicable laws or
                regulations, or enhancements to services offered through the
                Website.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Any revised Terms shall become effective immediately upon being
                posted on the Website. Your continued access to or use of the
                Website and MindCurePath Services after such modifications have
                been published shall be deemed as your acceptance of the updated
                Terms. It is your responsibility to review these Terms
                periodically to remain informed of any changes.
              </p>
            </section>

            {/* Use of the Website */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Use of the Website
              </h2>

              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Your access to and use of the Website are subject to and
                  governed by these Terms of Use. MindCurePath reserves the
                  right, at its sole discretion, to restrict, suspend, or deny
                  access to the Website to any user, at any time, without prior
                  notice, where permitted by applicable law.
                </p>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-amber-800 font-medium flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    Age Restriction Notice
                  </p>
                  <p className="text-amber-700 text-sm">
                    Access to and use of the MindCurePath Platform is generally
                    available to users of all age groups. However, individuals
                    below the age of eighteen (18) years may access or use the
                    Platform and its services only with the prior consent,
                    supervision, and approval of a parent or legal guardian.
                  </p>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  By permitting a minor to access or use the Platform, the
                  parent or legal guardian represents and warrants that they
                  have reviewed and accepted these Terms of Use and the Privacy
                  Policy on behalf of the minor and that appropriate supervision
                  and guidance will be exercised at all times.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  Accessing the Website requires a stable internet connection
                  and compatible devices or telecommunications services. Any
                  charges, fees, or costs incurred in connection with internet
                  access, data usage, or telecommunications services are solely
                  your responsibility. MindCurePath shall not be liable for any
                  such expenses.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  The Website may only be used for lawful purposes and in
                  accordance with these Terms. Use of the Website for any
                  commercial, promotional, or business activities is strictly
                  prohibited unless expressly authorized or approved in writing
                  by MindCurePath. Any illegal, fraudulent, or unauthorized use
                  of the Website is not permitted, and MindCurePath reserves the
                  right to initiate appropriate legal action against any such
                  misuse in accordance with applicable laws.
                </p>
              </div>
            </section>

            {/* User Content Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                User Content Policy
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                You are solely responsible for your conduct on the Website and
                for any information, data, text, images, audio, video, or other
                material that you submit, upload, publish, share, or otherwise
                make available through the Website ("User Content").
                MindCurePath shall not be responsible or liable for your conduct
                or for any User Content submitted by you or any other user.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Website may allow users to create, upload, store, share, or
                publish User Content. You retain ownership of any User Content
                created by you. However, MindCurePath reserves the right, at its
                sole discretion (but not the obligation), to review, restrict,
                remove, or delete any User Content made available through the
                Website that it believes violates these Terms or applicable
                laws.
              </p>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath does not endorse, control, or assume any
                responsibility for User Content created, posted, shared, or
                transmitted by users or third parties. You acknowledge and agree
                that MindCurePath acts only as a neutral and passive platform
                for the distribution and publication of User Content.
              </p>
            </section>

            {/* Prohibited User Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Prohibited User Content
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                You agree that you shall not create, upload, store, share,
                transmit, or publish any User Content that:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <ul className="space-y-3 text-red-700 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Poses or may pose a risk of harm, loss, physical or
                        mental injury, emotional distress, death, disability,
                        disfigurement, or illness to yourself, any other person,
                        or any animal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Causes or may cause damage to property or financial loss
                        to any individual or entity
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Exploits, harms, or attempts to exploit or harm minors,
                        including by exposing them to inappropriate content or
                        requesting personal information
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Constitutes, promotes, or contributes to any unlawful
                        activity, offence, crime, or civil wrong
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Is unlawful, abusive, defamatory, misleading, obscene,
                        threatening, harassing, hateful, racially or ethnically
                        offensive, profane, invasive of privacy or publicity
                        rights, or otherwise objectionable
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Contains illegal material, including but not limited to
                        the disclosure of confidential information, insider
                        information, or trade secrets
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Includes content that you do not have the legal right to
                        share under any law, contract, or fiduciary obligation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span>
                        Infringes or violates the intellectual property rights,
                        privacy rights, or any other rights of any third party
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-4">
                MindCurePath reserves the right, but is not obligated, to remove
                or restrict access to any User Content that it reasonably
                believes violates these Terms or applicable laws.
              </p>
            </section>

            {/* Intellectual Property Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Intellectual Property Rights
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                For the purposes of these Terms, "Intellectual Property Rights"
                include all present and future rights relating to copyrights,
                trademarks, service marks, trade names, trade dress, patents,
                moral rights, rights of publicity, trade secrets, goodwill, and
                all other proprietary or intellectual property rights, whether
                registered or unregistered, under the laws of any jurisdiction
                worldwide.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                  User Representations and Warranties
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  By submitting or sharing User Content on the Website, you
                  represent and warrant that:
                </p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                    <span>
                      Your User Content and its use in accordance with these
                      Terms do not and will not violate any applicable law or
                      infringe the rights of any third party, including
                      intellectual property or privacy rights.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                    <span>
                      If your User Content contains any copyrighted or protected
                      material that is not your original work, you have obtained
                      all necessary rights, permissions, licenses, and consents
                      required to use and share such material through the
                      Website.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                    <span>
                      Your User Content is accurate, lawful, and created or
                      shared in good faith.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Website Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Website Content
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                Except for personally identifiable information or personal data,
                which is governed by our Privacy Policy and applicable data
                protection laws, any material, information, or content that you
                transmit, upload, submit, or otherwise provide through the
                Website shall be treated as non-confidential and
                non-proprietary.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                By submitting enquiries, feedback, suggestions, or any other
                information through the Website or related communication
                channels, you acknowledge and agree that you grant MindCurePath
                a perpetual, irrevocable, non-exclusive, royalty-free license to
                use, reproduce, modify, adapt, publish, and utilize such
                information solely for the purpose of operating, improving, and
                providing its services.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                  Permitted Use of Website Content
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  You may print or download limited portions of the Website
                  content strictly for your personal and non-commercial use,
                  provided that all of the following conditions are met:
                </p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    <span>
                      All copyright, trademark, and proprietary notices of
                      MindCurePath appear on every copy made.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    <span>
                      MindCurePath, along with any identified contributors, is
                      clearly acknowledged as the author or source of the
                      material.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    <span>
                      You do not alter, edit, or modify any paper or digital
                      copies of the materials in any manner.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    <span>
                      You do not use images, illustrations, photographs, video
                      or audio clips, or graphics separately from the
                      accompanying text.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                    <span>
                      You do not reproduce, distribute, or use any Website
                      content for commercial purposes without obtaining prior
                      written consent from MindCurePath or its respective
                      licensors.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Privacy and Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Data Privacy and Security
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                Your personal information and personal data are stored and
                processed by MindCurePath in electronic form on its systems and,
                where necessary, on the systems of its authorized employees,
                service providers, or partners. MindCurePath implements
                reasonable security practices and procedures to safeguard
                personal information, including appropriate managerial,
                technical, operational, and physical security measures.
              </p>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                <p className="text-amber-800 font-medium flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  Account Security Notice
                </p>
                <p className="text-amber-700 text-sm">
                  MindCurePath does not have access to or visibility into your
                  account password. You are responsible for maintaining the
                  confidentiality of your login credentials and for preventing
                  unauthorized access to your account, computer systems, and
                  mobile devices. You are advised to log out of your account
                  after each session.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                If you become aware of or suspect any unauthorized access or
                misuse of your account, you must immediately notify MindCurePath
                by email at{" "}
                <a
                  href="mailto:support@mindcurepath.com"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  support@mindcurepath.com
                </a>
                . You agree to indemnify and hold MindCurePath harmless from any
                loss, damage, or liability arising from unauthorized use of your
                account due to your negligence.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Access to user information is strictly limited to MindCurePath's
                employees, agents, contractors, or third-party service providers
                on a need-to-know basis only. All such persons are bound by
                strict confidentiality obligations and are required to comply
                with applicable data protection and security standards.
              </p>
            </section>

            {/* Intellectual Property and Proprietary Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Intellectual Property and Proprietary Rights
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                The Website and all services, features, and content made
                available through MindCurePath (collectively, the "MindCurePath
                Services") contain intellectual property that is owned by or
                licensed to MindCurePath ("MindCurePath IP"). This includes,
                without limitation, copyrights, trademarks, service marks,
                logos, brand elements, proprietary information, software,
                technology, source code, databases, and all related text,
                graphics, audio, video, and downloadable materials.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Subject to these Terms of Use, MindCurePath grants you a
                limited, revocable, non-exclusive, non-transferable license to
                access and use the Website and the MindCurePath IP solely for
                your personal and lawful use of the Website and MindCurePath
                Services. This license does not grant you any ownership rights,
                title, or interest in the Website or any MindCurePath IP.
              </p>
              <p className="text-slate-600 leading-relaxed">
                All content and materials available on or through the Website
                are owned, controlled, or licensed by MindCurePath or by their
                respective content owners or licensors. Any other use—including
                copying, reproducing, modifying, distributing, selling,
                sublicensing, transmitting, republishing, displaying, posting,
                performing, extracting, or otherwise exploiting any such
                material—without prior written permission is strictly
                prohibited.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Disclaimer of Warranties and Limitation of Liability
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                The MindCurePath IP is provided on an "as is" and "as available"
                basis. To the maximum extent permitted by applicable law,
                MindCurePath expressly disclaims all warranties, whether express
                or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose,
                non-infringement, and accuracy.
              </p>
              <p className="text-slate-600 leading-relaxed">
                To the fullest extent permitted by law, MindCurePath shall not
                be liable for any loss, damage, or harm of any kind arising from
                or related to the use of the MindCurePath IP, including
                indirect, incidental, special, punitive, consequential, or
                exemplary damages, whether arising in contract, tort,
                negligence, or otherwise.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Indemnification
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                You acknowledge and agree that your access to and use of the
                Website and MindCurePath Services is entirely at your own risk.
                You agree to defend, indemnify, and hold harmless MindCurePath,
                its affiliates, group companies, business partners, and their
                respective directors, officers, trustees, employees, and agents
                from and against any and all claims, liabilities, damages,
                losses, costs, and expenses, including reasonable legal and
                attorneys' fees, arising out of or related to:
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Your use of, or inability to use, the Website or
                    MindCurePath Services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Any violation of these Terms of Use by you or by any person
                    using your account
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Any content, data, or materials submitted, uploaded,
                    transmitted, or made available by you through the Website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Any unauthorized access to or misuse of the Website or
                    MindCurePath Services attributable to you
                  </span>
                </li>
              </ul>
            </section>

            {/* Suspension and Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Suspension and Termination
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                MindCurePath reserves the right, at its sole discretion, to
                determine whether your use of the Website or MindCurePath
                Services constitutes a breach of these Terms of Use. You
                acknowledge and agree that MindCurePath may, with or without
                prior notice and with or without cause, take any one or more of
                the following actions:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Temporarily or permanently suspend, restrict, or terminate
                    your access to the Website or MindCurePath Services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>Issue a warning or notice to you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Initiate legal proceedings against you to recover all
                    losses, damages, and costs incurred
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Disclose relevant information to law enforcement or
                    regulatory authorities where MindCurePath reasonably
                    believes such disclosure is necessary or legally required
                  </span>
                </li>
              </ul>

              <p className="text-slate-600 leading-relaxed">
                Your access may be suspended or terminated immediately in the
                event of any breach of these Terms, a request from law
                enforcement, suspected fraudulent or unlawful activity, or
                unexpected technical issues.
              </p>
            </section>

            {/* Disclaimers and Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Disclaimers and Limitation of Liability
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                To the maximum extent permitted under applicable law,
                MindCurePath, along with its directors, officers, employees,
                agents, affiliates, and third-party service providers, expressly
                disclaims and excludes all conditions, warranties,
                representations, and other terms that may otherwise be implied
                by statute, common law, or equity, including but not limited to:
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Any warranties that the Website or MindCurePath Services are
                    accurate, complete, current, reliable, secure,
                    uninterrupted, or available at any particular time or
                    location
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Any warranties that the Website or services are of
                    satisfactory quality, fit for a particular purpose,
                    non-infringing, or meet your specific needs or expectations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    Any warranties relating to privacy or data security, except
                    as expressly stated in the Privacy Policy
                  </span>
                </li>
              </ul>

              <p className="text-slate-600 leading-relaxed">
                MindCurePath shall not be liable for any direct, indirect,
                incidental, special, consequential, punitive, or exemplary
                losses or damages arising out of or in connection with your use
                of the Website or MindCurePath Services, including loss of
                income, revenue, business, profits, data, goodwill, or
                reputation.
              </p>
            </section>

            {/* Professional Services Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Professional Services Disclaimer
              </h2>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                <p className="text-amber-800 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Disclaimer
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                You acknowledge and agree that although certain experts,
                therapists, counselors, or other mental health professionals
                ("Professionals"), Dieticians, Yoga therapists, Academic
                counselors, Career Path Finders, GST & Taxation Experts,
                Financial Experts may be available through the Website,
                MindCurePath does not independently verify, guarantee, or assess
                the credentials, competence, suitability, or conduct of such
                Professionals.
              </p>
              <p className="text-slate-600 leading-relaxed">
                MindCurePath acts solely as a technology platform to facilitate
                access to Professionals and does not provide medical,
                psychological, or therapeutic services itself. MindCurePath
                expressly disclaims all liability arising from or related to any
                consultation, advice, diagnosis, treatment, or services provided
                by any Professional accessed through the Website.
              </p>
            </section>

            {/* Governing Law and Jurisdiction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Governing Law and Jurisdiction
              </h2>

              <p className="text-slate-600 leading-relaxed">
                These Terms of Use and any dispute, claim, or matter arising out
                of or in connection with this Agreement, the Website, or the
                MindCurePath Services shall be governed by and construed in
                accordance with the laws of India. The courts having
                jurisdiction at Shamli, Uttar Pradesh, India, shall have
                exclusive jurisdiction over all such disputes.
              </p>
            </section>

            {/* Supplementary Provisions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Supplementary Provisions
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Survival
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Upon termination or expiration of these Terms for any
                    reason, all provisions which by their nature are intended to
                    survive termination shall continue to remain in full force
                    and effect.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Severability
                  </h3>
                  <p className="text-slate-600 text-sm">
                    If any provision of these Terms is held to be unlawful,
                    invalid, or unenforceable, such provision shall be deemed
                    severed. The remaining provisions shall continue to be
                    valid, binding, and enforceable.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    No Waiver
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Any failure or delay by either party to exercise any right
                    or remedy under these Terms shall not operate as a waiver. A
                    waiver of any breach shall not be deemed a waiver of any
                    subsequent breach.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    No Refund on Plan Expiry
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Upon expiry of plan validity period, any unused credits
                    shall automatically lapse. All such plans, including expired
                    credits, are strictly non-refundable except where refund is
                    mandatorily required under applicable law.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                Contact Us
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Use, please
                contact us:
              </p>

              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
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
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
