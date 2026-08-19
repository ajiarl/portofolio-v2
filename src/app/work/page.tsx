import { createClient } from '@/lib/supabase/server'
import { ProjectCard, type ProjectData } from '@/components/ui/ProjectCard'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Selected Work | Aji Arlando",
  description: "A collection of robust, systematic solutions and web applications built with technical precision.",
}

export const revalidate = 0 // Opt out of caching for now

// Dummy data fallback
const DUMMY_PROJECTS: ProjectData[] = [
  {
    id: 'dummy-1',
    Title: 'Project Alpha',
    Description: 'A high-performance distributed ledger system optimized for concurrent processing.',
    Img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    TechStack: ['TypeScript', 'Go', 'PostgreSQL']
  },
  {
    id: 'dummy-2',
    Title: 'System Beta',
    Description: 'Real-time data visualization pipeline handling millions of events per second.',
    Img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    TechStack: ['React', 'WebGL', 'Rust']
  },
  {
    id: 'dummy-3',
    Title: 'Framework Gamma',
    Description: 'An open-source UI component library enforcing strict structural design principles.',
    Img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    TechStack: ['Vue.js', 'CSS Grid']
  },
  {
    id: 'dummy-4',
    Title: 'API Delta',
    Description: 'A secure, scalable RESTful API powering a global logistics platform.',
    Img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    TechStack: ['Node.js', 'GraphQL', 'Redis']
  }
]

export default async function WorkPage() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, Title, Description, Img, TechStack')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Supabase Fetch Error:", error);
  }


  const displayProjects = projects && projects.length > 0 ? projects : DUMMY_PROJECTS;

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
