'use client'

import SplideGallery from './SplideGallery'
import ImageGrid from './ImageGrid'
import ImageLightbox from './ImageLightbox'

type GalleryImage = {
  url: string
  alt: string
  caption?: string
}

type GalleryDisplayProps = {
  images: GalleryImage[]
  displayStyle?: 'carousel' | 'grid' | 'masonry' | 'lightbox'
  title?: string
  description?: string
}

export default function GalleryDisplay({ 
  images, 
  displayStyle = 'carousel',
  title,
  description 
}: GalleryDisplayProps) {
  if (!images || images.length === 0) return null

  return (
    <div className="mt-12">
      {title && (
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
      )}
      
      {displayStyle === 'carousel' && <SplideGallery images={images} />}
      {displayStyle === 'grid' && <ImageGrid images={images} />}
      {displayStyle === 'lightbox' && <ImageLightbox images={images} />}
      {displayStyle === 'masonry' && <div>Masonry layout coming soon</div>}
    </div>
  )
}