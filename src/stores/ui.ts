import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { throttle } from '@/utils/helpers'
// ...existing code...

export const useUIStore = defineStore('ui', () => {
  // State
  const isMenuOpen = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const scrollY = ref<number>(0)
  const windowWidth = ref<number>(0)
  const windowHeight = ref<number>(0)
  const isScrolled = ref<boolean>(false)

  // Getters
  const isMobile = computed(() => windowWidth.value < 768)
  const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
  const isDesktop = computed(() => windowWidth.value >= 1024)
  
  const scrollProgress = computed(() => {
    if (typeof document === 'undefined') return 0
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    return documentHeight > 0 ? (scrollY.value / documentHeight) * 100 : 0
  })

  const deviceType = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  // Actions
  const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value
    
    // Prevent body scroll when menu is open on mobile
    if (typeof document !== 'undefined') {
      if (isMenuOpen.value && isMobile.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }

  const closeMenu = (): void => {
    isMenuOpen.value = false
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const openMenu = (): void => {
    isMenuOpen.value = true
    if (typeof document !== 'undefined' && isMobile.value) {
      document.body.style.overflow = 'hidden'
    }
  }

  const setLoading = (loading: boolean): void => {
    isLoading.value = loading
  }

  const updateScrollPosition = throttle((position: number): void => {
    scrollY.value = position
    isScrolled.value = position > 50
  }, 16) // ~60fps

  const updateWindowSize = throttle((): void => {
    if (typeof window !== 'undefined') {
      windowWidth.value = window.innerWidth
      windowHeight.value = window.innerHeight
    }
  }, 100)

  const initializeUI = (): void => {
    if (typeof window === 'undefined') return

    // Set initial window size
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight

    // Set initial scroll position
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > 50

    // Add event listeners
    window.addEventListener('scroll', () => {
      updateScrollPosition(window.scrollY)
    }, { passive: true })

    window.addEventListener('resize', updateWindowSize, { passive: true })

    // Close menu when clicking outside or pressing escape
    document.addEventListener('click', (e) => {
      const target = e.target as Element
      if (isMenuOpen.value && !target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
        closeMenu()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen.value) {
        closeMenu()
      }
    })
  }

  const cleanup = (): void => {
    if (typeof window === 'undefined') return
    
    // Remove event listeners
    window.removeEventListener('scroll', () => updateScrollPosition(window.scrollY))
    window.removeEventListener('resize', updateWindowSize)
    
    // Reset body overflow
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  return {
    // State
    isMenuOpen,
    isLoading,
    scrollY,
    windowWidth,
    windowHeight,
    isScrolled,
    
    // Getters
    isMobile,
    isTablet,
    isDesktop,
    scrollProgress,
    deviceType,
    
    // Actions
    toggleMenu,
    closeMenu,
    openMenu,
    setLoading,
    updateScrollPosition,
    updateWindowSize,
    initializeUI,
    cleanup
  }
})