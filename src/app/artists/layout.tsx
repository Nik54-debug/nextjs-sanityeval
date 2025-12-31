import { ReactNode } from 'react'

export default function ArtistsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="artists-specific-styles">
      {/* Add artists-specific header, sidebar, or wrapper */}
      <div className="container mx-auto">
        <div className="artists-banner bg-purple-100 dark:bg-purple-900 p-4 my-8 rounded-lg">
          <h2 className="text-2xl font-bold">Artists Section</h2>
        </div>
        {children}
      </div>
    </div>
  )
}