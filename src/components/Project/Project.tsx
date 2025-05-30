"use client";

import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { TProject } from "@/types";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "@/actions/Project";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { useUser } from "@/context/UserContext";
import DeleteConfirmationModal from "../Dashboard/delete-confirmation-modal";

type TProjectProps = {
  projects: TProject[];
};

export default function Project({ projects: initialProjects }: TProjectProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState<string | null>(
    null
  );
  const [projectToDeleteName, setProjectToDeleteName] = useState<string>("");
  const { user } = useUser();
  const [projects, setProjects] = useState<TProject[]>(initialProjects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [newProject, setNewProject] = useState<Partial<TProject>>({
    title: "",
    overview: "",
    description: "",
    techStack: [""],
    features: [""],
    whatILearned: [""],
    futureImprovements: [""],
    liveURL: "",
    gitHubURL: "",
    authorId: "a3cc1694-1bf0-43a5-8ada-62056ced69a6",
    date_time: "",
    is_public: true,
    heroSection: false,
  });

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const response = await getAllProjects();
      if (response.data) {
        setProjects(response.data);
      } else {
        setErrorMessage(response.error || "Failed to fetch projects");
      }
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setIsAddingProject(true);
    setImageFile(null);
    setNewProject({
      title: "",
      overview: "",
      description: "",
      techStack: [""],
      features: [""],
      whatILearned: [""],
      futureImprovements: [""],
      liveURL: "",
      gitHubURL: "",
      authorId: "a3cc1694-1bf0-43a5-8ada-62056ced69a6",
      date_time: "",
      is_public: true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditProject = (projectId: string) => {
    setEditingProjectId(projectId);
    setImageFile(null); // Reset image file when editing
    const projectToEdit = projects.find((p) => p.id === projectId);
    if (projectToEdit) {
      setNewProject({
        id: projectToEdit.id,
        title: projectToEdit.title,
        overview: projectToEdit.overview,
        description: projectToEdit.description,
        techStack: projectToEdit.techStack.length
          ? projectToEdit.techStack
          : [""],
        features: projectToEdit.features.length ? projectToEdit.features : [""],
        whatILearned: projectToEdit.whatILearned.length
          ? projectToEdit.whatILearned
          : [""],
        futureImprovements: projectToEdit.futureImprovements.length
          ? projectToEdit.futureImprovements
          : [""],
        liveURL: projectToEdit.liveURL,
        gitHubURL: projectToEdit.gitHubURL,
        authorId: projectToEdit.authorId,
        date_time: projectToEdit.date_time,
        is_public: projectToEdit.is_public,
        heroSection: projectToEdit.heroSection,
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsAddingProject(false);
    setEditingProjectId(null);
    setImageFile(null);
    setErrorMessage("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev: Partial<TProject>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (
    arrayName: "techStack" | "features" | "whatILearned" | "futureImprovements",
    index: number,
    value: string
  ) => {
    setNewProject((prev: Partial<TProject>) => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  const handleAddArrayItem = (
    arrayName: "techStack" | "features" | "whatILearned" | "futureImprovements"
  ) => {
    setNewProject((prev: Partial<TProject>) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] as string[]), ""],
    }));
  };

  const handleRemoveArrayItem = (
    arrayName: "techStack" | "features" | "whatILearned" | "futureImprovements",
    index: number
  ) => {
    setNewProject((prev: Partial<TProject>) => {
      const newArray = [...((prev[arrayName] as string[]) || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  const handleSaveProject = async () => {
    setIsLoading(true);
    setErrorMessage("");

    // Clean up empty array items
    const cleanedProject = {
      ...newProject,
      techStack: (newProject.techStack || []).filter(
        (item: string) => item.trim() !== ""
      ),
      features: (newProject.features || []).filter(
        (item: string) => item.trim() !== ""
      ),
      whatILearned: (newProject.whatILearned || []).filter(
        (item: string) => item.trim() !== ""
      ),
      futureImprovements: (newProject.futureImprovements || []).filter(
        (item: string) => item.trim() !== ""
      ),
      date_time: newProject.date_time || new Date().toISOString(),
      is_public: newProject.is_public ?? true,
      heroSection: newProject.heroSection ?? false,
      authorId: user?.userId ?? "",
    };

    // Create FormData object
    const formData = new FormData();
    formData.append("data", JSON.stringify(cleanedProject));
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      let response: { data?: any; error?: string };
      if (editingProjectId) {
        // Update existing project
        response = await updateProject(editingProjectId, formData);
        if (response.error) {
          throw new Error(response.error);
        }
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProjectId
              ? {
                  ...project,
                  ...cleanedProject,
                  id: project.id,
                  createdAt: project.createdAt,
                  updatedAt: new Date().toISOString(),
                }
              : project
          )
        );
        setSuccessMessage("Project updated successfully!");
      } else {
        // Add new project
        response = await createProject(formData);
        console.log("response=>", response);

        if (response.error) {
          throw new Error(response.error);
        }
        setProjects((prev) => [
          {
            ...cleanedProject,
            id: response.data?.id || `project-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isDeleted: false,
          } as TProject,
          ...prev,
        ]);
        setSuccessMessage("Project added successfully!");
      }

      // Reset form
      setIsAddingProject(false);
      setEditingProjectId(null);
      setImageFile(null);
      setNewProject({
        id: "",
        title: "",
        overview: "",
        description: "",
        techStack: [""],
        features: [""],
        whatILearned: [""],
        futureImprovements: [""],
        liveURL: "",
        gitHubURL: "",
        authorId: user?.userId ?? "a3cc1694-1bf0-43a5-8ada-62056ced69a6",
        date_time: "",
        is_public: true,
        heroSection: false,
      });
    } catch (error: any) {
      console.error("Error saving project:", error);
      setErrorMessage("Failed to save project. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    setProjectToDeleteId(projectId);
    setProjectToDeleteName(project.title || "Untitled Project");
    setIsDeleteModalOpen(true);
  };

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject((prev) => (prev === projectId ? null : projectId));
  };

  // handleDeleteConfirm
  const handleDeleteConfirm = async () => {
    if (!projectToDeleteId) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await deleteProject(projectToDeleteId);
      if (response.error) {
        throw new Error(response.error);
      }

      setProjects((prev) => prev.filter((p) => p.id !== projectToDeleteId));
      setSuccessMessage("Project deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting project:", error);
      setErrorMessage("Failed to delete project. Please try again.");
    } finally {
      setIsLoading(false);
      setProjectToDeleteId(null);
      setProjectToDeleteName("");
      setIsDeleteModalOpen(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
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
      {(isAddingProject || editingProjectId) && (
        <ProjectForm
          newProject={newProject}
          setNewProject={setNewProject}
          imageFile={imageFile}
          setImageFile={setImageFile}
          isAddingProject={isAddingProject}
          editingProjectId={editingProjectId}
          isLoading={isLoading}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          handleSaveProject={handleSaveProject}
          handleCancelEdit={handleCancelEdit}
          handleInputChange={handleInputChange}
          handleArrayInputChange={handleArrayInputChange}
          handleAddArrayItem={handleAddArrayItem}
          handleRemoveArrayItem={handleRemoveArrayItem}
        />
      )}
      <ProjectList
        projects={projects}
        isLoading={isLoading}
        expandedProject={expandedProject}
        toggleProjectExpansion={toggleProjectExpansion}
        handleEditProject={handleEditProject}
        handleDeleteProject={handleDeleteProject}
        handleAddProject={handleAddProject}
      />
      {/* Inside your main component */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        itemName={projectToDeleteName}
      />
    </>
  );
}
