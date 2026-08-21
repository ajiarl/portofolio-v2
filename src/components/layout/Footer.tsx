
export function Footer() {
  return (
    <footer className="w-full py-6 border-t border-border bg-background relative z-10 mt-auto">
      <div className="flex justify-center md:justify-between items-center px-5 md:px-8 lg:px-10 w-full max-w-7xl mx-auto">
        <div className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary text-center md:text-left">
          © {new Date().getFullYear()} AJI ARLANDO. ALL RIGHTS RESERVED.
        </div>
        <div className="hidden md:flex gap-6">
          <a href="https://github.com/ajiarl" target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-all duration-200 ease-in-out">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/ajiarlando" target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-all duration-200 ease-in-out">
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  )
}
