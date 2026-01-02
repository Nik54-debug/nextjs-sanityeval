import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function StandardTemplate({ page }: { page: any }) {
  const imageUrl = page.featuredImage?.asset
    ? urlFor(page.featuredImage).width(1200).height(600).url()
    : null

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      {imageUrl && (
        <div className="mb-8">
          <Image
            src={imageUrl}
            alt={page.title}
            width={1200}
            height={600}
            className="rounded-lg w-full"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        {page.title}
      </h1>

      {page.content && (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={page.content} />
        </div>
      )}
    </main>
  )
}