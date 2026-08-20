import { describe, expect, it } from 'vitest'
import { jsonToStringArray } from '@/lib/types/project'

describe('jsonToStringArray', () => {
  it('returns string arrays unchanged', () => {
    expect(jsonToStringArray(['React', 'Next.js', 'Supabase']))
      .toEqual(['React', 'Next.js', 'Supabase'])
  })

  it('filters out non-string values', () => {
    expect(jsonToStringArray(['React', 123, null, true, 'Next.js']))
      .toEqual(['React', 'Next.js'])
  })

  it('returns empty array for non-array values', () => {
    expect(jsonToStringArray(null)).toEqual([])
    expect(jsonToStringArray(undefined)).toEqual([])
    expect(jsonToStringArray('React')).toEqual([])
    expect(jsonToStringArray({ tech: 'React' })).toEqual([])
  })

  it('returns empty array for an empty array', () => {
    expect(jsonToStringArray([])).toEqual([])
  })
})
