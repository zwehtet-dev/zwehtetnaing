import { ref, onMounted, onUnmounted } from 'vue'
// ...existing code...
import type { AnimationOptions } from '@/types'

export function useScrollAnimation(options: AnimationOptions = {}) {
  const {
    threshold = 0.1,
    duration = 600,
    delay = 0,
    easing = 'ease-out'
  } = options

  const observedElements = ref<Map<Element, IntersectionObserverEntry>>(new Map())
  const observer = ref<IntersectionObserver | null>(null)

  const initObserver = (): void => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observedElements.value.set(entry.target, entry)
          
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            
            // Add animation delay if specified
            if (delay > 0) {
              setTimeout(() => {
                element.classList.add('in-view')
              }, delay)
            } else {
              element.classList.add('in-view')
            }
            
            // Unobserve after animation to improve performance
            observer.value?.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )
  }

  const observeElement = (element: Element): void => {
    if (!observer.value || !element) return
    
    // Add initial animation class
    const htmlElement = element as HTMLElement
    htmlElement.classList.add('animate-on-scroll')
    
    // Set custom animation properties if provided
    if (duration !== 600) {
      htmlElement.style.transitionDuration = `${duration}ms`
    }
    if (easing !== 'ease-out') {
      htmlElement.style.transitionTimingFunction = easing
    }
    
    observer.value.observe(element)
  }

  const unobserveElement = (element: Element): void => {
    if (!observer.value || !element) return
    observer.value.unobserve(element)
    observedElements.value.delete(element)
  }

  const observeElements = (selector: string): void => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element, index) => {
      // Stagger animations for multiple elements
      const staggerDelay = delay + (index * 100)
      setTimeout(() => {
        observeElement(element)
      }, staggerDelay)
    })
  }

  const cleanup = (): void => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
    observedElements.value.clear()
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    observeElement,
    unobserveElement,
    observeElements,
    cleanup,
    observedElements: observedElements.value
  }
}