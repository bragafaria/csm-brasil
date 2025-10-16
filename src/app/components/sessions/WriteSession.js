// app/components/sessions/WriteSession.js
"use client";
import { useState } from "react";
import Editor from "../tiptap/Editor";

export default function WriteSession() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Please write your reflection question first!");
      return;
    }

    setIsSubmitting(true);
    // TODO: Submit to Supabase when DB schema ready
    console.log("Submitting:", content);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    alert("Session submitted successfully! You'll receive your report within 24 hours.");
    setContent(""); // Clear editor
  };

  return (
    <div className="space-y-6 w-full bg-[var(--surface-variant)] p-4 md:p-6 rounded-lg border border-[var(--border)] shadow-custom">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
            Submit Your Reflection Question
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-base mt-2">
            Describe your challenge in detail, including how it relates to your CSM type.
            <span className="text-[var(--accent)]"> (1 session every 2 days)</span>
          </p>
        </div>

        <Editor content={content} onChange={setContent} />

        {content && (
          <div className="border-t pt-4 border-[var(--border)]">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Live Preview:</h2>
            <div
              className="prose dark:prose-invert max-w-none p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom transition-all duration-200 hover:cursor-pointer ${
            isSubmitting || !content.trim()
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : `Submit Session (${content.length} chars)`}
        </button>
      </div>
    </div>
  );
}
