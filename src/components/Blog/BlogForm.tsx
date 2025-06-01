import { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import TagInput from "./TagInput";
import { RefreshCw, Save, X } from "lucide-react";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  overview: string;
  image: string | File | null; // Allow null for no image
  content: string;
  tags: string[];
  is_public: boolean;
  isFeatured: boolean;
  author: { id: string; name: string; profilePhoto: string };
}

interface BlogFormProps {
  blog: Blog;
  onChange: (name: string, value: any) => void;
  onEditorChange: (content: string) => void;
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

  // Handle file input for image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange("image", e.target.files[0]);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    onChange("image", null);
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (blog.image instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(blog.image));
      }
    };
  }, [blog.image]);

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
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="overview" className="block text-gray-400 mb-2">
          Overview <span className="text-red-500">*</span>
        </label>
        <textarea
          id="overview"
          name="overview"
          value={blog.overview}
          onChange={(e) => onChange("overview", e.target.value)}
          rows={4}
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
            onInit={(_, editor) => (editorRef.current = editor)}
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
                }
              `,
              skin: "oxide-dark",
              content_css: "dark",
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="author" className="block text-gray-400 mb-2">
          Author Name
        </label>
        <input
          type="text"
          id="author"
          value={blog.author.name}
          onChange={(e) =>
            onChange("author", { ...blog.author, name: e.target.value })
          }
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Tags</label>
        <TagInput
          tags={blog.tags}
          onChange={onTagChange}
          onAdd={onAddTag}
          onRemove={onRemoveTag}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="blogImage" className="block text-gray-400 mb-2">
          Blog Image
        </label>
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-24 bg-[#1a1025] border border-[#2d1b4d] rounded-lg overflow-hidden">
            <Image
              src={
                blog.image instanceof File
                  ? URL.createObjectURL(blog.image)
                  : blog.image || "/placeholder.svg"
              }
              alt="Blog preview"
              fill
              className="object-cover"
            />
            {blog.image && (
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              id="blogImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            />
            <p className="text-gray-500 text-sm mt-1">
              Upload an image file (JPEG, PNG, etc.)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <label className="flex items-center text-gray-400">
          <input
            type="checkbox"
            name="is_public"
            checked={blog.is_public}
            onChange={(e) => onChange("is_public", e.target.checked)}
            className="mr-2 h-4 w-4 text-[#a855f7] focus:ring-[#a855f7] border-[#2d1b4d] rounded"
          />
          Public
        </label>
        <label className="flex items-center text-gray-400">
          <input
            type="checkbox"
            name="isFeatured"
            checked={blog.isFeatured}
            onChange={(e) => onChange("isFeatured", e.target.checked)}
            className="mr-2 h-4 w-4 text-[#a855f7] focus:ring-[#a855f7] border-[#2d1b4d] rounded"
          />
          Featured
        </label>
      </div>

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
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
