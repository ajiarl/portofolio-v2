'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

interface Props {
  projectId: number
  isPublished: boolean
}

export function ToggleProjectPublishButton({
  projectId,
  isPublished,
}: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleToggle = async () => {
    setLoading(true)

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          is_published: !isPublished,
        })
        .eq('id', projectId)

      if (error) {
        throw new Error(error.message)
      }

      router.refresh()
    } catch (error) {
      console.error('Publish toggle failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant={isPublished ? 'ghost' : 'outline'}
      className="border border-border text-[10px] px-3 py-1.5 h-auto min-h-0"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading
        ? '...'
        : isPublished
          ? 'UNPUBLISH'
          : 'PUBLISH'}
    </Button>
  )
}
