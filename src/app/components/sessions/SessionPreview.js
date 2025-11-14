// app/components/sessions/SessionPreview.js
"use client";

import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { motion } from "framer-motion";

export default function SessionPreview({ session, onClose, onOpenQuestionModal, onOpenAnswerModal }) {
  const stripHtmlAndTruncate = (html, maxLength = 70) => {
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
      assigned: "Assigned to a CSM Certified Expert. Response expected within 1–2 business days.",
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
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-start gap-8 mt-5 mb-10">
          {/* Status Badge */}
          <div className="mt-6 flex justify-end items-center">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mr-2">Status:</p>
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${getStatusStyles(
                session.status
              )}`}
            >
              {session.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">Session Preview</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="btn-secondary px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          aria-label="Close preview"
        >
          Close
        </motion.button>
      </div>

      <div className="space-y-10">
        {/* Question Card */}
        <div className="flex flex-col">
          <p className="text-sm md:text-base font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            Your Session Entry:
          </p>
          <p className="mb-4">
            This is the entry you submitted for your session. It guides the expert’s analysis and the focus of your
            personalized report. Click to view.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenQuestionModal}
            className="p-5 bg-[var(--surface3)] hover:bg-[var(--accent)] rounded-lg border border-[var(--border)] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] text-sm md:text-base line-clamp-3 group-hover:text-[var(--text-primary)] transition-colors">
              {parse(stripHtmlAndTruncate(renderHtml(session.question)))}
            </div>
            <p className="mt-3 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view full session entry
            </p>
          </motion.div>
        </div>

        {/* Answer Card */}
        <div className="flex flex-col">
          <p className="text-sm md:text-base font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            CSM Session Report:
          </p>
          <p className="mb-4">
            This section contains your expert’s detailed analysis and personalized insights based on your session entry.
            Review the responses, reflections, and key recommendations. Click to view.
          </p>

          <motion.div
            whileHover={session.answer ? { scale: 1.02 } : {}}
            whileTap={session.answer ? { scale: 0.98 } : {}}
            onClick={session.answer ? onOpenAnswerModal : undefined}
            className={`p-5 rounded-lg border shadow-sm transition-all ${
              session.answer
                ? "bg-[var(--surface3)] hover:bg-[var(--accent)] border-[var(--border)] hover:shadow-md cursor-pointer group"
                : "bg-[var(--surface-variant)] border-[var(--border)] cursor-default"
            }`}
          >
            {session.answer ? (
              <>
                <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] text-sm md:text-base line-clamp-3 group-hover:text-[var(--text-primary)] transition-colors">
                  {parse(stripHtmlAndTruncate(renderHtml(session.answer)))}
                </div>
                <p className="mt-3 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view full report
                </p>
              </>
            ) : (
              <p className={`text-sm font-medium ${getStatusStyles(session.status)}`}>
                {getAnswerStatusMessage(session.status)}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
