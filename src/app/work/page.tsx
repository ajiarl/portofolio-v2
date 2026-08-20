import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/ui/ProjectCard'
import type { ProjectData } from '@/lib/types/project'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Selected Work | Aji Arlando",
  description: "A collection of robust, systematic solutions and web applications built with technical precision.",
}

export const revalidate = 0 // Opt out of caching for now

export default async function WorkPage() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, slug, Title, Description, Img, TechStack, Github, Link')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Supabase Fetch Error:", error);
  }


  const normalizedProjects: ProjectData[] = (projects ?? [])
    .filter(
      (project): project is typeof project & {
        Title: string
        Description: string
        TechStack: string[]
      } =>
        project.Title !== null &&
        project.Description !== null &&
        Array.isArray(project.TechStack) &&
        project.TechStack.every((item) => typeof item === 'string')
    )
    .map((project) => ({
      id: project.id,
      slug: project.slug,
      Title: project.Title,
      Description: project.Description,
      Img: project.Img,
      TechStack: project.TechStack,
      Github: project.Github,
      Link: project.Link,
    }))

  const displayProjects = normalizedProjects

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 flex flex-col gap-12 relative z-10">
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
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>
    </main>
  )
}
