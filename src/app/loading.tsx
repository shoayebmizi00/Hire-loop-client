import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Spinner className="size-6 text-[#948aff]" />
    </div>
  )
}

export default function Loading() {
  // Full-screen fallback while a route segment is loading
  return (
    <div className="flex min-h-svh items-center justify-center bg-black">
      <SpinnerCustom />
    </div>
  )
}
