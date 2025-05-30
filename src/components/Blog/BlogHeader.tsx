import { Plus } from "lucide-react";

interface BlogHeaderProps {
  onAddBlog: () => void;
  isFormOpen: boolean;
}

export default function BlogHeader({ onAddBlog, isFormOpen }: BlogHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-white text-2xl font-bold">Manage Blog Posts</h1>
      {!isFormOpen && (
        <button
          onClick={onAddBlog}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Post
        </button>
      )}
    </div>
  );
}
