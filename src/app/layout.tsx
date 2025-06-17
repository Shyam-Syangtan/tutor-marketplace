// src/app/layout.tsx
import Navbar from './components/Navbar'
import './globals.css'
import Footer from './components/Footer'

export const metadata = {
  title: 'Tutor Marketplace',
  description: 'Connect with tutors worldwide.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

