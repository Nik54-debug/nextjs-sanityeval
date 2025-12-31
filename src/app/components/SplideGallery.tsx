'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'
import Image from 'next/image'

type GalleryImage = {
  url: string
  alt: string
  caption?: string
}

export default function SplideGallery({ images }: { images: GalleryImage[] }) {
  if (!images || images.length === 0) return null

  return (
    <Splide
      options={{
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        arrows: true,
        pagination: true,
        autoplay: false,
        keyboard: true,
        drag: true,
      }}
      aria-label="Image Gallery"
    >
      {images.map((image, index) => (
        <SplideSlide key={index}>
          <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
              priority={index === 0}
            />
          </div>
          {image.caption && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              {image.caption}
            </p>
          )}
        </SplideSlide>
      ))}
    </Splide>
  )
}