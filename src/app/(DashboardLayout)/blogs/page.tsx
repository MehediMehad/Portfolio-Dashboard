"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import {
  Plus,
  Save,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
  Upload,
  Calendar,
  Tag,
  User,
  Clock,
} from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { blogs as initialBlogs } from "@/lib/mock/blogs";

export default function BlogsPage() {
  const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const editorRef = useRef<any>(null);

  // New blog form state
  const [newBlog, setNewBlog] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    author: {
      name: "Mehedi Hasan",
      image: "/placeholder.svg?height=100&width=100",
    },
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    tags: [""],
    image: "/placeholder.svg?height=600&width=1200",
    readTime: "5 min read",
  });

  // Handle adding a new blog
  const handleAddBlog = () => {
    setIsAddingBlog(true);
    setNewBlog({
      id: `blog-${Date.now()}`,
      title: "",
      excerpt: "",
      content: "",
      author: {
        name: "Mehad Khan",
        image: "/placeholder.svg?height=100&width=100",
      },
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      tags: [""],
      image: "/placeholder.svg?height=600&width=1200",
      readTime: "5 min read",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle editing a blog
  const handleEditBlog = (blogId: string) => {
    setEditingBlogId(blogId);
    const blogToEdit = blogs.find((b) => b.id === blogId);
    if (blogToEdit) {
      setNewBlog({ ...blogToEdit });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle canceling edit/add
  const handleCancelEdit = () => {
    setIsAddingBlog(false);
    setEditingBlogId(null);
  };

  // Handle input change for new/edited blog
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle TinyMCE content change
  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setNewBlog((prev) => ({
        ...prev,
        content,
      }));
    }
  };

  // Handle array input changes (tags)
  const handleArrayInputChange = (
    arrayName: "tags",
    index: number,
    value: string
  ) => {
    setNewBlog((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  // Add new item to an array
  const handleAddArrayItem = (arrayName: "tags") => {
    setNewBlog((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  // Remove item from an array
  const handleRemoveArrayItem = (arrayName: "tags", index: number) => {
    setNewBlog((prev) => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Save new or edited blog
  const handleSaveBlog = async () => {
    setIsLoading(true);

    try {
      // Validate required fields
      if (!newBlog.title || !newBlog.excerpt || !newBlog.content) {
        alert("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      // Clean up empty array items
      const cleanedBlog = {
        ...newBlog,
        tags: newBlog.tags.filter((item) => item.trim() !== ""),
        readTime: calculateReadTime(newBlog.content),
      };

      // Generate slug from title if it's a new blog
      if (!editingBlogId) {
        cleanedBlog.id = newBlog.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingBlogId) {
        // Update existing blog
        setBlogs((prev) =>
          prev.map((blog) => (blog.id === editingBlogId ? cleanedBlog : blog))
        );
        setSuccessMessage("Blog post updated successfully!");
      } else {
        // Add new blog
        setBlogs((prev) => [cleanedBlog, ...prev]);
        setSuccessMessage("Blog post added successfully!");
      }

      // Reset form
      setIsAddingBlog(false);
      setEditingBlogId(null);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post. Please try again.");
    } finally {
      setIsLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (blogId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      setSuccessMessage("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post. Please try again.");
    } finally {
      setIsLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  // Toggle blog details expansion
  const toggleBlogExpansion = (blogId: string) => {
    setExpandedBlog((prev) => (prev === blogId ? null : blogId));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-bold">Manage Blog Posts</h1>
        {!isAddingBlog && !editingBlogId && (
          <button
            onClick={handleAddBlog}
            className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Post
          </button>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg flex justify-between items-center">
          <p>{successMessage}</p>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-green-400 hover:text-green-300"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Add/Edit Blog Form */}
      {(isAddingBlog || editingBlogId) && (
        <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
          <h2 className="text-white text-xl font-bold mb-6">
            {editingBlogId ? "Edit Blog Post" : "Add New Blog Post"}
          </h2>

          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-400 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
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
              value={newBlog.excerpt}
              onChange={handleInputChange}
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
                apiKey={TINYMCE_API_KEY} // Replace with your actual TinyMCE API key
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={newBlog.content}
                onEditorChange={handleEditorChange}
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
                  directionality: "ltr", // <-- Add this line
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
                value={newBlog.author.name}
                onChange={(e) =>
                  setNewBlog((prev) => ({
                    ...prev,
                    author: {
                      ...prev.author,
                      name: e.target.value,
                    },
                  }))
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
                value={new Date(newBlog.date).toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
                  setNewBlog((prev) => ({
                    ...prev,
                    date: formattedDate,
                  }));
                }}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-400">Tags</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem("tags")}
                className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
              >
                <Plus size={14} />
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newBlog.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) =>
                      handleArrayInputChange("tags", index, e.target.value)
                    }
                    className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                    placeholder="e.g., Web Development, React"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("tags", index)}
                    className="text-gray-400 hover:text-red-500 p-1"
                    disabled={newBlog.tags.length <= 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-400 mb-2">
              Featured Image
            </label>
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-24 bg-[#1a1025] border border-[#2d1b4d] rounded-lg overflow-hidden">
                <Image
                  src={newBlog.image || "/placeholder.svg"}
                  alt="Blog preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newBlog.image}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="/path/to/image.jpg"
                />
                <p className="text-gray-500 text-sm mt-1">
                  Enter image URL or upload an image (upload functionality
                  coming soon)
                </p>
                <button className="mt-2 flex items-center gap-2 bg-[#2d1b4d] hover:bg-[#3d2b5d] text-white px-3 py-1.5 rounded text-sm transition-colors">
                  <Upload size={14} />
                  Upload Image
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-[#1a1025] hover:bg-[#2d1b4d] text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveBlog}
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
      )}

      {/* Blogs List */}
      <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#2d1b4d]">
          <h2 className="text-white text-xl font-bold">Your Blog Posts</h2>
        </div>

        {isLoading && !isAddingBlog && !editingBlogId ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" text="Loading blog posts..." />
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400 mb-4">
              You haven't added any blog posts yet.
            </p>
            <button
              onClick={handleAddBlog}
              className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Blog Post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#2d1b4d]">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative w-full md:w-24 h-16 bg-[#1a1025] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-1">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{blog.author.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleEditBlog(blog.id)}
                      className="p-2 text-gray-400 hover:text-[#a855f7] transition-colors"
                      title="Edit Blog Post"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Blog Post"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleBlogExpansion(blog.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title={
                        expandedBlog === blog.id
                          ? "Collapse Details"
                          : "Expand Details"
                      }
                    >
                      {expandedBlog === blog.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Blog Details */}
                {expandedBlog === blog.id && (
                  <div className="mt-4 pl-4 border-l-2 border-[#2d1b4d]">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="text-[#a855f7] font-medium mb-2">
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-[#1a1025] text-xs text-[#a855f7] px-2 py-1 rounded flex items-center gap-1"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[#a855f7] font-medium mb-2">
                          Content Preview
                        </h4>
                        <div className="bg-[#1a1025] p-4 rounded-lg max-h-40 overflow-y-auto">
                          <div
                            className="text-gray-300 text-sm prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                              __html:
                                blog.content.length > 300
                                  ? blog.content.substring(0, 300) + "..."
                                  : blog.content,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
