import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import TagInput from "./TagInput";
import { RefreshCw, Save, X } from "lucide-react";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  overview: string;
  image: string | File; // Image can be a URL (string) or a File
  content: string;
  tags: string[];
  is_public: boolean;
  isFeatured: boolean;
  author: { id: string; name: string; profilePhoto: string };
}

interface BlogFormProps {
  blog: Blog;
  onChange: (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | { target: { name: string; value: any } }
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
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
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
  imageFile,
  setImageFile,
}: BlogFormProps) {
  const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

  // Handle nested author updates
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange({
      target: {
        name: "author",
        value: { ...blog.author, name: value },
      },
    });
  };

  // Handle file input for image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // Update imageFile state
      onChange({
        target: {
          name: "image",
          value: file, // Update blog.image with the File object
        },
      });
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImageFile(null); // Clear imageFile state
    onChange({
      target: {
        name: "image",
        value: "", // Reset to empty string
      },
    });
  };

  // Handle boolean fields (is_public, isFeatured)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange({
      target: {
        name,
        value: checked,
      },
    });
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(URL.createObjectURL(imageFile));
      }
    };
  }, [imageFile]);

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
        <label htmlFor="overview" className="block text-gray-400 mb-2">
          Overview <span className="text-red-500">*</span>
        </label>
        <textarea
          id="overview"
          name="overview"
          value={blog.overview}
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

      <div className="mb-6">
        <label htmlFor="author" className="block text-gray-400 mb-2">
          Author Name
        </label>
        <input
          type="text"
          id="author"
          name="author.name"
          value={blog.author.name}
          onChange={handleAuthorChange}
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
          Project Image
        </label>
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-24 bg-[#1a1025] border border-[#2d1b4d] rounded-lg overflow-hidden">
            <Image
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : typeof blog.image === "string"
                  ? blog.image || "/placeholder.svg"
                  : "/placeholder.svg"
              }
              alt="blog preview"
              fill
              className="object-cover"
            />
            {imageFile || (typeof blog.image === "string" && blog.image) ? (
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
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
        <div>
          <label className="flex items-center text-gray-400">
            <input
              type="checkbox"
              name="is_public"
              checked={blog.is_public}
              onChange={handleCheckboxChange}
              className="mr-2 h-4 w-4 text-[#a855f7] focus:ring-[#a855f7] border-[#2d1b4d] rounded"
            />
            Public
          </label>
        </div>
        <div>
          <label className="flex items-center text-gray-400">
            <input
              type="checkbox"
              name="isFeatured"
              checked={blog.isFeatured}
              onChange={handleCheckboxChange}
              className="mr-2 h-4 w-4 text-[#a855f7] focus:ring-[#a855f7] border-[#2d1b4d] rounded"
            />
            Featured
          </label>
        </div>
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
