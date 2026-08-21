'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 flex flex-col gap-8 relative z-10">
      <header className="border-b border-border pb-6 flex flex-col gap-4">
        <h1 className="font-heading text-4xl md:text-[64px] font-extrabold leading-[1.1] text-primary">
          Dashboard
        </h1>
        <p className="font-mono text-base text-muted">
          Minimal verification page for route protection.
        </p>
      </header>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center justify-center px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.05em] border transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed border-primary text-primary hover:bg-primary hover:text-white border-2 flex w-fit px-8"
        >
          KELOLA PROJECTS
        </Link>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="border-primary border-2 flex justify-center w-fit px-8"
        >
          LOG OUT
        </Button>
      </div>
    </main>
  )
}
