'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ProjectFormModal, ProjectData } from './ProjectFormModal'

interface Props {
  mode: 'create' | 'edit'
  initialData?: ProjectData
}

export function ProjectFormButton({ mode, initialData }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  if (mode === 'edit') {
    return (
      <>
        <Button 
          variant="outline" 
          className="border-primary border flex-1 text-[10px] px-3 py-1.5 h-auto min-h-0 text-center flex justify-center w-full"
          onClick={() => setIsOpen(true)}
        >
          EDIT
        </Button>
        <ProjectFormModal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          mode={mode} 
          initialData={initialData} 
        />
      </>
    )
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="border-primary border-2 flex items-center justify-center w-fit"
        onClick={() => setIsOpen(true)}
      >
        TAMBAH PROJECT
      </Button>
      <ProjectFormModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        mode={mode} 
      />
    </>
  )
}
