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
  const userId = user?.userId;
  const [blogList, setBlogs] = useState<TBlog[]>(blogs);
  const editorRef = useRef<any>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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
    setImageFile(null); // Reset imageFile for new blog
    setNewBlog({
      id: `blog-${Date.now()}`,
      title: "",
      overview: "",
      content: "",
      author: {
        id: userId || "",
        name: user?.name || "Mehad Khan",
        profilePhoto: "/placeholder.svg?height=100&width=100",
      },
      tags: [""],
      image: "/placeholder.svg?height=600&width=1200",
      is_public: false,
      isFeatured: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: userId || "",
      excerpt: "",
      date: new Date().toISOString(),
      readTime: "0 min read",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsAddingBlog(false);
    setEditingBlogId(null);
    setImageFile(null); // Reset imageFile
    setNewBlog({
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
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | { target: { name: string; value: any } }
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
      // Validate required fields
      if (!newBlog.title?.trim()) {
        throw new Error("Blog title is required");
      }
      if (!newBlog.overview?.trim()) {
        throw new Error("Blog overview is required");
      }
      if (!newBlog.content?.trim()) {
        throw new Error("Blog content is required");
      }

      // Prepare modified data for FormData
      const modifiedData = {
        title: newBlog.title,
        overview: newBlog.overview,
        content: newBlog.content,
        tags: newBlog.tags.filter((tag) => tag.trim() !== ""),
        is_public: newBlog.is_public,
        isFeatured: newBlog.isFeatured,
      };

      // Create FormData for API request
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      if (imageFile) {
        formData.append("file", imageFile);
      } else if (typeof newBlog.image === "string" && newBlog.image) {
        formData.append("imageUrl", newBlog.image); // Send existing image URL if no new file
      }

      let response;
      if (editingBlogId) {
        response = await updateBlog(editingBlogId, formData);
      } else {
        response = await createBlog(formData);
      }

      // Handle API response
      if (response.error) {
        throw new Error(response.error);
      }

      const updatedBlog: TBlog = {
        ...response,
        id:
          editingBlogId ||
          response.id ||
          newBlog.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-"),
        readTime: calculateReadTime(newBlog.content),
        excerpt: newBlog.overview || newBlog.content.slice(0, 120),
        date: newBlog.createdAt,
        authorId: userId || "",
        author: {
          id: userId || "",
          name: newBlog.author.name || user?.name || "Mehad Khan",
          profilePhoto:
            newBlog.author.profilePhoto ||
            "/placeholder.svg?height=100&width=100",
        },
        image:
          response.image || // Use backend-provided image URL if available
          (typeof newBlog.image === "string"
            ? newBlog.image
            : "/placeholder.svg?height=600&width=1200"),
      };

      if (editingBlogId) {
        setBlogs((prev: TBlog[]) =>
          prev.map((blog) => (blog.id === editingBlogId ? updatedBlog : blog))
        );
        setSuccessMessage("Blog post updated successfully!");
      } else {
        setBlogs((prev: TBlog[]) => [updatedBlog, ...prev]);
        setSuccessMessage("Blog post created successfully!");
      }

      // Reset form
      handleCancelEdit();
      setImageFile(null); // Reset imageFile after saving
    } catch (error: any) {
      console.error("Error saving blog:", error);
      alert(`Failed to save blog post: ${error.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleEditBlog = (blogId: string) => {
    const blogToEdit = blogList.find((blog) => blog.id === blogId);
    if (!blogToEdit) {
      alert("Blog not found");
      return;
    }

    setNewBlog({
      ...blogToEdit,
      tags: blogToEdit.tags.length ? blogToEdit.tags : [""],
      author: {
        id: blogToEdit.authorId,
        name: blogToEdit.author.name || user?.name || "Mehad Khan",
        profilePhoto:
          blogToEdit.author.profilePhoto ||
          "/placeholder.svg?height=100&width=100",
      },
    });
    setImageFile(null); // Reset imageFile when editing
    setEditingBlogId(blogId);
    setIsAddingBlog(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              id: newBlog.author.id || newBlog.authorId || "",
              name: newBlog.author.name,
              profilePhoto:
                newBlog.author.profilePhoto ||
                "/placeholder.svg?height=100&width=100",
            },
            is_public: newBlog.is_public,
            isFeatured: newBlog.isFeatured,
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
          imageFile={imageFile}
          setImageFile={setImageFile}
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
