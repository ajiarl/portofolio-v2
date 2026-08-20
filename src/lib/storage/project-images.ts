import { createClient } from '@/lib/supabase/client'


type SupabaseBrowserClient = ReturnType<typeof createClient>


export function extractProjectImagePath(url: string): string | null {
  try {
    const parsed = new URL(url)
    const marker = '/project-images/'
    const index = parsed.pathname.indexOf(marker)


    if (index === -1) return null


    return decodeURIComponent(
      parsed.pathname.slice(index + marker.length)
    )
  } catch {
    return null
  }
}


export async function cleanupProjectImage(
  supabase: SupabaseBrowserClient,
  imageUrl: string,
  context: string
) {
  const path = extractProjectImagePath(imageUrl)


  if (!path) {
    console.error(
      `[cleanup:${context}] could not extract path from URL:`,
      imageUrl
    )
    return
  }


  const { error } = await supabase.storage
    .from('project-images')
    .remove([path])


  if (error) {
    console.error(
      `[cleanup:${context}] failed to remove object:`,
      path,
      error.message
    )
  }
}
