// @/app/access/coaching/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Editor from "@/app/components/tiptap/Editor";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useDebounce } from "use-debounce";
import sanitizeHtml from "sanitize-html";
import Spinner from "@/app/components/ui/Spinner";

export default function Coaching() {
  const [coaches, setCoaches] = useState([]);
  const [currentCoachId, setCurrentCoachId] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState("coaches");
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const sessionsPerPage = 10;
  const router = useRouter();

  const stripHtml = (html, maxLength = 120) => {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/access/login");
    } catch (err) {
      console.error("Sign out error:", err.message);
      setError("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkCoachAccess() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          setError("You must be logged in as a coach.");
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
          setError("Access denied: You are not a registered coach.");
          router.push("/access/login");
          return;
        }

        setCurrentCoachId(coachData.id);

        const { data: coachesData, error: coachesError } = await supabase
          .from("coaches")
          .select("id, user_id, users(name)")
          .eq("availability", true)
          .order("users(name)", { ascending: true });

        if (coachesError) throw coachesError;

        setCoaches(coachesData || []);
      } catch (err) {
        console.error("Coach access error:", err.message);
        setError("Failed to verify coach access.");
      } finally {
        setLoading(false);
      }
    }
    checkCoachAccess();
  }, [router]);

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

        if (statusFilter !== "all") {
          query = query.eq("status", statusFilter);
        } else {
          query = query.in("status", ["pending", "assigned"]);
        }

        if (selectedCoach !== "all") {
          query = query.eq("coach_id", selectedCoach);
        }

        if (debouncedSearchQuery.trim()) {
          query = query.or(`users.name.ilike.%${debouncedSearchQuery}%,question.ilike.%${debouncedSearchQuery}%`);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        setSessions(data || []);
        setTotalPages(Math.ceil((count || 0) / sessionsPerPage));
      } catch (err) {
        console.error("Fetch sessions error:", err.message);
        setError("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, [selectedCoach, currentPage, statusFilter, debouncedSearchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setShowEditor(false);
    setAnswerContent("");
  };

  const handleCancel = () => {
    if (showEditor) {
      setShowEditor(false);
    } else if (selectedSession) {
      setSelectedSession(null);
    }
  };

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

      if (error) throw error;

      setSelectedSession(null);
      setShowEditor(false);
      setAnswerContent("");
      setCurrentPage(1);
      setSelectedCoach((prev) => prev);
    } catch (err) {
      console.error("Submit answer error:", err.message);
      setError("Failed to submit answer.");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimSession = async (sessionId, coachId) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.rpc("assign_coach_transaction", {
        p_session_id: sessionId,
        p_coach_id: coachId,
      });
      if (error) throw error;

      setSelectedSession(null);
      setShowEditor(false);
      setCurrentPage(1);
      setSelectedCoach((prev) => prev);
    } catch (err) {
      console.error("Claim session error:", err.message);
      setError(`Failed to claim session: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <Spinner>Loading Dashboard...</Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--surface)] p-6">
        <div className="max-w-md mx-auto p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 font-medium text-center">{error}</p>
          <button
            onClick={() => router.push("/access/login")}
            className="mt-4 w-full btn-secondary py-2.5 rounded-lg font-medium"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[var(--surface)] p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Coach Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="btn-secondary px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Sign Out
          </motion.button>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 bg-[var(--surface-variant)] rounded-lg border border-[var(--border)] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Coach</label>
              <select
                value={selectedCoach}
                onChange={(e) => {
                  setSelectedCoach(e.target.value);
                  setCurrentPage(1);
                  setSelectedSession(null);
                  setShowEditor(false);
                  setAnswerContent("");
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              >
                <option value="coaches">Select a Coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.users.name}
                  </option>
                ))}
                <option value="all">All Coaches</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              >
                <option value="all">All Active</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="User name or question..."
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
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
            {sessions.length === 0 ? (
              <div className="text-center py-12 bg-[var(--surface-variant)] rounded-lg border border-[var(--border)]">
                <p className="text-[var(--text-secondary)] text-lg">
                  {selectedCoach === "coaches" ? "Select a coach to view sessions." : "No active sessions found."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sessions.map((session) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSession(session)}
                    className="p-5 bg-[var(--surface)] rounded-lg border border-[var(--border)] card-gradient shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[var(--text-primary)]">{session.users.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded-full ${
                          session.status === "pending"
                            ? "bg-red-500/10 text-red-500 border border-red-500/30"
                            : "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2 group-hover:text-[var(--text-primary)] transition-colors">
                      {stripHtml(session.question)}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {session.users.typeCode} • {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    currentPage === 1
                      ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
                      : "btn-secondary hover:shadow-md"
                  }`}
                >
                  Previous
                </motion.button>
                <span className="text-sm text-[var(--text-secondary)]">
                  Page {currentPage} of {totalPages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    currentPage === totalPages
                      ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
                      : "btn-secondary hover:shadow-md"
                  }`}
                >
                  Next
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// Session Visualization
function SessionVisualization({ session, onReply, onCancel, onClaim, currentCoachId }) {
  const cleanQuestion = sanitizeHtml(session.question, {
    allowedTags: ["p", "strong", "em", "ul", "ol", "li", "a", "h1", "h2", "h3"],
    allowedAttributes: { a: ["href"] },
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="card-gradient p-6 md:p-8 rounded-lg shadow-custom-lg border border-[var(--border)]">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">Session Details</h2>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">Client</p>
            <p className="text-lg text-[var(--text-primary)]">
              {session.users.name}{" "}
              <span className="text-sm text-[var(--text-secondary)]">({session.users.typeCode})</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Question</p>
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] session-detail">
              {parse(cleanQuestion)}
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="font-semibold text-[var(--text-secondary)]">Status</p>
              <p className="text-[var(--text-primary)] capitalize">{session.status}</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-secondary)]">Created</p>
              <p className="text-[var(--text-primary)]">
                {new Date(session.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {session.status === "assigned" && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onReply}
              className="btn-primary px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
            >
              Write Reply
            </motion.button>
          )}
          {session.status === "pending" && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onClaim(session.id, currentCoachId)}
              disabled={!currentCoachId}
              className="btn-primary px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
            >
              Claim Session
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCancel}
            className="btn-secondary px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Back to List
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Editor Component
function EditorComponent({ content, onChange, onSubmit, onCancel }) {
  const cleanContent = content.trim()
    ? sanitizeHtml(content, {
        allowedTags: ["p", "strong", "em", "ul", "ol", "li", "a", "h1", "h2", "h3", "u"],
        allowedAttributes: { a: ["href"], "*": ["class"] },
      })
    : "";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
      <div className="card-gradient p-6 md:p-8 rounded-lg shadow-custom-lg border border-[var(--border)]">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">Write Your Answer</h2>

        <div className="mb-6">
          <Editor content={content} onChange={onChange} />
        </div>

        {content.trim() && (
          <div className="mb-6 p-6 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Live Preview</h3>
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)] session-detail">
              {parse(cleanContent)}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSubmit}
            disabled={!content.trim()}
            className="btn-primary px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
          >
            Submit Answer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCancel}
            className="btn-secondary px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
