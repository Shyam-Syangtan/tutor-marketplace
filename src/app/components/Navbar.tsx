'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginModal from './LoginModal'

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Find a teacher' },
    { href: '/group-class', label: 'Group class' },
    { href: '/community', label: 'Community' },
    { href: '/become-teacher', label: 'Become a teacher' },
  ]

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            YourLogo
          </Link>
          <ul className="hidden md:flex space-x-6 text-sm">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    path === href
                      ? 'text-red-600 font-medium'
                      : 'text-gray-700 hover:text-red-500'
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpen(true)}
            className="text-sm text-gray-700 hover:text-red-500"
          >
            Log in
          </button>
        </div>
      </nav>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
