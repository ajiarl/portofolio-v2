"use client";

import Link from 'next/link'
import Image from 'next/image'
import { TechTag } from './TechTag'
import { toSlug } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'

import { FiGithub, FiExternalLink } from 'react-icons/fi'

export interface ProjectData {
  id: string;
  Title: string;
  Description: string;
  Img: string;
  TechStack: string[];
  Github?: string;
  Link?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const formattedNumber = (index + 1).toString().padStart(2, '0')
  const slug = toSlug(project.Title)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
      className="h-full"
    >
      <Link 
        href={`/project/${slug}`}
        className="border border-border bg-surface hover:border-primary transition-all duration-200 ease-in-out flex flex-col group block h-full cursor-pointer"
      >
      <div className="h-48 border-b border-border bg-[#ebe7e6] relative overflow-hidden group-hover:bg-[#c8c6c5] transition-all duration-200 ease-in-out">
        {project.Img ? (
          <Image 
            src={project.Img} 
            alt={project.Title}
            fill
            className="object-cover group-hover:opacity-90 transition-all duration-200 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-border flex items-center justify-center font-mono text-muted text-xs">
            NO IMAGE
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <header className="flex justify-between items-start border-b border-border pb-2 mb-2">
          <h2 className="font-heading text-xl font-bold text-primary">{project.Title}</h2>
          <span className="font-mono text-[10px] font-medium text-outline">{formattedNumber}</span>
        </header>
        <p className="font-mono text-sm text-muted flex-grow leading-relaxed">
          {project.Description}
        </p>
        
        {/* Footer Area with Tags and Links */}
        <footer className="mt-4 pt-2 border-t border-border flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.TechStack && project.TechStack.map((tech, i) => (
              <TechTag key={i}>{tech}</TechTag>
            ))}
          </div>
          
          {/* External Links */}
          {(project.Github || project.Link) && (
            <div className="flex items-center gap-4 mt-auto">
              {project.Github && (
                <a 
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-outline hover:text-primary transition-colors duration-200"
                  aria-label="GitHub Repository"
                >
                  <FiGithub className="w-[18px] h-[18px] stroke-[1.5]" />
                </a>
              )}
              {project.Link && (
                <a 
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-outline hover:text-primary transition-colors duration-200"
                  aria-label="Live Project"
                >
                  <FiExternalLink className="w-[18px] h-[18px] stroke-[1.5]" />
                </a>
              )}
            </div>
          )}
        </footer>
      </div>
    </Link>
    </motion.div>
  )
}
