// app/components/tiptap/Editor.js
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import EditorMenu from "./EditorMenu";

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline.configure({
        HTMLAttributes: { class: "underline" },
      }),
    ],
    content: content || "<p><br></p>", // Ensure initial content
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[250px] p-4 border border-[var(--border)] rounded-2xl shadow-custom bg-[var(--surface-variant)] text-[var(--text-primary)]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      // Ensure proper selection on focus
      if (!editor.isFocused) {
        editor.chain().focus().run();
      }
    },
  });

  // // Sync external content changes
  // useEffect(() => {
  //   if (editor && content !== undefined) {
  //     editor.commands.setContent(content, false);
  //   }
  // }, [content, editor]);

  // useEffect(() => {
  //   return () => editor?.destroy();
  // }, [editor]);

  return (
    <div className="space-y-2">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
