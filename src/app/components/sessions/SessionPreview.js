// app/components/sessions/SessionPreview.js
"use client";

import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import sanitizeHtml from "sanitize-html"; // Use sanitize-html
import parse from "html-react-parser"; // Use html-react-parser

export default function SessionPreview({ session, onClose, onOpenQuestionModal, onOpenAnswerModal }) {
  // Function to strip HTML and truncate text
  const stripHtmlAndTruncate = (html, maxLength = 100) => {
    if (!html) return "";
    // Parse HTML to plain text
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Generate and sanitize HTML for display
  const renderHtml = (content) => {
    if (!content) return "";
    try {
      // Attempt to parse as JSONB (Tiptap format)
      const parsed = JSON.parse(content);
      const output = generateHTML(parsed, [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          bulletList: { keepMarks: true, keepAttributes: false },
          orderedList: { keepMarks: true, keepAttributes: false },
        }),
        Underline,
      ]);
      // Sanitize Tiptap output
      return sanitizeHtml(output, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "underline"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          "*": ["class"],
        },
      });
    } catch (e) {
      // If not valid JSON, treat as raw HTML and sanitize
      return sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "underline"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          "*": ["class"],
        },
      });
    }
  };

  // Status message for unanswered sessions
  const getAnswerStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Awaiting coach assignment. Response expected within 1-2 business days.";
      case "assigned":
        return "Assigned to a coach. Response expected within 1-2 business days.";
      case "canceled":
        return "Session canceled.";
      default:
        return "Status unavailable.";
    }
  };

  // Status color mapping
  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "text-red-500 border-red-500/30 bg-red-500/10";
      case "assigned":
        return "text-orange-500 border-orange-500/30 bg-orange-500/10";
      case "answered":
        return "text-green-500 border-green-500/30 bg-green-500/10";
      case "canceled":
        return "text-purple-500 border-purple-500/30 bg-purple-500/10";
      default:
        return "text-gray-500 border-gray-500/30 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-6 w-full bg-[var(--surface-variant)] p-4 md:p-6 rounded-lg border border-[var(--border)] shadow-custom">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)]">Session Preview</h3>
        <button
          onClick={onClose}
          className="btn-secondary px-4 py-2 rounded-lg cursor-pointer font-medium text-[var(--text-primary)] hover:bg-[var(--primary-hover)] hover:text-white"
        >
          Close
        </button>
      </div>
      <div className="space-y-4">
        <div
          className="p-4 rounded-lg border border-[var(--primary)] bg-[var(--surface)] card-gradient hover:bg-[var(--primary-hover)] hover:text-white transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
          onClick={onOpenQuestionModal}
        >
          <p className="text-[var(--text-secondary)] font-semibold mb-1">Question:</p>
          <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)]">
            {parse(stripHtmlAndTruncate(renderHtml(session.question)))}
          </div>
        </div>
        <div
          className={`p-4 rounded-lg border border-[var(--accent)] bg-[var(--surface-variant)] card-gradient hover:bg-[var(--primary-hover)] hover:text-white transition-all duration-300 transform hover:scale-[1.02] ${
            session.answer ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={session.answer ? onOpenAnswerModal : undefined}
        >
          <p className="text-[var(--text-secondary)] font-semibold mb-1">Answer:</p>
          {session.answer ? (
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)]">
              {parse(stripHtmlAndTruncate(renderHtml(session.answer)))}
            </div>
          ) : (
            <p className={`text-sm ${getStatusStyles(session.status)}`}>{getAnswerStatusMessage(session.status)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
