export type TEducation = {
  id: string
  institution: string
  degree: string
  field: string
  year: string
  description: string
  logo: string
}

export const education: TEducation[] = [
  {
    id: "tech-university",
    institution: "Tech University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    year: "2016 - 2020",
    description:
      "Graduated with honors. Specialized in web development and software engineering. Participated in various hackathons and coding competitions. Completed a capstone project on building scalable web applications.",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "coding-academy",
    institution: "Coding Academy",
    degree: "Professional Certification",
    field: "Full Stack Web Development",
    year: "2020",
    description:
      "Intensive 6-month bootcamp focused on modern web technologies. Developed multiple real-world projects using the MERN stack. Collaborated with peers on group projects simulating real work environments.",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "online-university",
    institution: "Online University",
    degree: "Certification",
    field: "UI/UX Design Fundamentals",
    year: "2021",
    description:
      "Learned principles of user interface and experience design. Created wireframes and prototypes for web and mobile applications. Studied user research methods and usability testing techniques.",
    logo: "/placeholder.svg?height=80&width=80",
  },
]
