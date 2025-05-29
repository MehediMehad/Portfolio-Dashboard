"use client";

import React from "react";
import Spinner from "@/components/ui/spinner";
import { TProject } from "@/types";
import { Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";

type ProjectListProps = {
  projects: TProject[];
  isLoading: boolean;
  expandedProject: string | null;
  toggleProjectExpansion: (projectId: string) => void;
  handleEditProject: (projectId: string) => void;
  handleDeleteProject: (projectId: string) => void;
  handleAddProject: () => void;
};

export default function ProjectList({
  projects,
  isLoading,
  expandedProject,
  toggleProjectExpansion,
  handleEditProject,
  handleDeleteProject,
  handleAddProject,
}: ProjectListProps) {
  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden">
      <div className="p-6 border-b border-[#2d1b4d]">
        <h2 className="text-white text-xl font-bold">Your Projects</h2>
      </div>
      {isLoading ? (
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
            <ProjectCard
              key={project.id}
              project={project}
              expandedProject={expandedProject}
              toggleProjectExpansion={toggleProjectExpansion}
              handleEditProject={handleEditProject}
              handleDeleteProject={handleDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
