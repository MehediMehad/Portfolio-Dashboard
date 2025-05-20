export type TExperience = {
  id: string
  company: string
  role: string
  duration: string
  description: string
  skills: string[]
  logo: string
}

export const experiences: TExperience[] = [
  {
    id: "tech-innovators",
    company: "Tech Innovators Inc.",
    role: "Senior Frontend Developer",
    duration: "Jan 2023 - Present",
    description:
      "Leading the frontend development team in creating responsive and accessible web applications. Implemented modern React patterns and optimized performance across multiple projects. Mentored junior developers and established coding standards.",
    skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "digital-solutions",
    company: "Digital Solutions Ltd.",
    role: "Frontend Developer",
    duration: "Mar 2021 - Dec 2022",
    description:
      "Developed and maintained client websites using React and Next.js. Collaborated with designers to implement pixel-perfect UI components. Improved site performance by 40% through code optimization and modern web techniques.",
    skills: ["React", "JavaScript", "CSS3", "Responsive Design", "RESTful APIs"],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "creative-web",
    company: "Creative Web Agency",
    role: "Web Developer Intern",
    duration: "Jun 2020 - Feb 2021",
    description:
      "Assisted in developing websites for small businesses. Gained hands-on experience with HTML, CSS, and JavaScript. Participated in client meetings and contributed to project planning and execution.",
    skills: ["HTML5", "CSS3", "JavaScript", "WordPress", "UI/UX"],
    logo: "/placeholder.svg?height=80&width=80",
  },
]
