'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BackButton({ fallbackUrl = '/artists' }: { fallbackUrl?: string }) {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // If no history, go to fallback
      router.push(fallbackUrl)
    }
  }

  return (
    <Link
      href={fallbackUrl}
      onClick={handleBack}
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    >
      ← Back
    </Link>
  )
}