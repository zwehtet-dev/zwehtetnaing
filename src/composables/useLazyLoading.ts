import { ref, onMounted, onUnmounted } from 'vue'

export interface LazyLoadOptions {
  threshold?: number
  rootMargin?: string
  placeholder?: string
  errorImage?: string
  fadeInDuration?: number
}

export function useLazyLoading(options: LazyLoadOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2NjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
    errorImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+',
    fadeInDuration = 300
  } = options

  const observer = ref<IntersectionObserver | null>(null)
  const loadedImages = ref<Set<string>>(new Set())
  const errorImages = ref<Set<string>>(new Set())

  const initObserver = (): void => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            loadImage(img)
            observer.value?.unobserve(img)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )
  }

  const loadImage = (img: HTMLImageElement): void => {
    const src = img.dataset.src
    if (!src) return

    // Create a new image to preload
    const imageLoader = new Image()
    
    imageLoader.onload = () => {
      // Image loaded successfully
      img.src = src
      img.classList.add('lazy-loaded')
      loadedImages.value.add(src)
      
      // Add fade-in animation
      if (fadeInDuration > 0) {
        img.style.transition = `opacity ${fadeInDuration}ms ease-in-out`
        img.style.opacity = '0'
        
        // Trigger fade-in
        requestAnimationFrame(() => {
          img.style.opacity = '1'
        })
      }
    }
    
    imageLoader.onerror = () => {
      // Image failed to load
      img.src = errorImage
      img.classList.add('lazy-error')
      errorImages.value.add(src)
    }
    
    imageLoader.src = src
  }

  const observeImage = (img: HTMLImageElement): void => {
    if (!observer.value || !img.dataset.src) return
    
    // Set placeholder while loading
    if (!img.src || img.src === img.dataset.src) {
      img.src = placeholder
      img.classList.add('lazy-loading')
    }
    
    observer.value.observe(img)
  }

  const observeImages = (selector = '[data-src]'): void => {
    const images = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>
    images.forEach(observeImage)
  }

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedImages.value.has(src)) {
        resolve()
        return
      }

      const img = new Image()
      img.onload = () => {
        loadedImages.value.add(src)
        resolve()
      }
      img.onerror = reject
      img.src = src
    })
  }

  const preloadImages = (sources: string[]): Promise<void[]> => {
    return Promise.all(sources.map(preloadImage))
  }

  const cleanup = (): void => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    observeImage,
    observeImages,
    preloadImage,
    preloadImages,
    loadedImages,
    errorImages,
    cleanup
  }
}

// Utility function to generate responsive image sources
export function generateResponsiveImageSources(
  basePath: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  const srcSet = sizes
    .map(size => `${basePath}?w=${size} ${size}w`)
    .join(', ')
  
  return srcSet
}

// Utility function to get optimal image format
export function getOptimalImageFormat(): 'webp' | 'avif' | 'jpg' {
  if (typeof window === 'undefined') return 'jpg'
  
  // Check for AVIF support
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  try {
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif'
    }
  } catch (e) {
    // AVIF not supported
  }
  
  // Check for WebP support
  try {
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp'
    }
  } catch (e) {
    // WebP not supported
  }
  
  return 'jpg'
}