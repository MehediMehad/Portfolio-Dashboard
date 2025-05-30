"use client";

import { useState, useRef } from "react";
import { blogs as initialBlogs } from "@/lib/mock/blogs";
import BlogHeader from "@/components/Blog/BlogHeader";
import SuccessMessage from "@/components/Blog/SuccessMessage";
import BlogForm from "@/components/Blog/BlogForm";
import BlogList from "@/components/Blog/BlogList";

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

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const editorRef = useRef<any>(null);

  const [newBlog, setNewBlog] = useState<Blog>({
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

  const handleEditBlog = (blogId: string) => {
    setEditingBlogId(blogId);
    const blogToEdit = blogs.find((b) => b.id === blogId);
    if (blogToEdit) {
      setNewBlog({ ...blogToEdit });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsAddingBlog(false);
    setEditingBlogId(null);
  };

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

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setNewBlog((prev) => ({
        ...prev,
        content,
      }));
    }
  };

  const handleTagChange = (index: number, value: string) => {
    setNewBlog((prev) => {
      const newTags = [...prev.tags];
      newTags[index] = value;
      return { ...prev, tags: newTags };
    });
  };

  const handleAddTag = () => {
    setNewBlog((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const handleRemoveTag = (index: number) => {
    setNewBlog((prev) => {
      const newTags = [...prev.tags];
      newTags.splice(index, 1);
      return { ...prev, tags: newTags };
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
      if (!newBlog.title || !newBlog.excerpt || !newBlog.content) {
        alert("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      const cleanedBlog = {
        ...newBlog,
        tags: newBlog.tags.filter((item) => item.trim() !== ""),
        readTime: calculateReadTime(newBlog.content),
      };

      if (!editingBlogId) {
        cleanedBlog.id = newBlog.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingBlogId) {
        setBlogs((prev) =>
          prev.map((blog) => (blog.id === editingBlogId ? cleanedBlog : blog))
        );
        setSuccessMessage("Blog post updated successfully!");
      } else {
        setBlogs((prev) => [cleanedBlog, ...prev]);
        setSuccessMessage("Blog post added successfully!");
      }

      setIsAddingBlog(false);
      setEditingBlogId(null);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      setSuccessMessage("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const toggleBlogExpansion = (blogId: string) => {
    setExpandedBlog((prev) => (prev === blogId ? null : blogId));
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
          onChange={handleInputChange}
          onEditorChange={handleEditorChange}
          onTagChange={handleTagChange}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          onSave={handleSaveBlog}
          onCancel={handleCancelEdit}
          isLoading={isLoading}
          isEditing={!!editingBlogId}
          editorRef={editorRef}
        />
      )}
      <BlogList
        blogs={blogs}
        isLoading={isLoading && !isAddingBlog && !editingBlogId}
        expandedBlog={expandedBlog}
        onAddBlog={handleAddBlog}
        onEditBlog={handleEditBlog}
        onDeleteBlog={handleDeleteBlog}
        onToggleBlogExpansion={toggleBlogExpansion}
      />
    </div>
  );
}
