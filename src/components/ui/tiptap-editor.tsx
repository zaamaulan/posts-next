"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"

const TiptapEditor = ({
  onChange,
  placeholder,
  value,
}: {
  onChange: (value: string) => void
  placeholder?: string
  value?: string
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Type something...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose min-h-[8rem] max-h-[12rem] sm:max-h-[15rem] overflow-y-auto rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "")
    }
  }, [value, editor])

  if (!editor) return null

  return <EditorContent editor={editor} />
}

export default TiptapEditor
