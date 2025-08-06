<template>
  <component
    :is="tag"
    ref="buttonRef"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :to="tag === 'router-link' ? to : undefined"
    :disabled="disabled"
    :aria-label="ariaLabel"
    class="base-button focus-ring"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <div v-if="loading" class="button-spinner">
      <Icon icon="ph:spinner-bold" class="w-4 h-4 animate-spin" />
    </div>

    <!-- Icon (Left) -->
    <Icon 
      v-if="iconLeft && !loading" 
      :icon="iconLeft" 
      class="button-icon button-icon-left"
      :class="iconClasses"
    />

    <!-- Content -->
    <span v-if="$slots.default || label" class="button-content">
      <slot>{{ label }}</slot>
    </span>

    <!-- Icon (Right) -->
    <Icon 
      v-if="iconRight && !loading" 
      :icon="iconRight" 
      class="button-icon button-icon-right"
      :class="iconClasses"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, ref, onMounted,useSlots } from 'vue'
import { Icon } from '@iconify/vue'
import { useMicroInteractions } from '@/composables/useMicroInteractions'

const slots = useSlots()


interface Props {
  // Appearance
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  // Behavior
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  
  // Content
  label?: string
  iconLeft?: string
  iconRight?: string
  ariaLabel?: string
  
  // Navigation
  tag?: 'button' | 'a' | 'router-link'
  href?: string
  to?: string | object
  
  // Styling
  fullWidth?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  tag: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: false
})

interface Emits {
  click: [event: Event]
}

const emit = defineEmits<Emits>()

// Refs
const buttonRef = ref<HTMLElement>()

// Composables
const { createRippleEffect, createPressEffect } = useMicroInteractions()

// Computed classes
const buttonClasses = computed(() => [
  // Base classes
  'base-button',
  
  // Variant classes
  `button-${props.variant}`,
  
  // Size classes
  `button-${props.size}`,
  
  // State classes
  {
    'button-disabled': props.disabled,
    'button-loading': props.loading,
    'button-full-width': props.fullWidth,
    'button-rounded': props.rounded,
    'button-icon-only': !props.label && !slots.default && (props.iconLeft || props.iconRight)
  }
])

const iconClasses = computed(() => [
  {
    [`button-icon-${props.size}`]: true
  }
])

// Methods
const handleClick = (event: Event): void => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  
  emit('click', event)
}

// Lifecycle
onMounted(() => {
  if (buttonRef.value && !props.disabled) {
    // Add ripple effect for primary and secondary buttons
    if (['primary', 'secondary'].includes(props.variant)) {
      createRippleEffect(buttonRef.value)
    }
    
    // Add press effect for all buttons
    createPressEffect(buttonRef.value, { scale: 0.98 })
  }
})
</script>

<style scoped>
/* Base Button Styles */
.base-button {
  @apply inline-flex items-center justify-center font-medium;
  @apply transition-all duration-200 ease-out;
  @apply border border-transparent;
  @apply cursor-pointer select-none;
  @apply relative overflow-hidden;
}

.base-button:disabled,
.button-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.button-loading {
  @apply cursor-wait;
}

/* Size Variants */
.button-sm {
  @apply px-3 py-1.5 text-sm rounded-md;
  min-height: 2rem;
}

.button-md {
  @apply px-4 py-2 text-sm rounded-lg;
  min-height: 2.5rem;
}

.button-lg {
  @apply px-6 py-3 text-base rounded-lg;
  min-height: 3rem;
}

.button-xl {
  @apply px-8 py-4 text-lg rounded-xl;
  min-height: 3.5rem;
}

/* Icon Only Buttons */
.button-icon-only.button-sm {
  @apply w-8 h-8 p-0;
}

.button-icon-only.button-md {
  @apply w-10 h-10 p-0;
}

.button-icon-only.button-lg {
  @apply w-12 h-12 p-0;
}

.button-icon-only.button-xl {
  @apply w-14 h-14 p-0;
}

/* Full Width */
.button-full-width {
  @apply w-full;
}

/* Rounded */
.button-rounded {
  @apply rounded-full;
}

/* Variant Styles */
.button-primary {
  background-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.button-primary:hover:not(:disabled):not(.button-loading) {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.button-primary:active:not(:disabled):not(.button-loading) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.button-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.button-secondary:hover:not(:disabled):not(.button-loading) {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-1px);
}

.button-ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
}

.button-ghost:hover:not(:disabled):not(.button-loading) {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

.button-danger {
  @apply bg-red-600 text-white;
  box-shadow: var(--shadow-md);
}

.button-danger:hover:not(:disabled):not(.button-loading) {
  @apply bg-red-700;
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.button-success {
  @apply bg-green-600 text-white;
  box-shadow: var(--shadow-md);
}

.button-success:hover:not(:disabled):not(.button-loading) {
  @apply bg-green-700;
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

/* Button Content */
.button-content {
  @apply flex items-center;
}

/* Icons */
.button-icon {
  @apply flex-shrink-0;
}

.button-icon-left {
  @apply -ml-1 mr-2;
}

.button-icon-right {
  @apply ml-2 -mr-1;
}

.button-icon-sm {
  @apply w-4 h-4;
}

.button-icon-md {
  @apply w-4 h-4;
}

.button-icon-lg {
  @apply w-5 h-5;
}

.button-icon-xl {
  @apply w-6 h-6;
}

/* Spinner */
.button-spinner {
  @apply absolute inset-0 flex items-center justify-center;
  background-color: inherit;
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-offset-2;
  ring-color: var(--color-primary);
  ring-offset-color: var(--color-background);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none !important;
  }
  
  .base-button:hover:not(:disabled):not(.button-loading) {
    transform: none !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .button-ghost {
    border: 1px solid var(--color-text-secondary);
  }
  
  .button-ghost:hover {
    border-color: var(--color-primary);
  }
}
</style>