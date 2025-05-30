"use client";

import { useState, useRef } from "react";
import { blogs as initialBlogs } from "@/lib/mock/blogs";
import BlogHeader from "@/components/Blog/BlogHeader";
import SuccessMessage from "@/components/Blog/SuccessMessage";
import BlogForm from "@/components/Blog/BlogForm";
import BlogList from "@/components/Blog/BlogList";
import { useUser } from "@/context/UserContext";

export interface TBlog {
  id: string;
  title: string;
  overview: string;
  image: string;
  content: string;
  tags: string[];
  is_public: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
  excerpt: string;
  date: string;
  readTime: string;
}
export interface Author {
  id: string;
  name: string;
  profilePhoto: string;
}
type TProps = {
  blogs: TBlog[];
};

export default function Blogs({ blogs }: TProps) {
  const { user } = useUser();
  const [blogList, setBlogs] = useState<TBlog[]>(blogs);
  const editorRef = useRef<any>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [newBlog, setNewBlog] = useState<TBlog>({
    id: "",
    title: "",
    overview: "",
    image: "/placeholder.svg?height=600&width=1200",
    content: "",
    tags: [""],
    is_public: false,
    isFeatured: false,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: "",
    author: {
      id: "",
      name: "",
      profilePhoto: "",
    },
    excerpt: "",
    date: new Date().toISOString(),
    readTime: "0 min read",
  });

  const handleAddBlog = () => {
    setIsAddingBlog(true);
    setNewBlog({
      id: `blog-${Date.now()}`,
      title: "",
      overview: "",
      content: "",
      author: {
        id: "",
        name: "Mehad Khan",
        profilePhoto: "/placeholder.svg?height=100&width=100",
      },
      tags: [""],
      image: "/placeholder.svg?height=600&width=1200",
      is_public: false,
      isFeatured: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: "",
      excerpt: "",
      date: new Date().toISOString(),
      readTime: "0 min read",
    });
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
      if (!newBlog.title || !newBlog.overview || !newBlog.content) {
        alert("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      const cleanedBlog = {
        ...newBlog,
        tags: newBlog.tags.filter((item) => item.trim() !== ""),
        readTime: calculateReadTime(newBlog.content),
        excerpt: newBlog.overview || newBlog.content.slice(0, 120),
        date: newBlog.createdAt,
      };

      if (!editingBlogId) {
        cleanedBlog.id = newBlog.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingBlogId) {
        setBlogs((prev: TBlog[]) =>
          prev.map((blog) => (blog.id === editingBlogId ? cleanedBlog : blog))
        );
        setSuccessMessage("Blog post updated successfully!");
      } else {
        setBlogs((prev: TBlog[]) => [cleanedBlog, ...prev]);
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
      setBlogs((prev: TBlog[]) => prev.filter((blog) => blog.id !== blogId));
      setSuccessMessage("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleEditBlog = (blogId: string) => {
    const blogToEdit = blogList.find((blog) => blog.id === blogId);
    if (blogToEdit) {
      setNewBlog(blogToEdit);
      setEditingBlogId(blogId);
      setIsAddingBlog(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          blog={{
            ...newBlog,
            author: {
              name: newBlog.author.name,
              image:
                newBlog.author.profilePhoto ||
                "/placeholder.svg?height=100&width=100",
            },
          }}
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
        blogs={blogList}
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
