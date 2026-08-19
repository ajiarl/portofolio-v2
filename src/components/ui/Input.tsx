import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        className={cn(
          "bg-transparent border border-outline px-4 py-2 font-mono text-[16px] text-primary outline-none focus:border-accent focus:ring-0 transition-all duration-200 ease-in-out",
          className
        )}
        {...props}
      />
    </div>
  )
}
