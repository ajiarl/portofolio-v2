import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  // Static routes
  const routes = ['', '/work', '/about', '/contact'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Dynamic project routes
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, created_at')
    
  const projectRoutes = (projects || []).map((project) => ({
    url: `${siteUrl}/project/${project.slug}`,
    lastModified: project.created_at ? new Date(project.created_at).toISOString() : new Date().toISOString(),
  }))

  return [...routes, ...projectRoutes]
}
