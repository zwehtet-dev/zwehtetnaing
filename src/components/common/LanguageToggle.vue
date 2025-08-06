<template>
  <div class="language-toggle">
    <!-- Desktop Version -->
    <div class="hidden md:block">
      <Menu as="div" class="relative">
        <MenuButton
          class="language-button focus-ring"
          :aria-label="$t('common.language')"
          :title="$t('common.language')"
        >
          <div class="button-content">
            <span class="flag">{{ currentLanguageFlag }}</span>
            <span class="language-name">{{ currentLanguageName }}</span>
            <Icon 
              icon="ph:caret-down-bold" 
              class="caret-icon"
              :class="{ 'rotate-180': isOpen }"
            />
          </div>
        </MenuButton>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems class="language-menu">
            <MenuItem
              v-for="lang in availableLanguages"
              :key="lang"
              v-slot="{ active }"
            >
              <button
                @click="handleLanguageChange(lang)"
                class="language-option"
                :class="{ 
                  'active': active,
                  'selected': currentLanguage === lang
                }"
              >
                <span class="flag">{{ getLanguageFlag(lang) }}</span>
                <span class="language-name">{{ getLanguageName(lang) }}</span>
                <Icon 
                  v-if="currentLanguage === lang"
                  icon="ph:check-bold"
                  class="check-icon"
                />
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>

    <!-- Mobile Version -->
    <div class="md:hidden">
      <button
        @click="handleToggle"
        class="mobile-language-button focus-ring"
        :aria-label="$t('common.language')"
        :title="$t('common.language')"
      >
        <span class="flag">{{ currentLanguageFlag }}</span>
        <span class="sr-only">{{ currentLanguageName }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import { useLanguage } from '@/composables/useLanguage'
import { setI18nLanguage, LOCALE_INFO } from '@/i18n'
import type { MessageLanguages } from '@/i18n'

// Language store
const {
  currentLanguage,
  availableLanguages,
  switchLanguage: storeSwitchLanguage
} = useLanguage()

// State
const isOpen = ref(false)

// Computed
const currentLanguageName = computed(() => {
  const lang = currentLanguage as unknown as keyof typeof LOCALE_INFO
  return LOCALE_INFO[lang]?.nativeName || 'Language'
})

const currentLanguageFlag = computed(() => {
  const lang = currentLanguage as unknown as keyof typeof LOCALE_INFO
  return LOCALE_INFO[lang]?.flag || '?'
})

// Methods
const handleLanguageChange = (lang: MessageLanguages): void => {
  if (lang === (currentLanguage as unknown as MessageLanguages)) return
  
  // Update store and i18n
  storeSwitchLanguage(lang)
  setI18nLanguage(lang)
  
  // Dispatch custom event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('language-changed', {
      detail: { language: lang }
    }))
  }
}

const handleToggle = (): void => {
  const nextLanguage = (currentLanguage as unknown as MessageLanguages) === 'en' ? 'my' : 'en'
  handleLanguageChange(nextLanguage)
}

const getLanguageName = (lang: MessageLanguages): string => {
  return LOCALE_INFO[lang].nativeName
}

const getLanguageFlag = (lang: MessageLanguages): string => {
  return LOCALE_INFO[lang].flag
}
</script>

<style scoped>
.language-toggle {
  @apply relative;
}

/* Desktop Button */
.language-button {
  @apply inline-flex items-center px-3 py-2 rounded-lg;
  @apply bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700;
  @apply border border-secondary-200 dark:border-secondary-700;
  @apply transition-all duration-200 ease-out;
  @apply text-sm font-medium;
  color: var(--color-text-primary);
}

.button-content {
  @apply flex items-center space-x-2;
}

.flag {
  @apply text-base leading-none;
}

.language-name {
  @apply text-sm font-medium;
  color: var(--color-text-primary);
}

.caret-icon {
  @apply w-4 h-4 transition-transform duration-200;
  color: var(--color-text-secondary);
}

/* Mobile Button */
.mobile-language-button {
  @apply inline-flex items-center justify-center w-10 h-10 rounded-full;
  @apply bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700;
  @apply border border-secondary-200 dark:border-secondary-700;
  @apply transition-all duration-200 ease-out;
  @apply transform hover:scale-105 active:scale-95;
}

/* Dropdown Menu */
.language-menu {
  @apply absolute right-0 mt-2 w-48 origin-top-right;
  @apply bg-white dark:bg-secondary-800 rounded-lg shadow-lg;
  @apply border border-secondary-200 dark:border-secondary-700;
  @apply py-1 z-50;
  background-color: var(--color-surface-elevated);
  border-color: var(--color-border);
  box-shadow: var(--shadow-lg);
}

.language-option {
  @apply flex items-center w-full px-4 py-2 text-left;
  @apply transition-colors duration-150;
  @apply space-x-3;
  color: var(--color-text-primary);
}

.language-option:hover,
.language-option.active {
  background-color: var(--color-surface);
}

.language-option.selected {
  @apply font-medium;
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.language-option .language-name {
  @apply flex-1 text-sm;
}

.check-icon {
  @apply w-4 h-4;
  color: var(--color-primary);
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-secondary-900;
}

/* Animations */
.language-button:hover .caret-icon {
  @apply transform rotate-180;
}

.mobile-language-button:hover .flag {
  @apply transform scale-110;
}

/* Screen Reader Only */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .language-button,
  .mobile-language-button,
  .caret-icon,
  .language-option {
    transition: none !important;
  }
  
  .mobile-language-button:hover,
  .language-button:hover .caret-icon,
  .mobile-language-button:hover .flag {
    transform: none !important;
  }
}
</style>