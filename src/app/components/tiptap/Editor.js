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
        heading: { levels: [1, 2, 3] }, // limit headings
      }),
      Underline,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4 border rounded-2xl shadow-sm",
      },
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange && onChange(html);
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
