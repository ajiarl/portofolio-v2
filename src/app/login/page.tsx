'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (!authData.user) {
        setError('Login failed. Please try again.')
        return
      }

      // Check role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single()

      if (profileError || !profile) {
        setError('Failed to verify user role.')
        await supabase.auth.signOut()
        return
      }

      if (profile.role !== 'admin') {
        setError('Unauthorized: Admin access required.')
        await supabase.auth.signOut()
        return
      }

      // Success
      router.push('/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 flex flex-col items-center justify-center min-h-[70vh] relative z-10">
      <div className="w-full max-w-md border border-border bg-surface p-8">
        <header className="mb-8 border-b border-border pb-4">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-2">
            ADMIN LOGIN
          </h1>
          <p className="font-mono text-sm text-muted">
            Authorized personnel only.
          </p>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <Input 
            label="EMAIL"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <Input 
            label="PASSWORD"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              variant="outline" 
              className="w-full text-center flex justify-center border-primary border-2 whitespace-nowrap"
              disabled={loading}
            >
              {loading ? 'AUTHENTICATING...' : 'LOG IN'}
            </Button>
          </div>

          {error && (
            <p className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary mt-2 text-center py-2 px-3 border border-primary">
              ERROR: {error}
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
