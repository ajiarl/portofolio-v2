import { createClient } from '@/lib/supabase/server'
import { toSlug } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TechTag } from '@/components/ui/TechTag'
import { Button } from '@/components/ui/Button'
import { ExternalLink } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import type { Metadata } from 'next'

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient()
  const { data: projects } = await supabase.from('projects').select('Title, Description')
  const project = projects?.find((p: any) => toSlug(p.Title) === resolvedParams.slug)

  if (!project) return { title: 'Project Not Found | Aji Arlando' }

  return {
    title: `${project.Title} | Aji Arlando`,
    description: project.Description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient()
  const { data: projects } = await supabase.from('projects').select('*')
  
  const project = projects?.find((p: any) => toSlug(p.Title) === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 flex flex-col gap-12 relative z-10">
      
      {/* Header */}
      <section className="flex flex-col gap-6">
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

          {project.Features && project.Features.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-primary">
                KEY FEATURES
              </h2>
              <ol className="flex flex-col">
                {project.Features.map((feature: string, index: number) => (
                  <li key={index} className="py-2 border-b border-border font-mono text-sm text-primary flex gap-4">
                    <span className="text-outline">{(index + 1).toString().padStart(2, '0')}</span>
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
              {project.TechStack && project.TechStack.map((tech: string, i: number) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.Link && (
              <a href={project.Link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-primary border-2 flex items-center gap-2 text-xs">
                  <ExternalLink className="w-4 h-4 stroke-[2]" />
                  LIVE DEMO
                </Button>
              </a>
            )}
            {project.Github && (
              <a href={project.Github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="border border-border flex items-center gap-2 text-xs">
                  <FiGithub className="w-4 h-4 stroke-[2]" />
                  SOURCE CODE
                </Button>
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
                  src={project.Img}
                  alt={project.Title}
                  fill
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
