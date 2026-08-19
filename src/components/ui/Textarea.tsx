import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2">
        {label}
      </label>
      <textarea
        className={cn(
          "bg-transparent border border-outline px-4 py-2 font-mono text-[16px] text-primary outline-none focus:border-accent focus:ring-0 resize-none transition-all duration-200 ease-in-out",
          className
        )}
        {...props}
      />
    </div>
  )
}
