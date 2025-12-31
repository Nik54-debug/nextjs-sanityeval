declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode } from 'react'

  export interface Options {
    type?: 'slide' | 'loop' | 'fade'
    perPage?: number
    perMove?: number
    gap?: string | number
    arrows?: boolean
    pagination?: boolean
    autoplay?: boolean
    interval?: number
    speed?: number
    pauseOnHover?: boolean
    pauseOnFocus?: boolean
    keyboard?: boolean
    drag?: boolean
    wheel?: boolean
    breakpoints?: Record<number, Partial<Options>>
    [key: string]: any
  }

  export interface SplideProps {
    options?: Options
    children?: ReactNode
    'aria-label'?: string
  }

  export const Splide: ComponentType<SplideProps>
  export const SplideSlide: ComponentType<{ children?: ReactNode }>
}

declare module '@splidejs/react-splide/css' {}
declare module '@splidejs/react-splide/css/core' {}
declare module '@splidejs/react-splide/css/skyblue' {}
declare module '@splidejs/react-splide/css/sea-green' {}