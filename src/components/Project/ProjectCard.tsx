"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TProject } from "@/types";

type ProjectCardProps = {
  project: TProject;
  expandedProject: string | null;
  toggleProjectExpansion: (projectId: string) => void;
  handleEditProject: (projectId: string) => void;
  handleDeleteProject: (projectId: string) => void;
};

export default function ProjectCard({
  project,
  expandedProject,
  toggleProjectExpansion,
  handleEditProject,
  handleDeleteProject,
}: ProjectCardProps) {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:w-24 h-16 bg-[#1a1025] rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={project.projectImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg">{project.title}</h3>
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
            href={project.liveURL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="View Live Site"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.gitHubURL}
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

      {expandedProject === project.id && (
        <div className="mt-4 pl-4 border-l-2 border-[#2d1b4d]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[#a855f7] font-medium mb-2">Description</h4>
              <p className="text-gray-300 text-sm">{project.description}</p>
            </div>
            <div>
              <h4 className="text-[#a855f7] font-medium mb-2">Features</h4>
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
                {project.whatILearned.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#a855f7] font-medium mb-2">
                Future Improvements
              </h4>
              <ul className="list-disc list-inside text-gray-300 text-sm">
                {project.futureImprovements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
