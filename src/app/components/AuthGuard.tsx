import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode
  role?: 'student' | 'tutor'
}) {
  // Initialize Supabase client (no explicit Database type)
  const supabase = createServerComponentClient({
    cookies,
  })

  // 1. Check session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Not signed in → redirect to login
    redirect('/auth/login')
  }

  // 2. Optionally enforce role
  if (role) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== role) {
      // Wrong role → back to home (or a forbidden page)
      redirect('/')
    }
  }

  // 3. Render the protected content
  return <>{children}</>
}