import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TechTag } from '@/components/ui/TechTag'
import { ProjectFormButton } from '@/components/dashboard/ProjectFormButton'
import { DeleteProjectButton } from '@/components/dashboard/DeleteProjectButton'

export const revalidate = 0

export default async function DashboardProjectsPage() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col gap-8 relative z-10">
      
      {/* Header */}
      <section className="flex flex-col gap-6">
        <nav className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest flex items-center gap-2">
          <Link href="/dashboard" className="hover:text-primary transition-all duration-200 ease-in-out">DASHBOARD</Link>
          <span>/</span>
          <span className="text-primary">PROJECTS</span>
        </nav>
        
        <header className="border-b border-border pb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="font-heading text-4xl md:text-[64px] font-extrabold leading-[1.1] text-primary">
              Projects
            </h1>
            <ProjectFormButton mode="create" />
          </div>
          <p className="font-mono text-base text-muted max-w-md leading-[1.6]">
            Manage your portfolio projects.
          </p>
        </header>
      </section>

      {/* Table Section */}
      <section>
        {!projects || projects.length === 0 ? (
          <div className="border border-border p-12 flex flex-col items-center justify-center gap-4 text-center">
            <p className="font-mono text-sm text-muted">Belum ada project</p>
            <ProjectFormButton mode="create" />
          </div>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-left font-mono text-sm border-collapse">
              <thead className="border-b border-border text-primary text-[10px] tracking-widest uppercase bg-surface">
                <tr>
                  <th className="p-4 font-bold border-r border-border">Title</th>
                  <th className="p-4 font-bold border-r border-border">Actions</th>
                  <th className="p-4 font-bold border-r border-border">Tech Stack</th>
                  <th className="p-4 font-bold">Created At</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project: any) => (
                  <tr key={project.id} className="border-b border-border hover:bg-surface transition-all duration-200 ease-in-out last:border-0">
                    <td className="p-4 font-bold text-primary border-r border-border">
                      {project.Title}
                    </td>
                    <td className="p-4 border-r border-border min-w-[150px]">
                      <div className="flex flex-wrap gap-2">
                        <ProjectFormButton mode="edit" initialData={project} />
                        <DeleteProjectButton project={project} />
                      </div>
                    </td>
                    <td className="p-4 border-r border-border min-w-[200px]">
                      <div className="flex flex-wrap gap-2">
                        {project.TechStack?.slice(0, 3).map((tech: string, i: number) => (
                          <TechTag key={i}>{tech}</TechTag>
                        ))}
                        {project.TechStack && project.TechStack.length > 3 && (
                          <TechTag>+{project.TechStack.length - 3}</TechTag>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-muted whitespace-nowrap">
                      {new Date(project.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
