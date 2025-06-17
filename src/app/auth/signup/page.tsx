/* ----------------------------------------------------------------------
   src/app/auth/signup/page.tsx
   Simple email/password + Google signup page
---------------------------------------------------------------------- */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'

export default function SignUpPage() {
  const router = useRouter()

  /* ------------------ local form state ----------------------------- */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  /* ------------------------------------------------------------------
     If already signed in, skip signup screen
  ------------------------------------------------------------------ */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Signup: getSession error', error)
      }
      console.log('Signup: session data', session)
      if (session) router.replace('/student-dashboard')
    })
  }, [router])

  /* ---------------- email / password handler ----------------------- */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    // We only need `error`, so we don't destructure `data`
    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    // Success → go straight to dashboard
    router.push('/student-dashboard')
  }

  /* --------------------------- JSX --------------------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

        {/* Google signup */}
        <button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/student-dashboard`,
              },
            })
          }
          className="w-full mb-4 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email/password form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-red-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
