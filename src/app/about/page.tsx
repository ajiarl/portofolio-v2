import Image from "next/image"
import { TECH_STACK } from "@/lib/constants"
import { TechTag } from "@/components/ui/TechTag"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Aji Arlando",
  description: "A glimpse into the workflow, technical capabilities, and background of Aji Arlando, a systematic builder and fullstack developer.",
}

export const revalidate = 0

export default async function AboutPage() {
  const supabase = await createClient()
  const { count } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  const projectCount = count ?? 6

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 flex flex-col gap-12 relative z-10">
      <section className="border-b border-border pb-6 flex flex-col gap-4">
        <h1 className="font-heading text-4xl md:text-[64px] font-extrabold leading-[1.1] text-primary">
          About
        </h1>
        <p className="font-mono text-base text-muted max-w-2xl leading-[1.6]">
          A glimpse into the workflow and background of a systematic builder.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Photo */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="border border-border p-4 bg-[#f7f3f2] relative group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image 
                src="/Photo.webp" 
                alt="Aji Arlando" 
                fill
                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Tech Stack */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-8">
          {/* Bio Box */}
          <section className="border border-border bg-surface p-6 md:p-8 flex flex-col gap-6">
            <h2 className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary">
              EXECUTIVE SUMMARY
            </h2>
            <div className="font-mono text-base text-muted leading-[1.6] flex flex-col gap-4">
              <p>
                Aji Arlando is an Information Systems student and fullstack developer based in Palembang, Indonesia. He builds production-grade web applications independently - from database schema to deployment.
              </p>
              <p>
                In the last year: {projectCount} projects shipped solo, 2 live in production (snipid.my.id, simagang-production.up.railway.app).
              </p>
              <p className="text-sm text-[#5f6363]">
                Stack: Laravel, Next.js, TypeScript, MySQL, PostgreSQL, Docker, Railway.
              </p>
            </div>
          </section>

          {/* Tech Stack Box */}
          <section className="border border-border bg-surface p-6 md:p-8 flex flex-col gap-6">
            <h2 className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary">
              TECHNICAL CAPABILITIES
            </h2>
            <div className="flex flex-col gap-8">
              {Object.entries(TECH_STACK).map(([category, items]) => (
                <div key={category} className="flex flex-col gap-4">
                  <h3 className="font-mono text-[10px] font-medium text-[#5f6363] uppercase tracking-widest">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <TechTag key={item}>{item}</TechTag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
