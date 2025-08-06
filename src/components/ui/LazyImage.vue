<template>
  <div class="lazy-image-wrapper" :class="wrapperClasses">
    <img
      ref="imageRef"
      :data-src="optimizedSrc"
      :alt="alt"
      :class="imageClasses"
      :style="imageStyles"
      @load="handleLoad"
      @error="handleError"
    />
    
    <!-- Loading placeholder -->
    <div v-if="isLoading" class="lazy-image-placeholder">
      <div class="placeholder-content">
        <Icon v-if="showLoadingIcon" icon="ph:image-bold" class="placeholder-icon" />
        <span v-if="showLoadingText" class="placeholder-text">{{ loadingText }}</span>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-if="hasError" class="lazy-image-error">
      <div class="error-content">
        <Icon icon="ph:image-broken-bold" class="error-icon" />
        <span class="error-text">{{ errorText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useLazyLoading, getOptimalImageFormat } from '@/composables/useLazyLoading'

interface Props {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  loading?: 'lazy' | 'eager'
  placeholder?: string
  errorImage?: string
  showLoadingIcon?: boolean
  showLoadingText?: boolean
  loadingText?: string
  errorText?: string
  responsive?: boolean
  sizes?: string
  quality?: number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
}

const props = withDefaults(defineProps<Props>(), {
  objectFit: 'cover',
  loading: 'lazy',
  showLoadingIcon: true,
  showLoadingText: false,
  loadingText: 'Loading...',
  errorText: 'Failed to load image',
  responsive: true,
  quality: 80,
  format: 'auto'
})

const imageRef = ref<HTMLImageElement>()
const isLoading = ref(true)
const hasError = ref(false)
const isLoaded = ref(false)

const { observeImage } = useLazyLoading({
  threshold: 0.1,
  rootMargin: '50px',
  fadeInDuration: 300
})

// Generate optimized image source
const optimizedSrc = computed(() => {
  let src = props.src
  const params = new URLSearchParams()
  
  // Add quality parameter
  if (props.quality !== 80) {
    params.append('q', props.quality.toString())
  }
  
  // Add format parameter
  let format = props.format
  if (format === 'auto') {
    format = getOptimalImageFormat()
  }
  if (format !== 'jpg') {
    params.append('f', format)
  }
  
  // Add width/height if specified
  if (props.width) {
    params.append('w', props.width.toString())
  }
  if (props.height) {
    params.append('h', props.height.toString())
  }
  
  // Append parameters if any
  if (params.toString()) {
    src += (src.includes('?') ? '&' : '?') + params.toString()
  }
  
  return src
})

const wrapperClasses = computed(() => [
  'lazy-image-wrapper',
  {
    'loading': isLoading.value,
    'loaded': isLoaded.value,
    'error': hasError.value,
    'responsive': props.responsive
  }
])

const imageClasses = computed(() => [
  'lazy-image',
  {
    'lazy-loading': isLoading.value,
    'lazy-loaded': isLoaded.value,
    'lazy-error': hasError.value
  }
])

const imageStyles = computed(() => ({
  width: props.width ? `${props.width}px` : undefined,
  height: props.height ? `${props.height}px` : undefined,
  aspectRatio: props.aspectRatio,
  objectFit: props.objectFit
}))

const handleLoad = (): void => {
  isLoading.value = false
  isLoaded.value = true
  hasError.value = false
}

const handleError = (): void => {
  isLoading.value = false
  isLoaded.value = false
  hasError.value = true
}

// Watch for src changes
watch(() => props.src, () => {
  isLoading.value = true
  isLoaded.value = false
  hasError.value = false
  
  if (imageRef.value) {
    observeImage(imageRef.value)
  }
})

onMounted(() => {
  if (imageRef.value) {
    if (props.loading === 'eager') {
      // Load immediately
      imageRef.value.src = optimizedSrc.value
    } else {
      // Use lazy loading
      observeImage(imageRef.value)
    }
  }
})
</script>

<style scoped>
.lazy-image-wrapper {
  @apply relative overflow-hidden;
  background-color: var(--color-surface);
}

.lazy-image-wrapper.responsive {
  @apply w-full h-auto;
}

.lazy-image {
  @apply w-full h-full transition-opacity duration-300;
  opacity: 0;
}

.lazy-image.lazy-loaded {
  opacity: 1;
}

.lazy-image.lazy-error {
  opacity: 0;
}

/* Placeholder */
.lazy-image-placeholder {
  @apply absolute inset-0 flex items-center justify-center;
  background-color: var(--color-surface);
}

.placeholder-content {
  @apply flex flex-col items-center gap-2;
}

.placeholder-icon {
  @apply w-8 h-8;
  color: var(--color-text-secondary);
  opacity: 0.5;
}

.placeholder-text {
  @apply text-sm;
  color: var(--color-text-secondary);
  opacity: 0.7;
}

/* Error state */
.lazy-image-error {
  @apply absolute inset-0 flex items-center justify-center;
  background-color: var(--color-surface);
}

.error-content {
  @apply flex flex-col items-center gap-2;
}

.error-icon {
  @apply w-8 h-8 text-red-500;
  opacity: 0.7;
}

.error-text {
  @apply text-sm text-red-600 dark:text-red-400;
  opacity: 0.8;
}

/* Loading animation */
.lazy-image-wrapper.loading .lazy-image-placeholder {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .lazy-image,
  .lazy-image-placeholder {
    transition: none !important;
    animation: none !important;
  }
}
</style>