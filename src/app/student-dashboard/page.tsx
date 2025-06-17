// src/app/student-dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { Database } from '@/lib/database.types'

export default async function StudentDashboardPage() {
  // Initialize a server‐side Supabase client
  const supabase = createServerComponentClient<Database>({ cookies })

  // 1️⃣ Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Should never happen because AuthGuard already redirected
    return <p>Redirecting to login…</p>
  }

  // 2️⃣ Fetch the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, created_at')
    .eq('id', session.user.id)
    .single()

  // 3️⃣ (Optional) Fetch upcoming lessons or other user‐specific data
  // Here we’ll just mock an array for demonstration
  const upcomingLessons = [
    { id: 1, tutor: 'Alice Smith', time: '2025-06-20 10:00 AM' },
    { id: 2, tutor: 'Carlos Díaz', time: '2025-06-22  4:00 PM' },
  ]

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <Image
          src={session.user.user_metadata.avatar_url || '/default-avatar.png'}
          alt="Your avatar"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{session.user.user_metadata.full_name}</h1>
          <p className="text-gray-600 capitalize">{profile?.role} dashboard</p>
          <p className="text-sm text-gray-400">
            Member since {new Date(profile!.created_at).toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Upcoming Lessons */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Lessons</h2>
        <ul className="space-y-4">
          {upcomingLessons.map((lesson) => (
            <li
              key={lesson.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{lesson.tutor}</p>
                <p className="text-gray-500 text-sm">{lesson.time}</p>
              </div>
              <button className="text-red-500 hover:underline text-sm">Join</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
