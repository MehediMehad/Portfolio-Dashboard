"use client";

import { useRef, useState, useEffect } from "react";
import { Trash2, GripVertical, Upload } from "lucide-react";
import Image from "next/image";
import { updateSkill } from "@/actions/Skils";
import { toast } from "sonner";
import { deleteSkill } from "@/actions/MyInfo";
import SkillDeleteConfirmationModal from "./skill-delete-confirmation-modal";

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
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [skillName, setSkillName] = useState(name);
  const [skillLevel, setSkillLevel] = useState(level);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(icon || null);
  const [errors, setErrors] = useState({ name: "", form: "" });
  const fileIconRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync props with state when they change
  useEffect(() => {
    setSkillName(name);
    setSkillLevel(level);
    setImagePreview(icon || null);
    setImageFile(null);
    setErrors({ name: "", form: "" });
  }, [name, level, icon]);

  // Clean up object URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Focus on name input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus();
    }
  }, [isEditing]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          form: "Image size must not exceed 5MB",
        }));
        return;
      }
      // Validate file type
      if (!["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          form: "Only PNG, JPEG, or SVG files are allowed",
        }));
        return;
      }
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileIconRef.current?.click();
  };

  // Handle save action
  const handleSave = async () => {
    // Client-side validation
    if (!skillName.trim()) {
      setErrors((prev) => ({ ...prev, name: "Skill name is required" }));
      nameInputRef.current?.focus();
      return;
    }

    // Create FormData object
    const formData = new FormData();

    const skillData = {
      skillId: id,
      name: skillName.trim(),
      level: skillLevel,
    };
    formData.append("data", JSON.stringify(skillData));

    if (imageFile) {
      formData.append("file", imageFile);
    } else if (imagePreview) {
      formData.append("file", imagePreview); // Send existing icon URL if no new file
    }

    console.log(formData.get("data"));
    console.log("File to upload:", imageFile);

    // Call server action
    const response = await updateSkill(formData);

    if (response.success) {
      toast.success("Skill updated successfully!");
    }

    if (response.error) {
      setErrors((prev) => ({ ...prev, form: response.error }));
      return;
    }

    // Update local UI state
    onUpdate(id, {
      name: skillName.trim(),
      level: skillLevel,
      icon: response.data?.icon || imagePreview || "", // Use server-provided URL if available
    });

    setIsEditing(false);
  };

  // // Handle delete action
  // const handleDelete = async () => {
  //   // Call server action
  //   const response = await deleteSkill(id);

  //   if (response.error) {
  //     setErrors((prev) => ({ ...prev, form: response.error }));
  //     return;
  //   }

  //   // Update local UI state
  //   onDelete(id);
  // };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    const response = await deleteSkill(id);

    if (response.error) {
      setErrors((prev) => ({ ...prev, form: response.error }));
      return;
    }

    // Update local UI state
    onDelete(id);
  };

  // Handle cancel action
  const handleCancel = () => {
    setSkillName(name);
    setSkillLevel(level);
    setImageFile(null);
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(icon || null);
    setErrors({ name: "", form: "" });
    setIsEditing(false);
  };

  if (!mounted) return null;

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
              Skill Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              id={`skill-name-${id}`}
              type="text"
              value={skillName}
              onChange={(e) => {
                setSkillName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full bg-[#120b20] border ${
                errors.name ? "border-red-500" : "border-[#2d1b4d]"
              } rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]`}
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
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
              htmlFor={`skill-icon-${id}`}
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
                id={`skill-icon-${id}`}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
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

          {/* Form Error */}
          {errors.form && (
            <div className="md:col-span-3">
              <p className="text-red-500 text-sm">{errors.form}</p>
            </div>
          )}
        </div>
      ) : (
        // View Mode
        <div className="flex-1 flex items-center">
          <div className="w-10 h-10 bg-[#120b20] rounded-lg flex items-center justify-center text-[#a855f7] mr-3">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt={skillName}
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
            ) : (
              <div className="w-6 h-6 bg-[#a855f7] rounded-full"></div>
            )}
            <div
              className={`w-6 h-6 bg-[#a855f7] rounded-full ${
                imagePreview ? "hidden" : ""
              }`}
            ></div>
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
              Save
            </button>
            <button
              onClick={handleCancel}
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
          onClick={() => setIsDeleteModalOpen(true)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete skill"
        >
          <Trash2 size={18} />
        </button>
      </div>
      {/* Delete Confirmation Modal */}
      <SkillDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
        itemName={skillName}
      />
    </div>
  );
}
