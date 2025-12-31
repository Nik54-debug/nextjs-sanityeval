'use client'

import Image from 'next/image'
import { useState } from 'react'

type GalleryImage = {
  url: string
  alt: string
  caption?: string
}

export default function ImageGrid({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 hover:opacity-80 transition-opacity"
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* Simple lightbox on click */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            ×
          </button>
          <Image
            src={images[selectedImage].url}
            alt={images[selectedImage].alt}
            width={1200}
            height={800}
            className="object-contain max-h-[90vh]"
          />
        </div>
      )}
    </>
  )
}