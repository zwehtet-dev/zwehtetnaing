<template>
  <Transition name="scroll-top">
    <button
      v-if="showScrollTop"
      @click="handleScrollToTop"
      class="scroll-to-top-btn focus-ring"
      :class="{ 'scrolling': isScrolling }"
      :aria-label="$t('common.backToTop')"
      :title="$t('common.backToTop')"
    >
      <Icon 
        icon="ph:arrow-up-bold" 
        class="scroll-icon"
        :class="{ 'animate-bounce': !isScrolling }"
      />
      <div class="scroll-progress" :style="{ transform: `scaleY(${scrollProgress})` }"></div>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const { scrollToTop, isScrolling, scrollY, showScrollTop } = useSmoothScroll()

// Calculate scroll progress (0 to 1)
const scrollProgress = computed(() => {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(scrollY.value / documentHeight, 1)
})

const handleScrollToTop = async (): Promise<void> => {
  await scrollToTop({ duration: 800, easing: 'easeOut' })
}
</script>

<style scoped>
.scroll-to-top-btn {
  @apply fixed bottom-6 right-6 z-50;
  @apply w-12 h-12 rounded-full;
  @apply flex items-center justify-center;
  @apply transition-all duration-300 ease-out;
  @apply hover:scale-110 active:scale-95;
  @apply shadow-lg hover:shadow-xl;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  position: relative;
  overflow: hidden;
}

.scroll-to-top-btn:hover {
  background: linear-gradient(135deg, var(--color-primary-hover), var(--color-accent-hover));
}

.scroll-to-top-btn.scrolling {
  @apply pointer-events-none opacity-75;
}

.scroll-icon {
  @apply w-5 h-5 relative z-10;
  transition: transform 0.3s ease;
}

.scroll-to-top-btn:hover .scroll-icon {
  transform: translateY(-2px);
}

.scroll-progress {
  @apply absolute inset-0 opacity-20;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent);
  transform-origin: bottom;
  transition: transform 0.1s ease-out;
}

/* Transitions */
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: all 0.3s ease-out;
}

.scroll-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* Focus styles */
.focus-ring:focus-visible {
  @apply ring-2 ring-offset-2;
  ring-color: var(--color-primary);
  ring-offset-color: var(--color-background);
}

/* Responsive */
@media (max-width: 768px) {
  .scroll-to-top-btn {
    @apply bottom-4 right-4 w-10 h-10;
  }
  
  .scroll-icon {
    @apply w-4 h-4;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .scroll-to-top-btn,
  .scroll-icon,
  .scroll-progress {
    transition: none !important;
  }
  
  .scroll-to-top-btn:hover {
    transform: none !important;
  }
  
  .scroll-icon.animate-bounce {
    animation: none !important;
  }
}

/* High contrast */
@media (prefers-contrast: high) {
  .scroll-to-top-btn {
    border: 2px solid var(--color-text-primary);
  }
}
</style>