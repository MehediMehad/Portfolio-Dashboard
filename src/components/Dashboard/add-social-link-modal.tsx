"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { createSocialMedia } from "@/actions/SocialMedia";

interface AddSocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (social: { platformName: string; url: string; icon: string }) => void;
}

export default function AddSocialLinkModal({
  isOpen,
  onClose,
  onAdd,
}: AddSocialLinkModalProps) {
  const [platformName, setPlatformName] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({ name: "", url: "", form: "" });
  const platformNameInputRef = useRef<HTMLInputElement>(null);
  const fileIconRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPlatformName("");
      setSocialUrl("");
      setImageFile(null);
      setImagePreview(null);
      setErrors({ name: "", url: "", form: "" });
      setTimeout(() => {
        platformNameInputRef.current?.focus();
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
      // Validate file size (max 2MB for safety, adjust as per server)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          form: "Image size must not exceed 2MB",
        }));
        return;
      }
      // Validate file type (PNG, JPEG only, adjust as per server)
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          form: "Only PNG or JPEG files are allowed",
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
    setIsLoading(true);

    // Validate platformName
    if (!platformName.trim()) {
      setErrors((prev) => ({ ...prev, name: "Platform name is required" }));
      platformNameInputRef.current?.focus();
      setIsLoading(false);
      return;
    }

    // Validate socialUrl
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    if (!socialUrl.trim()) {
      setErrors((prev) => ({ ...prev, url: "Social URL is required" }));
      return;
    }
    if (!urlPattern.test(socialUrl)) {
      setErrors((prev) => ({ ...prev, url: "Please enter a valid URL" }));
      return;
    }

    // Create FormData
    const formData = new FormData();
    const socialData = {
      platformName: platformName.trim(),
      url: socialUrl.trim(),
    };
    formData.append("data", JSON.stringify(socialData));
    if (imageFile) {
      formData.append("file", imageFile);
    }

    // Call server action
    const response = await createSocialMedia(formData);
    console.log("Social link creation response:", response);

    if (response.success) {
      setIsLoading(false);
      console.log("☑️☑️", response);

      toast.success("Social link added successfully!");
      if (onAdd) {
        onAdd({
          platformName: response.data.platformName,
          url: response.data.socialUrl,
          icon: response.data?.icon || "",
        });
      }
      onClose();
    } else {
      toast.error(response.error || "Failed to update profile");
      setIsLoading(false);
      setErrors((prev) => ({
        ...prev,
        form: response.error || "Failed to update profile",
      }));
    }
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
          <h2 className="text-white text-xl font-bold">Add New Social Link</h2>
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
            {/* Platform Name */}
            <div>
              <label
                htmlFor="modal-social-name"
                className="block text-gray-400 text-sm mb-2"
              >
                Platform Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={platformNameInputRef}
                id="modal-social-name"
                type="text"
                value={platformName}
                onChange={(e) => {
                  setPlatformName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`w-full bg-[#1a1025] border ${
                  errors.name ? "border-red-500" : "border-[#2d1b4d]"
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors`}
                placeholder="e.g., LinkedIn, Twitter"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Social URL */}
            <div>
              <label
                htmlFor="modal-social-url"
                className="block text-gray-400 text-sm mb-2"
              >
                Social URL <span className="text-red-500">*</span>
              </label>
              <input
                id="modal-social-url"
                type="url"
                value={socialUrl}
                onChange={(e) => {
                  setSocialUrl(e.target.value);
                  if (errors.url) setErrors((prev) => ({ ...prev, url: "" }));
                }}
                className={`w-full bg-[#1a1025] border ${
                  errors.url ? "border-red-500" : "border-[#2d1b4d]"
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors`}
                placeholder="e.g., https://linkedin.com/in/username"
              />
              {errors.url && (
                <p className="mt-1 text-red-500 text-sm">{errors.url}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="modal-social-icon"
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
                  id="modal-social-icon"
                  type="file"
                  accept="image/png,image/jpeg"
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
                Upload a PNG or JPEG file for the social icon (max 2MB)
              </p>
            </div>

            {/* Form Error */}
            {errors.form && (
              <p className="text-red-500 text-sm">{errors.form}</p>
            )}

            {/* Preview */}
            {(platformName || socialUrl || imagePreview) && (
              <div className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Preview:</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#120b20] rounded-lg flex items-center justify-center text-[#a855f7] mr-3">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt={platformName || "Icon"}
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
                      {platformName || "Platform Name"}
                    </h3>
                    <p className="text-sm text-blue-500">
                      {socialUrl || "https://example.com"}
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
              disabled={isLoading}
              type="submit"
              className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add Social Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
