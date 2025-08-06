import { ref, onMounted, onUnmounted } from 'vue'

export interface MicroInteractionOptions {
  duration?: number
  easing?: string
  scale?: number
  rotation?: number
  translateX?: number
  translateY?: number
  opacity?: number
}

export function useMicroInteractions() {
  const prefersReducedMotion = ref(false)
  const isHovering = ref(false)
  const isPressed = ref(false)
  const isFocused = ref(false)

  // Check for reduced motion preference
  const checkReducedMotion = (): void => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }

  // Hover interactions
  const createHoverEffect = (
    element: HTMLElement,
    options: MicroInteractionOptions = {}
  ): (() => void) => {
    if (prefersReducedMotion.value) return () => {}

    const {
      duration = 200,
      easing = 'ease-out',
      scale = 1.05,
      rotation = 0,
      translateX = 0,
      translateY = 0,
      opacity = 1
    } = options

    const originalTransform = element.style.transform
    const originalOpacity = element.style.opacity
    const originalTransition = element.style.transition

    const handleMouseEnter = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transition = `all ${duration}ms ${easing}`
      element.style.transform = `scale(${scale}) rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`
      element.style.opacity = opacity.toString()
      isHovering.value = true
    }

    const handleMouseLeave = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transform = originalTransform
      element.style.opacity = originalOpacity
      isHovering.value = false
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.style.transform = originalTransform
      element.style.opacity = originalOpacity
      element.style.transition = originalTransition
    }
  }

  // Press/click interactions
  const createPressEffect = (
    element: HTMLElement,
    options: MicroInteractionOptions = {}
  ): (() => void) => {
    if (prefersReducedMotion.value) return () => {}

    const {
      duration = 150,
      easing = 'ease-out',
      scale = 0.95
    } = options

    const handleMouseDown = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transition = `transform ${duration}ms ${easing}`
      element.style.transform = `scale(${scale})`
      isPressed.value = true
    }

    const handleMouseUp = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transform = ''
      isPressed.value = false
    }

    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('mouseleave', handleMouseUp)

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('mouseleave', handleMouseUp)
    }
  }

  // Focus interactions
  const createFocusEffect = (
    element: HTMLElement,
    options: MicroInteractionOptions = {}
  ): (() => void) => {
    if (prefersReducedMotion.value) return () => {}

    const {
      duration = 200,
      easing = 'ease-out',
      scale = 1.02
    } = options

    const handleFocus = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transition = `transform ${duration}ms ${easing}`
      element.style.transform = `scale(${scale})`
      isFocused.value = true
    }

    const handleBlur = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transform = ''
      isFocused.value = false
    }

    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    return () => {
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }

  // Ripple effect for buttons
  const createRippleEffect = (element: HTMLElement): (() => void) => {
    if (prefersReducedMotion.value) return () => {}

    const handleClick = (event: MouseEvent): void => {
      if (prefersReducedMotion.value) return

      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms ease-out;
        pointer-events: none;
        z-index: 1;
      `

      // Add ripple animation keyframes if not already added
      if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style')
        style.id = 'ripple-styles'
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `
        document.head.appendChild(style)
      }

      element.style.position = 'relative'
      element.style.overflow = 'hidden'
      element.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    element.addEventListener('click', handleClick)

    return () => {
      element.removeEventListener('click', handleClick)
    }
  }

  // Magnetic effect (element follows cursor)
  const createMagneticEffect = (
    element: HTMLElement,
    strength = 0.3
  ): (() => void) => {
    if (prefersReducedMotion.value) return () => {}

    const handleMouseMove = (event: MouseEvent): void => {
      if (prefersReducedMotion.value) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (event.clientX - centerX) * strength
      const deltaY = (event.clientY - centerY) * strength

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = (): void => {
      if (prefersReducedMotion.value) return
      
      element.style.transform = ''
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  // Parallax effect
  const createParallaxEffect = (
    element: HTMLElement,
    speed = 0.5
  ): (() => void) => {
    if (prefersReducedMotion.value) return () => {}

    const handleScroll = (): void => {
      if (prefersReducedMotion.value) return

      const rect = element.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * -speed

      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        element.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  // Auto-apply interactions based on data attributes
  const autoApplyInteractions = (): void => {
    const elements = document.querySelectorAll('[data-interaction]')
    
    elements.forEach((el) => {
      const element = el as HTMLElement
      const interactions = element.dataset.interaction?.split(' ') || []
      
      interactions.forEach((interaction) => {
        switch (interaction) {
          case 'hover':
            createHoverEffect(element)
            break
          case 'press':
            createPressEffect(element)
            break
          case 'focus':
            createFocusEffect(element)
            break
          case 'ripple':
            createRippleEffect(element)
            break
          case 'magnetic':
            createMagneticEffect(element)
            break
          case 'parallax':
            createParallaxEffect(element)
            break
        }
      })
    })
  }

  onMounted(() => {
    checkReducedMotion()
    
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)
    
    // Auto-apply interactions
    autoApplyInteractions()
  })

  onUnmounted(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.removeEventListener('change', checkReducedMotion)
  })

  return {
    prefersReducedMotion,
    isHovering,
    isPressed,
    isFocused,
    createHoverEffect,
    createPressEffect,
    createFocusEffect,
    createRippleEffect,
    createMagneticEffect,
    createParallaxEffect,
    autoApplyInteractions
  }
}