import { Plus, Trash2 } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function TagInput({
  tags,
  onChange,
  onAdd,
  onRemove,
}: TagInputProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-400">Tags</label>
        <button
          type="button"
          onClick={onAdd}
          className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
        >
          <Plus size={14} />
          Add Tag
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => onChange(index, e.target.value)}
              className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              placeholder="e.g., Web Development, React"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-gray-400 hover:text-red-500 p-1"
              disabled={tags.length <= 1}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
