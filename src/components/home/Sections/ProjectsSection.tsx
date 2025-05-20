import Link from "next/link";
import ProjectCard from "../../ui/card/ProjectCard";
import { TProject } from "@/types/projects";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ProjectsSection = ({ projects }: { projects: TProject[] }) => {
  return (
    <section className="container mx-auto mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#a855f7] text-3xl font-bold">Featured Projects</h2>
        <Link
          href="/projects"
          className="flex items-center text-[#a855f7] hover:text-[#c084fc]"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
