"use client";

import { useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import Image from "next/image";

interface SkillItemProps {
  id: string;
  name: string;
  level: string;
  icon: string;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: { name: string; level: string; icon: string }
  ) => void;
}

export default function SkillItem({
  id,
  name,
  level,
  icon,
  onDelete,
  onUpdate,
}: SkillItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [skillName, setSkillName] = useState(name);
  const [skillLevel, setSkillLevel] = useState(level);
  const [skillIcon, setSkillIcon] = useState(icon);

  const handleSave = () => {
    onUpdate(id, {
      name: skillName,
      level: skillLevel,
      icon: skillIcon,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg p-4 flex items-center gap-3">
      <div className="cursor-move text-gray-500">
        <GripVertical size={20} />
      </div>

      {isEditing ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor={`skill-name-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              Skill Name
            </label>
            <input
              id={`skill-name-${id}`}
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full bg-[#120b20] border border-[#2d1b4d] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
            />
          </div>

          <div>
            <label
              htmlFor={`skill-level-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              Level
            </label>
            <select
              id={`skill-level-${id}`}
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full bg-[#120b20] border border-[#2d1b4d] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`skill-icon-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              Icon URL
            </label>
            <input
              id={`skill-icon-${id}`}
              type="text"
              value={skillIcon}
              onChange={(e) => setSkillIcon(e.target.value)}
              className="w-full bg-[#120b20] border border-[#2d1b4d] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center">
          <div className="w-10 h-10 bg-[#120b20] rounded-lg flex items-center justify-center text-[#a855f7] mr-3">
            {skillIcon ? (
              <Image
                width={36}
                height={36}
                src={skillIcon || "/placeholder.svg"}
                alt={skillName}
                className="w-6 h-6"
              />
            ) : (
              <div className="w-6 h-6 bg-[#a855f7] rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">{skillName}</h3>
            <p
              className={`text-sm ${
                skillLevel === "Expert"
                  ? "text-[#a855f7]"
                  : skillLevel === "Intermediate"
                  ? "text-blue-400"
                  : "text-gray-400"
              }`}
            >
              {skillLevel}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#a855f7] text-white text-sm rounded hover:bg-[#9333ea] transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-[#2d1b4d] text-white text-sm rounded hover:bg-[#3d2b5d] transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-[#2d1b4d] text-white text-sm rounded hover:bg-[#3d2b5d] transition-colors"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete skill"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
