import { TExperience } from "@/lib/mock/experiences"
import Image from "next/image"

interface ExperienceCardProps {
  experience: TExperience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 hover:shadow-lg hover:shadow-[#a855f7]/10 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white p-1 flex-shrink-0">
          <Image src={experience.logo || "/placeholder.svg"} alt={experience.company} fill className="object-contain" />
        </div>

        <div className="flex-1">
          <h3 className="text-white text-xl font-bold">{experience.role}</h3>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <p className="text-[#a855f7] font-medium">{experience.company}</p>
            <span className="text-gray-400 text-sm bg-[#1a1025] px-3 py-1 rounded-full">{experience.duration}</span>
          </div>

          <p className="text-gray-300 mt-4">{experience.description}</p>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {experience.skills.map((skill, index) => (
                <span key={index} className="bg-[#1a1025] text-gray-300 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
