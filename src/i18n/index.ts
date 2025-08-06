import { createI18n } from 'vue-i18n'
import { getBrowserLanguage } from '@/utils/helpers'

// Import translations
import en from '@/locales/en.json'
import my from '@/locales/my.json'

// Type definitions for better TypeScript support
export type MessageLanguages = 'en' | 'my'
export type MessageSchema = typeof en

// Available locales
export const SUPPORTED_LOCALES: MessageLanguages[] = ['en', 'my']

// Default locale
export const DEFAULT_LOCALE: MessageLanguages = 'en'

// Fallback locale
export const FALLBACK_LOCALE: MessageLanguages = 'en'

// Get initial locale
function getInitialLocale(): MessageLanguages {
  // Check localStorage first
  const savedLocale = localStorage.getItem('language') as MessageLanguages | null
  if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
    return savedLocale
  }

  // Check browser language
  const browserLocale = getBrowserLanguage()
  if (SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale
  }

  // Return default
  return DEFAULT_LOCALE
}

// Create i18n instance
export const i18n = createI18n<[MessageSchema], MessageLanguages>({
  legacy: false, // Use Composition API
  locale: getInitialLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    en,
    my
  },
  globalInjection: true,
  warnHtmlMessage: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true
})

// Helper functions
export function setI18nLanguage(locale: MessageLanguages): void {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Locale ${locale} is not supported`)
    return
  }

  (i18n.global.locale as any).value = locale

  // Update document language
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }

  // Save to localStorage
  localStorage.setItem('language', locale)
}

export function getCurrentLocale(): MessageLanguages {
  return (i18n.global.locale as any).value
}

export function isLocaleSupported(locale: string): locale is MessageLanguages {
  return SUPPORTED_LOCALES.includes(locale as MessageLanguages)
}

// Locale information
export const LOCALE_INFO = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '??º??¸',
    dir: 'ltr'
  },
  my: {
    name: 'Myanmar',
    nativeName: 'á€™á€¼á€”á€ºá€™á€¬',
    flag: '??²??²',
    dir: 'ltr'
  }
} as const

export default i18n