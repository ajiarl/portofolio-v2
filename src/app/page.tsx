import Link from "next/link"
import { TechTag } from "@/components/ui/TechTag"
import type { Metadata } from "next"
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi"

export const metadata: Metadata = {
  title: "Aji Arlando — Fullstack Developer | Information Systems",
  description: "Aji Arlando is a Fullstack Developer building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision.",
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aji Arlando",
    alternateName: "Aji Arlando",
    jobTitle: "Fullstack Developer",
    url: "https://ajiarlando.my.id",
    sameAs: [
      "https://github.com/ajiarl",
      "https://linkedin.com/in/ajiarlando"
    ],
    description: "Aji Arlando is a Fullstack Developer building robust, systematic solutions from the ground up, with a focus on Information Systems and technical precision."
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col justify-start relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-16 pb-12 md:pt-24 md:pb-12">
        <div className="flex flex-col items-start w-full max-w-3xl">
          <div className="flex flex-col items-start gap-8">
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
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full">
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em] border transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed border-primary text-primary hover:bg-primary hover:text-white border-2 h-12"
              >
                VIEW WORK
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em] border transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed border-transparent text-muted hover:border-border hover:bg-surface border-border border-2 h-12"
              >
                CONTACT
              </Link>
              <div className="flex items-center gap-5 ml-2 md:ml-4">
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
        </div>
      </main>
    </>
  )
}
