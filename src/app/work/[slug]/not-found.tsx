import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 flex flex-col items-center justify-center min-h-[60vh] relative z-10 text-center gap-6">
      <div className="font-heading text-8xl font-extrabold text-primary">404</div>
      <h1 className="font-mono text-xl font-bold uppercase tracking-widest text-primary border-y border-border py-4 w-full max-w-md">
        SYSTEM FAULT: PAGE NOT FOUND
      </h1>
      <p className="font-mono text-base text-muted max-w-md leading-[1.6]">
        The requested resource could not be located in the current workspace. Please verify the path or return to the root index.
      </p>
      <div className="pt-4">
        <Link
          href="/work"
          className="inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em] border transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed border-primary text-primary hover:bg-primary hover:text-white border-2"
        >
          BACK TO WORK
        </Link>
      </div>
    </main>
  )
}
