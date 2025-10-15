"use client";

import { Bold, Italic, Underline as UnderlineIcon, Undo, Redo } from "lucide-react";

export default function EditorMenu({ editor }) {
  if (!editor) return null;

  const btn = "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
  const active = "bg-gray-200 dark:bg-gray-700";

  return (
    <div className="flex flex-wrap gap-2 mb-2 bg-white dark:bg-gray-800 pb-2">
      {/* Text Styles */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive("bold") ? active : ""}hover:cursor-pointer`}
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive("italic") ? active : ""} hover:cursor-pointer`}
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${btn} ${editor.isActive("underline") ? active : ""}hover:cursor-pointer`}
      >
        <UnderlineIcon size={16} />
      </button>

      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`${btn} ${!editor.can().undo() ? "opacity-50" : ""}hover:cursor-pointer`}
      >
        <Undo size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`${btn} ${!editor.can().redo() ? "opacity-50" : ""}hover:cursor-pointer`}
      >
        <Redo size={16} />
      </button>
    </div>
  );
}
