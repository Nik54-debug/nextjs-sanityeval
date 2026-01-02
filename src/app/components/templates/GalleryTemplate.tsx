import GalleryDisplay from '@/app/components/GalleryDisplay'
import { urlFor } from '@/sanity/image'

export default function GalleryTemplate({ page }: { page: any }) {
  // Process gallery images
  const galleryImages = page.gallery?.map((img: any) => ({
    url: img.asset
      ? urlFor(img)
          .width(1200)
          .height(675)
          .quality(80)
          .auto('format')
          .url()
      : '',
    alt: img.alt || '',
    caption: img.caption || '',
  })).filter((img: any) => img.url) || [];

  const displayStyle = page.galleryLayout || 'grid'

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {page.galleryHeading || page.title}
        </h1>
      </div>

      {/* Gallery */}
      {galleryImages.length > 0 ? (
        <GalleryDisplay
          images={galleryImages}
          displayStyle={displayStyle}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No images in this gallery yet.
          </p>
        </div>
      )}
    </main>
  )
}