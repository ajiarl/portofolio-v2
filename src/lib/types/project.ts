export interface ProjectData {
  id?: number
  slug: string
  Title: string
  Description: string
  TechStack: string[]
  Features?: string[]
  Link?: string | null
  Github?: string | null
  Img: string | null
}

export function jsonToStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value.filter(
    (item): item is string => typeof item === 'string'
  )
}
