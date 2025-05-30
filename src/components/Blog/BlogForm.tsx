import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Save, RefreshCw, X } from "lucide-react";
import TagInput from "./TagInput";
import ImageInput from "./ImageInput";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; image: string };
  date: string;
  tags: string[];
  image: string;
  readTime: string;
}

interface BlogFormProps {
  blog: Blog;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onEditorChange: () => void;
  onTagChange: (index: number, value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditing: boolean;
  editorRef: React.MutableRefObject<any>;
}

export default function BlogForm({
  blog,
  onChange,
  onEditorChange,
  onTagChange,
  onAddTag,
  onRemoveTag,
  onSave,
  onCancel,
  isLoading,
  isEditing,
  editorRef,
}: BlogFormProps) {
  const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
      <h2 className="text-white text-xl font-bold mb-6">
        {isEditing ? "Edit Blog Post" : "Add New Blog Post"}
      </h2>

      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-400 mb-2">
          Blog Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={blog.title}
          onChange={onChange}
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="excerpt" className="block text-gray-400 mb-2">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={blog.excerpt}
          onChange={onChange}
          rows={2}
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors resize-none"
          required
          placeholder="A brief summary of your blog post"
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-400 mb-2">
          Content <span className="text-red-500">*</span>
        </label>
        <div className="min-h-[400px] border border-[#2d1b4d] rounded-lg overflow-hidden">
          <Editor
            apiKey={TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={blog.content}
            onEditorChange={onEditorChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
              content_style: `
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  font-size: 16px;
                  color: #f8f8f8;
                  background-color: #1a1025;
                  direction: ltr;
                }
              `,
              skin: "oxide-dark",
              content_css: "dark",
              directionality: "ltr",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="author" className="block text-gray-400 mb-2">
            Author Name
          </label>
          <input
            type="text"
            id="author"
            name="author.name"
            value={blog.author.name}
            onChange={(e) =>
              onChange({
                target: {
                  name: "author",
                  value: { ...blog.author, name: e.target.value },
                },
              } as any)
            }
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-400 mb-2">
            Publication Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={new Date(blog.date).toISOString().split("T")[0]}
            onChange={(e) => {
              const date = new Date(e.target.value);
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              onChange({
                target: { name: "date", value: formattedDate },
              } as any);
            }}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
          />
        </div>
      </div>

      <TagInput
        tags={blog.tags}
        onChange={onTagChange}
        onAdd={onAddTag}
        onRemove={onRemoveTag}
      />

      <ImageInput image={blog.image} onChange={onChange} />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-[#1a1025] hover:bg-[#2d1b4d] text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isLoading ? "Saving..." : "Save Blog Post"}
        </button>
      </div>
    </div>
  );
}
