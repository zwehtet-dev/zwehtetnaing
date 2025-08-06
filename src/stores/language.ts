import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getBrowserLanguage } from '@/utils/helpers'
// ...existing code...

export const useLanguageStore = defineStore('language', () => {
  // State
  const currentLanguage = ref<'en' | 'my'>('en')
  const availableLanguages = ref<('en' | 'my')[]>(['en', 'my'])
  const isInitialized = ref<boolean>(false)

  // Getters
  const languageNames = computed(() => ({
    en: 'English',
    my: 'á€™á€¼á€”á€ºá€™á€¬'
  }))

  const languageFlags = computed(() => ({
    en: '??º??¸',
    my: '??²??²'
  }))

  const currentLanguageName = computed(() => 
    languageNames.value[currentLanguage.value]
  )

  const currentLanguageFlag = computed(() => 
    languageFlags.value[currentLanguage.value]
  )

  const isRTL = computed(() => false) // Neither English nor Burmese are RTL

  // Actions
  const initLanguage = (): void => {
    if (isInitialized.value) return

    try {
      // Get saved language from localStorage or use browser preference
      const savedLanguage = localStorage.getItem('language') as 'en' | 'my' | null
      const browserLanguage = getBrowserLanguage()
      
      // Ensure we always have a valid language
      const validLanguage = savedLanguage && ['en', 'my'].includes(savedLanguage) 
        ? savedLanguage 
        : browserLanguage || 'en'
      
      currentLanguage.value = validLanguage as 'en' | 'my'
      localStorage.setItem('language', currentLanguage.value)
      
      // Set document language attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLanguage.value
      }
    } catch (error) {
      console.warn('Failed to initialize language, using default:', error)
      currentLanguage.value = 'en'
    }
    
    isInitialized.value = true
  }

  const switchLanguage = (lang: 'en' | 'my'): void => {
    if (!availableLanguages.value.includes(lang) || lang === currentLanguage.value) {
      return
    }
    
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
    
    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
    
    // Dispatch custom event for language change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('language-changed', {
        detail: { language: lang }
      }))
    }
  }

  const getLanguageName = (lang: 'en' | 'my'): string => {
    return languageNames.value[lang] || lang
  }

  const getLanguageFlag = (lang: 'en' | 'my'): string => {
    return languageFlags.value[lang] || '?Œ'
  }

  const toggleLanguage = (): void => {
    const nextLanguage = currentLanguage.value === 'en' ? 'my' : 'en'
    switchLanguage(nextLanguage)
  }

  return {
    // State
    currentLanguage,
    availableLanguages,
    isInitialized,
    
    // Getters
    languageNames,
    languageFlags,
    currentLanguageName,
    currentLanguageFlag,
    isRTL,
    
    // Actions
    initLanguage,
    switchLanguage,
    toggleLanguage,
    getLanguageName,
    getLanguageFlag
  }
})