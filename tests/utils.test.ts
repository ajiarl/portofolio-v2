import { describe, expect, it } from 'vitest'
import { toSlug } from '@/lib/utils'

describe('toSlug', () => {
  it('converts text to lowercase slug', () => {
    expect(toSlug('Hello World')).toBe('hello-world')
  })

  it('replaces multiple separators with one hyphen', () => {
    expect(toSlug('Hello   World!!! Test')).toBe('hello-world-test')
  })

  it('removes leading and trailing hyphens', () => {
    expect(toSlug('---Hello World---')).toBe('hello-world')
  })

  it('removes non-ASCII characters', () => {
    expect(toSlug('Hello @ World #2026')).toBe('hello-world-2026')
  })

  it('returns empty string when no valid characters exist', () => {
    expect(toSlug('!!!')).toBe('')
  })
})
