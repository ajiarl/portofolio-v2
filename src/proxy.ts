import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function withCsp(response: NextResponse, csp: string): NextResponse {
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export async function proxy(request: NextRequest) {
  // 1. Generate nonce at the very start, before anything else
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // 2. Build CSP string with nonce (single source of truth for all return paths)
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://igmimmizowsmheypyesr.supabase.co",
    "font-src 'self' data:",
    "connect-src 'self' https://igmimmizowsmheypyesr.supabase.co wss://igmimmizowsmheypyesr.supabase.co https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self' https://api.web3forms.com",
  ].join('; ')

  // 3. Build request headers with nonce BEFORE NextResponse.next() snapshot
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  // 4. Instantiate response with nonce-enriched headers
  let supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // 5. Supabase auth (logic unchanged from original)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: { headers: requestHeaders },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Route protection for dashboard (logic unchanged)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return withCsp(NextResponse.redirect(url), csp) // Return path 1
    }

    // Check role in profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return withCsp(NextResponse.redirect(url), csp) // Return path 2
    }
  }

  return withCsp(supabaseResponse, csp) // Return path 3
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
