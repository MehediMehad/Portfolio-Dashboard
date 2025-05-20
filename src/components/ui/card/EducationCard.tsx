import { TEducation } from "@/lib/mock/education"
import Image from "next/image"

interface EducationCardProps {
  education: TEducation
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 hover:shadow-lg hover:shadow-[#a855f7]/10 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white p-1 flex-shrink-0">
          <Image
            src={education.logo || "/placeholder.svg"}
            alt={education.institution}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-white text-xl font-bold">{education.degree}</h3>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <div>
              <p className="text-[#a855f7] font-medium">{education.institution}</p>
              <p className="text-gray-400 text-sm">{education.field}</p>
            </div>
            <span className="text-gray-400 text-sm bg-[#1a1025] px-3 py-1 rounded-full">{education.year}</span>
          </div>

          <p className="text-gray-300 mt-4">{education.description}</p>
        </div>
      </div>
    </div>
  )
}
