import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center min-h-[60vh] relative z-10 text-center gap-6">
      <div className="font-heading text-8xl font-extrabold text-primary">404</div>
      <h1 className="font-mono text-xl font-bold uppercase tracking-widest text-primary border-y border-border py-4 w-full max-w-md">
        SYSTEM FAULT: PAGE NOT FOUND
      </h1>
      <p className="font-mono text-base text-muted max-w-md leading-[1.6]">
        The requested resource could not be located in the current workspace. Please verify the path or return to the root index.
      </p>
      <div className="pt-4">
        <Link href="/">
          <Button variant="outline" className="border-primary border-2">
            RETURN TO HOME
          </Button>
        </Link>
      </div>
    </main>
  )
}
