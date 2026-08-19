import { cn } from "@/lib/utils"

export function TechTag({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn(
      "border border-accent text-accent px-2 py-1 font-mono text-[10px] uppercase whitespace-nowrap",
      className
    )}>
      {children}
    </span>
  )
}
