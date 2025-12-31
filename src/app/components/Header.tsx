import Link from 'next/link'
import MainMenu from './MainMenu'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <MainMenu />
      </div>
    </header>
  )
}