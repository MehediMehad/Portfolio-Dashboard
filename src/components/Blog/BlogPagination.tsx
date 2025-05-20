"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
  totalPages: number
  currentPage: number
}

export default function BlogPagination({ totalPages, currentPage }: BlogPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `/blog?${params.toString()}`
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page numbers to show
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the start
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4)
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed at the beginning
      if (start > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed at the end
      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center mt-12">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Previous Page Button */}
        <button
          onClick={() => currentPage > 1 && router.push(createPageURL(currentPage - 1))}
          disabled={currentPage <= 1}
          className={`p-2 rounded-md ${
            currentPage <= 1 ? "text-gray-500 cursor-not-allowed" : "text-white hover:bg-[#2d1b4d] transition-colors"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            )
          }

          return (
            <button
              key={index}
              onClick={() => typeof page === "number" && router.push(createPageURL(page))}
              className={`px-3 py-1 rounded-md ${
                currentPage === page ? "bg-[#a855f7] text-white" : "text-gray-300 hover:bg-[#2d1b4d] transition-colors"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        })}

        {/* Next Page Button */}
        <button
          onClick={() => currentPage < totalPages && router.push(createPageURL(currentPage + 1))}
          disabled={currentPage >= totalPages}
          className={`p-2 rounded-md ${
            currentPage >= totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-[#2d1b4d] transition-colors"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </nav>
    </div>
  )
}
