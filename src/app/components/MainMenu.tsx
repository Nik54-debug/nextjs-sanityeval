'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainMenu() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about-me', label: 'About Me' },
    { href: '/events', label: 'Events' },
    { href: '/artists', label: 'Artists' },
  ]

  return (
    <ul className="flex gap-8">
      {links.map((link) => {
        // Check if current page matches this link
        const isActive = pathname === link.href || 
          (link.href !== '/' && pathname.startsWith(link.href))
        
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition-colors ${
                isActive
                  ? 'text-gray-900 dark:text-white font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}