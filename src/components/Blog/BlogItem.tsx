import Image from "next/image";
import {
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Tag,
} from "lucide-react";

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
}
export interface Author {
  id: string;
  name: string;
  profilePhoto: string;
}

interface BlogItemProps {
  blog: TBlog;
  isExpanded: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

export default function BlogItem({
  blog,
  isExpanded,
  onEdit,
  onDelete,
  onToggleExpand,
}: BlogItemProps) {
  return (
    <div className="p-6">
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
          <h3 className="text-white font-bold text-lg">{blog.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-1">{blog.overview}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{blog.author.name}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={() => onEdit(blog.id)}
            className="p-2 text-gray-400 hover:text-[#a855f7] transition-colors"
            title="Edit Blog Post"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete Blog Post"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => onToggleExpand(blog.id)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title={isExpanded ? "Collapse Details" : "Expand Details"}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pl-4 border-l-2 border-[#2d1b4d]">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="text-[#a855f7] font-medium mb-2">Tags</h4>
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
  );
}
