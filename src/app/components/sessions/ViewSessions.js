// app/components/sessions/ViewSessions.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import SessionPreview from "./SessionPreview";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { motion } from "framer-motion";

export default function ViewSessions() {
  const [sessions, setSessions] = useState([]);
  const [coach, setCoach] = useState({ name: null, profile_picture_path: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          throw new Error("Please log in to view sessions.");
        }

        const { count, error: countError } = await supabase
          .from("blueprint_sessions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", session.user.id);

        if (countError) throw new Error(countError.message);

        const total = count || 0;
        setTotalPages(Math.ceil(total / recordsPerPage));

        const start = (currentPage - 1) * recordsPerPage;
        const end = start + recordsPerPage - 1;

        const { data, error } = await supabase
          .from("blueprint_sessions")
          .select("id, created_at, question, answer, status")
          .eq("user_id", session.user.id)
          .order("updated_at", { ascending: false })
          .range(start, end);

        if (error) throw new Error(error.message);
        setSessions(data || []);

        let coachData = null;
        if (data && data.length > 0) {
          const { data: sessionCoach, error: coachError } = await supabase
            .from("blueprint_sessions")
            .select("coaches(id, profile_picture_path, users(name))")
            .eq("user_id", session.user.id)
            .in("status", ["answered", "assigned"])
            .order("updated_at", { ascending: false })
            .limit(1)
            .single();

          if (!coachError && sessionCoach?.coaches) {
            coachData = sessionCoach.coaches;
          }
        }

        if (!coachData) {
          const { data: defaultCoach, error: defaultCoachError } = await supabase
            .from("coaches")
            .select("id, profile_picture_path, users(name)")
            .eq("availability", true)
            .order("last_assignment_at", { ascending: true, nullsFirst: true })
            .limit(1)
            .single();

          if (!defaultCoachError && defaultCoach) {
            coachData = defaultCoach;
          }
        }

        setCoach({
          name: coachData?.users?.name || "Unknown Coach",
          profile_picture_path: coachData?.profile_picture_path || null,
        });
      } catch (err) {
        console.error("Fetch data error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  const handleSessionClick = (session) => setSelectedSession(session);
  const handleClosePreview = () => setSelectedSession(null);
  const handleOpenQuestionModal = () => selectedSession && setShowQuestionModal(true);
  const handleOpenAnswerModal = () => selectedSession?.answer && setShowAnswerModal(true);

  const handlePreviousPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const getStatusStyles = (status) => {
    const styles = {
      pending: "text-red-500 border-red-500/30 bg-red-500/10",
      assigned: "text-orange-500 border-orange-500/30 bg-orange-500/10",
      answered: "text-green-500 border-green-500/30 bg-green-500/10",
      canceled: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    };
    return styles[status] || "text-[var(--text-secondary)] border-[var(--border)] bg-[var(--surface-variant)]";
  };

  const stripHtmlAndTruncate = (html, maxLength = 100) => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[var(--text-secondary)] text-sm font-medium">Loading sessions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[var(--surface-variant)] rounded-lg border border-red-400/20 shadow-custom">
        <p className="text-red-400 text-sm font-medium">Error: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 text-xs text-[var(--accent)] hover:underline">
          Refresh
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-gradient p-6 md:p-8 rounded-lg shadow-custom-lg border border-[var(--border)]"
    >
      {!selectedSession ? (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">Your Sessions</h2>

          {/* Coach Info */}
          <div className="mb-6 p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Certified CSM Expert:</h3>
            <div className="flex items-center gap-4">
              {coach.profile_picture_path ? (
                <img
                  src={`${coach.profile_picture_path}?width=128&height=128&quality=80&resize=contain`}
                  alt={`${coach.name}'s profile`}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--accent)]/20"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[var(--surface-variant)] flex items-center justify-center text-lg font-bold text-[var(--text-secondary)]">
                  {coach.name?.charAt(0) || "C"}
                </div>
              )}
              <div>
                <p className="font-medium text-[var(--text-primary)]">{coach.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">Your assigned coach</p>
              </div>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-sm md:text-base mb-6">
            View your past and current coaching sessions. Click a session to see a preview.
          </p>

          {/* Session List */}
          {sessions.length === 0 ? (
            <div className="text-center py-12 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
              <p className="text-[var(--text-secondary)] text-sm">No sessions found. Start a new session to begin!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSessionClick(session)}
                  className="flex justify-between items-center p-5 bg-[var(--surface)] rounded-lg border border-[var(--border)] card-gradient hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      {new Date(session.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="text-sm text-[var(--text-secondary)] line-clamp-2 group-hover:text-[var(--text-primary)] transition-colors">
                      {parse(stripHtmlAndTruncate(renderHtml(session.question)))}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusStyles(
                      session.status
                    )} shadow-sm`}
                  >
                    {session.status}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  currentPage === 1
                    ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
                    : "btn-secondary hover:shadow-md"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-[var(--text-secondary)]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  currentPage === totalPages
                    ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
                    : "btn-secondary hover:shadow-md"
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
        <Modal onClose={() => setShowQuestionModal(false)}>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Full Session Question</h3>
          <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] max-h-[60vh] overflow-y-auto custom-scrollbar">
            {parse(renderHtml(selectedSession.question))}
          </div>
        </Modal>
      )}

      {/* Answer Modal */}
      {showAnswerModal && selectedSession?.answer && (
        <Modal onClose={() => setShowAnswerModal(false)}>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Full Session Answer</h3>
          <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] max-h-[60vh] overflow-y-auto custom-scrollbar">
            {parse(renderHtml(selectedSession.answer))}
          </div>
        </Modal>
      )}
    </motion.div>
  );
}

// Reusable Modal Component
function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--surface)] p-6 md:p-8 rounded-lg max-w-3xl w-full shadow-custom-lg card-gradient max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-lg font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
