// ...existing code...
import { useLanguageStore } from '@/stores/language'
import { setI18nLanguage } from '@/i18n'
import type { MessageLanguages } from '@/i18n'

export function useLanguage() {
  const store = useLanguageStore()

  // Sync i18n locale with store
  const switchLanguage = (lang: MessageLanguages): void => {
    store.switchLanguage(lang)
    setI18nLanguage(lang)
  }

  return {
    ...store,
    switchLanguage
  }
}