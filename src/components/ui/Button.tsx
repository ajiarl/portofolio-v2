import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'ghost' | 'solid'
}

export function Button({ className, variant = 'outline', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em]",
        "border transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "border-primary text-primary hover:bg-primary hover:text-white": variant === 'outline',
          "border-transparent text-muted hover:border-border hover:bg-surface": variant === 'ghost',
          "border-primary bg-primary text-white hover:bg-white hover:text-primary": variant === 'solid',
        },
        className
      )}
      {...props}
    />
  )
}
