import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { TBlog } from "@/lib/mock/blogs"

interface BlogCardProps {
  blog: TBlog
  compact?: boolean
}

export default function BlogCard({ blog, compact = false }: BlogCardProps) {
  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#a855f7]/10 transition-all duration-300">
      <div className={`relative ${compact ? "h-32" : "h-48"} w-full`}>
        <Image src={blog.image || "https://scontent.fdac24-3.fna.fbcdn.net/v/t1.6435-9/49571301_351911302295125_4369374752544915456_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeHryeeUJYdIVSlAFJ6iyR8r4GIBkZ6U527gYgGRnpTnbsMohBQUVuVawKSE3kR5tESnUu14xm550yba_OSa1G1B&_nc_ohc=Ov7nb1C_8qsQ7kNvwG0zxf5&_nc_oc=Adlyd8kV7SoleXqxI5wrk-rdq3IwpJ9gvOK-Cd8lOA8L_y9u2tl2EsnNX_xkvEE040U&_nc_zt=23&_nc_ht=scontent.fdac24-3.fna&_nc_gid=axYGw6coDKSv6pCcM6x3Eg&oh=00_AfJhiBP2tTRTE89-SvqXa1yOnPnkuhO2GsV9dJSJdxl_xQ&oe=68530AF6"} alt={blog.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, compact ? 1 : 2).map((tag: string, index: number) => (
            <span key={index} className="bg-[#1a1025] text-[#a855f7] text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`text-white font-bold mb-2 ${compact ? "text-base line-clamp-1" : "text-xl"}`}>{blog.title}</h3>

        {!compact && <p className="text-gray-300 mb-4 line-clamp-2">{blog.excerpt}</p>}

        <div className="flex items-center gap-4 text-gray-400 text-sm mt-3 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={blog.author.image || "/placeholder.svg"}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-gray-300 text-sm">{blog.author.name}</span>
          </div>

          <Link
            href={`/blog/${blog.id}`}
            className={`ml-auto text-[#a855f7] hover:text-[#c084fc] text-sm font-medium transition-colors ${
              compact ? "" : "border border-[#a855f7] rounded-full px-4 py-1 hover:bg-[#a855f7] hover:text-white"
            }`}
          >
            {compact ? "Read" : "Read More"}
          </Link>
        </div>
      </div>
    </div>
  )
}
