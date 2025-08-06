import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getSystemTheme } from '@/utils/helpers'
// ...existing code...

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref<boolean>(false)
  const systemPreference = ref<'light' | 'dark'>('light')
  const isInitialized = ref<boolean>(false)

  // Getters
  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')
  const isSystemTheme = computed(() => !localStorage.getItem('theme'))
  
  const themeIcon = computed(() => isDark.value ? 'ph:sun-bold' : 'ph:moon-bold')
  const themeLabel = computed(() => isDark.value ? 'Light Mode' : 'Dark Mode')

  // Actions
  const initTheme = (): void => {
    if (isInitialized.value) return

    // Get system preference
    systemPreference.value = getSystemTheme()
    
    // Get saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = systemPreference.value === 'dark'
    }
    
    applyTheme()
    setupSystemThemeListener()
    isInitialized.value = true
  }

  const toggleTheme = (): void => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', currentTheme.value)
    applyTheme()
    
    // Dispatch custom event for theme change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('theme-changed', {
        detail: { theme: currentTheme.value }
      }))
    }
  }

  const setTheme = (theme: 'light' | 'dark'): void => {
    if (theme === currentTheme.value) return
    
    isDark.value = theme === 'dark'
    localStorage.setItem('theme', theme)
    applyTheme()
    
    // Dispatch custom event for theme change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('theme-changed', {
        detail: { theme }
      }))
    }
  }

  const resetToSystemTheme = (): void => {
    localStorage.removeItem('theme')
    isDark.value = systemPreference.value === 'dark'
    applyTheme()
  }

  const applyTheme = (): void => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const body = document.body

    if (isDark.value) {
      root.classList.add('dark')
      body.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      body.style.colorScheme = 'light'
    }

    // Update meta theme-color for mobile browsers
    updateMetaThemeColor()
  }

  const updateMetaThemeColor = (): void => {
    if (typeof document === 'undefined') return

    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      document.head.appendChild(metaThemeColor)
    }

    const color = isDark.value ? '#0f172a' : '#ffffff'
    metaThemeColor.setAttribute('content', color)
  }

  const setupSystemThemeListener = (): void => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      systemPreference.value = e.matches ? 'dark' : 'light'
      
      // Only update theme if user hasn't set a preference
      if (isSystemTheme.value) {
        isDark.value = e.matches
        applyTheme()
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    // Cleanup function (though not used in this context)
    // return () => {
    //   mediaQuery.removeEventListener('change', handleSystemThemeChange)
    // }
  }

  // Watch for theme changes and apply them
  watch(isDark, () => {
    if (isInitialized.value) {
      applyTheme()
    }
  }, { immediate: false })

  return {
    // State
    isDark,
    systemPreference,
    isInitialized,
    
    // Getters
    currentTheme,
    isSystemTheme,
    themeIcon,
    themeLabel,
    
    // Actions
    initTheme,
    toggleTheme,
    setTheme,
    resetToSystemTheme,
    applyTheme
  }
})