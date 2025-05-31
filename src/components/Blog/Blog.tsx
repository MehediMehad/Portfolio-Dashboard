"use client";

import { useState, useRef } from "react";
import BlogHeader from "@/components/Blog/BlogHeader";
import SuccessMessage from "@/components/Blog/SuccessMessage";
import BlogForm from "@/components/Blog/BlogForm";
import BlogList from "@/components/Blog/BlogList";
import { useUser } from "@/context/UserContext";
import { createBlog, updateBlog } from "@/actions/blogs";

export interface TBlog {
  id: string;
  title: string;
  overview: string;
  image: string; // Always a string, use "" for no image
  content: string;
  tags: string[];
  is_public: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
  date: string;
}

export interface Author {
  id: string;
  name: string;
  profilePhoto: string;
}

interface Props {
  blogs: TBlog[];
}

export default function Blogs({ blogs }: Props) {
  const { user } = useUser();
  const userId = user?.userId || "";
  const [blogList, setBlogs] = useState<TBlog[]>(blogs);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<any>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);

  const initialBlog: TBlog = {
    id: "",
    title: "",
    overview: "",
    image: "",
    content: "",
    tags: [""],
    is_public: false,
    isFeatured: false,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: userId,
    author: {
      id: userId,
      name: user?.name || "Anonymous",
      profilePhoto: "/placeholder.svg?height=100&width=100",
    },
    date: new Date().toISOString(),
  };

  const [newBlog, setNewBlog] = useState<TBlog>(initialBlog);

  const handleAddBlog = () => {
    setNewBlog({
      ...initialBlog,
      id: `blog-${Date.now()}`,
    });
    setIsAddingBlog(true);
    setEditingBlogId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditBlog = (blogId: string) => {
    const blog = blogList.find((b) => b.id === blogId);
    if (!blog) {
      alert("Blog not found");
      return;
    }
    setNewBlog({
      ...blog,
      tags: blog.tags.length ? blog.tags : [""],
    });
    setEditingBlogId(blogId);
    setIsAddingBlog(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setIsAddingBlog(false);
    setEditingBlogId(null);
    setNewBlog(initialBlog);
  };

  const handleChange = (name: string, value: any) => {
    setNewBlog((prev) => ({
      ...prev,
      [name]: name === "author" ? value : value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setNewBlog((prev) => ({ ...prev, content }));
  };

  const handleTagChange = (index: number, value: string) => {
    setNewBlog((prev) => {
      const tags = [...prev.tags];
      tags[index] = value;
      return { ...prev, tags };
    });
  };

  const handleAddTag = () => {
    setNewBlog((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  };

  const handleRemoveTag = (index: number) => {
    setNewBlog((prev) => {
      const tags = prev.tags.filter((_, i) => i !== index);
      return { ...prev, tags: tags.length ? tags : [""] };
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const handleSaveBlog = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!newBlog.title.trim()) throw new Error("Blog title is required");
      if (!newBlog.overview.trim())
        throw new Error("Blog overview is required");
      if (!newBlog.content.trim()) throw new Error("Blog content is required");

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: newBlog.title,
          overview: newBlog.overview,
          content: newBlog.content,
          tags: newBlog.tags.filter((tag) => tag.trim()),
          is_public: newBlog.is_public,
          isFeatured: newBlog.isFeatured,
          authorId: userId,
          author: newBlog.author,
        })
      );
      if ((newBlog.image as any) instanceof File) {
        formData.append("file", newBlog.image);
      } else if (typeof newBlog.image === "string" && newBlog.image) {
        formData.append("imageUrl", newBlog.image);
      }

      const response = editingBlogId
        ? await updateBlog(editingBlogId, formData)
        : await createBlog(formData);

      if (response.error) throw new Error(response.error);

      const updatedBlog: TBlog = {
        ...response,
        id: editingBlogId || response.id || `blog-${Date.now()}`,
        image: response.image || newBlog.image || "",
        readTime: calculateReadTime(newBlog.content),
        excerpt: newBlog.overview || newBlog.content.slice(0, 120),
        date: new Date().toISOString(),
        authorId: userId,
        author: {
          id: userId,
          name: newBlog.author.name || user?.name || "Anonymous",
          profilePhoto:
            newBlog.author.profilePhoto ||
            "/placeholder.svg?height=100&width=100",
        },
      };

      setBlogs((prev) =>
        editingBlogId
          ? prev.map((blog) => (blog.id === editingBlogId ? updatedBlog : blog))
          : [updatedBlog, ...prev]
      );
      setSuccessMessage(editingBlogId ? "Blog updated!" : "Blog created!");
      handleCancel();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setIsLoading(true);
    try {
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      setSuccessMessage("Blog deleted!");
    } catch (error) {
      alert("Failed to delete blog post.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="mx-auto">
      <BlogHeader
        onAddBlog={handleAddBlog}
        isFormOpen={isAddingBlog || !!editingBlogId}
      />
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      {(isAddingBlog || editingBlogId) && (
        <BlogForm
          blog={newBlog}
          onChange={handleChange}
          onEditorChange={handleEditorChange}
          onTagChange={handleTagChange}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          onSave={handleSaveBlog}
          onCancel={handleCancel}
          isLoading={isLoading}
          isEditing={!!editingBlogId}
          editorRef={editorRef}
        />
      )}
      <BlogList
        blogs={blogList}
        isLoading={isLoading && !isAddingBlog && !editingBlogId}
        onAddBlog={handleAddBlog}
        onEditBlog={handleEditBlog}
        onDeleteBlog={handleDeleteBlog}
        onToggleBlogExpansion={(blogId) =>
          setExpandedBlog((prev) => (prev === blogId ? null : blogId))
        }
        expandedBlog={expandedBlog}
      />
    </div>
  );
}
