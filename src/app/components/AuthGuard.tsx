// src/app/components/AuthGuard.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'  // 🛈 your generated types

/**
 * Usage:
 *   <AuthGuard role="student">{ protected content }</AuthGuard>
 *
 * If `role` is omitted, it merely checks that you are signed in.
 */
export default async function AuthGuard({
  children,
  role, // 'student' | 'tutor' | undefined
}: {
  children: React.ReactNode
  role?: 'student' | 'tutor'
}) {
  /* ------------------------------------------------------------------
     1) Init server-side Supabase client (type-safe).
  ------------------------------------------------------------------ */
  const supabase = createServerComponentClient<Database>({ cookies })

  /* ------------------------------------------------------------------
     2) Check if there is a signed-in user.
  ------------------------------------------------------------------ */
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('AuthGuard: getSession error', sessionError)
  }

  if (!session) {
    // Nobody logged in → send to login
    redirect('/auth/login')
  }

  /* ------------------------------------------------------------------
     3) Optional role enforcement.
  ------------------------------------------------------------------ */
  if (role) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      console.error('AuthGuard: error fetching profile', profileError)
    }

    if (!profile) {
      // No row in `public.profiles` yet → maybe just signed up.
      // You can either:
      //   A. Redirect to a "complete profile" page
      //   B. Insert a default row here (not shown)
      redirect('/auth/login') // fallback: treat as not authorized
    }

    if (profile.role !== role) {
      // User is signed in but with the wrong role → send them away.
      redirect('/') // or '/forbidden'
    }
  }

  /* ------------------------------------------------------------------
     4) All checks passed → render the protected content.
  ------------------------------------------------------------------ */
  return <>{children}</>
}
