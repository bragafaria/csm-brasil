"use client";
import { useState } from "react";
import Editor from "../tiptap/Editor";
export default function WriteSession() {
  const [content, setContent] = useState("");
  return (
    <div className="space-y-4 w-full bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
      <div className="max-w-3xl mx-auto mt-10 space-y-4">
        <h1 className="text-2xl font-semibold">Tiptap Editor</h1>

        <Editor content={content} onChange={setContent} />
        <div className="border-t pt-4">
          <h2 className="text-lg font-medium">Preview:</h2>
          <div className="prose dark:prose-invert mt-2" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
}
