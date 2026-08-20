import { describe, expect, it } from 'vitest'
import { extractProjectImagePath } from '@/lib/storage/project-images'

describe('extractProjectImagePath', () => {
  it('extracts the storage path from a Supabase public URL', () => {
    const url =
      'https://example.supabase.co/storage/v1/object/public/project-images/123_project.png'

    expect(extractProjectImagePath(url)).toBe('123_project.png')
  })

  it('decodes encoded path segments', () => {
    const url =
      'https://example.supabase.co/storage/v1/object/public/project-images/my%20project/image.webp'

    expect(extractProjectImagePath(url)).toBe('my project/image.webp')
  })

  it('supports nested storage paths', () => {
    const url =
      'https://example.supabase.co/storage/v1/object/public/project-images/projects/2026/image.png'

    expect(extractProjectImagePath(url)).toBe(
      'projects/2026/image.png'
    )
  })

  it('returns null when the URL does not contain the project-images marker', () => {
    const url =
      'https://example.supabase.co/storage/v1/object/public/other-bucket/image.png'

    expect(extractProjectImagePath(url)).toBeNull()
  })

  it('returns null for an invalid URL', () => {
    expect(extractProjectImagePath('not-a-valid-url')).toBeNull()
  })
})
