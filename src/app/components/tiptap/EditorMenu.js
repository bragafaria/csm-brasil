// app/components/tiptap/EditorMenu.js
"use client";

import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import { useState } from "react";

export default function EditorMenu({ editor }) {
  const [buttonFocus, setButtonFocus] = useState(true);
  if (!editor) return null;

  const handleButtonFocus = () => {
    setButtonFocus(!buttonFocus);
  };

  const btnBase =
    "p-2 rounded-md hover:bg-[var(--surface-variant)] dark:hover:bg-[var(--primary-hover)] transition-colors";
  const active = "bg-[var(--primary-hover)] text-white";

  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 p-2 bg-[var(--surface)] rounded-t-lg border border-[var(--border)] shadow-custom">
      <button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
          handleButtonFocus();
        }}
        className={`${btnBase} ${editor.isActive("bold") ? active : ""} hover:cursor-pointer`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
          handleButtonFocus();
        }}
        className={`${btnBase} ${editor.isActive("italic") ? active : ""} hover:cursor-pointer`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
          handleButtonFocus();
        }}
        className={`${btnBase} ${editor.isActive("underline") ? active : ""} hover:cursor-pointer`}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
    </div>
  );
}
