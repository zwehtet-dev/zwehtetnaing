<template>
  <Teleport to="body">
    <Transition
      name="modal"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click="handleOverlayClick"
      >
        <div
          class="modal-container"
          :class="containerClasses"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descriptionId"
        >
          <Transition
            name="modal-content"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 transform scale-95 translate-y-4"
            enter-to-class="opacity-100 transform scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 transform scale-100 translate-y-0"
            leave-to-class="opacity-0 transform scale-95 translate-y-4"
          >
            <div v-if="modelValue" class="modal-content" :class="contentClasses">
              <!-- Header -->
              <div v-if="$slots.header || title || closable" class="modal-header">
                <div class="modal-title-section">
                  <slot name="header">
                    <h2 v-if="title" :id="titleId" class="modal-title">
                      {{ title }}
                    </h2>
                  </slot>
                </div>
                
                <button
                  v-if="closable"
                  @click="closeModal"
                  class="modal-close-btn focus-ring"
                  :aria-label="$t('common.close')"
                  type="button"
                >
                  <Icon icon="ph:x-bold" class="w-5 h-5" />
                </button>
              </div>

              <!-- Body -->
              <div class="modal-body" :class="{ 'has-header': $slots.header || title }">
                <div v-if="description" :id="descriptionId" class="modal-description">
                  {{ description }}
                </div>
                <slot />
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer" class="modal-footer">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { generateId } from '@/utils/helpers'

interface Props {
  // Visibility
  modelValue: boolean
  
  // Content
  title?: string
  description?: string
  
  // Behavior
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  persistent?: boolean
  
  // Appearance
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  maxWidth?: string
  centered?: boolean
  
  // Styling
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  persistent: false,
  size: 'md',
  centered: true,
  padding: 'md',
  rounded: true
})

interface Emits {
  'update:modelValue': [value: boolean]
  open: []
  close: []
  'before-close': []
}

const emit = defineEmits<Emits>()

// Computed
const titleId = computed(() => generateId())
const descriptionId = computed(() => generateId())

const containerClasses = computed(() => [
  'modal-container',
  `modal-${props.size}`,
  {
    'modal-centered': props.centered,
    'modal-full': props.size === 'full'
  }
])

const contentClasses = computed(() => [
  'modal-content',
  `modal-padding-${props.padding}`,
  {
    'modal-rounded': props.rounded
  }
])

// Methods
const closeModal = (): void => {
  if (props.persistent) return
  
  emit('before-close')
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = (event: Event): void => {
  if (event.target === event.currentTarget && props.closeOnOverlay) {
    closeModal()
  }
}

const handleEscapeKey = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    closeModal()
  }
}

// Focus management
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
let previousActiveElement: HTMLElement | null = null

const trapFocus = (event: KeyboardEvent): void => {
  if (event.key !== 'Tab') return

  const modal = document.querySelector('.modal-content') as HTMLElement
  if (!modal) return

  const focusableEls = modal.querySelectorAll(focusableElements) as NodeListOf<HTMLElement>
  const firstFocusableEl = focusableEls[0]
  const lastFocusableEl = focusableEls[focusableEls.length - 1]

  if (event.shiftKey) {
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus()
      event.preventDefault()
    }
  }
}

// Watchers
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    emit('open')
    previousActiveElement = document.activeElement as HTMLElement
    
    nextTick(() => {
      // Focus first focusable element
      const modal = document.querySelector('.modal-content') as HTMLElement
      if (modal) {
        const firstFocusable = modal.querySelector(focusableElements) as HTMLElement
        if (firstFocusable) {
          firstFocusable.focus()
        } else {
          modal.focus()
        }
      }
    })
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  } else {
    // Restore focus
    if (previousActiveElement) {
      previousActiveElement.focus()
      previousActiveElement = null
    }
    
    // Restore body scroll
    document.body.style.overflow = ''
  }
})

// Event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('keydown', trapFocus)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.removeEventListener('keydown', trapFocus)
  
  // Cleanup body scroll
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center;
  @apply bg-black/50 backdrop-blur-sm;
  @apply p-4;
}

/* Modal Container */
.modal-container {
  @apply relative w-full max-h-full overflow-y-auto;
  @apply flex items-center justify-center;
}

.modal-centered {
  @apply items-center;
}

/* Size Variants */
.modal-sm {
  @apply max-w-sm;
}

.modal-md {
  @apply max-w-md;
}

.modal-lg {
  @apply max-w-2xl;
}

.modal-xl {
  @apply max-w-4xl;
}

.modal-full {
  @apply max-w-none w-full h-full;
}

.modal-full .modal-content {
  @apply h-full;
}

/* Modal Content */
.modal-content {
  @apply w-full bg-white dark:bg-secondary-800;
  @apply shadow-2xl;
  @apply flex flex-col;
  @apply max-h-full overflow-hidden;
  background-color: var(--color-surface-elevated);
  box-shadow: var(--shadow-luxury);
}

.modal-rounded {
  @apply rounded-xl;
}

/* Padding Variants */
.modal-padding-none {
  @apply p-0;
}

.modal-padding-sm .modal-header,
.modal-padding-sm .modal-body,
.modal-padding-sm .modal-footer {
  @apply p-4;
}

.modal-padding-md .modal-header,
.modal-padding-md .modal-body,
.modal-padding-md .modal-footer {
  @apply p-6;
}

.modal-padding-lg .modal-header,
.modal-padding-lg .modal-body,
.modal-padding-lg .modal-footer {
  @apply p-8;
}

/* Modal Sections */
.modal-header {
  @apply flex items-center justify-between;
  @apply border-b;
  border-color: var(--color-border-light);
}

.modal-title-section {
  @apply flex-1;
}

.modal-title {
  @apply text-xl font-semibold;
  color: var(--color-text-primary);
}

.modal-close-btn {
  @apply flex items-center justify-center w-8 h-8;
  @apply rounded-lg transition-colors duration-200;
  @apply hover:bg-secondary-100 dark:hover:bg-secondary-700;
  color: var(--color-text-secondary);
}

.modal-close-btn:hover {
  color: var(--color-text-primary);
}

.modal-body {
  @apply flex-1 overflow-y-auto;
}

.modal-body.has-header {
  @apply pt-0;
}

.modal-description {
  @apply text-sm mb-4;
  color: var(--color-text-secondary);
}

.modal-footer {
  @apply border-t;
  @apply flex items-center justify-end space-x-3;
  border-color: var(--color-border-light);
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-offset-2;
  ring-color: var(--color-primary);
  ring-offset-color: var(--color-surface-elevated);
}

/* Scrollbar Styling */
.modal-body::-webkit-scrollbar {
  @apply w-2;
}

.modal-body::-webkit-scrollbar-track {
  @apply bg-secondary-100 dark:bg-secondary-800;
}

.modal-body::-webkit-scrollbar-thumb {
  @apply bg-secondary-400 dark:bg-secondary-600 rounded-full;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  @apply bg-secondary-500 dark:bg-secondary-500;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-content-enter-active,
  .modal-content-leave-active {
    transition: none !important;
  }
  
  .modal-content-enter-from,
  .modal-content-leave-to {
    transform: none !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .modal-content {
    border: 2px solid var(--color-border);
  }
  
  .modal-header,
  .modal-footer {
    border-width: 2px;
  }
}
</style>