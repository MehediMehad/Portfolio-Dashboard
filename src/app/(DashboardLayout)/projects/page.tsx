import { getAllProjects } from "@/actions/Project";
import Project from "@/components/Project/Project";

const ProjectsPage = async () => {
  const data = await getAllProjects();

  return (
    <div>
      <Project projects={data.data} />
    </div>
  );
};

export default ProjectsPage;
