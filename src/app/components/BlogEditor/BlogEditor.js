// app/components/BlogEditor/BlogEditor.js
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
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
        HTMLAttributes: { class: "text-blue-600 underline hover:text-blue-800" },
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
    ],
    content: content || "<h1>Draft Title...</h1><p>Start writing...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg dark:prose-invert max-w-none min-h-[600px] p-6 border border-[var(--border)] rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20",
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
