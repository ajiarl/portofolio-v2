import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border bg-background relative z-10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 gap-4 w-full max-w-7xl mx-auto">
        <div className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary">
          © {new Date().getFullYear()} AJI ARLANDO. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6">
          <Link href="https://github.com/ajiarlando" target="_blank" className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary transition-none">
            GITHUB
          </Link>
          <Link href="https://linkedin.com/in/ajiarlando" target="_blank" className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary transition-none">
            LINKEDIN
          </Link>
        </div>
      </div>
    </footer>
  )
}
