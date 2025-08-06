<template>
  <div class="base-input-wrapper">
    <!-- Label -->
    <label 
      v-if="label"
      :for="inputId"
      class="input-label"
      :class="{ 'required': required }"
    >
      {{ label }}
    </label>

    <!-- Input Container -->
    <div class="input-container" :class="containerClasses">
      <!-- Icon (Left) -->
      <div v-if="iconLeft" class="input-icon input-icon-left">
        <Icon :icon="iconLeft" class="w-5 h-5" />
      </div>

      <!-- Input Element -->
      <component
        :is="inputComponent"
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :rows="rows"
        :cols="cols"
        :maxlength="maxlength"
        :minlength="minlength"
        :min="min"
        :max="max"
        :step="step"
        :pattern="pattern"
        :aria-describedby="errorId"
        :aria-invalid="hasError"
        class="input-field focus-ring"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
      />

      <!-- Icon (Right) -->
      <div v-if="iconRight || clearable || hasError" class="input-icon input-icon-right">
        <!-- Clear Button -->
        <button
          v-if="clearable && modelValue && !disabled"
          @click="clearInput"
          class="clear-button focus-ring"
          type="button"
          :aria-label="$t('common.close')"
        >
          <Icon icon="ph:x-bold" class="w-4 h-4" />
        </button>
        
        <!-- Error Icon -->
        <Icon 
          v-else-if="hasError"
          icon="ph:warning-circle-bold" 
          class="w-5 h-5 text-red-500" 
        />
        
        <!-- Right Icon -->
        <Icon 
          v-else-if="iconRight"
          :icon="iconRight" 
          class="w-5 h-5" 
        />
      </div>
    </div>

    <!-- Helper Text / Error Message -->
    <div v-if="helperText || errorMessage" class="input-message">
      <p 
        v-if="errorMessage"
        :id="errorId"
        class="error-message"
        role="alert"
      >
        {{ errorMessage }}
      </p>
      <p 
        v-else-if="helperText"
        class="helper-text"
      >
        {{ helperText }}
      </p>
    </div>

    <!-- Character Count -->
    <div 
      v-if="maxlength && showCharCount"
      class="char-count"
      :class="{ 'over-limit': characterCount > maxlength }"
    >
      {{ characterCount }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import { generateId } from '@/utils/helpers'

interface Props {
  // Value
  modelValue?: string | number
  
  // Input attributes
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autocomplete?: string
  
  // Textarea specific
  rows?: number
  cols?: number
  
  // Validation
  maxlength?: number
  minlength?: number
  min?: number | string
  max?: number | string
  step?: number | string
  pattern?: string
  
  // Appearance
  label?: string
  helperText?: string
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  
  // Icons
  iconLeft?: string
  iconRight?: string
  clearable?: boolean
  
  // Behavior
  multiline?: boolean
  showCharCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  multiline: false,
  showCharCount: false,
  rows: 3
})

interface Emits {
  'update:modelValue': [value: string | number]
  input: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  clear: []
}

const emit = defineEmits<Emits>()

// Refs
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>()

// Computed
const inputId = computed(() => generateId())
const errorId = computed(() => `${inputId.value}-error`)

const inputComponent = computed(() => props.multiline ? 'textarea' : 'input')

const hasError = computed(() => !!props.errorMessage)

const characterCount = computed(() => {
  return String(props.modelValue || '').length
})

const containerClasses = computed(() => [
  'input-container',
  `input-${props.variant}`,
  `input-${props.size}`,
  {
    'input-disabled': props.disabled,
    'input-readonly': props.readonly,
    'input-error': hasError.value,
    'input-with-icon-left': props.iconLeft,
    'input-with-icon-right': props.iconRight || props.clearable || hasError.value
  }
])

const inputClasses = computed(() => [
  'input-field',
  {
    'input-multiline': props.multiline
  }
])

// Methods
const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const handleKeydown = (event: KeyboardEvent): void => {
  emit('keydown', event)
}

const clearInput = (): void => {
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// Expose methods
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
.base-input-wrapper {
  @apply space-y-2;
}

/* Label */
.input-label {
  @apply block text-sm font-medium;
  color: var(--color-text-primary);
}

.input-label.required::after {
  @apply text-red-500 ml-1;
  content: '*';
}

/* Input Container */
.input-container {
  @apply relative flex items-center;
  @apply transition-all duration-200;
}

/* Variant Styles */
.input-default {
  @apply rounded-lg border;
  background-color: var(--color-background);
  border-color: var(--color-border);
}

.input-default:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.input-filled {
  @apply rounded-lg border-0;
  background-color: var(--color-surface);
}

.input-filled:focus-within {
  background-color: var(--color-background);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.input-outlined {
  @apply rounded-lg border-2;
  background-color: transparent;
  border-color: var(--color-border);
}

.input-outlined:focus-within {
  border-color: var(--color-primary);
}

/* Size Variants */
.input-sm {
  @apply text-sm;
}

.input-md {
  @apply text-base;
}

.input-lg {
  @apply text-lg;
}

/* State Styles */
.input-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.input-readonly {
  @apply cursor-default;
}

.input-error {
  border-color: #ef4444 !important;
}

.input-error:focus-within {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

/* Input Field */
.input-field {
  @apply w-full bg-transparent border-0 outline-none;
  @apply placeholder-secondary-400 dark:placeholder-secondary-500;
  color: var(--color-text-primary);
}

.input-field:disabled {
  @apply cursor-not-allowed;
}

.input-field:read-only {
  @apply cursor-default;
}

/* Padding based on size and icons */
.input-sm .input-field {
  @apply py-2 px-3;
}

.input-md .input-field {
  @apply py-2.5 px-4;
}

.input-lg .input-field {
  @apply py-3 px-5;
}

.input-with-icon-left.input-sm .input-field {
  @apply pl-10;
}

.input-with-icon-left.input-md .input-field {
  @apply pl-12;
}

.input-with-icon-left.input-lg .input-field {
  @apply pl-14;
}

.input-with-icon-right.input-sm .input-field {
  @apply pr-10;
}

.input-with-icon-right.input-md .input-field {
  @apply pr-12;
}

.input-with-icon-right.input-lg .input-field {
  @apply pr-14;
}

/* Multiline */
.input-multiline {
  @apply resize-y;
  min-height: 80px;
}

/* Icons */
.input-icon {
  @apply absolute flex items-center justify-center;
  color: var(--color-text-secondary);
}

.input-icon-left {
  @apply left-3;
}

.input-icon-right {
  @apply right-3;
}

.input-sm .input-icon {
  @apply w-8 h-8;
}

.input-md .input-icon {
  @apply w-10 h-10;
}

.input-lg .input-icon {
  @apply w-12 h-12;
}

/* Clear Button */
.clear-button {
  @apply p-1 rounded-full transition-colors duration-200;
  @apply hover:bg-secondary-100 dark:hover:bg-secondary-800;
  color: var(--color-text-secondary);
}

.clear-button:hover {
  color: var(--color-text-primary);
}

/* Messages */
.input-message {
  @apply min-h-[1.25rem];
}

.helper-text {
  @apply text-sm;
  color: var(--color-text-secondary);
}

.error-message {
  @apply text-sm text-red-600 dark:text-red-400;
}

/* Character Count */
.char-count {
  @apply text-xs text-right;
  color: var(--color-text-secondary);
}

.char-count.over-limit {
  @apply text-red-600 dark:text-red-400;
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-offset-2;
  ring-color: var(--color-primary);
  ring-offset-color: var(--color-background);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .input-container {
    transition: none !important;
  }
  
  .clear-button {
    transition: none !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .input-default,
  .input-outlined {
    border-width: 2px;
  }
  
  .input-filled {
    border: 2px solid var(--color-border);
  }
}
</style>