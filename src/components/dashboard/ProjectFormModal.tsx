'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cleanupProjectImage } from '@/lib/storage/project-images'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { TechTag } from '@/components/ui/TechTag'

export interface ProjectData {
  id?: string
  Title: string
  Description: string
  TechStack: string[]
  Features: string[]
  Link?: string | null
  Github?: string | null
  Img: string
  [key: string]: any
}

interface Props {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  initialData?: ProjectData
}

export function ProjectFormModal({ isOpen, onClose, mode, initialData }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [link, setLink] = useState('')
  const [github, setGithub] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // Temporary inputs for arrays
  const [currentTech, setCurrentTech] = useState('')
  const [currentFeature, setCurrentFeature] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Reset/Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.Title || '')
        setDescription(initialData.Description || '')
        setTechStack(initialData.TechStack || [])
        setFeatures(initialData.Features || [])
        setLink(initialData.Link || '')
        setGithub(initialData.Github || '')
        setImageFile(null)
        setImagePreview(initialData.Img || null)
      } else {
        setTitle('')
        setDescription('')
        setTechStack([])
        setFeatures([])
        setLink('')
        setGithub('')
        setImageFile(null)
        setImagePreview(null)
      }
      setError(null)
      setLoading(false)
      setCurrentTech('')
      setCurrentFeature('')
    }
  }, [isOpen, mode, initialData])

  if (!isOpen) return null

  const handleAddTech = () => {
    if (currentTech.trim()) {
      setTechStack([...techStack, currentTech.trim()])
      setCurrentTech('')
    }
  }

  const handleRemoveTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index))
  }

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()])
      setCurrentFeature('')
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateSafeFileName = (title: string, originalName: string) => {
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const ext = originalName.split('.').pop()
    return `${Date.now()}_${safeTitle}.${ext}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !description.trim()) {
      setError('Title and Description are required.')
      return
    }

    if (mode === 'create' && !imageFile) {
      setError('Project Image is required.')
      return
    }

    setLoading(true)

    try {
      const oldImgUrl = mode === 'edit' && initialData ? initialData.Img : null
      let newImgUrl: string | null = null
      let finalImgUrl = mode === 'edit' && initialData ? initialData.Img : ''

      // 1. Upload Image (only if there's a new file selected)
      if (imageFile) {
        const fileName = generateSafeFileName(title, imageFile.name)
        
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`)
        }

        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)

        newImgUrl = publicUrl
        finalImgUrl = publicUrl
      }

      // 2. Prepare payload
      const payload = {
        Title: title.trim(),
        Description: description.trim(),
        TechStack: techStack,
        Features: features,
        Link: link.trim() || null,
        Github: github.trim() || null,
        Img: finalImgUrl
      }

      // 3. Insert or Update
      if (mode === 'create') {
        const { error: insertError } = await supabase.from('projects').insert(payload)
        if (insertError) {
          if (newImgUrl) {
            await cleanupProjectImage(supabase, newImgUrl, 'create-insert-failed')
          }
          throw new Error(`Insert failed: ${insertError.message}`)
        }
      } else {
        const { error: updateError } = await supabase.from('projects').update(payload).eq('id', initialData?.id)
        if (updateError) {
          if (newImgUrl) {
            await cleanupProjectImage(supabase, newImgUrl, 'update-failed')
          }
          throw new Error(`Update failed: ${updateError.message}`)
        }

        if (newImgUrl && oldImgUrl) {
          await cleanupProjectImage(supabase, oldImgUrl, 'update-success-old-image')
        }
      }

      // Success
      router.refresh()
      onClose()
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const modalTitle = mode === 'create' ? 'TAMBAH PROJECT' : 'EDIT PROJECT'
  const submitText = loading ? 'SAVING...' : mode === 'create' ? 'SIMPAN PROJECT' : 'UPDATE PROJECT'

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/90">
      <div className="flex min-h-full items-start md:items-center justify-center p-4 md:p-10">
        <div className="bg-surface border border-border w-full max-w-4xl relative">
          <header className="border-b border-border p-6 flex justify-between items-center bg-surface sticky top-0 z-10">
            <h2 className="font-heading text-2xl font-extrabold text-primary">{modalTitle}</h2>
            <button 
              type="button"
              onClick={onClose}
              className="font-mono text-2xl text-muted hover:text-primary leading-none"
              disabled={loading}
            >
              ×
            </button>
          </header>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {error && (
                <div className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary p-3 border border-primary bg-[#fdf8f8]">
                  ERROR: {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                  <Input 
                    label="TITLE *"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <Textarea 
                    label="DESCRIPTION *"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    required
                    rows={6}
                  />
                  <Input 
                    label="LIVE DEMO URL (Optional)"
                    name="link"
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    disabled={loading}
                    placeholder="https://... atau bebas"
                  />
                  <Input 
                    label="GITHUB URL (Optional)"
                    name="github"
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    disabled={loading}
                    placeholder="https://github.com/... atau bebas"
                  />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-8">
                  {/* Image Upload */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2">
                      PROJECT IMAGE {mode === 'create' ? '*' : '(Upload new to change)'}
                    </label>
                    <div 
                      className="border border-border p-4 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary transition-all duration-200 ease-in-out min-h-[160px] relative overflow-hidden"
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                      role="button"
                      tabIndex={0}
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full absolute inset-0 object-cover grayscale" />
                      ) : (
                        <span className="font-mono text-xs text-muted">Click to select image file</span>
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      disabled={loading}
                    />
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-col gap-1 border border-border p-4">
                    <label className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2">
                      TECH STACK
                    </label>
                    <div className="flex gap-2 mb-4">
                      <Input 
                        label=""
                        name="currentTech"
                        value={currentTech}
                        onChange={(e) => setCurrentTech(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }}
                        disabled={loading}
                        placeholder="e.g. Next.js"
                        className="flex-grow py-1"
                      />
                      <Button type="button" variant="outline" className="border border-border" onClick={handleAddTech} disabled={loading}>
                        ADD
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, i) => (
                        <TechTag key={i}>
                          {tech} <button type="button" className="ml-2 cursor-pointer hover:text-primary font-bold transition-colors duration-150" aria-label={`Remove ${tech}`} onClick={() => handleRemoveTech(i)}>×</button>
                        </TechTag>
                      ))}
                      {techStack.length === 0 && <span className="font-mono text-[10px] text-muted italic">No tech added</span>}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-1 border border-border p-4">
                    <label className="font-mono text-[10px] font-medium text-muted uppercase tracking-widest mb-2">
                      KEY FEATURES
                    </label>
                    <div className="flex gap-2 mb-4">
                      <Input 
                        label=""
                        name="currentFeature"
                        value={currentFeature}
                        onChange={(e) => setCurrentFeature(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                        disabled={loading}
                        placeholder="Feature description"
                        className="flex-grow py-1"
                      />
                      <Button type="button" variant="outline" className="border border-border" onClick={handleAddFeature} disabled={loading}>
                        ADD
                      </Button>
                    </div>
                    {features.length > 0 ? (
                      <ol className="list-decimal pl-6 font-mono text-sm text-muted flex flex-col gap-2">
                        {features.map((feature, i) => (
                          <li key={i} className="group">
                            <span className="text-primary">{feature}</span>
                            <button type="button" className="ml-2 cursor-pointer text-muted hover:text-primary font-bold" onClick={() => handleRemoveFeature(i)}>×</button>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <span className="font-mono text-[10px] text-muted italic">No features added</span>
                    )}
                  </div>
                </div>
              </div>

              <footer className="border-t border-border pt-6 mt-2 flex justify-end gap-4 sticky bottom-0 bg-surface">
                <Button type="button" variant="ghost" className="border border-border min-w-[120px]" onClick={onClose} disabled={loading}>
                  BATAL
                </Button>
                <Button type="submit" variant="outline" className="border-primary border-2 min-w-[200px]" disabled={loading}>
                  {submitText}
                </Button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
