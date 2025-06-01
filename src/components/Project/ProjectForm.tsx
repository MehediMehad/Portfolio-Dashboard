"use client";

import React from "react";
import Image from "next/image";
import { Plus, Save, Trash2, RefreshCw, X } from "lucide-react";
import { TProject } from "@/types";

// Define available technologies
const techOptions = [
  { value: "Tailwind CSS", label: "Tailwind CSS" },
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express.js", label: "Express.js" },
  { value: "Prisma", label: "Prisma" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Mongoose", label: "Mongoose" },
  { value: "MySQL", label: "MySQL" },
  { value: "Python", label: "Python" },
];

type ProjectFormProps = {
  newProject: Partial<TProject>;
  setNewProject: React.Dispatch<React.SetStateAction<Partial<TProject>>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  isAddingProject: boolean;
  editingProjectId: string | null;
  isLoading: boolean;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSaveProject: () => Promise<void>;
  handleCancelEdit: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleArrayInputChange: (
    arrayName: "techStack" | "features" | "whatILearned" | "futureImprovements",
    index: number,
    value: string
  ) => void;
  handleAddArrayItem: (
    arrayName: "techStack" | "features" | "whatILearned" | "futureImprovements"
  ) => void;
  handleRemoveArrayItem: (
    arrayName: "techStack" | "features" | "whatILearned" | "futureImprovements",
    index: number
  ) => void;
};

export default function ProjectForm({
  newProject,
  setNewProject,
  setImageFile,
  editingProjectId,
  isLoading,
  errorMessage,
  setErrorMessage,
  handleSaveProject,
  handleCancelEdit,
  handleInputChange,
  handleArrayInputChange,
  handleAddArrayItem,
  handleRemoveArrayItem,
}: ProjectFormProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setNewProject((prev: Partial<TProject>) => ({
        ...prev,
        projectImage: URL.createObjectURL(file), // Preview the image
      }));
    }
  };

  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
      <h2 className="text-white text-xl font-bold mb-6">
        {editingProjectId ? "Edit Project" : "Add New Project"}
      </h2>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-400 rounded-lg flex justify-between items-center">
          <p>{errorMessage}</p>
          <button
            onClick={() => setErrorMessage("")}
            className="text-red-400 hover:text-red-300"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="title" className="block text-gray-400 mb-2">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProject.title || ""}
            onChange={handleInputChange}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="overview" className="block text-gray-400 mb-2">
            Overview <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="overview"
            name="overview"
            value={newProject.overview || ""}
            onChange={handleInputChange}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-400 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={newProject.description || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors resize-none"
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="liveURL" className="block text-gray-400 mb-2">
            Live URL
          </label>
          <input
            type="url"
            id="liveURL"
            name="liveURL"
            value={newProject.liveURL || ""}
            onChange={handleInputChange}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label htmlFor="gitHubURL" className="block text-gray-400 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            id="gitHubURL"
            name="gitHubURL"
            value={newProject.gitHubURL || ""}
            onChange={handleInputChange}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="projectImage" className="block text-gray-400 mb-2">
          Project Image
        </label>
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-24 bg-[#1a1025] border border-[#2d1b4d] rounded-lg overflow-hidden">
            <Image
              src={newProject.projectImage || "/placeholder.svg"}
              alt="Project preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <input
              type="file"
              id="projectImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            />
            <p className="text-gray-500 text-sm mt-1">
              Upload an image file (JPEG, PNG, etc.)
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-400">Tech Stack</label>
          <button
            type="button"
            onClick={() => handleAddArrayItem("techStack")}
            className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
          >
            <Plus size={14} />
            Add Technology
          </button>
        </div>
        {(newProject.techStack || []).map((tech: string, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <select
              value={tech}
              onChange={(e) =>
                handleArrayInputChange("techStack", index, e.target.value)
              }
              className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            >
              <option value="" disabled>
                Select a technology
              </option>
              {techOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleRemoveArrayItem("techStack", index)}
              className="text-gray-400 hover:text-red-500 p-1"
              disabled={(newProject.techStack || []).length <= 1}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-400">Features</label>
          <button
            type="button"
            onClick={() => handleAddArrayItem("features")}
            className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
          >
            <Plus size={14} />
            Add Feature
          </button>
        </div>
        {(newProject.features || []).map((feature: string, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) =>
                handleArrayInputChange("features", index, e.target.value)
              }
              className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              placeholder="e.g., User authentication, Real-time updates"
            />
            <button
              type="button"
              onClick={() => handleRemoveArrayItem("features", index)}
              className="text-gray-400 hover:text-red-500 p-1"
              disabled={(newProject.features || []).length <= 1}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* What I Learned */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-400">What I Learned</label>
          <button
            type="button"
            onClick={() => handleAddArrayItem("whatILearned")}
            className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
          >
            <Plus size={14} />
            Add Learning
          </button>
        </div>
        {(newProject.whatILearned || []).map(
          (learning: string, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={learning}
                onChange={(e) =>
                  handleArrayInputChange("whatILearned", index, e.target.value)
                }
                className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                placeholder="e.g., Implemented complex state management"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem("whatILearned", index)}
                className="text-gray-400 hover:text-red-500 p-1"
                disabled={(newProject.whatILearned || []).length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )
        )}
      </div>

      {/* Future Improvements */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-400">Future Improvements</label>
          <button
            type="button"
            onClick={() => handleAddArrayItem("futureImprovements")}
            className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
          >
            <Plus size={14} />
            Add Improvement
          </button>
        </div>
        {(newProject.futureImprovements || []).map(
          (improvement: string, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={improvement}
                onChange={(e) =>
                  handleArrayInputChange(
                    "futureImprovements",
                    index,
                    e.target.value
                  )
                }
                className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                placeholder="e.g., Add mobile app version, Implement AI features"
              />
              <button
                type="button"
                onClick={() =>
                  handleRemoveArrayItem("futureImprovements", index)
                }
                className="text-gray-400 hover:text-red-500 p-1"
                disabled={(newProject.futureImprovements || []).length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancelEdit}
          className="px-4 py-2 bg-[#1a1025] hover:bg-[#2d1b4d] text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveProject}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isLoading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </div>
  );
}
