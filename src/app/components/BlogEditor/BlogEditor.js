// app/components/BlogEditor/BlogEditor.js
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align"; // ← NEW
import BlogMenu from "./BlogMenu";

export default function BlogEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "text-[var(--accent)] underline hover:opacity-80" },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg mx-auto my-6 max-w-full h-auto shadow-md",
          loading: "lazy",
        },
      }),
      Youtube.configure({
        width: 720,
        height: 480,
        controls: true,
        nocookie: true,
        modestbranding: true,
        HTMLAttributes: {
          class: "mx-auto my-8 rounded-lg overflow-hidden shadow-lg",
        },
      }),
      // ← TEXT ALIGNMENT
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
    ],
    content: content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[600px] p-6 border border-[var(--border)] rounded-2xl " +
          "bg-[var(--surface2)] text-white " +
          "prose-headings:text-white prose-headings:font-bold " +
          "prose-p:text-white prose-li:text-white prose-strong:text-white " +
          "prose-blockquote:text-white prose-code:text-white " +
          "prose-pre:bg-[var(--surface)] prose-pre:text-white " +
          "prose-a:text-[var(--accent)] prose-a:hover:underline " +
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-3">
      <BlogMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
