import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/utils/helpers'

export interface SmoothScrollOptions {
  duration?: number
  easing?: 'linear' | 'easeInOut' | 'easeOut' | 'easeIn'
  offset?: number
}

export function useSmoothScroll() {
  const isScrolling = ref(false)
  const scrollY = ref(0)
  const showScrollTop = ref(false)

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t: number) => t * (2 - t),
    easeIn: (t: number) => t * t
  }

  const updateScrollY = throttle(() => {
    scrollY.value = window.scrollY
    showScrollTop.value = window.scrollY > 300
  }, 16)

  const scrollTo = (
    target: string | number | Element,
    options: SmoothScrollOptions = {}
  ): Promise<void> => {
    return new Promise((resolve) => {
      const {
        duration = 800,
        easing = 'easeInOut',
        offset = 0
      } = options

      let targetY: number

      if (typeof target === 'number') {
        targetY = target
      } else if (typeof target === 'string') {
        const element = document.querySelector(target)
        if (!element) {
          console.warn(`Element with selector "${target}" not found`)
          resolve()
          return
        }
        targetY = element.getBoundingClientRect().top + window.scrollY - offset
      } else if (target instanceof Element) {
        targetY = target.getBoundingClientRect().top + window.scrollY - offset
      } else {
        resolve()
        return
      }

      const startY = window.scrollY
      const distance = targetY - startY
      const startTime = performance.now()

      if (Math.abs(distance) < 1) {
        resolve()
        return
      }

      isScrolling.value = true

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easingFunctions[easing](progress)
        const currentY = startY + (distance * easedProgress)

        window.scrollTo(0, currentY)

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          isScrolling.value = false
          resolve()
        }
      }

      requestAnimationFrame(animateScroll)
    })
  }

  const scrollToTop = (options?: SmoothScrollOptions): Promise<void> => {
    return scrollTo(0, { duration: 600, easing: 'easeOut', ...options })
  }

  const scrollToElement = (
    selector: string,
    options?: SmoothScrollOptions
  ): Promise<void> => {
    return scrollTo(selector, { offset: 80, ...options })
  }

  const scrollToSection = (sectionId: string): Promise<void> => {
    const selector = sectionId.startsWith('#') ? sectionId : `#${sectionId}`
    return scrollToElement(selector, { offset: 100 })
  }

  // Navigation helper for header links
  const handleNavClick = (event: Event, href: string): void => {
    if (href.startsWith('#')) {
      event.preventDefault()
      scrollToSection(href)
    }
  }

  onMounted(() => {
    updateScrollY()
    window.addEventListener('scroll', updateScrollY, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollY)
  })

  return {
    isScrolling,
    scrollY,
    showScrollTop,
    scrollTo,
    scrollToTop,
    scrollToElement,
    scrollToSection,
    handleNavClick
  }
}