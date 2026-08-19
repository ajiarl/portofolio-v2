'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

interface Props {
  project: {
    id: string
    Title: string
  }
}

export function DeleteProjectButton({ project }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setError(null)
    setLoading(true)
    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)

      if (deleteError) {
        throw new Error(`Delete failed: ${deleteError.message}`)
      }

      router.refresh()
      setIsOpen(false)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setIsOpen(false)
      setError(null)
    }
  }

  return (
    <>
      <Button 
        variant="ghost" 
        className="border border-border flex-1 text-[10px] px-3 py-1.5 h-auto min-h-0 text-center flex justify-center w-full"
        onClick={() => setIsOpen(true)}
      >
        DELETE
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background/90">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-surface border border-border w-full max-w-md relative p-6 flex flex-col gap-6">
              
              <h2 className="font-heading text-xl font-extrabold text-primary">HAPUS PROJECT</h2>
              
              {error && (
                <div className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary p-3 border border-primary bg-[#fdf8f8]">
                  ERROR: {error}
                </div>
              )}

              <p className="font-mono text-sm text-muted">
                Hapus project <span className="text-primary font-bold">{project.Title}</span>? Tindakan ini tidak bisa dibatalkan.
              </p>

              <div className="flex justify-end gap-4 mt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="border border-border" 
                  onClick={handleClose} 
                  disabled={loading}
                >
                  BATAL
                </Button>
                <Button 
                  type="button" 
                  variant="solid" 
                  onClick={handleDelete} 
                  disabled={loading}
                >
                  {loading ? 'MENGHAPUS...' : 'HAPUS'}
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
