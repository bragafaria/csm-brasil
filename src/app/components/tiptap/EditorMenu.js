// app/components/tiptap/EditorMenu.js
"use client";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Undo,
  Redo,
  List as ListIcon,
  ListOrdered,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { useState } from "react";

export default function EditorMenu({ editor }) {
  const [buttonFocus, setButtonFocus] = useState(true);
  if (!editor) return null;

  const handleButtonFocus = () => {
    setButtonFocus(!buttonFocus);
    console.log("buttonFocus", buttonFocus);
  };

  const btnBase =
    "p-2 rounded-md hover:bg-[var(--surface-variant)] dark:hover:bg-[var(--primary-hover)] transition-colors";
  const active = "bg-[var(--primary-hover)] text-white";

  return (
    <div className="flex flex-wrap gap-1 md:gap-2 p-2 bg-[var(--surface)] rounded-t-lg border border-[var(--border)] shadow-custom">
      <button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
          handleButtonFocus();
          console.log(editor.isActive("bold"));
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
      <button
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
          handleButtonFocus();
        }}
        className={`${btnBase} ${editor.isActive("strike") ? active : ""} hover:cursor-pointer`}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btnBase} ${editor.isActive("bulletList") ? active : ""}`}
        title="Bullet List"
      >
        <ListIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btnBase} ${editor.isActive("orderedList") ? active : ""}`}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
        className={`${btnBase} ${editor.isActive("heading", { level: 1 }) ? active : ""}`}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
        className={`${btnBase} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
        className={`${btnBase} ${editor.isActive("heading", { level: 3 }) ? active : ""}`}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`${btnBase} ${!editor.can().undo() ? "opacity-50" : ""} hover:cursor-pointer`}
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().redo().run();
          handleButtonFocus();
        }}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`${btnBase} ${!editor.can().redo() ? "opacity-50" : ""} hover:cursor-pointer`}
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  );
}
