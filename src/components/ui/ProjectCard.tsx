import Link from 'next/link'
import Image from 'next/image'
import { TechTag } from './TechTag'

import { FiGithub, FiExternalLink } from 'react-icons/fi'

import type { ProjectData } from '@/lib/types/project'

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const formattedNumber = (index + 1).toString().padStart(2, '0')
  const slug = project.slug

  return (
    <div
      className="h-full relative group border border-border bg-surface hover:border-primary transition-all duration-200 ease-in-out flex flex-col cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link 
        href={`/project/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View details for ${project.Title}`}
      />
      
      <div className="h-48 border-b border-border bg-[#ebe7e6] relative overflow-hidden group-hover:bg-[#c8c6c5] transition-all duration-200 ease-in-out z-10 pointer-events-none">
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
      <div className="p-4 flex flex-col gap-2 flex-grow relative z-10 pointer-events-none">
        <header className="flex justify-between items-start border-b border-border pb-2 mb-2">
          <h2 className="font-heading text-xl font-bold text-primary">{project.Title}</h2>
          <span className="font-mono text-[10px] font-medium text-outline">{formattedNumber}</span>
        </header>
        <p className="font-mono text-sm text-muted leading-relaxed line-clamp-3">
          {project.Description}
        </p>
        
        {/* Footer Area with Tags and Links */}
        <footer className="mt-auto pt-2 border-t border-border flex flex-col gap-4 pointer-events-auto">
          <div className="flex flex-wrap gap-2">
            {project.TechStack && project.TechStack.slice(0, 6).map((tech, i) => (
              <TechTag key={i}>{tech}</TechTag>
            ))}
            {project.TechStack && project.TechStack.length > 6 && (
              <TechTag key="more">+{project.TechStack.length - 6}</TechTag>
            )}
          </div>
          
          {/* External Links */}
          {(project.Github || project.Link) && (
            <div className="flex items-center gap-4 mt-auto relative z-20">
              {project.Github && (
                <a 
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
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
    </div>
  )
}
