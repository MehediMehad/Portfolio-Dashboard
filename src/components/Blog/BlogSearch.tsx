"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchQuery(query)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/blog")
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    router.push("/blog")
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          {searchQuery ? (
            <button
              type="button"
              onClick={clearSearch}
              className="text-gray-400 hover:text-white mr-1"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : null}
          <button type="submit" className="text-[#a855f7]" aria-label="Search">
            <Search size={18} />
          </button>
        </div>
      </div>
    </form>
  )
}
