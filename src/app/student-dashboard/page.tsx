import AuthGuard from '@/app/components/AuthGuard'

export default async function StudentDashboard() {
  return (
    <AuthGuard role="student">
      <h1 className="p-10 text-2xl">🎉 Student dashboard works!</h1>
    </AuthGuard>
  )
}
