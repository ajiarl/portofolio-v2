'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const handleNavigate = () => {
    setIsOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <nav className="w-full top-0 sticky bg-background border-b border-border z-50">
      <div className="flex justify-between items-center w-full px-5 md:px-8 lg:px-10 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-primary">
          AJI ARLANDO
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => {
            const isActive =
              link.href === '/work'
                ? pathname === '/work' || pathname.startsWith('/work/')
                : pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-[12px] font-bold uppercase tracking-[0.05em] px-2 py-1 transition-all duration-200 ease-in-out border-b",
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
          ref={toggleRef}
          className="md:hidden p-1 text-primary border border-transparent hover:border-border transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute top-full left-0 w-full border-b border-border bg-background flex flex-col p-6 gap-3 z-50"
        >
          {links.map((link) => {
            const isActive =
              link.href === '/work'
                ? pathname === '/work' || pathname.startsWith('/work/')
                : pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className={cn(
                  "font-mono text-[14px] font-bold uppercase tracking-[0.05em] px-4 py-3 transition-all duration-200 ease-in-out border",
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
