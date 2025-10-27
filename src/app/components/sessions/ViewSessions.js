// app/components/sessions/ViewSessions.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import SessionPreview from "./SessionPreview";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import sanitizeHtml from "sanitize-html"; // Use sanitize-html
import parse from "html-react-parser"; // Use html-react-parser

export default function ViewSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 5;

  // Fetch sessions from Supabase with pagination
  useEffect(() => {
    async function fetchSessions() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          throw new Error("Please log in to view sessions.");
        }

        // Fetch total count of sessions for pagination
        const { count, error: countError } = await supabase
          .from("blueprint_sessions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", session.user.id);

        if (countError) {
          throw new Error(countError.message);
        }

        // Calculate total pages
        const total = count || 0;
        setTotalPages(Math.ceil(total / recordsPerPage));

        // Fetch paginated sessions
        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage - 1;

        const { data, error } = await supabase
          .from("blueprint_sessions")
          .select("id, created_at, question, answer, status")
          .eq("user_id", session.user.id)
          .order("updated_at", { ascending: false })
          .range(start, end);

        if (error) {
          throw new Error(error.message);
        }

        setSessions(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [currentPage]);

  // Handle session click to show preview
  const handleSessionClick = (session) => {
    setSelectedSession(session);
  };

  // Handle closing the preview
  const handleClosePreview = () => {
    setSelectedSession(null);
  };

  // Handle opening modals
  const handleOpenQuestionModal = () => {
    if (selectedSession) {
      setShowQuestionModal(true);
    }
  };

  const handleOpenAnswerModal = () => {
    if (selectedSession && selectedSession.answer) {
      setShowAnswerModal(true);
    }
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
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

  // Function to strip HTML and truncate text
  const stripHtmlAndTruncate = (html, maxLength = 100) => {
    if (!html) return "";
    // Parse HTML to plain text
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Generate and sanitize HTML for modals
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

  if (loading) {
    return <div className="text-[var(--text-primary)]">Loading sessions...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 w-full bg-[var(--surface-variant)] p-4 md:p-6 rounded-lg border border-[var(--border)] shadow-custom">
      {!selectedSession ? (
        <>
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] section-header animate">
            Your Sessions
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base">
            View your past and current coaching sessions. Click a session to see a preview.
          </p>

          {/* Session List */}
          {sessions.length === 0 ? (
            <p className="text-[var(--text-secondary)]">No sessions found. Start a new session to begin!</p>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-between items-center p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)] card-gradient hover:bg-[var(--primary-hover)] hover:text-white transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="flex-1">
                    <p className="text-[var(--text-primary)] font-medium">
                      {new Date(session.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] session-detail">
                      {parse(stripHtmlAndTruncate(renderHtml(session.question)))}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                      session.status
                    )} card-gradient shadow-custom`}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`btn-secondary px-4 py-2 rounded-lg font-medium text-[var(--text-primary)] cursor-pointer ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[var(--primary-hover)] hover:text-white"
                }`}
              >
                Previous
              </button>
              <span className="text-[var(--text-secondary)]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`btn-secondary px-4 py-2 rounded-lg font-medium text-[var(--text-primary)] cursor-pointer ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[var(--primary-hover)] hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <SessionPreview
          session={selectedSession}
          onClose={handleClosePreview}
          onOpenQuestionModal={handleOpenQuestionModal}
          onOpenAnswerModal={handleOpenAnswerModal}
        />
      )}

      {/* Question Modal */}
      {showQuestionModal && selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--surface)] p-6 rounded-lg max-w-3xl w-full shadow-custom-lg card-gradient">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)]">Full Session Question</h3>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-[var(--text-primary)] hover:text-[var(--primary-hover)] font-medium cursor-pointer"
                aria-label="Close modal"
              >
                ✕ Close
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] session-detail max-h-[60vh] overflow-y-auto custom-scrollbar">
              {parse(renderHtml(selectedSession.question))}
            </div>
          </div>
        </div>
      )}

      {/* Answer Modal */}
      {showAnswerModal && selectedSession && selectedSession.answer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--surface)] p-6 rounded-lg max-w-3xl w-full shadow-custom-lg card-gradient">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)]">Full Session Answer</h3>
              <button
                onClick={() => setShowAnswerModal(false)}
                className="text-[var(--text-primary)] hover:text-[var(--primary-hover)] font-medium cursor-pointer"
                aria-label="Close modal"
              >
                ✕ Close
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] session-detail max-h-[60vh] overflow-y-auto custom-scrollbar">
              {parse(renderHtml(selectedSession.answer))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
