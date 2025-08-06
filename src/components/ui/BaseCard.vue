<template>
  <div 
    class="base-card"
    :class="cardClasses"
  >
    <!-- Card Header -->
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
    </div>

    <!-- Card Content -->
    <div class="card-content" :class="{ 'has-header': $slots.header || title }">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>

    <!-- Hover Overlay -->
    <div v-if="hoverable" class="card-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // Appearance
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  
  // Behavior
  hoverable?: boolean
  clickable?: boolean
  
  // Content
  title?: string
  
  // Styling
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hoverable: false,
  clickable: false,
  padding: 'md',
  rounded: false
})

// Computed classes
const cardClasses = computed(() => [
  // Base classes
  'base-card',
  
  // Variant classes
  `card-${props.variant}`,
  
  // Size classes
  `card-${props.size}`,
  
  // Padding classes
  `card-padding-${props.padding}`,
  
  // State classes
  {
    'card-hoverable': props.hoverable,
    'card-clickable': props.clickable,
    'card-rounded': props.rounded
  }
])
</script>

<style scoped>
/* Base Card Styles */
.base-card {
  @apply relative overflow-hidden;
  @apply transition-all duration-300 ease-out;
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
}

/* Variant Styles */
.card-default {
  @apply rounded-xl;
  box-shadow: var(--shadow-sm);
}

.card-elevated {
  @apply rounded-xl;
  box-shadow: var(--shadow-luxury);
}

.card-outlined {
  @apply rounded-xl border-2;
  border-color: var(--color-border);
  box-shadow: none;
}

.card-glass {
  @apply rounded-xl backdrop-blur-md;
  background-color: color-mix(in srgb, var(--color-surface-elevated) 80%, transparent);
  border-color: color-mix(in srgb, var(--color-border) 50%, transparent);
  box-shadow: var(--shadow-sm);
}

/* Size Variants */
.card-sm {
  @apply text-sm;
}

.card-md {
  @apply text-base;
}

.card-lg {
  @apply text-lg;
}

/* Padding Variants */
.card-padding-none {
  @apply p-0;
}

.card-padding-sm {
  @apply p-4;
}

.card-padding-md {
  @apply p-6;
}

.card-padding-lg {
  @apply p-8;
}

/* Rounded */
.card-rounded {
  @apply rounded-2xl;
}

/* Interactive States */
.card-hoverable:hover {
  @apply transform -translate-y-1;
  box-shadow: var(--shadow-lg);
}

.card-clickable {
  @apply cursor-pointer;
}

.card-clickable:hover {
  @apply transform -translate-y-1;
  box-shadow: var(--shadow-lg);
}

.card-clickable:active {
  @apply transform translate-y-0;
  box-shadow: var(--shadow-md);
}

/* Card Sections */
.card-header {
  @apply border-b pb-4 mb-4;
  border-color: var(--color-border-light);
}

.card-content {
  @apply flex-1;
}

.card-content.has-header {
  @apply pt-0;
}

.card-footer {
  @apply border-t pt-4 mt-4;
  border-color: var(--color-border-light);
}

.card-title {
  @apply text-xl font-semibold;
  color: var(--color-text-primary);
}

/* Hover Overlay */
.card-overlay {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  @apply pointer-events-none;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  opacity: 0;
}

.card-hoverable:hover .card-overlay,
.card-clickable:hover .card-overlay {
  opacity: 0.05;
}

/* Focus States */
.card-clickable:focus-visible {
  @apply ring-2 ring-offset-2;
  ring-color: var(--color-primary);
  ring-offset-color: var(--color-background);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .base-card {
    transition: none !important;
  }
  
  .card-hoverable:hover,
  .card-clickable:hover,
  .card-clickable:active {
    transform: none !important;
  }
  
  .card-overlay {
    transition: none !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .card-default,
  .card-elevated,
  .card-glass {
    border: 2px solid var(--color-border);
  }
  
  .card-outlined {
    border-width: 3px;
  }
}
</style>