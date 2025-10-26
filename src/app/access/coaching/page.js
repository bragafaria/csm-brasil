// @/app/access/coaching/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Editor from "@/app/components/tiptap/Editor"; // Reuse existing Tiptap Editor
import { motion } from "framer-motion";
import parse from "html-react-parser"; // Use html-react-parser
import { useDebounce } from "use-debounce"; // Import use-debounce
import sanitizeHtml from "sanitize-html"; // Import sanitize-html

export default function Coaching() {
  const [coaches, setCoaches] = useState([]);
  const [currentCoachId, setCurrentCoachId] = useState(null); // Store current coach ID
  const [selectedCoach, setSelectedCoach] = useState("coaches");
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // Status filter state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300); // Debounce search query
  const sessionsPerPage = 10;
  const router = useRouter();

  // Helper function to strip HTML tags and limit length
  const stripHtml = (html, maxLength = 100) => {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
        setError("Failed to sign out. Please try again.");
        return;
      }
      router.push("/access/login");
    } catch (err) {
      console.error("Unexpected error in handleSignOut:", err.message);
      setError("An unexpected error occurred during sign-out.");
    } finally {
      setLoading(false);
    }
  };

  // Authenticate and verify coach status
  useEffect(() => {
    async function checkCoachAccess() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          setError("You must be logged in as a coach to access this page.");
          router.push("/access/login");
          return;
        }

        const userId = session.user.id;
        const { data: coachData, error: coachError } = await supabase
          .from("coaches")
          .select("id, user_id")
          .eq("user_id", userId)
          .maybeSingle();

        if (coachError || !coachData) {
          console.error("Coach verification failed:", coachError?.message || "No coach record found");
          setError("Access denied: You are not registered as a coach.");
          router.push("/access/login");
          return;
        }

        setCurrentCoachId(coachData.id); // Store current coach ID

        // Fetch list of coaches for dropdown
        const { data: coachesData, error: coachesError } = await supabase
          .from("coaches")
          .select("id, user_id, users(name)")
          .eq("availability", true)
          .order("users(name)", { ascending: true });

        if (coachesError) {
          console.error("Error fetching coaches:", coachesError.message);
          setError("Failed to load coaches list.");
          return;
        }

        setCoaches(coachesData || []);
        setLoading(false);
      } catch (err) {
        console.error("Unexpected error in checkCoachAccess:", err.message);
        setError("An unexpected error occurred.");
        setLoading(false);
      }
    }
    checkCoachAccess();
  }, [router]);

  // Fetch sessions based on selected coach, page, status filter, and debounced search query
  useEffect(() => {
    async function fetchSessions() {
      if (selectedCoach === "coaches") {
        setSessions([]);
        setTotalPages(1);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("blueprint_sessions")
          .select(
            `
            id,
            user_id,
            coach_id,
            question,
            status,
            created_at,
            users(name, typeCode)
          `,
            { count: "exact" }
          )
          .order("created_at", { ascending: true })
          .range((currentPage - 1) * sessionsPerPage, currentPage * sessionsPerPage - 1);

        // Apply status filter
        if (statusFilter !== "all") {
          query = query.eq("status", statusFilter);
        } else {
          query = query.in("status", ["pending", "assigned"]);
        }

        // Apply coach filter
        if (selectedCoach !== "all") {
          query = query.eq("coach_id", selectedCoach);
        }

        // Apply debounced search query
        if (debouncedSearchQuery.trim()) {
          query = query.or(`users.name.ilike.%${debouncedSearchQuery}%,question.ilike.%${debouncedSearchQuery}%`);
        }

        const { data, error, count } = await query;

        if (error) {
          console.error("Error fetching sessions:", error.message);
          setError("Failed to load sessions.");
          return;
        }

        setSessions(data || []);
        setTotalPages(Math.ceil((count || 0) / sessionsPerPage));
      } catch (err) {
        console.error("Unexpected error in fetchSessions:", err.message);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, [selectedCoach, currentPage, statusFilter, debouncedSearchQuery]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle session selection
  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setShowEditor(false);
    setAnswerContent("");
  };

  // Handle cancel from visualization or editor
  const handleCancel = () => {
    if (showEditor) {
      setShowEditor(false); // Back to visualization
    } else if (selectedSession) {
      setSelectedSession(null); // Back to session list
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = async () => {
    if (!selectedSession || !answerContent.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from("blueprint_sessions")
        .update({
          answer: answerContent,
          status: "answered",
          answered_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedSession.id)
        .eq("coach_id", selectedSession.coach_id);

      if (error) {
        console.error("Error submitting answer:", error.message);
        setError("Failed to submit answer.");
        return;
      }

      // Refresh sessions
      setSelectedSession(null);
      setShowEditor(false);
      setAnswerContent("");
      setCurrentPage(1); // Reset to first page
      setSelectedCoach((prev) => prev); // Trigger re-fetch
    } catch (err) {
      console.error("Unexpected error in handleSubmitAnswer:", err.message);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle claiming a pending session
  const handleClaimSession = async (sessionId, coachId) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.rpc("assign_coach_transaction", {
        p_session_id: sessionId,
        p_coach_id: coachId,
      });
      if (error) {
        console.error("Error claiming session:", error.message);
        setError(`Failed to claim session: ${error.message}`);
        return;
      }
      // Refresh sessions
      setSelectedSession(null);
      setShowEditor(false);
      setCurrentPage(1);
      setSelectedCoach((prev) => prev); // Trigger re-fetch
    } catch (err) {
      console.error("Unexpected error in handleClaimSession:", err.message);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-[var(--text-primary)]">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-[var(--surface)]"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] section-header animate">Coach Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="btn-secondary py-2 px-4 rounded-lg font-semibold hover:cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Coach Selection, Status Filter, and Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div>
          <label htmlFor="coach-select" className="text-[var(--text-primary)] mr-2 font-semibold">
            Select Coach:
          </label>
          <select
            id="coach-select"
            value={selectedCoach}
            onChange={(e) => {
              setSelectedCoach(e.target.value);
              setCurrentPage(1);
              setSelectedSession(null);
              setShowEditor(false);
              setAnswerContent("");
            }}
            className="p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="coaches">Select a Coach</option>
            {coaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.users.name}
              </option>
            ))}
            <option value="all">View All</option>
          </select>
        </div>
        <div>
          <label htmlFor="status-filter" className="text-[var(--text-primary)] mr-2 font-semibold">
            Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
          </select>
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user or question"
            className="w-full p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Session List or Visualization/Editor */}
      {selectedSession ? (
        showEditor ? (
          <EditorComponent
            content={answerContent}
            onChange={setAnswerContent}
            onSubmit={handleSubmitAnswer}
            onCancel={handleCancel}
          />
        ) : (
          <SessionVisualization
            session={selectedSession}
            onReply={() => setShowEditor(true)}
            onCancel={handleCancel}
            onClaim={handleClaimSession}
            currentCoachId={currentCoachId}
          />
        )
      ) : (
        <>
          {/* Session List */}
          {sessions.length === 0 && selectedCoach !== "coaches" ? (
            <p className="text-[var(--text-secondary)]">No active sessions found.</p>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  className="p-4 card-gradient rounded-lg cursor-pointer"
                  onClick={() => handleSelectSession(session)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[var(--text-primary)] font-semibold">
                    {session.users.name} ({session.users.typeCode})
                  </p>
                  <p className="text-[var(--text-secondary)] truncate">{stripHtml(session.question)}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Status: {session.status} | Created: {new Date(session.created_at).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-primary py-2 px-4 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-[var(--text-primary)]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-primary py-2 px-4 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

// Session Visualization Component
function SessionVisualization({ session, onReply, onCancel, onClaim, currentCoachId }) {
  const cleanQuestion = sanitizeHtml(session.question, {
    allowedTags: ["p", "strong", "em", "ul", "ol", "li", "a"],
    allowedAttributes: { a: ["href"] },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 card-gradient rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Session Details</h2>
      <div className="session-detail text-[var(--text-primary)]">
        <strong>User:</strong> {session.users.name} ({session.users.typeCode})
      </div>
      <div className="session-detail text-[var(--text-primary)] mt-2">
        <strong>Question:</strong> <span className="prose dark:prose-invert max-w-none">{parse(cleanQuestion)}</span>
      </div>
      <div className="session-detail text-[var(--text-secondary)] mt-2">
        <strong>Status:</strong> {session.status}
      </div>
      <div className="session-detail text-[var(--text-secondary)]">
        <strong>Created:</strong> {new Date(session.created_at).toLocaleDateString()}
      </div>
      <div className="mt-6 flex gap-4">
        {session.status === "assigned" && (
          <button onClick={onReply} className="btn-primary py-2 px-4 rounded-lg font-semibold cursor-pointer">
            Reply
          </button>
        )}
        {session.status === "pending" && (
          <button
            onClick={() => onClaim(session.id, currentCoachId)}
            className="btn-primary py-2 px-4 rounded-lg font-semibold cursor-pointer"
            disabled={!currentCoachId}
          >
            Claim
          </button>
        )}
        <button onClick={onCancel} className="btn-secondary py-2 px-4 rounded-lg font-semibold cursor-pointer">
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

// Editor Component (Wrapper for TipTap Editor)
function EditorComponent({ content, onChange, onSubmit, onCancel }) {
  const cleanContent = content.trim()
    ? sanitizeHtml(content, {
        allowedTags: ["p", "strong", "em", "ul", "ol", "li", "a"],
        allowedAttributes: { a: ["href"] },
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 card-gradient rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Write Answer</h2>
      <Editor content={content} onChange={onChange} />
      {content.trim() && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Preview</h3>
          <div className="prose dark:prose-invert max-w-none border border-[var(--border)] p-4 rounded-lg">
            {parse(cleanContent)}
          </div>
        </div>
      )}
      <div className="mt-4 flex gap-4">
        <button
          onClick={onSubmit}
          disabled={!content.trim()}
          className="btn-primary py-2 px-4 rounded-lg font-semibold disabled:opacity-50 cursor-pointer"
        >
          Submit
        </button>
        <button onClick={onCancel} className="btn-secondary py-2 px-4 rounded-lg font-semibold cursor-pointer">
          Cancel
        </button>
      </div>
    </motion.div>
  );
}
