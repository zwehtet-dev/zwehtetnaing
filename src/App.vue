<template>
  <div 
    id="app" 
    :class="{ 'dark': isDark }" 
    class="min-h-screen transition-colors duration-300"
    :style="appStyles"
  >
    <TheHeader />
    <main>
      <router-view />
    </main>
    <TheFooter />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useLanguage } from '@/composables/useLanguage'
import { useUIStore } from '@/stores/ui'
// ...existing code...
import { usePerformance } from '@/composables/usePerformance'
import { useAccessibility } from '@/composables/useAccessibility'
import TheHeader from '@/components/common/TheHeader.vue'
import TheFooter from '@/components/common/TheFooter.vue'
import ScrollToTop from '@/components/common/ScrollToTop.vue'

// Stores
const { isDark, initTheme } = useTheme()
const { initLanguage } = useLanguage()
const { initializeUI } = useUIStore()

// SEO
// Removed unused variable 'setMeta'

// Performance monitoring
const { initializeMetrics } = usePerformance()

// Accessibility
const { initializeAccessibility } = useAccessibility()

// Computed styles
const appStyles = computed(() => ({
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-primary)'
}))

onMounted(() => {
  // Initialize all systems
  initTheme()
  initLanguage()
  initializeUI()
  
  // Initialize performance monitoring
  initializeMetrics()
  
  // Initialize accessibility features
  initializeAccessibility()
})
</script>