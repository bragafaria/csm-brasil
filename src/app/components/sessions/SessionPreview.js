// app/components/sessions/SessionPreview.js
"use client";

import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { motion } from "framer-motion";

export default function SessionPreview({ session, onClose, onOpenQuestionModal, onOpenAnswerModal }) {
  const stripHtmlAndTruncate = (html, maxLength = 30) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const renderHtml = (content) => {
    if (!content) return "";
    try {
      const parsed = JSON.parse(content);
      const output = generateHTML(parsed, [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          bulletList: { keepMarks: true },
          orderedList: { keepMarks: true },
        }),
        Underline,
      ]);
      return sanitizeHtml(output, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "u"]),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["class"] },
      });
    } catch {
      return sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "u"]),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["class"] },
      });
    }
  };

  const getAnswerStatusMessage = (status) => {
    const messages = {
      pending: "Awaiting coach assignment. Response expected within 1–2 business days.",
      assigned: "Assigned to a CSM-Certified Expert. Response expected within 1–2 business days.",
      canceled: "Session canceled.",
    };
    return messages[status] || "Status unavailable.";
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: "text-red-500 bg-red-500/10 border-red-500/30",
      assigned: "text-orange-500 bg-orange-500/10 border-orange-500/30",
      answered: "text-green-500 bg-green-500/10 border-green-500/30",
      canceled: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    };
    return styles[status] || "text-[var(--text-secondary)] bg-[var(--surface-variant)] border-[var(--border)]";
  };

  return (
    <div className="px-2 pb-6 sm:mx-0 sm:px-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">View Session</h3>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-sm sm:text-sm font-semibold text-[var(--text-secondary)]">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-wider ${getStatusStyles(
                session.status
              )}`}
            >
              {session.status}
            </span>
          </div>
        </div>

        {/* Close Button - Always visible, perfect touch target */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm bg-[var(--surface-variant)] hover:bg-[var(--accent)] text-[var(--text-primary)] shadow-md hover:shadow-lg transition-all"
          aria-label="Close preview"
        >
          ← Back
        </motion.button>
      </div>

      <div className="space-y-8">
        {/* Question Card */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
            Your Session Entry
          </h4>
          <p className="text-sm sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            This is what you submitted. Tap to read in full.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenQuestionModal}
            className="p-4 sm:p-5 bg-[var(--surface3)] hover:bg-[var(--accent)] rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)] line-clamp-4 group-hover:opacity-90 transition-opacity break-words overflow-hidden hyphens-auto">
              {parse(stripHtmlAndTruncate(renderHtml(session.question), 30))}
            </div>
            <p className="mt-3 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to view full entry →
            </p>
          </motion.div>
        </div>

        {/* Answer Card */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
            CSM Session Report
          </h4>
          <p className="text-sm sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            {session.answer
              ? "Your personalized expert analysis and insights."
              : "Your report is being prepared by a CSM-Certified Expert."}
          </p>

          <motion.div
            whileHover={session.answer ? { scale: 1.02 } : {}}
            whileTap={session.answer ? { scale: 0.98 } : {}}
            onClick={session.answer ? onOpenAnswerModal : undefined}
            className={`p-4 sm:p-5 rounded-xl border shadow-sm transition-all ${
              session.answer
                ? "bg-[var(--surface3)] hover:bg-[var(--accent)] border-[var(--border)] hover:shadow-md cursor-pointer group"
                : "bg-[var(--surface-variant)] border-[var(--border)] cursor-default"
            }`}
          >
            {session.answer ? (
              <>
                <div className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)] line-clamp-4 group-hover:opacity-90 transition-opacity break-words overflow-hidden hyphens-auto">
                  {parse(stripHtmlAndTruncate(renderHtml(session.answer), 30))}
                </div>
                <p className="mt-3 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to read full report →
                </p>
              </>
            ) : (
              <p
                className={`text-sm sm:text-sm font-medium leading-relaxed text-center py-4 ${getStatusStyles(session.status)}`}
              >
                {getAnswerStatusMessage(session.status)}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
