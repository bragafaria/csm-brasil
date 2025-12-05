//@/app/components/terms-of-service/PrivacyModal.js

"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyModal({ onClose }) {
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
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
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
          <div className="space-y-2">
            <p className="text-sm italic">Effective Date: November 26, 2025</p>
            <p className="text-sm italic">Last Updated: November 26, 2025</p>
          </div>

          <p className="text-base leading-relaxed">
            Welcome to the <strong>Cognitive Spectrum Model</strong>. We are committed to protecting your privacy and
            handling your personal information with care and transparency. This Privacy Policy explains what information
            we collect, how we use it, how we protect it, and your rights regarding your data.
          </p>

          <p className="text-base leading-relaxed">
            By using our website, mobile application, assessment tools, reports, or CSM Sessions services (collectively,
            the &quot;Service&quot;), you agree to the collection and use of information in accordance with this Privacy
            Policy.
          </p>
          <p className="text-base leading-relaxed text-red-800 mb-4">
            <strong>
              Note: CSMDynamics.com does not provide ANY clinical, psychological, or medical services. All insights are
              for personal development and educational purposes only. CSM Session Reports provide personal development
              guidance and are not a substitute for therapy, counseling, or medical advice.
            </strong>
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Information We Collect</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  1.1 Information You Provide Directly
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-1">Account Information:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Password (encrypted)</li>
                      <li>Optional: Date of birth</li>
                      <li>Optional: Phone number, location</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Assessment Data:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Responses to personality assessment questions</li>
                      <li>Self-reported preferences and behaviors</li>
                      <li>Optional demographic information (gender, relationship status, etc.)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Partner Information:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Partner&apos;s name and email address (with their consent)</li>
                      <li>Partner&apos;s assessment responses (when they complete their assessment)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Payment Information:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Billing details processed securely through Stripe</li>
                      <li>We do NOT store full credit card numbers on our servers</li>
                      <li>Transaction history and purchase records</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">CSM Sessions Data:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Questions, concerns, and detailed input you provide</li>
                      <li>Session reports and guidance we generate</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Communications:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Support inquiries and feedback</li>
                      <li>Survey responses</li>
                      <li>Email correspondence</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  1.2 Information We Collect Automatically
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-1">Usage Data:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Pages visited, features used</li>
                      <li>Time spent on platform</li>
                      <li>Click patterns and navigation paths</li>
                      <li>Device type, browser type, operating system</li>
                      <li>IP address and general location (city/country level)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Cookies and Tracking Technologies:</p>
                    <ul className="list-disc pl-8 space-y-1 text-base">
                      <li>Session cookies (essential for functionality)</li>
                      <li>Analytics cookies (to improve user experience)</li>
                      <li>Preference cookies (to remember your settings)</li>
                    </ul>
                    <p className="text-base leading-relaxed mt-2">
                      You can control cookies through your browser settings, but some features may not function properly
                      without them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">2. How We Use Your Information</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  2.1 To Provide and Improve Services
                </h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Generate Assessment Results:</strong> Process your responses to create your CSM archetype
                    and personalized reports
                  </li>
                  <li>
                    <strong>Deliver Couple Insights Reports:</strong> Combine partner data to analyze relationship
                    dynamics
                  </li>
                  <li>
                    <strong>Provide CSM Sessions:</strong> Generate guided reflection reports based on your input
                  </li>
                  <li>
                    <strong>Platform Functionality:</strong> Enable account creation, login, and service delivery
                  </li>
                  <li>
                    <strong>Customer Support:</strong> Respond to inquiries, troubleshoot issues, and provide assistance
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  2.2 For Research and Development
                </h3>
                <p className="text-base leading-relaxed mb-2">
                  <strong>Anonymized Analysis:</strong> Aggregate and anonymize assessment data to:
                </p>
                <ul className="list-disc pl-8 space-y-1 text-base mb-2">
                  <li>Validate and improve the CSM framework</li>
                  <li>Conduct psychometric research</li>
                  <li>Identify patterns and trends</li>
                  <li>Develop new features and insights</li>
                </ul>
                <p className="text-base leading-relaxed">
                  <strong>Quality Assurance:</strong> Review sessions to train coaches and ensure service quality
                </p>
                <p className="text-base leading-relaxed mt-2 font-semibold">
                  Important: Research uses only de-identified data that cannot be traced back to you individually.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.3 For Communication</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Service Updates:</strong> Notify you about account activity, purchases, and service changes
                  </li>
                  <li>
                    <strong>Marketing (Optional):</strong> Send newsletters, tips, and promotional offers (you can opt
                    out anytime)
                  </li>
                  <li>
                    <strong>Important Notices:</strong> Alert you to Terms of Service or Privacy Policy updates
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  2.4 For Security and Legal Compliance
                </h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Fraud Prevention:</strong> Detect and prevent fraudulent transactions or abuse
                  </li>
                  <li>
                    <strong>Legal Obligations:</strong> Comply with applicable laws, regulations, and legal processes
                  </li>
                  <li>
                    <strong>Dispute Resolution:</strong> Address disputes, enforce our Terms of Service, and protect our
                    rights
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">3. How We Share Your Information</h2>
            <p className="text-base leading-relaxed mb-3 font-semibold">
              We do NOT sell, rent, or trade your personal information to third parties. We share data only in the
              following limited circumstances:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  3.1 With Your Partner (Couple Insights Reports Only)
                </h3>
                <p className="text-base leading-relaxed mb-2">
                  When you and your partner both complete assessments for the Couple Insights Report:
                </p>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Both partners can view the combined report showing both individual profiles</li>
                  <li>Each partner&apos;s detailed responses remain private unless shared in the joint report</li>
                  <li>You acknowledge and consent to this data sharing when purchasing the Couple Insights Report</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.2 With Service Providers</h3>
                <p className="text-base leading-relaxed mb-2">
                  We work with trusted third-party vendors who help us operate the Service:
                </p>
                <ul className="list-disc pl-8 space-y-2 text-base">
                  <li>
                    <strong>Stripe (Payment Processing):</strong> Handles all payment transactions securely
                  </li>
                  <li>
                    <strong>Cloud Hosting Providers:</strong> Store data securely on encrypted servers
                  </li>
                  <li>
                    <strong>Analytics Tools:</strong> Provide anonymized usage data to improve user experience
                  </li>
                  <li>
                    <strong>Email Service Providers:</strong> Deliver service emails and optional marketing
                    communications
                  </li>
                  {/* <li>
                    <strong>AI and Technology Partners:</strong> Assist in generating session reports under strict
                    confidentiality
                  </li> */}
                </ul>
                <p className="text-base leading-relaxed mt-2">
                  All service providers are contractually required to protect your data and use it only for providing
                  services to us.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.3 For Legal Reasons</h3>
                <p className="text-base leading-relaxed mb-2">
                  We may disclose information if required by law or in good faith belief that such action is necessary
                  to:
                </p>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Comply with legal obligations (subpoenas, court orders, government requests)</li>
                  <li>Protect and defend our rights or property</li>
                  <li>Prevent fraud, security threats, or illegal activity</li>
                  <li>Protect the safety of users or the public</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.4 Business Transfers</h3>
                <p className="text-base leading-relaxed">
                  If CSM is involved in a merger, acquisition, sale of assets, or bankruptcy, your information may be
                  transferred to the acquiring entity. You will be notified via email and/or prominent notice on our
                  platform. The new entity will be bound by this Privacy Policy unless you consent to changes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">4. Data Retention</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.1 Active Accounts</h3>
                <p className="text-base leading-relaxed">
                  We retain your personal information for as long as your account is active or as needed to provide
                  services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.2 After Account Deletion</h3>
                <p className="text-base leading-relaxed mb-2">When you delete your account:</p>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Personal identifiers are removed within 30 days</li>
                  <li>Anonymized data may be retained indefinitely for research and analytics</li>
                  <li>Legal or accounting records may be retained as required by law (typically 7 years)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.3 Backup Data</h3>
                <p className="text-base leading-relaxed">
                  Backup systems may retain data for up to 90 days for disaster recovery purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">5. Data Security</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  5.1 Security Measures We Implement
                </h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Encryption:</strong> Data is encrypted in transit (TLS/SSL) and at rest (AES-256)
                  </li>
                  <li>
                    <strong>Access Controls:</strong> Strict employee access policies; only authorized personnel can
                    access data
                  </li>
                  <li>
                    <strong>Secure Payment Processing:</strong> PCI-DSS compliant payment handling via Stripe
                  </li>
                  <li>
                    <strong>Regular Audits:</strong> Security assessments and vulnerability testing
                  </li>
                  <li>
                    <strong>Monitoring:</strong> 24/7 monitoring for suspicious activity
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.2 Your Responsibility</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Use strong, unique passwords</li>
                  <li>Do not share login credentials</li>
                  <li>Log out from shared devices</li>
                  <li>Report suspicious activity immediately</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.3 No Absolute Security</h3>
                <p className="text-base leading-relaxed">
                  While we implement industry-standard security measures, no system is 100% secure. You acknowledge the
                  inherent risks of transmitting information over the internet.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">6. Your Privacy Rights</h2>
            <p className="text-base leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">6.1 Access and Portability</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Right to Access:</strong> Request a copy of your personal data
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Receive your data in a structured, machine-readable format
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">6.2 Correction and Deletion</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Right to Correct:</strong> Update inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Right to Delete:</strong> Request deletion of your personal data (subject to legal retention
                    requirements)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">6.3 Consent and Objection</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Withdraw Consent:</strong> Opt out of marketing emails or certain data processing
                  </li>
                  <li>
                    <strong>Object to Processing:</strong> Object to processing based on legitimate interests
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  6.4 How to Exercise Your Rights
                </h3>
                <p className="text-base leading-relaxed mb-2">
                  Contact us at: <strong>csm@csmdynamics.com</strong>
                </p>
                <p className="text-base leading-relaxed">
                  We will respond to requests within 30 days (or as required by applicable law). We may need to verify
                  your identity before processing requests.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">7. International Data Transfers</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">7.1 Data Storage Location</h3>
                <p className="text-base leading-relaxed">
                  Our servers are located in the United States. If you access the Service from outside the US, your data
                  will be transferred to, stored, and processed in the US.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  7.2 International Privacy Laws
                </h3>
                <div className="space-y-2">
                  <p className="text-base leading-relaxed">
                    <strong>For EU/EEA Users (GDPR):</strong> You have enhanced rights under the General Data Protection
                    Regulation, including all rights listed in Section 6.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>For California Users (CCPA/CPRA):</strong> You have rights to know what information is
                    collected, delete information, opt out of data sales (we do not sell data), and non-discrimination.
                  </p>
                  <p className="text-base leading-relaxed">
                    <strong>For Brazilian Users (LGPD):</strong> Similar rights to GDPR, including access, correction,
                    deletion, and portability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">8. Children&apos;s Privacy</h2>
            <p className="text-base leading-relaxed mb-2">
              Our Service is intended for users aged <strong>18 and older</strong>. We do not knowingly collect personal
              information from individuals under 18.
            </p>
            <p className="text-base leading-relaxed">
              If we discover that we have inadvertently collected data from someone under 18, we will delete the
              information immediately and terminate the account. Parents or guardians who believe we may have collected
              information from a minor should contact us at csm@csmdynamics.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">9. Cookies and Tracking</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">9.1 Types of Cookies</h3>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>
                    <strong>Essential Cookies (Required):</strong> Session management, authentication, security
                  </li>
                  <li>
                    <strong>Analytics Cookies (Optional):</strong> Usage patterns and feature popularity
                  </li>
                  <li>
                    <strong>Preference Cookies (Optional):</strong> Remember your settings
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">9.2 Managing Cookies</h3>
                <p className="text-base leading-relaxed mb-2">You can control cookies through:</p>
                <ul className="list-disc pl-8 space-y-1 text-base">
                  <li>Browser settings (disable, delete, or block cookies)</li>
                  <li>Cookie consent banners on our platform</li>
                  <li>Opt-out tools like Google Analytics Opt-out Browser Add-on</li>
                </ul>
                <p className="text-base leading-relaxed mt-2">
                  <strong>Note:</strong> Disabling essential cookies may affect platform functionality.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">10. Marketing Communications</h2>

            <div className="space-y-2">
              <p className="text-base leading-relaxed">
                <strong>Opt-In:</strong> We send marketing emails only if you&apos;ve consented.
              </p>
              <p className="text-base leading-relaxed">
                <strong>Opt-Out:</strong> Unsubscribe anytime by clicking &quot;Unsubscribe&quot; in emails or updating
                account settings.
              </p>
              <p className="text-base leading-relaxed">
                <strong>Transactional Emails:</strong> You cannot opt out of essential service emails (purchase
                confirmations, security alerts).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">11. Data Breach Notification</h2>
            <p className="text-base leading-relaxed mb-2">
              In the event of a data breach affecting your personal information:
            </p>
            <ul className="list-disc pl-8 space-y-1 text-base">
              <li>We will conduct immediate investigation and containment</li>
              <li>
                Notify affected users within <strong>72 hours</strong> (as required by law)
              </li>
              <li>Provide guidance on protective actions you can take</li>
              <li>Cooperate with authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">12. Changes to This Privacy Policy</h2>
            <p className="text-base leading-relaxed mb-2">
              We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or
              new features.
            </p>
            <p className="text-base leading-relaxed mb-2">
              <strong>Material Changes:</strong> Email notification with 30-day notice before changes take effect
            </p>
            <p className="text-base leading-relaxed">
              <strong>Continued Use:</strong> Your continued use after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">13. Contact Us</h2>
            <p className="text-base leading-relaxed mb-3">
              For questions, concerns, or requests regarding this Privacy Policy or your personal data:
            </p>
            <div className="text-base leading-relaxed space-y-1">
              <p className="text-base leading-relaxed">
                <strong>CSM Global</strong>
                <br />
                Email: csm@csmdynamics.com
                <br />
                Address: CLN 113 C 116, Brasilia, DF 70.763-530 Brazil
              </p>
            </div>
            <p className="text-base leading-relaxed mt-3">
              We will respond to all inquiries within <strong>30 days</strong> (or as required by applicable law).
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-base leading-relaxed text-center">
              Thank you for trusting Cognitive Spectrum Model with your personal information. Your privacy is our
              priority, and we&apos;re committed to protecting it at every step of your journey.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
