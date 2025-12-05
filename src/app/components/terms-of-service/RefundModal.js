//@/app/components/terms-of-service/RefundModal.js

"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function RefundModal({ onClose }) {
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
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Refund Policy</h1>
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
            At <strong>Cognitive Spectrum Model (CSM)</strong>, we are committed to your satisfaction and want you to
            feel confident in your purchase. This Refund Policy explains our refund and cancellation terms for all
            products and services offered through our platform.
          </p>

          <div className="bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl p-4">
            <p className="text-base leading-relaxed font-semibold text-[var(--text-primary)]">
              Our Commitment: We stand behind the quality of our services and offer fair, transparent refund policies
              for each product type.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">1. Free Personal Assessment</h2>
            <p className="text-base leading-relaxed">
              The personal CSM assessment is provided <strong>free of charge</strong>. Since there is no payment
              involved, no refunds are applicable, except where required by law. You may retake the assessment at any
              time by creating a new account or contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              2. {`Couple's Insight Report`} ($49 One-Time Payment)
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  2.1 14-Day Satisfaction Guarantee
                </h3>
                <p className="text-base leading-relaxed mb-3">
                  We offer a <strong>14-day money-back guarantee</strong> for the Couple Insights Report. If you are not
                  satisfied with your report for any reason, you may request a full refund within 14 days of your
                  purchase date.
                </p>
                <div className="bg-[var(--surface)]/20 border-l-4 border-[var(--accent)] p-4 rounded-r-lg">
                  <p className="text-base leading-relaxed font-semibold mb-2">What qualifies for a refund:</p>
                  <ul className="list-disc pl-6 space-y-1 text-base">
                    <li>The report does not meet your expectations</li>
                    <li>You believe the insights are inaccurate or not valuable</li>
                    <li>Technical issues prevented proper report delivery</li>
                    <li>You purchased by mistake</li>
                    <li>Any other reason—no questions asked within the 14-day window</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.2 How to Request a Refund</h3>
                <p className="text-base leading-relaxed mb-2">To request a refund for your Couple Insights Report:</p>
                <ol className="list-decimal pl-6 space-y-2 text-base">
                  <li>
                    Email us at <strong>csm@csmdynamics.com</strong> with &quot;Couple Report Refund Request&quot; in
                    the subject line
                  </li>
                  <li>Include your order number (found in your purchase confirmation email)</li>
                  <li>Briefly mention your reason (optional—we respect your privacy)</li>
                  <li>Allow up to 3-5 business days for processing</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.3 Refund Processing</h3>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>
                    <strong>Processing Time:</strong> Refunds are processed within 3-5 business days of approval
                  </li>
                  <li>
                    <strong>Refund Method:</strong> Full refund issued to your original payment method via Stripe
                  </li>
                  <li>
                    <strong>Bank Processing:</strong> Allow 5-10 business days for the refund to appear in your account
                    (depending on your bank)
                  </li>
                  <li>
                    <strong>Access Removal:</strong> Upon refund approval, access to the {`Couple's Insight Report`}{" "}
                    will be revoked
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">2.4 After 14 Days</h3>
                <p className="text-base leading-relaxed">
                  After the 14-day guarantee period expires, the Couple Insights Report purchase is{" "}
                  <strong>typically non-refundable, except where required by law</strong>. We encourage you to review
                  your report thoroughly within the guarantee window and contact us with any concerns.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              3. CSM Sessions - Subscription Model ($49/month)
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.1 Free First Session</h3>
                <p className="text-base leading-relaxed">
                  As an upsell from the {`Couple's Insight Report`}, you receive{" "}
                  <strong>one complimentary CSM Session</strong>. Since this first session is free, no refunds apply
                  except where required by law.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.2 Subscription Cancellation</h3>
                <p className="text-base leading-relaxed mb-3">
                  You may cancel your CSM Sessions subscription at any time through your account settings or by
                  contacting support. Here&apos;s how cancellation works:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>
                    <strong>Immediate Effect:</strong> Cancellation takes effect at the end of your current billing
                    period
                  </li>
                  <li>
                    <strong>Continued Access:</strong> You retain access to sessions until the end of the paid period
                  </li>
                  <li>
                    <strong>No Future Charges:</strong> Your subscription will not auto-renew, and you will not be
                    charged again
                  </li>
                  <li>
                    <strong>Reactivation:</strong> You can reactivate your subscription anytime without penalty
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.3 Partial Month Refunds</h3>
                <p className="text-base leading-relaxed mb-3">
                  <strong>Generally, we do not offer prorated refunds for partial months</strong> of an active
                  subscription. However, refunds may be issued in the following exceptional circumstances:
                </p>
                <div className="space-y-3">
                  <div className="bg-[var(--surface)]/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="font-semibold mb-2">✓ Refund Eligible Situations:</p>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                      <li>
                        <strong>Technical Failures:</strong> Platform issues preventing session delivery for more than 3
                        business days
                      </li>
                      <li>
                        <strong>Billing Errors:</strong> Accidental duplicate charges or incorrect subscription amounts
                      </li>
                      <li>
                        <strong>Unauthorized Charges:</strong> Charges made without your consent (requires verification)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[var(--surface)]/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="font-semibold mb-2">✗ Non-Refundable Situations:</p>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                      <li>Unused sessions within your monthly allowance</li>
                      <li>Change of mind after the first few days of a billing cycle</li>
                      <li>Dissatisfaction with session content (you should cancel instead)</li>
                      <li>Forgetting to cancel before the next billing cycle</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">3.4 Extra Sessions ($19 each)</h3>
                <p className="text-base leading-relaxed">
                  Extra sessions purchased beyond your monthly subscription limit are{" "}
                  <strong>non-refundable once the session report has been delivered</strong>. If a session has not yet
                  been generated, you may request a refund by contacting support within 24 hours of purchase.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  3.5 How to Cancel Subscription
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-base">
                  <li>Log in to your CSM account</li>
                  <li>
                    Navigate to <strong>Account Settings → Subscription</strong>
                  </li>
                  <li>
                    Click <strong>&quot;Cancel Subscription&quot;</strong>
                  </li>
                  <li>Confirm your cancellation</li>
                  <li>You&apos;ll receive a confirmation email</li>
                </ol>
                <p className="text-base leading-relaxed mt-3">
                  Alternatively, email <strong>csm@csmdynamics.com</strong> with &quot;Cancel CSM Sessions
                  Subscription&quot; in the subject line.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              4. CSM Sessions - Pay-Per-Session Model ($19 per session)
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.1 Session Completion</h3>
                <p className="text-base leading-relaxed">
                  Pay-per-session purchases are{" "}
                  <strong>final once the session report has been generated and delivered</strong>
                  to your dashboard (within 24 hours, Monday-Friday). Since the service has been rendered, these
                  sessions are non-refundable, , except where required by law.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.2 Pre-Delivery Cancellation</h3>
                <p className="text-base leading-relaxed mb-2">
                  If you purchase a session but <strong>change your mind before the report is generated</strong>, you
                  may request a refund under these conditions:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>
                    Request must be made within <strong>2 hours</strong> of purchase
                  </li>
                  <li>You have not yet submitted your detailed session input</li>
                  <li>The session has not entered processing (no coach has been assigned)</li>
                </ul>
                <p className="text-base leading-relaxed mt-3">
                  Contact <strong>csm@csmdynamics.com</strong> immediately with your order number to request
                  pre-delivery cancellation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.3 Technical Issues</h3>
                <p className="text-base leading-relaxed mb-2">
                  If technical problems prevent session delivery, we will:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>First attempt to resolve the issue and deliver your session within 48 hours</li>
                  <li>Offer a replacement session at no charge if the delay exceeds 3 business days</li>
                  <li>Issue a full refund if you prefer not to wait for resolution</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">4.4 Bulk Session Purchases</h3>
                <p className="text-base leading-relaxed">
                  If you purchase multiple pay-per-sessions at once, refunds apply individually to each unused,
                  unprocessed session following the same rules outlined above.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">5. Disputed Charges and Chargebacks</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.1 Contact Us First</h3>
                <p className="text-base leading-relaxed">
                  If you see an unexpected or incorrect charge, please{" "}
                  <strong>contact us before disputing with your bank or credit card company</strong>. We are committed
                  to resolving billing issues quickly and fairly, often much faster than the chargeback process.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.2 Chargeback Consequences</h3>
                <p className="text-base leading-relaxed mb-2">
                  If you initiate a chargeback without first contacting us:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>Your account may be temporarily suspended while we review the dispute</li>
                  <li>Access to purchased reports or sessions may be paused during the investigation</li>
                  <li>
                    We will provide supporting information to your payment provider if the chargeback appears incorrect
                  </li>
                  <li>
                    If a chargeback is determined by your payment provider to be invalid, normal account access can be
                    restored once the dispute is resolved
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">5.3 Legitimate Disputes</h3>
                <p className="text-base leading-relaxed">
                  We fully support legitimate disputes for billing errors or unauthorized charges. Simply email us at
                  <strong> csm@csmdynamics.com</strong> with &quot;Billing Dispute&quot; in the subject line. We&apos;ll
                  investigate and help clarify the issue promptly, usually within 24-48 hours.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">6. Refund Processing Details</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">6.1 Refund Timeline</h3>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>
                    <strong>Request Review:</strong> Typically 1-3 business days
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> Typically 3-5 business days after approval
                  </li>
                  <li>
                    <strong>Bank Posting:</strong> Typically 5-10 business days depending on your bank
                  </li>
                  <li>
                    <strong>Total Time:</strong> Typically 7-15 business days in total
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">6.2 Refund Method</h3>
                <p className="text-base leading-relaxed">
                  All refunds are issued to the <strong>original payment method</strong> used for the purchase. We
                  cannot issue refunds to different cards, accounts, or via alternative payment methods (e.g., check,
                  PayPal, cash). If your original payment method is no longer valid, please contact your bank for
                  assistance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">6.3 Confirmation</h3>
                <p className="text-base leading-relaxed">You will receive an email confirmation at each stage:</p>
                <ul className="list-disc pl-6 space-y-1 text-base mt-2">
                  <li>When we receive your refund request</li>
                  <li>When your refund is approved</li>
                  <li>When the refund is processed through Stripe</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">7. Exceptions and Special Cases</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">7.1 Service Interruptions</h3>
                <p className="text-base leading-relaxed">
                  If our platform experiences extended downtime or service interruptions that prevent you from accessing
                  paid content for more than 5 consecutive days, we will automatically extend your subscription or
                  provide pro-rated credits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">7.2 Promotional Discounts</h3>
                <p className="text-base leading-relaxed">
                  If you purchased a product at full price and we subsequently offer a promotional discount, we do not
                  retroactively apply discounts or issue partial refunds. All sales are final at the time of purchase.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">7.3 Account Termination</h3>
                <p className="text-base leading-relaxed">
                  If we terminate your account for violations of our Terms of Service (e.g., abuse, fraudulent activity,
                  harassment), no refunds will be issued for any products or remaining subscription time except where
                  required by law.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">7.4 Force Majeure</h3>
                <p className="text-base leading-relaxed">
                  We are not liable for refunds or service interruptions caused by circumstances beyond our reasonable
                  control, including natural disasters, pandemics, government actions, cyberattacks, or infrastructure
                  failures.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">8. How to Contact Us About Refunds</h2>
            <p className="text-base leading-relaxed mb-3">
              For any refund inquiries, cancellations, or billing concerns, please contact our support team:
            </p>
            <div className="bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl p-5 space-y-2">
              <p className="text-base">
                <strong>Email:</strong> csm@csmdynamics.com
              </p>
              <p className="text-base">
                <strong>Subject Line Examples:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>&quot;Couple Report Refund Request&quot;</li>
                <li>&quot;Cancel CSM Sessions Subscription&quot;</li>
                <li>&quot;Billing Dispute&quot;</li>
                <li>&quot;Refund Inquiry&quot;</li>
              </ul>
              <p className="text-base mt-3">
                <strong>Required Information:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Your full name</li>
                <li>Email address associated with your account</li>
                <li>Order/transaction number (from confirmation email)</li>
                <li>Brief description of your request</li>
              </ul>
              <p className="text-base mt-3">
                <strong>Response Time:</strong> We aim to respond to all refund requests within 24-48 hours (business
                days).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">9. Your Rights</h2>
            <p className="text-base leading-relaxed mb-2">
              Depending on your location, you may have additional consumer rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <strong>EU/EEA Users:</strong> You have a 14-day right of withdrawal under EU Consumer Rights Directive
                for digital content not yet accessed
              </li>
              <li>
                <strong>UK Users:</strong> Similar rights under the Consumer Contracts Regulations 2013
              </li>
              <li>
                <strong>California Users:</strong> Additional protections under California consumer law
              </li>
              <li>
                <strong>All Users:</strong> Right to dispute charges with your payment provider if you believe a charge
                is fraudulent or unauthorized
              </li>
            </ul>
            <p className="text-base leading-relaxed mt-3">
              Our refund policy is designed to meet or exceed these legal requirements while providing fair and
              transparent terms for all users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">10. Changes to This Refund Policy</h2>
            <p className="text-base leading-relaxed">
              We may update this Refund Policy from time to time to reflect changes in our services or legal
              requirements. Any material changes will be communicated via email and posted on our platform with an
              updated &quot;Last Updated&quot; date. Changes will not affect refund requests submitted before the update
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">11. Summary of Refund Eligibility</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[var(--border)] text-sm">
                <thead className="bg-[var(--surface)]/50">
                  <tr>
                    <th className="border border-[var(--border)] px-4 py-2 text-left">Product/Service</th>
                    <th className="border border-[var(--border)] px-4 py-2 text-left">Price</th>
                    <th className="border border-[var(--border)] px-4 py-2 text-left">Refund Policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[var(--border)] px-4 py-2">Free Personal Assessment</td>
                    <td className="border border-[var(--border)] px-4 py-2">Free</td>
                    <td className="border border-[var(--border)] px-4 py-2">N/A</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border)] px-4 py-2">Couple Insights Report</td>
                    <td className="border border-[var(--border)] px-4 py-2">$49 (one-time)</td>
                    <td className="border border-[var(--border)] px-4 py-2">14-day money-back guarantee</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border)] px-4 py-2">CSM Sessions Subscription</td>
                    <td className="border border-[var(--border)] px-4 py-2">$49/month</td>
                    <td className="border border-[var(--border)] px-4 py-2">No refunds (cancel anytime)</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--border)] px-4 py-2">Pay-Per-Session</td>
                    <td className="border border-[var(--border)] px-4 py-2">$19 each</td>
                    <td className="border border-[var(--border)] px-4 py-2">Refund within 2 hrs (before processing)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-base leading-relaxed text-center font-semibold text-[var(--text-primary)] mb-2">
              Our Goal: Fair and Transparent Refunds
            </p>
            <p className="text-base leading-relaxed text-center">
              We believe in standing behind our products while maintaining sustainable business practices. If you have
              any questions about this refund policy or need assistance with a refund request, our support team is here
              to help. Thank you for choosing Cognitive Spectrum Model.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
