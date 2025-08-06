import { ref, onMounted, onUnmounted } from 'vue'

export interface AccessibilityOptions {
  announcePageChanges?: boolean
  trapFocus?: boolean
  skipLinks?: boolean
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    skipLinks = true
  } = options

  const isScreenReaderActive = ref(false)
  const currentFocusedElement = ref<HTMLElement | null>(null)

  // Detect if screen reader is active
  const detectScreenReader = (): void => {
    // Check for common screen reader indicators
    const hasScreenReaderClass = document.body.classList.contains('sr-only') ||
                                 document.body.classList.contains('screen-reader-text')
    
    // Check for high contrast mode (often used with screen readers)
    const hasHighContrast = window.matchMedia('(prefers-contrast: high)').matches
    
    // Check for reduced motion (often used with assistive technologies)
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    isScreenReaderActive.value = hasScreenReaderClass || hasHighContrast || hasReducedMotion
  }

  // Announce content to screen readers
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Get all focusable elements
  const getFocusableElements = (container: HTMLElement = document.body): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ')
    
    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
  }

  // Trap focus within a container
  const trapFocusInContainer = (container: HTMLElement): (() => void) => {
    const focusableEls = getFocusableElements(container)
    const firstFocusable = focusableEls[0]
    const lastFocusable = focusableEls[focusableEls.length - 1]

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable?.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable?.focus()
          }
        }
      }
      
      // Escape key to close
      if (e.key === 'Escape') {
        const closeButton = container.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement
        if (closeButton) {
          closeButton.click()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    
    // Focus first element
    firstFocusable?.focus()

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }

  // Manage focus for modals and overlays
  const manageFocus = (element: HTMLElement, shouldTrap = true): (() => void) => {
    const previouslyFocused = document.activeElement as HTMLElement
    
    if (shouldTrap) {
      const cleanup = trapFocusInContainer(element)
      
      return () => {
        cleanup()
        // Return focus to previously focused element
        if (previouslyFocused && previouslyFocused.focus) {
          previouslyFocused.focus()
        }
      }
    } else {
      // Just focus the element
      element.focus()
      
      return () => {
        if (previouslyFocused && previouslyFocused.focus) {
          previouslyFocused.focus()
        }
      }
    }
  }

  // Add skip links
  const addSkipLinks = (): void => {
    if (!skipLinks) return

    const skipLinksContainer = document.createElement('div')
    skipLinksContainer.className = 'skip-links'
    skipLinksContainer.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#footer" class="skip-link">Skip to footer</a>
    `
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild)
  }

  // Add skip link styles
  const addSkipLinkStyles = (): void => {
    const style = document.createElement('style')
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 1000;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        z-index: 1001;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
    `
    document.head.appendChild(style)
  }

  // Check color contrast
  const checkColorContrast = (foreground: string, background: string): number => {
    // Convert colors to RGB
    const getRGB = (color: string): [number, number, number] => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
      return [r, g, b]
    }

    // Calculate relative luminance
    const getLuminance = ([r, g, b]: [number, number, number]): number => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const fgLuminance = getLuminance(getRGB(foreground))
    const bgLuminance = getLuminance(getRGB(background))
    
    const lighter = Math.max(fgLuminance, bgLuminance)
    const darker = Math.min(fgLuminance, bgLuminance)
    
    return (lighter + 0.05) / (darker + 0.05)
  }

  // Keyboard navigation helpers
  const handleArrowNavigation = (
    elements: HTMLElement[],
    currentIndex: number,
    direction: 'up' | 'down' | 'left' | 'right'
  ): number => {
    let newIndex = currentIndex
    
    switch (direction) {
      case 'up':
      case 'left':
        newIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
        break
      case 'down':
      case 'right':
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
        break
    }
    
    elements[newIndex]?.focus()
    return newIndex
  }

  // Add ARIA labels dynamically
  const addAriaLabel = (element: HTMLElement, label: string): void => {
    element.setAttribute('aria-label', label)
  }

  const addAriaDescribedBy = (element: HTMLElement, describedById: string): void => {
    element.setAttribute('aria-describedby', describedById)
  }

  // Initialize accessibility features
  const initializeAccessibility = (): void => {
    detectScreenReader()
    addSkipLinks()
    addSkipLinkStyles()
    
    // Add main content landmark if not present
    if (!document.querySelector('main')) {
      const mainContent = document.querySelector('#app') || document.body
      if (mainContent && mainContent.id !== 'main-content') {
        mainContent.setAttribute('id', 'main-content')
        mainContent.setAttribute('role', 'main')
      }
    }
    
    // Ensure all images have alt text
    const images = document.querySelectorAll('img:not([alt])')
    images.forEach(img => {
      img.setAttribute('alt', '')
    })
  }

  onMounted(() => {
    initializeAccessibility()
    
    // Listen for focus changes
    document.addEventListener('focusin', (e) => {
      currentFocusedElement.value = e.target as HTMLElement
    })
  })

  onUnmounted(() => {
    document.removeEventListener('focusin', () => {})
  })

  return {
    isScreenReaderActive,
    currentFocusedElement,
    announce,
    getFocusableElements,
    trapFocusInContainer,
    manageFocus,
    checkColorContrast,
    handleArrowNavigation,
    addAriaLabel,
    addAriaDescribedBy,
    initializeAccessibility
  }
}