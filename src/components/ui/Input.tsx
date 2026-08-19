import { cn } from "@/lib/utils"
import { useId } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2 cursor-pointer w-fit">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "bg-transparent border border-outline px-4 py-2 font-mono text-[16px] text-primary outline-none focus:border-accent focus:ring-0 transition-all duration-200 ease-in-out",
          className
        )}
        {...props}
      />
    </div>
  )
}
