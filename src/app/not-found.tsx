import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0f0a1a] flex flex-col items-center justify-center px-4">
      {/* Purple glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#a855f7] opacity-20 rounded-full blur-3xl"></div>

      {/* 404 Text */}
      <h1 className="text-9xl font-bold text-white relative z-10">
        <span className="text-[#a855f7]">4</span>
        <span className="relative inline-block mx-2">
          0
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-[#a855f7] rounded-full animate-ping opacity-70"></div>
        </span>
        <span className="text-[#a855f7]">4</span>
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-2 text-center">Oops! Page Not Found</h2>
      <p className="text-gray-400 max-w-md text-center mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="flex items-center gap-2 bg-gradient-to-r from-[#a855f7] to-[#d8b4fe] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#a855f7]/20 transition-all duration-300"
      >
        <Home size={18} />
        Back to Home
      </Link>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-[#2d1b4d] rounded-lg rotate-12"></div>
      <div className="absolute top-20 right-20 w-16 h-16 border border-[#2d1b4d] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#2d1b4d] rounded-lg -rotate-12"></div>

      {/* Code Lines */}
      <div className="absolute top-1/4 left-10 text-[#2d1b4d] text-xs font-mono opacity-50">
        <div>404 {"{"}</div>
        <div className="ml-4">page: not_found;</div>
        <div className="ml-4">status: error;</div>
        <div>{"}"}</div>
      </div>

      <div className="absolute bottom-1/4 right-10 text-[#2d1b4d] text-xs font-mono opacity-50">
        <div>.page {"{"}</div>
        <div className="ml-4">display: none;</div>
        <div className="ml-4">visibility: hidden;</div>
        <div>{"}"}</div>
      </div>
    </div>
  )
}

