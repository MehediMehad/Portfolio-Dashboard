import Spinner from "@/components/ui/spinner";
import BlogItem from "./BlogItem";
import { Plus } from "lucide-react";

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

interface BlogListProps {
  blogs: Blog[];
  isLoading: boolean;
  expandedBlog: string | null;
  onAddBlog: () => void;
  onEditBlog: (id: string) => void;
  onDeleteBlog: (id: string) => void;
  onToggleBlogExpansion: (id: string) => void;
}

export default function BlogList({
  blogs,
  isLoading,
  expandedBlog,
  onAddBlog,
  onEditBlog,
  onDeleteBlog,
  onToggleBlogExpansion,
}: BlogListProps) {
  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden">
      <div className="p-6 border-b border-[#2d1b4d]">
        <h2 className="text-white text-xl font-bold">Your Blog Posts</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" text="Loading blog posts..." />
        </div>
      ) : blogs.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-400 mb-4">
            You haven't added any blog posts yet.
          </p>
          <button
            onClick={onAddBlog}
            className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Your First Blog Post
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#2d1b4d]">
          {blogs.map((blog) => (
            <BlogItem
              key={blog.id}
              blog={blog}
              isExpanded={expandedBlog === blog.id}
              onEdit={onEditBlog}
              onDelete={onDeleteBlog}
              onToggleExpand={onToggleBlogExpansion}
            />
          ))}
        </div>
      )}
    </div>
  );
}
