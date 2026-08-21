import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { TechTag } from '@/components/ui/TechTag'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import type { Metadata } from 'next'
import { jsonToStringArray } from '@/lib/types/project'

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('Title, Description')
    .eq('slug', resolvedParams.slug)
    .eq('is_published', true)
    .single()

  if (!project) {
    return { 
      title: 'Project Not Found | Aji Arlando',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.Title} | Aji Arlando`,
    description: project.Description ? (project.Description.substring(0, 160) + (project.Description.length > 160 ? '...' : '')) : '',
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select(`
      id,
      slug,
      Title,
      Description,
      Features,
      TechStack,
      Link,
      Github,
      Img
    `)
    .eq('slug', resolvedParams.slug)
    .eq('is_published', true)
    .single()

  if (!project) {
    notFound()
  }

  const features = jsonToStringArray(project.Features)
  const techStack = jsonToStringArray(project.TechStack)

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 flex flex-col gap-12 relative z-10">

      {/* Header */}
      <section className="flex flex-col gap-6">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] md:text-[12px] font-bold uppercase tracking-[0.05em] text-muted hover:text-primary transition-all duration-200 ease-in-out w-fit py-1 border-b border-transparent hover:border-primary"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 ease-in-out group-hover:-translate-x-0.5" />
          BACK TO WORK
        </Link>
        <header className="border-b border-border pb-6 flex flex-col gap-4">
          <h1 className="font-heading text-4xl md:text-[64px] font-extrabold leading-[1.1] text-primary">
            {project.Title}
          </h1>
        </header>
      </section>

      {/* 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
        
        {/* Left Column: Description, Features, Tech Stack, Links */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          <div className="font-mono text-base text-muted leading-[1.6]">
            {project.Description}
          </div>

          {features.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary">
                KEY FEATURES
              </h2>
              <ol className="flex flex-col">
                {features.map((feature, index) => (
                  <li key={index} className="py-2 border-b border-border font-mono text-sm text-primary flex gap-4">
                    <span className="text-[#5f6363]">{(index + 1).toString().padStart(2, '0')}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary">
              TECH STACK
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.Link && (
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em] border transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed border-primary text-primary hover:bg-primary hover:text-white border-2 flex gap-2 text-xs"
              >
                <ExternalLink className="w-4 h-4 stroke-[2]" />
                LIVE DEMO
              </a>
            )}
            {project.Github && (
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em] transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed border-transparent text-muted hover:border-border hover:bg-surface border border-border flex gap-2 text-xs"
              >
                <FiGithub className="w-4 h-4 stroke-[2]" />
                SOURCE CODE
              </a>
            )}
          </div>
          
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border bg-surface p-2">
            <div className="aspect-[4/3] relative overflow-hidden bg-[#ebe7e6] group">
              {project.Img ? (
                <Image 
                  src={project.Img!}
                  alt={project.Title || 'Project Image'}
                  fill
                  unoptimized
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-none duration-0"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-border flex items-center justify-center font-mono text-muted text-xs">
                  NO IMAGE
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}
