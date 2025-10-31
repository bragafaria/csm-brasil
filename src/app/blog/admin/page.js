// app/admin/articles/SimpleArticleBuilder.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, Save, Loader2 } from "lucide-react";

export default function SimpleArticleBuilder() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    metaDescription: "",
    intro: "",
    body: "",
    faqs: [{ question: "", answer: "" }],
    cta: "Ready to discover your CSM archetype? Take the free assessment now.",
  });

  const [preview, setPreview] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("idle");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateFaq = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    }));
  };

  const addFaq = () => {
    setForm((prev) => ({ ...prev, faqs: [...prev.faqs, { question: "", answer: "" }] }));
  };

  const removeFaq = (index) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const generatePreview = useCallback(async () => {
    const md = `
# ${form.title || "Untitled"}

${form.intro}

${form.body}

## FAQs
${form.faqs
  .filter((f) => f.question && f.answer)
  .map((f) => `### ${f.question}\n${f.answer}`)
  .join("\n\n")}

**${form.cta || "Take the free assessment"}**
    `.trim();

    try {
      const { content } = await compileMDX({
        source: md,
        options: { parseFrontmatter: false },
      });
      setPreview(content);
    } catch (e) {
      setPreview('<p class="text-red-600">Preview error</p>');
    }
  }, [form]);

  useEffect(() => {
    const id = setTimeout(generatePreview, 300);
    return () => clearTimeout(id);
  }, [form, generatePreview]);

  const publish = async () => {
    setPublishing(true);
    setStatus("idle");

    const payload = new FormData();
    payload.append("data", JSON.stringify(form));

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        body: payload,
      });
      setStatus(res.ok ? "success" : "error");
    } catch (err) {
      setStatus("error");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Create Article (Simple)</h1>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePreview}
              className="btn-secondary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Eye size={18} /> Preview
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={publish}
              disabled={publishing}
              className="btn-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {publishing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
              {publishing ? "Publishing..." : "Publish"}
            </motion.button>
          </div>
        </div>

        {/* Status Alerts */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <p className="text-green-500 font-medium">Article published successfully!</p>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-500 font-medium">Publish failed. Please try again.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: FORM */}
          <div className="space-y-6">
            {/* Basics */}
            <div className="card-gradient p-6 rounded-lg shadow-custom border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Basics</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="How to Heal from Heartbreak in 2025..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  >
                    <option value="">Select…</option>
                    {["relationships", "heartbreak-divorce", "self", "health-wellness", "expert-advice"].map((c) => (
                      <option key={c} value={c}>
                        {c.replace("-", " & ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => update("metaDescription", e.target.value)}
                    rows={3}
                    placeholder="Short SEO description (50-160 chars)…"
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  />
                </div>
              </div>
            </div>

            {/* Intro */}
            <div className="card-gradient p-6 rounded-lg shadow-custom border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Introduction</h3>
              <textarea
                value={form.intro}
                onChange={(e) => update("intro", e.target.value)}
                rows={5}
                placeholder="Hook the reader…"
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              />
            </div>

            {/* Body */}
            <div className="card-gradient p-6 rounded-lg shadow-custom border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Article Body (Markdown)</h3>
              <textarea
                value={form.body}
                onChange={(e) => update("body", e.target.value)}
                rows={12}
                placeholder={`# Heading\n\n- list item\n\n![alt](image-url)`}
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Use normal Markdown. Images → paste S3 URL after upload.
              </p>
            </div>

            {/* FAQs */}
            <div className="card-gradient p-6 rounded-lg shadow-custom border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">FAQs</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addFaq}
                  className="btn-secondary px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Plus size={18} /> Add
                </motion.button>
              </div>
              <div className="space-y-3">
                {form.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-stretch p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]"
                  >
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => updateFaq(i, "question", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                      />
                      <textarea
                        placeholder="Answer"
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => updateFaq(i, "answer", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFaq(i)}
                      className="self-start p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      aria-label="Remove FAQ"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="card-gradient p-6 rounded-lg shadow-custom border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Call-to-Action</h3>
              <textarea
                value={form.cta}
                onChange={(e) => update("cta", e.target.value)}
                placeholder="Ready to discover your CSM archetype? Take the free assessment now."
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              />
            </div>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="card-gradient p-6 rounded-lg shadow-custom-lg border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Live Preview</h3>
              <div className="prose dark:prose-invert max-w-none bg-[var(--surface)] p-6 rounded-lg shadow-inner min-h-96 overflow-auto custom-scrollbar">
                {preview ? (
                  <div dangerouslySetInnerHTML={{ __html: preview }} />
                ) : (
                  <p className="text-[var(--text-secondary)] italic">Start typing to see the preview…</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
