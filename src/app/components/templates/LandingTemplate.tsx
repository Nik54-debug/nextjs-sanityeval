import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/image'

export default function LandingTemplate({ page }: { page: any }) {
  const heroImageUrl = page.heroImage?.asset
    ? urlFor(page.heroImage).width(1920).height(1080).quality(80).url()
    : null

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={
          heroImageUrl
            ? {
                backgroundImage: `url(${heroImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { backgroundColor: '#1a1a1a' }
        }
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          {page.heroHeading && (
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {page.heroHeading}
            </h1>
          )}
          {page.heroSubheading && (
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {page.heroSubheading}
            </p>
          )}
          {page.ctaButton?.text && page.ctaButton?.link && (
            <Link
              href={page.ctaButton.link}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              {page.ctaButton.text}
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      {page.features && page.features.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {page.features.map((feature: any, index: number) => (
                <div key={index} className="text-center">
                  {feature.icon && (
                    <div className="text-6xl mb-4">{feature.icon}</div>
                  )}
                  {feature.heading && (
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {feature.heading}
                    </h3>
                  )}
                  {feature.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}