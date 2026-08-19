import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { TechTag } from "@/components/ui/TechTag"
import type { Metadata } from "next"
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi"

export const metadata: Metadata = {
  title: "Aji Arlando | Fullstack Developer",
  description: "Building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision.",
}

export default function Home() {
  return (
    <main className="flex-grow flex flex-col justify-center md:justify-start relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-0 md:pt-24 md:pb-12">
      <div className="flex flex-col items-start gap-8 max-w-3xl">
        <TechTag>FULLSTACK DEVELOPER</TechTag>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"></div>
          <h1 className="font-heading text-5xl md:text-[64px] font-extrabold leading-[1.1] tracking-[-0.02em] text-primary pl-6">
            Aji Arlando
          </h1>
        </div>
        <p className="font-mono text-base md:text-[16px] text-muted max-w-2xl leading-[1.6]">
          Building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="/work">
            <Button variant="outline" className="border-primary border-2">VIEW WORK</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="border border-border">CONTACT</Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-6">
           <span className="font-mono text-[10px] font-medium text-outline uppercase tracking-widest">SOCIALS</span>
           <div className="flex gap-5">
              <a href="https://github.com/ajiarl" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors duration-200" aria-label="GitHub">
                <FiGithub className="w-5 h-5 stroke-[1.5]" />
              </a>
              <a href="https://linkedin.com/in/ajiarlando" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors duration-200" aria-label="LinkedIn">
                <FiLinkedin className="w-5 h-5 stroke-[1.5]" />
              </a>
              <a href="https://instagram.com/ajiii.ar" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors duration-200" aria-label="Instagram">
                <FiInstagram className="w-5 h-5 stroke-[1.5]" />
              </a>
           </div>
        </div>
      </div>
    </main>
  )
}
