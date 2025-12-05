//@/app/components/terms-of-service/TermsModal.js
"use client";

import { Italic, X } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl h-[90vh] mx-4 bg-[var(--dashboard)] rounded-3xl overflow-hidden p-4 md:p-6 shadow-2xl border border-[var(--border)]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-violet-900 px-6 py-4 border-b border-[var(--border)] flex justify-between items-center rounded-t-2xl mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Terms of Service</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--surface)]/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-[var(--text-primary)]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] px-6 py-6 text-[var(--text-secondary)] space-y-6 custom-scrollbar">
          <div className="flex flex-col space-y-2">
            <p className="text-sm italic">Effective Date: November 26, 2025</p>
            <p className="text-sm italic">Last Updated: December 10, 2025</p>
          </div>

          <p className="text-base leading-relaxed">
            Welcome to the <strong>Cognitive Spectrum Model (CSM)</strong> platform. These Terms of Service govern your
            access to and use of our website, mobile application, assessment tools, reports, and CSM Sessions services.
            By accessing or using our Service, you agree to be bound by these Terms. If you do not agree, please do not
            use our Service.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed">
              By creating an account, taking our assessment, purchasing any product, or using CSM Sessions, you
              acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and
              any additional guidelines or rules applicable to specific services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. Description of Services</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.1 Assessment Services</h3>
                <p className="text-base leading-relaxed">
                  We provide a personality assessment based on the Cognitive Spectrum Model (CSM) framework. This
                  assessment generates a personalized report describing your cognitive preferences across five
                  dimensions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.2 Couple Insights Report</h3>
                <p className="text-base leading-relaxed">
                  For a one-time fee of $49 USD, couples can receive a comprehensive report analyzing their relationship
                  dynamics across ten life areas based on both partners&apos; CSM assessments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.3 CSM Sessions</h3>
                <p className="text-base leading-relaxed mb-3">We offer guided self-reflection sessions through:</p>
                <ul className="list-disc pl-8 space-y-2 text-base leading-relaxed">
                  <li>
                    <strong>Subscription Model:</strong> $49/month for unlimited sessions (a new session can only be
                    opened once the previous one has been reviewed and answered)
                  </li>
                  <li>
                    <strong>Pay-Per-Session Model:</strong> $19 per individual session without subscription commitment
                  </li>
                </ul>
                <p className="text-base leading-relaxed mt-3">
                  Sessions are delivered up to 2 business days (Monday–Friday only) via our platform dashboard.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              3. Important Disclaimers and Limitations
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.1 Not Professional Services</h3>
                <p className="text-base leading-relaxed text-red-800 mb-4">
                  <strong>
                    CSMDynamics.com does not provide ANY clinical, psychological, or medical services. All insights are
                    for personal development and educational purposes only. CSM Session Reports provide personal
                    development guidance and are not a substitute for therapy, counseling, or medical advice.
                  </strong>
                </p>
                <p className="text-base font-bold uppercase mb-3">
                  THE CSM ASSESSMENT, REPORTS, AND SESSIONS ARE SELF-HELP TOOLS ONLY AND DO NOT CONSTITUTE:
                </p>

                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Psychological counseling, therapy, or mental health treatment</li>
                  <li>Medical advice or diagnosis</li>
                  <li>Legal, financial, or professional counseling</li>
                  <li>A substitute for professional mental health services</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  Our services are designed for personal growth, self-reflection, and relationship insight only.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  3.2 No Therapeutic Relationship
                </h3>
                <p className="text-base leading-relaxed">
                  Use of our Service does not create a therapist-patient, doctor-patient, or any other professional
                  relationship. Our CSM Certified Experts provide guidance based on the CSM framework but are not acting
                  as licensed therapists or counselors for your specific situation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.3 Assessment Accuracy</h3>
                <p className="text-base leading-relaxed mb-3">
                  While we strive for accuracy, personality assessments are inherently subjective self-reporting tools.
                  Results depend on honest, thoughtful responses and may not capture the full complexity of human
                  personality. We make no guarantees regarding:
                </p>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>The absolute accuracy of your archetype classification</li>
                  <li>The predictive value of results for relationship success</li>
                  <li>The applicability of insights to your specific circumstances</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.4 Relationship Outcomes</h3>
                <p className="text-base font-bold mb-2">
                  WE DO NOT GUARANTEE ANY SPECIFIC OUTCOMES FROM USING OUR SERVICE, INCLUDING:
                </p>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Relationship success or compatibility</li>
                  <li>Resolution of relationship conflicts</li>
                  <li>Prevention of relationship dissolution</li>
                  <li>Improved communication or connection</li>
                </ul>
                <p className="text-base leading-relaxed mt-3">
                  Our reports and sessions provide insights and suggestions, but relationship outcomes depend on many
                  factors beyond our Service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.5 Mental Health Disclaimer</h3>
                <p className="text-base font-bold mb-2">IF YOU ARE EXPERIENCING:</p>
                <ul className="list-disc pl-8 space-y-1 text-base mb-3">
                  <li>Mental health crisis or emergency</li>
                  <li>Suicidal thoughts or self-harm ideation</li>
                  <li>Severe anxiety, depression, or psychological distress</li>
                  <li>Symptoms of mental illness</li>
                </ul>
                <p className="text-base font-bold uppercase mb-2">
                  PLEASE SEEK IMMEDIATE PROFESSIONAL HELP from a licensed mental health provider, call emergency
                  services, or contact a crisis hotline (such as 988 in the US).
                </p>
                <p className="text-base leading-relaxed">
                  Our Service is not equipped to handle mental health emergencies and should never be used as a
                  substitute for professional mental health care.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">4. User Responsibilities</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.1 Accurate Information</h3>
                <p className="text-base leading-relaxed">
                  You agree to provide accurate, honest information when completing assessments. Inaccurate responses
                  will compromise the validity of your results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.2 Age Requirement</h3>
                <p className="text-base leading-relaxed">
                  You must be at least 18 years old to use our Service. By using the Service, you represent that you
                  meet this age requirement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.3 Partner Consent</h3>
                <p className="text-base leading-relaxed">
                  If inviting a partner to complete an assessment for the Couple Insights Report, you confirm that you
                  have their explicit consent to share their email address and involve them in the assessment process.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.4 Responsible Use</h3>
                <p className="text-base leading-relaxed">
                  You agree to use CSM Sessions responsibly and understand that sessions are limited to one every 2 days
                  to promote thoughtful reflection, you must provide detailed input for effective guidance, and our
                  service cannot replace professional help for serious issues.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">5. Payment Terms</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.1 Pricing</h3>
                <ul className="list-disc pl-8 space-y-2 text-base">
                  <li>
                    <strong>Free Personal Assessment:</strong> No charge
                  </li>
                  <li>
                    <strong>Couple Insights Report:</strong> $49 USD (one-time payment)
                  </li>
                  <li>
                    <strong>CSM Sessions Subscription:</strong> $49/month (auto-renewing) with unlimited sessions (a new
                    session can only be opened once the previous one has been reviewed and answered)
                  </li>
                  <li>
                    <strong>Pay-Per-Session:</strong> $19 USD per session
                  </li>
                </ul>
                <p className="text-base leading-relaxed mt-3">
                  All prices are in US dollars and subject to change with notice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.2 Payment Processing</h3>
                <p className="text-base leading-relaxed">
                  Payments are processed securely through Stripe. By making a purchase, you agree to Stripe&apos;s terms
                  of service and authorize us to charge your selected payment method.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.3 Subscription Terms</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Subscriptions auto-renew monthly unless canceled</li>
                  <li>You may cancel anytime through your account settings</li>
                  <li>Cancellation takes effect at the end of the current billing period</li>
                  <li>No refunds for partial months except as outlined in Section 5.4</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.4 Refund Policy</h3>
                <p className="text-base leading-relaxed mb-2">
                  <strong>Couple Insights Report:</strong> 14-day satisfaction guarantee. If dissatisfied, contact us
                  within 14 days of purchase for a full refund.
                </p>
                <p className="text-base leading-relaxed">
                  <strong>CSM Sessions:</strong> No refunds for completed sessions or unused subscription time, except
                  for technical failures preventing service delivery (we&apos;ll provide makeup sessions or prorated
                  refunds) or billing errors (corrected promptly).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.5 Disputed Charges</h3>
                <p className="text-base leading-relaxed">
                  If you dispute a charge with your payment provider without first contacting us, we reserve the right
                  to suspend your account pending resolution. Fraudulent chargebacks may result in account termination
                  and legal action.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">6. Intellectual Property</h2>
            <p className="text-base leading-relaxed">
              All content, including the CSM framework, assessment questions, reports, graphics, and written materials,
              is our proprietary intellectual property or licensed content. You may not reproduce, distribute, create
              derivative works, or use commercially without permission. Upon purchase, you receive a non-exclusive,
              non-transferable license to use your personal reports and session content for personal, non-commercial use
              only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">7. Privacy and Data Use</h2>
            <p className="text-base leading-relaxed mb-3">
              We collect personal information as described in our Privacy Policy, including assessment responses,
              demographic data, and usage information.
            </p>
            <ul className="list-disc pl-8 space-y-2 text-base">
              <li>
                Your assessment responses are used to generate your results and may be anonymized for research and
                service improvement
              </li>
              <li>
                For Couple Insights Reports, both partners&apos; data is combined, and you acknowledge that your partner
                will have access to shared results
              </li>
              <li>
                CSM Sessions content is confidential and used only to provide services, train coaches, and improve our
                platform (in anonymized form)
              </li>
              <li>
                While we implement industry-standard security measures, no system is 100% secure. You acknowledge the
                inherent risks of transmitting information online
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">8. Limitation of Liability</h2>
            <p className="text-base leading-relaxed font-bold mb-3">
              TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF THE
              SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100 USD,
              WHICHEVER IS GREATER.
            </p>
            <p className="text-base leading-relaxed font-bold mb-3">WE SHALL NOT BE LIABLE FOR:</p>
            <ul className="list-disc pl-8 space-y-1 text-base">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
              <li>Relationship outcomes, emotional distress, or personal decisions made based on our Service</li>
              <li>Damages resulting from unauthorized access, data breaches, or technical failures</li>
              <li>Actions or decisions you or your partner make based on assessment results or session guidance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">9. Indemnification</h2>
            <p className="text-base leading-relaxed">
              You agree to indemnify, defend, and hold harmless our company, officers, employees, contractors, and
              affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from
              your use or misuse of the Service, violation of these Terms, violation of any third-party rights, or
              reliance on assessment results or session guidance for decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">10. Disclaimer of Warranties</h2>
            <p className="text-base leading-relaxed font-bold">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT. WE MAKE NO GUARANTEES REGARDING ACCURACY, RELIABILITY, OR COMPLETENESS OF CONTENT. YOU
              USE THE SERVICE AT YOUR OWN RISK.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">11. Account Terms</h2>
            <p className="text-base leading-relaxed mb-3">
              You are responsible for maintaining the confidentiality of your login credentials and all activities under
              your account. We reserve the right to suspend or terminate accounts that violate these Terms, engage in
              abusive, fraudulent, or illegal activity, repeatedly dispute legitimate charges, or harass our staff or
              other users.
            </p>
            <p className="text-base leading-relaxed">
              Upon termination, your access ends immediately, you forfeit any unused subscription time (no refunds), and
              we may delete your data per our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              12. Modifications to Service and Terms
            </h2>
            <p className="text-base leading-relaxed">
              We may modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice. We
              may update these Terms periodically, and material changes will be communicated via email or platform
              notification. Continued use after changes constitutes acceptance. Price changes will be announced with 30
              days&apos; notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">13. Dispute Resolution</h2>
            <p className="text-base leading-relaxed mb-3">
              These Terms are governed by the laws of <strong>Delaware, USA</strong>, without regard to conflict of law
              principles. Before filing any legal action, you agree to contact us at csm@csmdynamics.com to attempt
              informal resolution.
            </p>
            <p className="text-base leading-relaxed font-bold mb-3">
              ANY DISPUTES SHALL BE RESOLVED THROUGH BINDING ARBITRATION RATHER THAN IN COURT, EXCEPT FOR SMALL CLAIMS
              COURT ACTIONS. BY AGREEING TO THESE TERMS, YOU WAIVE YOUR RIGHT TO A JURY TRIAL OR CLASS ACTION
              PARTICIPATION.
            </p>
            <p className="text-base leading-relaxed">
              Arbitration shall be conducted by the American Arbitration Association under its rules. Each party bears
              their own costs unless required by law. Either party may seek injunctive relief in court for intellectual
              property violations or urgent matters requiring immediate action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">14. Miscellaneous</h2>
            <p className="text-base leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us
              regarding the Service. If any provision is found unenforceable, the remaining provisions remain in effect.
              Our failure to enforce any right or provision does not constitute a waiver. You may not assign or transfer
              these Terms; we may assign our rights to any successor entity. We are not liable for delays or failures
              due to circumstances beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">15. Contact Information</h2>
            <p className="text-base leading-relaxed">
              <strong>CSM Global</strong>
              <br />
              Email: csm@csmdynamics.com
              <br />
              Address: CLN 113 C 116, Brasilia, DF 70.763-530 Brazil
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">16. Acknowledgment</h2>
            <p className="text-base leading-relaxed font-bold">
              BY CLICKING &quot;I AGREE,&quot; CREATING AN ACCOUNT, OR USING OUR SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE
              READ AND UNDERSTOOD THESE TERMS, AGREE TO BE BOUND BY THEM, UNDERSTAND THAT CSM IS A SELF-HELP TOOL (NOT
              PROFESSIONAL SERVICES), WILL NOT HOLD US LIABLE FOR DECISIONS OR OUTCOMES BASED ON OUR SERVICE, AND ACCEPT
              ALL DISCLAIMERS AND LIMITATIONS OF LIABILITY STATED HEREIN.
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-base leading-relaxed text-center">
              Thank you for choosing the Cognitive Spectrum Model. We&apos;re committed to supporting your personal
              growth journey while ensuring clarity about our services and limitations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
