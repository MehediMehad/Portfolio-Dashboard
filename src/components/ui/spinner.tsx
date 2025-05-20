import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "white" | "gray"
  text?: string
  className?: string
}

export default function Spinner({ size = "md", color = "primary", text, className }: SpinnerProps) {
  // Size mappings
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
    xl: "w-16 h-16 border-4",
  }

  // Color mappings
  const colorClasses = {
    primary: "border-t-[#a855f7]",
    white: "border-t-white",
    gray: "border-t-gray-400",
  }

  // Text size mappings
  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("border-transparent rounded-full animate-spin", sizeClasses[size], colorClasses[color])}></div>
      {text && <p className={cn("mt-2 text-gray-400", textSizeClasses[size])}>{text}</p>}
    </div>
  )
}
