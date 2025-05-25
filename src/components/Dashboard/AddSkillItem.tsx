"use client";

import { useRef, useState, useEffect } from "react";
import { Trash2, GripVertical, Upload } from "lucide-react";
import Image from "next/image";

interface SkillItemProps {
  id: string;
  name: string;
  level: string;
  icon: string;
  isNew?: boolean;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: { name: string; level: string; icon: string }
  ) => void;
}

export default function AddSkillItem({
  id,
  name,
  level,
  icon,
  isNew = false,
  onDelete,
  onUpdate,
}: SkillItemProps) {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Auto-edit if new
  const [skillName, setSkillName] = useState(name);
  const [skillLevel, setSkillLevel] = useState(level);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(icon || null);
  const fileIconRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const triggerFileInput = () => {
    fileIconRef.current?.click();
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    onUpdate(id, {
      name: skillName,
      level: skillLevel,
      icon: imagePreview || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg p-4 flex items-center gap-3">
      {/* Drag Handle */}
      <div className="cursor-move text-gray-500">
        <GripVertical size={20} />
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name Input */}
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

          {/* Level Dropdown */}
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

          {/* Image Upload Section */}
          <div>
            <label
              htmlFor={`Upload-icon-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              Upload Icon
            </label>
            <div className="flex flex-row-reverse justify-end gap-5">
              <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center gap-2 bg-[#2d1b4d] hover:bg-[#3d2b5d] text-white px-3 py-2 rounded transition-colors"
              >
                <Upload size={16} />
                Choose Icon
              </button>
              <input
                ref={fileIconRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <Image
                    src={imagePreview}
                    alt="Icon Preview"
                    width={44}
                    height={44}
                    className="w-11 h-11 object-contain rounded border border-[#2d1b4d]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="flex-1 flex items-center">
          <div className="w-10 h-10 bg-[#120b20] rounded-lg flex items-center justify-center text-[#a855f7] mr-3">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt={skillName}
                width={36}
                height={36}
                className="w-6 h-6 object-contain"
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

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#a855f7] text-white text-sm rounded hover:bg-[#9333ea] transition-colors"
            >
              {isNew ? "Add" : "Save"}
            </button>
            <button
              onClick={() => {
                if (isNew) {
                  onDelete(id); // discard new skill
                } else {
                  setIsEditing(false);
                }
              }}
              className="px-3 py-1 bg-[#2d1b4d] text-white text-sm rounded hover:bg-[#3d2b5d] transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-[#2d1b4d] text-white text-sm rounded hover:bg-[#3d2b5d] transition-colors"
            >
              Edit
            </button>
            {!isNew && (
              <button
                onClick={() => onDelete(id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete skill"
              >
                <Trash2 size={18} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
