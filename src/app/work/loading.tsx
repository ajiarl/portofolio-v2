export default function Loading() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col gap-12 relative z-10">
      <section className="border-b border-border pb-6 flex flex-col md:flex-row gap-6 items-end justify-between">
        <div>
          <h1 className="font-heading text-4xl md:text-[64px] font-extrabold leading-[1.1] text-primary">
            Selected Work
          </h1>
          <p className="font-mono text-base text-muted mt-4 max-w-2xl leading-[1.6]">
            A collection of building robust, systematic solutions with technical precision.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-border bg-surface flex flex-col h-[400px]">
            <div className="h-48 border-b border-border bg-border/50 animate-pulse"></div>
            <div className="p-4 flex flex-col gap-4 flex-grow">
              <div className="h-6 w-3/4 bg-border/50 animate-pulse"></div>
              <div className="h-4 w-full bg-border/50 animate-pulse mt-2"></div>
              <div className="h-4 w-5/6 bg-border/50 animate-pulse"></div>
              <div className="mt-auto flex gap-2 pt-2 border-t border-border">
                <div className="h-5 w-16 bg-border/50 animate-pulse"></div>
                <div className="h-5 w-20 bg-border/50 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
