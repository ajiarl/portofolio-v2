import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border bg-background relative z-10 mt-auto">
      <div className="flex justify-center md:justify-between items-center px-5 md:px-8 lg:px-10 w-full max-w-7xl mx-auto">
        <div className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary text-center md:text-left">
          © {new Date().getFullYear()} AJI ARLANDO. ALL RIGHTS RESERVED.
        </div>
        <div className="hidden md:flex gap-6">
          <Link href="https://github.com/ajiarlando" target="_blank" className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary transition-all duration-200 ease-in-out">
            GITHUB
          </Link>
          <Link href="https://linkedin.com/in/ajiarlando" target="_blank" className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary transition-all duration-200 ease-in-out">
            LINKEDIN
          </Link>
        </div>
      </div>
    </footer>
  )
}
