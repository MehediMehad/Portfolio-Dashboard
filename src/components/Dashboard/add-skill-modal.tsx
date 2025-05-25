"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { createSkill } from "@/actions/Skils";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (skill: { name: string; level: string; icon: string }) => void; // Optional, in case you still need it
}

export default function AddSkillModal({
  isOpen,
  onClose,
  onAdd,
}: AddSkillModalProps) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({ name: "", form: "" });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileIconRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSkillName("");
      setSkillLevel("Beginner");
      setImageFile(null);
      setImagePreview(null);
      setErrors({ name: "", form: "" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Clean up object URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (e.g., max 5MB)
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
      if (imagePreview) {
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!skillName.trim()) {
      setErrors((prev) => ({ ...prev, name: "Skill name is required" }));
      nameInputRef.current?.focus();
      return;
    }

    // Create FormData object
    const formData = new FormData();
    const skillData = {
      name: skillName.trim(),
      level: skillLevel,
    };
    formData.append("data", JSON.stringify(skillData));

    if (imageFile) {
      formData.append("file", imageFile);
    }

    // Call server action
    const response = await createSkill(formData);

    if (response.error) {
      setErrors((prev) => ({ ...prev, form: response.error }));
      return;
    }

    // Optionally call onAdd for local state updates (if provided)
    if (onAdd) {
      onAdd({
        name: skillName.trim(),
        level: skillLevel,
        icon: imagePreview || "", // Use the preview URL or server-provided URL if available
      });
    }

    // Close modal on success
    onClose();
  };

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2d1b4d]">
          <h2 className="text-white text-xl font-bold">Add New Skill</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Skill Name */}
            <div>
              <label
                htmlFor="modal-skill-name"
                className="block text-gray-400 text-sm mb-2"
              >
                Skill Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="modal-skill-name"
                type="text"
                value={skillName}
                onChange={(e) => {
                  setSkillName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`w-full bg-[#1a1025] border ${
                  errors.name ? "border-red-500" : "border-[#2d1b4d]"
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors`}
                placeholder="e.g., React, JavaScript, Python"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Skill Level */}
            <div>
              <label
                htmlFor="modal-skill-level"
                className="block text-gray-400 text-sm mb-2"
              >
                Skill Level
              </label>
              <select
                id="modal-skill-level"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Image Upload Section */}
            <div>
              <label
                htmlFor="modal-skill-icon"
                className="block text-gray-400 text-sm mb-2"
              >
                Upload Icon (Optional)
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
                  id="modal-skill-icon"
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
              <p className="mt-1 text-gray-500 text-xs">
                Upload an image file for the skill icon
              </p>
            </div>

            {/* Form Error */}
            {errors.form && (
              <p className="text-red-500 text-sm">{errors.form}</p>
            )}

            {/* Preview */}
            {(skillName || imagePreview) && (
              <div className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Preview:</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#120b20] rounded-lg flex items-center justify-center text-[#a855f7] mr-3">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt={skillName || "Skill Icon"}
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
                    ) : null}
                    <div
                      className={`w-6 h-6 bg-[#a855f7] rounded-full ${
                        imagePreview ? "hidden" : ""
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {skillName || "Skill Name"}
                    </h3>
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
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1a1025] hover:bg-[#2d1b4d] text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
