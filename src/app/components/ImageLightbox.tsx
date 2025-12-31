'use client'

import { useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
  url: string
  alt: string
  caption?: string
}

export default function ImageLightbox({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 hover:opacity-80 transition-opacity cursor-pointer"
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

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:opacity-70 z-10"
            aria-label="Close"
          >
            ×
          </button>

          {/* Previous Button */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              className="absolute left-4 text-white text-4xl hover:opacity-70 z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              className="absolute right-4 text-white text-4xl hover:opacity-70 z-10"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Image Container */}
          <div className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <div className="relative max-h-[80vh]">
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt || `Gallery image ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Caption and Counter */}
            <div className="mt-4 text-center">
              {images[selectedImage].caption && (
                <p className="text-white text-lg mb-2">
                  {images[selectedImage].caption}
                </p>
              )}
              <p className="text-white text-sm opacity-70">
                {selectedImage + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}