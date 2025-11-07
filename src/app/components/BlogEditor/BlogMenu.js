// app/components/BlogEditor/BlogMenu.js
"use client";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Youtube,
  Undo,
  Redo,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

export default function BlogMenu({ editor }) {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "https://");

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  };

  const addImage = () => {
    const url = window.prompt("Image URL (or paste base64):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutube = () => {
    const url = window.prompt("YouTube Video URL:");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const btn = "p-2.5 rounded-lg hover:bg-[var(--surface-variant)] transition-colors";
  const active = "bg-blue-100 text-blue-700";

  return (
    <div className="flex flex-wrap gap-1 p-3 bg-[var(--surface)] rounded-t-2xl border border-[var(--border)] shadow-custom">
      {/* Text Style */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive("bold") ? active : ""}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive("italic") ? active : ""}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${btn} ${editor.isActive("underline") ? active : ""}`}
        title="Underline"
      >
        <Underline size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${btn} ${editor.isActive("strike") ? active : ""}`}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>

      <div className="w-px bg-[var(--border)] mx-1" />

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${btn} ${editor.isActive("heading", { level: 1 }) ? active : ""}`}
        title="H1"
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${btn} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
        title="H2"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${btn} ${editor.isActive("heading", { level: 3 }) ? active : ""}`}
        title="H3"
      >
        <Heading3 size={16} />
      </button>

      <div className="w-px bg-[var(--border)] mx-1" />

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </button>

      <div className="w-px bg-[var(--border)] mx-1" />

      {/* Media & Links */}
      <button onClick={setLink} className={`${btn} ${editor.isActive("link") ? active : ""}`} title="Link">
        <Link2 size={16} />
      </button>
      {editor.isActive("link") && (
        <button onClick={() => editor.chain().focus().unsetLink().run()} className={btn} title="Remove Link">
          <Unlink size={16} />
        </button>
      )}
      <button onClick={addImage} className={btn} title="Add Image">
        <ImageIcon size={16} />
      </button>
      <button onClick={addYoutube} className={btn} title="Add YouTube">
        <Youtube size={16} />
      </button>

      <div className="w-px bg-[var(--border)] mx-1" />

      {/* History */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`${btn} ${!editor.can().undo() ? "opacity-40 cursor-not-allowed" : ""}`}
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`${btn} ${!editor.can().redo() ? "opacity-40 cursor-not-allowed" : ""}`}
        title="Redo"
      >
        <Redo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${btn} ${editor.isActive({ textAlign: "left" }) ? active : ""}`}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`${btn} ${editor.isActive({ textAlign: "center" }) ? active : ""}`}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`${btn} ${editor.isActive({ textAlign: "right" }) ? active : ""}`}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`${btn} ${editor.isActive({ textAlign: "justify" }) ? active : ""}`}
        title="Justify"
      >
        <AlignJustify size={16} />
      </button>
    </div>
  );
}
