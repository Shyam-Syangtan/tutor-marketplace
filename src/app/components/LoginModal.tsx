// src/app/components/LoginModal.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Modal from './Modal'

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    onClose()
    router.push('/')  // or dashboard
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Log in</h2>
      <button
        onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
        className="w-full mb-4 py-2 border rounded flex items-center justify-center gap-2"
      >
        <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </Modal>
  )
}

