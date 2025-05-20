import Spinner from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f0a1a] flex items-center justify-center">
      <Spinner size="xl" text="Loading..." />
    </div>
  )
}
