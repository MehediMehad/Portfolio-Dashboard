import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, ArrowRight } from "lucide-react"

interface TProject {
  id: string | number;
  title: string;
  overview: string;
  image?: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: TProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[#120b20] border border-borderPrimary  rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#a855f7]/10 transition-all duration-300">
      <div className="relative h-48 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{project.overview}</p>

        <div className="mb-4">
          <h4 className="text-[#a855f7] text-sm font-medium mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span key={index} className="bg-[#1a1025] text-gray-300 text-xs px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-white bg-[#a855f7] hover:bg-[#9333ea] px-3 py-1.5 rounded-md transition-colors"
          >
            <ExternalLink size={14} />
            Live View
          </Link>

          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-white bg-[#1a1025] hover:bg-[#2d1b4d] px-3 py-1.5 rounded-md transition-colors"
          >
            <Github size={14} />
            Repository
          </Link>

          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1 text-sm text-[#a855f7] hover:text-[#c084fc] ml-auto transition-colors"
          >
            View Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
