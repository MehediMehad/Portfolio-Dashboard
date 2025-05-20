import Image from "next/image"

interface ProjectFilterButtonProps {
  category: string
  isActive: boolean
  onClick: () => void
  icon?: string
}

export default function ProjectFilterButton({ category, isActive, onClick, icon }: ProjectFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-[#a855f7] text-white shadow-lg shadow-[#a855f7]/30"
          : "bg-[#1a1025] text-gray-300 hover:bg-[#2d1b4d]"
      }`}
      aria-label={`Filter by ${category}`}
      title={category}
    >
      {icon ? (
        <div className="w-8 h-8 relative">
          <Image src={icon || "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={category} fill className="object-contain" />
        </div>
      ) : (
        <span className="text-sm font-medium">{category.substring(0, 2)}</span>
      )}
    </button>
  )
}
