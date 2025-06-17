// src/app/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LoginModal from './LoginModal'
// import SignupModal from './SignupModal' // if you create a separate one

export default function Navbar() {
  const path = usePathname()
  const [loginOpen, setLoginOpen] = useState(false)
  // const [signupOpen, setSignupOpen] = useState(false)

  const links = [
    { href: '/',               label: 'Home' },
    { href: '/marketplace',    label: 'Find a teacher' },
    { href: '/group-class',    label: 'Group class' },
    { href: '/community',      label: 'Community' },
    { href: '/become-teacher', label: 'Become a teacher' },
  ]

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold">YourLogo</span>
          </Link>
          <ul className="hidden md:flex space-x-6 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:text-red-500 ${
                    path === link.href
                      ? 'text-red-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 text-sm hover:text-red-500"
            >
              Log in
            </button>
            <button
              onClick={() => setLoginOpen(true)} // or setSignupOpen(true)
              className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      {/* <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} /> */}
    </>
  )
}
