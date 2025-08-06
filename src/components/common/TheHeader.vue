<template>
  <header 
    class="header"
    :class="{ 
      'scrolled': isScrolled,
      'menu-open': isMenuOpen 
    }"
  >
    <nav class="nav-container" role="navigation" :aria-label="$t('common.menu')">
      <div class="nav-content">
        <!-- Logo/Brand -->
        <div class="brand">
          <router-link 
            to="/" 
            class="brand-link focus-ring"
            @click="closeMenu"
          >
            <div class="brand-content">
              <div class="brand-icon">
                <Icon icon="ph:code-bold" class="w-8 h-8" />
              </div>
              <div class="brand-text">
                <span class="brand-name">{{ PERSONAL_INFO.name }}</span>
                <span class="brand-title">{{ $t('hero.title') }}</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="desktop-nav">
          <ul class="nav-links" role="menubar">
            <li 
              v-for="link in NAVIGATION_LINKS" 
              :key="link.href"
              role="none"
            >
              <a
                :href="link.href"
                class="nav-link focus-ring"
                role="menuitem"
                @click="handleNavClick"
              >
                {{ $t(link.key) }}
              </a>
            </li>
          </ul>

          <!-- Theme & Language Controls -->
          <div class="header-controls">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="mobile-controls">
          <div class="mobile-header-controls">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          
          <button
            @click="toggleMenu"
            class="mobile-menu-btn focus-ring"
            :aria-expanded="isMenuOpen"
            :aria-label="isMenuOpen ? $t('common.close') : $t('common.menu')"
          >
            <div class="hamburger" :class="{ 'active': isMenuOpen }">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        name="mobile-menu"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div v-if="isMenuOpen" class="mobile-menu">
          <div class="mobile-menu-content">
            <ul class="mobile-nav-links" role="menu">
              <li 
                v-for="(link, index) in NAVIGATION_LINKS" 
                :key="link.href"
                class="mobile-nav-item"
                :style="{ '--delay': `${index * 50}ms` }"
                role="none"
              >
                <a
                  :href="link.href"
                  class="mobile-nav-link focus-ring"
                  role="menuitem"
                  @click="handleMobileNavClick"
                >
                  {{ $t(link.key) }}
                </a>
              </li>
            </ul>

            <!-- Mobile CTA -->
            <div class="mobile-cta">
              <a
                href="#contact"
                class="btn-primary"
                @click="handleMobileNavClick"
              >
                {{ $t('hero.cta.hireMe') }}
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Mobile Menu Overlay -->
    <Transition
      name="overlay"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMenuOpen" 
        class="mobile-overlay"
        @click="closeMenu"
        aria-hidden="true"
      ></div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useUIStore } from '@/stores/ui'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { PERSONAL_INFO, NAVIGATION_LINKS } from '@/utils/constants'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

// Store
const { isMenuOpen, isScrolled, toggleMenu, closeMenu } = useUIStore()

// Composables
const { handleNavClick: smoothScrollNavClick } = useSmoothScroll()

// Methods
const handleNavClick = (event: Event): void => {
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href') || ''
  smoothScrollNavClick(event, href)
}

const handleMobileNavClick = (event: Event): void => {
  handleNavClick(event)
  closeMenu()
}

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && (isMenuOpen as any).value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.header {
  @apply fixed top-0 left-0 right-0 z-50;
  @apply transition-all duration-300 ease-out;
  background-color: color-mix(in srgb, var(--color-background) 80%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.header.scrolled {
  @apply shadow-lg;
  background-color: color-mix(in srgb, var(--color-background) 95%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border-light);
}

.nav-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.nav-content {
  @apply flex items-center justify-between h-16 lg:h-20;
}

/* Brand */
.brand-link {
  @apply flex items-center space-x-3 rounded-lg p-2 -m-2;
  @apply transition-all duration-200;
}

.brand-link:hover {
  @apply transform scale-105;
}

.brand-content {
  @apply flex items-center space-x-3;
}

.brand-icon {
  @apply flex items-center justify-center w-10 h-10 rounded-lg;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
}

.brand-text {
  @apply flex flex-col;
}

.brand-name {
  @apply text-lg font-bold leading-tight;
  color: var(--color-text-primary);
}

.brand-title {
  @apply text-xs font-medium opacity-75;
  color: var(--color-text-secondary);
}

/* Desktop Navigation */
.desktop-nav {
  @apply hidden lg:flex items-center space-x-8;
}

.nav-links {
  @apply flex items-center space-x-1;
}

.nav-link {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
  @apply relative overflow-hidden;
  color: var(--color-text-secondary);
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-surface);
}

.nav-link::before {
  @apply absolute bottom-0 left-0 w-full h-0.5;
  @apply bg-gradient-to-r from-primary-500 to-accent-500;
  @apply transform scale-x-0 transition-transform duration-300;
  content: '';
  transform-origin: center;
}

.nav-link:hover::before {
  @apply transform scale-x-100;
}

/* Header Controls */
.header-controls {
  @apply flex items-center space-x-3;
}

.mobile-controls {
  @apply flex lg:hidden items-center space-x-3;
}

.mobile-header-controls {
  @apply flex items-center space-x-2;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  @apply flex items-center justify-center w-10 h-10 rounded-lg;
  @apply transition-all duration-200;
  background-color: var(--color-surface);
}

.mobile-menu-btn:hover {
  @apply transform scale-105;
  background-color: var(--color-surface-elevated);
}

.hamburger {
  @apply flex flex-col justify-center w-5 h-5 space-y-1;
}

.hamburger-line {
  @apply w-full h-0.5 rounded-full transition-all duration-300;
  background-color: var(--color-text-primary);
}

.hamburger.active .hamburger-line:nth-child(1) {
  @apply transform rotate-45 translate-y-1.5;
}

.hamburger.active .hamburger-line:nth-child(2) {
  @apply opacity-0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  @apply transform -rotate-45 -translate-y-1.5;
}

/* Mobile Menu */
.mobile-menu {
  @apply lg:hidden absolute top-full left-0 right-0;
  @apply border-t border-secondary-200 dark:border-secondary-700;
  background-color: var(--color-background);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.mobile-menu-content {
  @apply max-w-7xl mx-auto px-4 sm:px-6 py-6;
}

.mobile-nav-links {
  @apply space-y-2;
}

.mobile-nav-item {
  @apply opacity-0 transform translate-y-4;
  animation: slideInUp 0.3s ease-out forwards;
  animation-delay: var(--delay);
}

.mobile-nav-link {
  @apply block px-4 py-3 rounded-lg font-medium transition-all duration-200;
  @apply border-l-4 border-transparent;
  color: var(--color-text-primary);
}

.mobile-nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-surface);
  border-left-color: var(--color-primary);
}

.mobile-cta {
  @apply mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700;
}

/* Mobile Overlay */
.mobile-overlay {
  @apply fixed inset-0 bg-black/50 lg:hidden;
  z-index: -1;
}

/* Animations */
@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2;
  ring-offset-color: var(--color-background);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .header,
  .nav-link,
  .mobile-menu-btn,
  .hamburger-line,
  .mobile-nav-link {
    transition: none !important;
  }
  
  .mobile-nav-item {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .brand-link:hover,
  .mobile-menu-btn:hover {
    transform: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .header {
    border-bottom: 2px solid var(--color-border);
  }
  
  .nav-link,
  .mobile-nav-link {
    border: 1px solid transparent;
  }
  
  .nav-link:hover,
  .mobile-nav-link:hover {
    border-color: var(--color-primary);
  }
}
</style>