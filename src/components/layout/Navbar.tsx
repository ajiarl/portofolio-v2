'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="w-full top-0 sticky bg-background border-b border-border z-50">
      <div className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-primary">
          AJI ARLANDO
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-[12px] font-bold uppercase tracking-[0.05em] px-2 py-1 transition-none duration-0 border-b",
                  isActive 
                    ? "text-primary border-primary"
                    : "text-muted border-transparent hover:bg-primary hover:text-white hover:border-primary"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden p-1 text-primary border border-transparent hover:border-border transition-none focus:outline-none focus:border-border"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-b border-border bg-background flex flex-col p-6 gap-3 z-50">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-[14px] font-bold uppercase tracking-[0.05em] px-4 py-3 transition-none duration-0 border",
                  isActive 
                    ? "text-primary border-primary bg-surface"
                    : "text-muted border-border hover:bg-primary hover:text-white hover:border-primary"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
