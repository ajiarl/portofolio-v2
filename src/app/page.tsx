import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { TechTag } from "@/components/ui/TechTag"

export default function Home() {
  return (
    <main className="flex-grow flex flex-col relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-12">
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
      </div>
    </main>
  )
}
