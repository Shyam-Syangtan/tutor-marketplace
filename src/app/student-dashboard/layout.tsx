// src/app/student-dashboard/layout.tsx
import AuthGuard from '@/app/components/AuthGuard'
import './dashboard.css' // optional: your dashboard‐specific styles

export const metadata = {
  title: 'My Dashboard',
}

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Only students can see this
    <AuthGuard role="student">
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </AuthGuard>
  )
}
