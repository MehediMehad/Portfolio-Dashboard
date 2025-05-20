import React from "react";
import Section from "../../shared/Section";
import Cards from "../Projects/Cards";

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      image:
        "https://projectsly.com/images/blog/best-project-design.png?v=1686553999071005322",
      tags: ["#react", "#mongodb", "#tailwind"],
    },
    {
      id: 2,
      title: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      image:
        "https://projectsly.com/images/blog/best-project-design.png?v=1686553999071005322",
      tags: ["#react", "#restapi", "#css"],
    },
    {
      id: 3,
      title: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/project_management_coursefees.jpg",
      tags: ["#nextjs", "#supabase", "#css"],
    },
    {
      id: 4,
      title: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      image:
        "https://projectsly.com/images/blog/best-project-design.png?v=1686553999071005322",
      tags: ["#nextjs", "#supabase", "#css"],
    },
  ];

  return (
    <Section
      title="Projects."
      description="Following projects showcase my skills and experience through
    real-world examples of my work. Each project is briefly described
    with links to code repositories and live demos. It reflects my ability to
    solve complex problems, work with different technologies, and manage projects effectively."
      buttonText="All Projects"
      buttonHref="/projects"
    >
      <Cards projects={projects} />
    </Section>
  );
};

export default FeaturedProjects;
