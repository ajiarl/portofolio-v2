import { cn } from "@/lib/utils"
import { useId } from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={textareaId} className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2 cursor-pointer w-fit">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "bg-transparent border border-outline px-4 py-2 font-mono text-[16px] text-primary outline-none focus:border-accent focus:ring-0 focus-visible:ring-2 focus-visible:ring-accent/50 resize-none transition-all duration-200 ease-in-out",
          className
        )}
        {...props}
      />
    </div>
  )
}
