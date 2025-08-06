<template>
  <button
    @click="handleToggle"
    :aria-label="themeLabel"
    :title="themeLabel"
    class="theme-toggle focus-ring"
    :class="{ 'is-dark': isDark }"
  >
    <div class="toggle-container">
      <!-- Sun Icon -->
      <Transition name="icon-fade" mode="out-in">
        <Icon
          v-if="!isDark"
          icon="ph:sun-bold"
          class="toggle-icon sun-icon"
          :class="{ 'active': !isDark }"
        />
      </Transition>
      
      <!-- Moon Icon -->
      <Transition name="icon-fade" mode="out-in">
        <Icon
          v-if="isDark"
          icon="ph:moon-bold"
          class="toggle-icon moon-icon"
          :class="{ 'active': isDark }"
        />
      </Transition>
      
      <!-- Background Circle -->
      <div 
        class="toggle-bg"
        :class="{ 'dark-mode': isDark }"
      ></div>
    </div>
    
    <!-- Ripple Effect -->
    <div 
      ref="rippleRef"
      class="ripple-effect"
      :class="{ 'animate': isAnimating }"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTheme } from '@/composables/useTheme'

// Theme store
const { isDark, themeLabel, toggleTheme } = useTheme()

// Animation state
const isAnimating = ref(false)
const rippleRef = ref<HTMLElement>()

// ...existing code...

// Methods
const handleToggle = async (): Promise<void> => {
  // Start animation
  isAnimating.value = true
  
  // Create ripple effect
  createRippleEffect()
  
  // Toggle theme with slight delay for visual feedback
  setTimeout(() => {
    toggleTheme()
  }, 150)
  
  // Reset animation state
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}

const createRippleEffect = (): void => {
  if (!rippleRef.value) return
  
  const ripple = rippleRef.value
  ripple.classList.remove('animate')
  
  // Force reflow
  void ripple.offsetWidth
  
  ripple.classList.add('animate')
}
</script>

<style scoped>
.theme-toggle {
  @apply relative inline-flex items-center justify-center w-12 h-12 rounded-full;
  @apply bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700;
  @apply border border-secondary-200 dark:border-secondary-700;
  @apply transition-all duration-300 ease-out;
  @apply transform hover:scale-105 active:scale-95;
  @apply shadow-md hover:shadow-lg;
  overflow: hidden;
}

.toggle-container {
  @apply relative flex items-center justify-center w-full h-full;
  z-index: 2;
}

.toggle-icon {
  @apply w-5 h-5 transition-all duration-300;
  @apply text-secondary-600 dark:text-secondary-300;
}

.sun-icon.active {
  @apply text-amber-500;
  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));
}

.moon-icon.active {
  @apply text-blue-400;
  filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.4));
}

.toggle-bg {
  @apply absolute inset-0 rounded-full transition-all duration-500;
  @apply bg-gradient-to-br from-amber-100 to-amber-200;
  @apply dark:from-blue-900 dark:to-indigo-900;
  opacity: 0;
  transform: scale(0.8);
}

.toggle-bg.dark-mode {
  opacity: 0.3;
  transform: scale(1);
}

.ripple-effect {
  @apply absolute inset-0 rounded-full;
  @apply bg-primary-500/20;
  transform: scale(0);
  opacity: 0;
  z-index: 1;
}

.ripple-effect.animate {
  animation: ripple 0.6s ease-out;
}

/* Icon Transitions */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease-out;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

.icon-fade-enter-to,
.icon-fade-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* Animations */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

/* Hover Effects */
.theme-toggle:hover .toggle-icon {
  @apply transform rotate-12;
}

.theme-toggle:hover .sun-icon {
  @apply text-amber-400;
}

.theme-toggle:hover .moon-icon {
  @apply text-blue-300;
}

/* Focus States */
.theme-toggle:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-secondary-900;
}

/* Active State */
.theme-toggle:active {
  @apply transform scale-95;
}

.theme-toggle.is-animating {
  @apply pointer-events-none;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .toggle-icon,
  .toggle-bg,
  .icon-fade-enter-active,
  .icon-fade-leave-active {
    transition: none !important;
  }
  
  .ripple-effect.animate {
    animation: none !important;
  }
  
  .theme-toggle:hover .toggle-icon {
    transform: none !important;
  }
}
</style>