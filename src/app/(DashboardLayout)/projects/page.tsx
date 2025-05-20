"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Save,
  Trash2,
  Edit,
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
  Upload,
} from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { projects as initialProjects } from "@/lib/mock/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // New project form state
  const [newProject, setNewProject] = useState({
    id: "",
    title: "",
    overview: "",
    description: "",
    image: "/placeholder.svg?height=400&width=600",
    techStack: [""],
    features: [""],
    learnings: [""],
    improvements: [""],
    liveUrl: "",
    githubUrl: "",
    category: "React",
  });

  // Handle adding a new project
  const handleAddProject = () => {
    setIsAddingProject(true);
    setNewProject({
      id: `project-${Date.now()}`,
      title: "",
      overview: "",
      description: "",
      image: "/placeholder.svg?height=400&width=600",
      techStack: [""],
      features: [""],
      learnings: [""],
      improvements: [""],
      liveUrl: "",
      githubUrl: "",
      category: "React",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle editing a project
  const handleEditProject = (projectId: string) => {
    setEditingProjectId(projectId);
    const projectToEdit = projects.find((p) => p.id === projectId);
    if (projectToEdit) {
      setNewProject({ ...projectToEdit });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle canceling edit/add
  const handleCancelEdit = () => {
    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  // Handle input change for new/edited project
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle array input changes (tech stack, features, etc.)
  const handleArrayInputChange = (
    arrayName: "techStack" | "features" | "learnings" | "improvements",
    index: number,
    value: string
  ) => {
    setNewProject((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  // Add new item to an array
  const handleAddArrayItem = (
    arrayName: "techStack" | "features" | "learnings" | "improvements"
  ) => {
    setNewProject((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  // Remove item from an array
  const handleRemoveArrayItem = (
    arrayName: "techStack" | "features" | "learnings" | "improvements",
    index: number
  ) => {
    setNewProject((prev) => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  // Save new or edited project
  const handleSaveProject = async () => {
    setIsLoading(true);

    try {
      // Validate required fields
      if (
        !newProject.title ||
        !newProject.overview ||
        !newProject.description
      ) {
        alert("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      // Clean up empty array items
      const cleanedProject = {
        ...newProject,
        techStack: newProject.techStack.filter((item) => item.trim() !== ""),
        features: newProject.features.filter((item) => item.trim() !== ""),
        learnings: newProject.learnings.filter((item) => item.trim() !== ""),
        improvements: newProject.improvements.filter(
          (item) => item.trim() !== ""
        ),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingProjectId) {
        // Update existing project
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProjectId ? cleanedProject : project
          )
        );
        setSuccessMessage("Project updated successfully!");
      } else {
        // Add new project
        setProjects((prev) => [cleanedProject, ...prev]);
        setSuccessMessage("Project added successfully!");
      }

      // Reset form
      setIsAddingProject(false);
      setEditingProjectId(null);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    } finally {
      setIsLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  // Delete a project
  const handleDeleteProject = async (projectId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setSuccessMessage("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    } finally {
      setIsLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  // Toggle project details expansion
  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-bold">Manage Projects</h1>
        {!isAddingProject && !editingProjectId && (
          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </button>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg flex justify-between items-center">
          <p>{successMessage}</p>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-green-400 hover:text-green-300"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Add/Edit Project Form */}
      {(isAddingProject || editingProjectId) && (
        <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
          <h2 className="text-white text-xl font-bold mb-6">
            {editingProjectId ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-gray-400 mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-400 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={newProject.category}
                onChange={handleInputChange}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              >
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React Native">React Native</option>
                <option value="WordPress">WordPress</option>
                <option value="Shopify">Shopify</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="overview" className="block text-gray-400 mb-2">
              Overview <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="overview"
              name="overview"
              value={newProject.overview}
              onChange={handleInputChange}
              className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-400 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors resize-none"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="liveUrl" className="block text-gray-400 mb-2">
                Live URL
              </label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                value={newProject.liveUrl}
                onChange={handleInputChange}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-gray-400 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={newProject.githubUrl}
                onChange={handleInputChange}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-400 mb-2">
              Project Image
            </label>
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-24 bg-[#1a1025] border border-[#2d1b4d] rounded-lg overflow-hidden">
                <Image
                  src={newProject.image || "/placeholder.svg"}
                  alt="Project preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newProject.image}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="/path/to/image.jpg"
                />
                <p className="text-gray-500 text-sm mt-1">
                  Enter image URL or upload an image (upload functionality
                  coming soon)
                </p>
                <button className="mt-2 flex items-center gap-2 bg-[#2d1b4d] hover:bg-[#3d2b5d] text-white px-3 py-1.5 rounded text-sm transition-colors">
                  <Upload size={14} />
                  Upload Image
                </button>
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
            {newProject.techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) =>
                    handleArrayInputChange("techStack", index, e.target.value)
                  }
                  className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="e.g., React, TypeScript, Tailwind CSS"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem("techStack", index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  disabled={newProject.techStack.length <= 1}
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
            {newProject.features.map((feature, index) => (
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
                  disabled={newProject.features.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Learnings */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-400">What I Learned</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem("learnings")}
                className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
              >
                <Plus size={14} />
                Add Learning
              </button>
            </div>
            {newProject.learnings.map((learning, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={learning}
                  onChange={(e) =>
                    handleArrayInputChange("learnings", index, e.target.value)
                  }
                  className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="e.g., Implemented complex state management"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem("learnings", index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  disabled={newProject.learnings.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Improvements */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-400">Future Improvements</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem("improvements")}
                className="text-[#a855f7] hover:text-[#c084fc] text-sm flex items-center gap-1"
              >
                <Plus size={14} />
                Add Improvement
              </button>
            </div>
            {newProject.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={improvement}
                  onChange={(e) =>
                    handleArrayInputChange(
                      "improvements",
                      index,
                      e.target.value
                    )
                  }
                  className="flex-1 bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                  placeholder="e.g., Add mobile app version, Implement AI features"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem("improvements", index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  disabled={newProject.improvements.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
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
      )}

      {/* Projects List */}
      <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#2d1b4d]">
          <h2 className="text-white text-xl font-bold">Your Projects</h2>
        </div>

        {isLoading && !isAddingProject && !editingProjectId ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" text="Loading projects..." />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400 mb-4">
              You haven't added any projects yet.
            </p>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Project
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#2d1b4d]">
            {projects.map((project) => (
              <div key={project.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="relative w-full md:w-24 h-16 bg-[#1a1025] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-1">
                      {project.overview}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-[#1a1025] text-xs text-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="bg-[#1a1025] text-xs text-gray-300 px-2 py-1 rounded">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="View Live Site"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="p-2 text-gray-400 hover:text-[#a855f7] transition-colors"
                      title="Edit Project"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleProjectExpansion(project.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title={
                        expandedProject === project.id
                          ? "Collapse Details"
                          : "Expand Details"
                      }
                    >
                      {expandedProject === project.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Project Details */}
                {expandedProject === project.id && (
                  <div className="mt-4 pl-4 border-l-2 border-[#2d1b4d]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[#a855f7] font-medium mb-2">
                          Description
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {project.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[#a855f7] font-medium mb-2">
                          Features
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 text-sm">
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h4 className="text-[#a855f7] font-medium mb-2">
                          What I Learned
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 text-sm">
                          {project.learnings.map((learning, index) => (
                            <li key={index}>{learning}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[#a855f7] font-medium mb-2">
                          Future Improvements
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 text-sm">
                          {project.improvements.map((improvement, index) => (
                            <li key={index}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
