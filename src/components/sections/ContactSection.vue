<template>
  <section id="contact" class="contact-section">
    <div class="contact-container">
      <!-- Section Header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">{{ $t('contact.title') }}</h2>
        <p class="section-subtitle">{{ $t('contact.subtitle') }}</p>
        <p class="section-description">{{ $t('contact.description') }}</p>
        <div class="title-decoration"></div>
      </div>
      
      <!-- Contact Content -->
      <div class="contact-content">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-section animate-on-scroll" style="--delay: 0.2s">
            <BaseCard class="contact-form-card" variant="elevated">
              <div class="form-header">
                <div class="form-header-content">
                  <Icon icon="ph:envelope-bold" class="form-header-icon" />
                  <div>
                    <h3 class="form-title">{{ $t('contact.form.title') }}</h3>
                    <p class="form-subtitle">{{ $t('contact.form.subtitle') }}</p>
                  </div>
                </div>
              </div>
              
              <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
                <!-- Form Fields Grid -->
                <div class="form-grid">
                  <BaseInput
                    v-model="form.name"
                    :label="$t('contact.form.name')"
                    :placeholder="$t('contact.form.name')"
                    :error-message="errors.name"
                    icon-left="ph:user-bold"
                    required
                    @blur="validateField('name')"
                    @input="clearError('name')"
                  />
                  <BaseInput
                    v-model="form.email"
                    type="email"
                    :label="$t('contact.form.email')"
                    :placeholder="$t('contact.form.email')"
                    :error-message="errors.email"
                    icon-left="ph:envelope-bold"
                    required
                    @blur="validateField('email')"
                    @input="clearError('email')"
                  />
                </div>
                
                <BaseInput
                  v-model="form.subject"
                  :label="$t('contact.form.subject')"
                  :placeholder="$t('contact.form.subject')"
                  :error-message="errors.subject"
                  icon-left="ph:chat-circle-bold"
                  required
                  @blur="validateField('subject')"
                  @input="clearError('subject')"
                />
                
                <BaseInput
                  v-model="form.message"
                  :label="$t('contact.form.message')"
                  :placeholder="$t('contact.form.message')"
                  :error-message="errors.message"
                  multiline
                  :rows="6"
                  :maxlength="1000"
                  show-char-count
                  required
                  @blur="validateField('message')"
                  @input="clearError('message')"
                />
                
                <!-- Form Actions -->
                <div class="form-actions">
                  <BaseButton 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    icon-left="ph:paper-plane-tilt-bold"
                    :loading="isSubmitting"
                    :disabled="!isFormValid"
                    class="submit-btn"
                  >
                    {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.send') }}
                  </BaseButton>
                  <BaseButton 
                    type="button"
                    variant="ghost" 
                    size="lg"
                    @click="resetForm"
                    :disabled="isSubmitting"
                  >
                    {{ $t('contact.form.reset') }}
                  </BaseButton>
                </div>
                
                <!-- Form Footer -->
                <div class="form-footer">
                  <div class="privacy-notice">
                    <Icon icon="ph:shield-check-bold" class="privacy-icon" />
                    <span class="privacy-text">{{ $t('contact.form.privacy') }}</span>
                  </div>
                </div>
              </form>
            </BaseCard>
          </div>
          
          <!-- Contact Information -->
          <div class="contact-info-section animate-on-scroll" style="--delay: 0.4s">
            <!-- Quick Contact -->
            <BaseCard class="contact-info-card quick-contact" variant="glass">
              <div class="card-header">
                <Icon icon="ph:phone-bold" class="card-header-icon" />
                <h3 class="card-title">{{ $t('contact.quickContact') }}</h3>
              </div>
              <div class="contact-methods">
                <a 
                  :href="`tel:${PERSONAL_INFO.contact.phone}`"
                  class="contact-method"
                  @click="trackContactMethod('phone')"
                >
                  <div class="method-icon phone">
                    <Icon icon="ph:phone-bold" class="icon" />
                  </div>
                  <div class="method-content">
                    <span class="method-label">{{ $t('contact.info.phone') }}</span>
                    <span class="method-value">{{ PERSONAL_INFO.contact.phone }}</span>
                  </div>
                  <Icon icon="ph:arrow-square-out-bold" class="method-arrow" />
                </a>
                <a 
                  :href="`mailto:${PERSONAL_INFO.contact.email}`"
                  class="contact-method"
                  @click="trackContactMethod('email')"
                >
                  <div class="method-icon email">
                    <Icon icon="ph:envelope-bold" class="icon" />
                  </div>
                  <div class="method-content">
                    <span class="method-label">{{ $t('contact.info.email') }}</span>
                    <span class="method-value">{{ PERSONAL_INFO.contact.email }}</span>
                  </div>
                  <Icon icon="ph:arrow-square-out-bold" class="method-arrow" />
                </a>
              </div>
            </BaseCard>
            
            <!-- Location & Availability -->
            <BaseCard class="contact-info-card location-card">
              <div class="card-header">
                <Icon icon="ph:map-pin-bold" class="card-header-icon" />
                <h3 class="card-title">{{ $t('contact.info.location') }}</h3>
              </div>
              <div class="location-content">
                <div class="location-info">
                  <Icon icon="ph:map-pin-bold" class="location-icon" />
                  <span class="location-text">{{ PERSONAL_INFO.contact.location }}</span>
                </div>
                <div class="availability-info">
                  <div class="availability-status">
                    <div class="status-dot available"></div>
                    <span class="status-text">{{ $t('contact.info.availability') }}</span>
                  </div>
                  <p class="availability-note">{{ $t('contact.availabilityNote') }}</p>
                </div>
              </div>
            </BaseCard>
            
            <!-- Social Links -->
            <BaseCard class="contact-info-card social-card">
              <div class="card-header">
                <Icon icon="ph:share-network-bold" class="card-header-icon" />
                <h3 class="card-title">{{ $t('contact.social.title') }}</h3>
              </div>
              <div class="social-links">
                <a 
                  href="#" 
                  class="social-link github"
                  :title="$t('contact.social.github')"
                  @click="trackSocialClick('github')"
                >
                  <Icon icon="ph:github-logo-bold" class="social-icon" />
                  <span class="social-label">GitHub</span>
                </a>
                <a 
                  href="#" 
                  class="social-link linkedin"
                  :title="$t('contact.social.linkedin')"
                  @click="trackSocialClick('linkedin')"
                >
                  <Icon icon="ph:linkedin-logo-bold" class="social-icon" />
                  <span class="social-label">LinkedIn</span>
                </a>
                <a 
                  href="#" 
                  class="social-link twitter"
                  :title="$t('contact.social.twitter')"
                  @click="trackSocialClick('twitter')"
                >
                  <Icon icon="ph:twitter-logo-bold" class="social-icon" />
                  <span class="social-label">Twitter</span>
                </a>
              </div>
            </BaseCard>
            
            <!-- Response Time -->
            <BaseCard class="contact-info-card response-card" variant="outlined">
              <div class="response-content">
                <div class="response-header">
                  <Icon icon="ph:clock-bold" class="response-icon" />
                  <div>
                    <h4 class="response-title">{{ $t('contact.responseTime.title') }}</h4>
                    <p class="response-subtitle">{{ $t('contact.responseTime.subtitle') }}</p>
                  </div>
                </div>
                <div class="response-stats">
                  <div class="stat">
                    <span class="stat-value">< 24h</span>
                    <span class="stat-label">{{ $t('contact.responseTime.average') }}</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">98%</span>
                    <span class="stat-label">{{ $t('contact.responseTime.rate') }}</span>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <BaseModal 
      v-model="showSuccessModal" 
      :title="$t('contact.success.title')"
      size="md"
      @close="closeSuccessModal"
    >
      <div class="success-content">
        <div class="success-icon">
          <Icon icon="ph:check-circle-bold" class="icon" />
        </div>
        <div class="success-message">
          <h3 class="success-title">{{ $t('contact.success.message') }}</h3>
          <p class="success-description">{{ $t('contact.success.description') }}</p>
        </div>
      </div>
      <template #footer>
        <BaseButton 
          variant="primary"
          @click="closeSuccessModal"
        >
          {{ $t('common.close') }}
        </BaseButton>
      </template>
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useToast } from '@/composables/useToast'
import { isValidEmail } from '@/utils/helpers'
import { PERSONAL_INFO } from '@/utils/constants'
import type { ContactForm } from '@/types'

// Composables
const { t } = useI18n()
const { observeElements } = useScrollAnimation({ threshold: 0.1, delay: 100 })
const { showToast } = useToast()

// Form state
const form = ref<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

// Computed
const isFormValid = computed(() => {
  return form.value.name.trim() !== '' &&
         form.value.email.trim() !== '' &&
         isValidEmail(form.value.email) &&
         form.value.subject.trim() !== '' &&
         form.value.message.trim() !== '' &&
         form.value.message.length >= 10 &&
         Object.keys(errors.value).length === 0
})

// Validation methods
const validateField = (field: keyof ContactForm): void => {
  const value = form.value[field].trim()
  
  switch (field) {
    case 'name':
      if (!value) {
        errors.value.name = t('contact.validation.nameRequired')
      } else if (value.length < 2) {
        errors.value.name = t('contact.validation.nameMinLength')
      } else {
        delete errors.value.name
      }
      break
    case 'email':
      if (!value) {
        errors.value.email = t('contact.validation.emailRequired')
      } else if (!isValidEmail(value)) {
        errors.value.email = t('contact.validation.emailInvalid')
      } else {
        delete errors.value.email
      }
      break
    case 'subject':
      if (!value) {
        errors.value.subject = t('contact.validation.subjectRequired')
      } else {
        delete errors.value.subject
      }
      break
    case 'message':
      if (!value) {
        errors.value.message = t('contact.validation.messageRequired')
      } else if (value.length < 10) {
        errors.value.message = t('contact.validation.messageMinLength')
      } else {
        delete errors.value.message
      }
      break
  }
}

const clearError = (field: keyof ContactForm): void => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const validateAllFields = (): boolean => {
  Object.keys(form.value).forEach(field => {
    validateField(field as keyof ContactForm)
  })
  return Object.keys(errors.value).length === 0
}

// Form methods
const handleSubmit = async (): Promise<void> => {
  // Validate all fields first
  if (!validateAllFields()) {
    showToast(t('contact.form.error'), 'error')
    return
  }

  if (!isFormValid.value) {
    showToast('Please fix the errors in the form', 'error')
    return
  }

  isSubmitting.value = true
  
  try {
    // Simulate form submission with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success modal
    showSuccessModal.value = true
    
    // Reset form
    resetForm()
    
    // Track form submission
    trackFormSubmission()
    
    // Show success toast
    showToast(t('contact.form.success'), 'success')
  } catch (error) {
    console.error('Form submission error:', error)
    showToast(t('contact.form.error'), 'error')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = (): void => {
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  errors.value = {}
}

const closeSuccessModal = (): void => {
  showSuccessModal.value = false
}

// Tracking methods
const trackContactMethod = (method: string): void => {
  console.log(`Contact method used: ${method}`)
  showToast(`Opening ${method}...`, 'info')
}

const trackSocialClick = (platform: string): void => {
  console.log(`Social link clicked: ${platform}`)
  showToast(`${platform} profile coming soon!`, 'info')
}

const trackFormSubmission = (): void => {
  console.log('Form submitted successfully', {
    name: form.value.name,
    email: form.value.email,
    subject: form.value.subject,
    messageLength: form.value.message.length
  })
}

// Lifecycle
onMounted(() => {
  // Observe elements for scroll animations
  observeElements('.animate-on-scroll')
})
</script><style sco
ped>
.contact-section {
  @apply py-20 lg:py-32 relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
}

.contact-section::before {
  content: '';
  @apply absolute top-0 left-0 w-full h-full opacity-20;
  background-image: radial-gradient(
    circle at 30% 20%,
    color-mix(in srgb, var(--color-primary) 15%, transparent) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 70% 80%,
    color-mix(in srgb, var(--color-accent) 15%, transparent) 0%,
    transparent 50%
  );
}

.contact-container {
  @apply relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Section Header */
.section-header {
  @apply text-center mb-16 lg:mb-20;
}

.section-title {
  @apply text-3xl md:text-4xl lg:text-5xl font-bold mb-4;
  color: var(--color-text-primary);
}

.section-subtitle {
  @apply text-lg md:text-xl mb-4;
  color: var(--color-text-secondary);
}

.section-description {
  @apply text-base md:text-lg max-w-2xl mx-auto mb-6;
  color: var(--color-text-secondary);
}

.title-decoration {
  @apply w-24 h-1 mx-auto rounded-full;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

/* Contact Grid */
.contact-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16;
}

/* Contact Form */
.contact-form-section {
  @apply order-2 lg:order-1;
}

.contact-form-card {
  @apply p-8 lg:p-10;
}

.form-header {
  @apply mb-8 pb-6 border-b;
  border-color: var(--color-border-light);
}

.form-header-content {
  @apply flex items-center gap-4;
}

.form-header-icon {
  @apply w-8 h-8 p-2 rounded-lg;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
}

.form-title {
  @apply text-xl font-bold mb-1;
  color: var(--color-text-primary);
}

.form-subtitle {
  @apply text-sm;
  color: var(--color-text-secondary);
}

.contact-form {
  @apply space-y-6;
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.form-actions {
  @apply flex flex-col sm:flex-row gap-4 pt-6;
}

.submit-btn {
  @apply flex-1;
}

.form-footer {
  @apply pt-6 border-t;
  border-color: var(--color-border-light);
}

.privacy-notice {
  @apply flex items-center gap-2 text-sm;
  color: var(--color-text-secondary);
}

.privacy-icon {
  @apply w-4 h-4;
  color: var(--color-primary);
}

/* Contact Info */
.contact-info-section {
  @apply order-1 lg:order-2 space-y-6;
}

.contact-info-card {
  @apply p-6 lg:p-8;
}

.card-header {
  @apply flex items-center gap-3 mb-6;
}

.card-header-icon {
  @apply w-6 h-6;
  color: var(--color-primary);
}

.card-title {
  @apply text-lg font-semibold;
  color: var(--color-text-primary);
}

/* Quick Contact */
.quick-contact {
  @apply relative overflow-hidden;
}

.contact-methods {
  @apply space-y-4;
}

.contact-method {
  @apply flex items-center gap-4 p-4 rounded-lg transition-all duration-300;
  @apply hover:bg-secondary-50 dark:hover:bg-secondary-800;
  @apply border border-transparent hover:border-primary-200 dark:hover:border-primary-800;
}

.method-icon {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

.method-icon.phone {
  @apply bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400;
}

.method-icon.email {
  @apply bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400;
}

.method-icon .icon {
  @apply w-6 h-6;
}

.method-content {
  @apply flex-1;
}

.method-label {
  @apply block text-sm font-medium mb-1;
  color: var(--color-text-secondary);
}

.method-value {
  @apply block font-semibold;
  color: var(--color-text-primary);
}

.method-arrow {
  @apply w-5 h-5 opacity-0 transform translate-x-2 transition-all duration-300;
  color: var(--color-primary);
}

.contact-method:hover .method-arrow {
  @apply opacity-100 transform translate-x-0;
}

/* Location Card */
.location-content {
  @apply space-y-6;
}

.location-info {
  @apply flex items-center gap-3;
}

.location-icon {
  @apply w-5 h-5;
  color: var(--color-primary);
}

.location-text {
  @apply font-medium;
  color: var(--color-text-primary);
}

.availability-info {
  @apply space-y-3;
}

.availability-status {
  @apply flex items-center gap-3;
}

.status-dot {
  @apply w-3 h-3 rounded-full;
}

.status-dot.available {
  @apply bg-green-500;
  animation: pulse 2s infinite;
}

.status-text {
  @apply font-medium;
  color: var(--color-text-primary);
}

.availability-note {
  @apply text-sm;
  color: var(--color-text-secondary);
}

/* Social Links */
.social-links {
  @apply grid grid-cols-1 gap-3;
}

.social-link {
  @apply flex items-center gap-4 p-4 rounded-lg transition-all duration-300;
  @apply hover:bg-secondary-50 dark:hover:bg-secondary-800;
  @apply border border-transparent hover:border-primary-200 dark:hover:border-primary-800;
}

.social-icon {
  @apply w-6 h-6;
}

.social-link.github .social-icon {
  color: #333;
}

.social-link.linkedin .social-icon {
  color: #0077b5;
}

.social-link.twitter .social-icon {
  color: #1da1f2;
}

.social-label {
  @apply font-medium;
  color: var(--color-text-primary);
}

/* Response Card */
.response-content {
  @apply space-y-6;
}

.response-header {
  @apply flex items-start gap-4;
}

.response-icon {
  @apply w-8 h-8 mt-1;
  color: var(--color-primary);
}

.response-title {
  @apply text-lg font-semibold mb-1;
  color: var(--color-text-primary);
}

.response-subtitle {
  @apply text-sm;
  color: var(--color-text-secondary);
}

.response-stats {
  @apply grid grid-cols-2 gap-4;
}

.stat {
  @apply text-center p-4 rounded-lg;
  background-color: var(--color-surface);
}

.stat-value {
  @apply block text-2xl font-bold mb-1;
  color: var(--color-primary);
}

.stat-label {
  @apply text-xs font-medium;
  color: var(--color-text-secondary);
}

/* Success Modal */
.success-content {
  @apply flex items-start gap-4;
}

.success-icon {
  @apply w-12 h-12 rounded-full flex items-center justify-center;
  @apply bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400;
}

.success-icon .icon {
  @apply w-6 h-6;
}

.success-message {
  @apply flex-1;
}

.success-title {
  @apply text-lg font-semibold mb-2;
  color: var(--color-text-primary);
}

.success-description {
  @apply text-sm;
  color: var(--color-text-secondary);
}

/* Animations */
.animate-on-scroll {
  @apply opacity-0 transform translate-y-8;
  @apply transition-all duration-700 ease-out;
  transition-delay: var(--delay, 0s);
}

.animate-on-scroll.in-view {
  @apply opacity-100 transform translate-y-0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-grid {
    @apply grid-cols-1 gap-8;
  }
  
  .form-grid {
    @apply grid-cols-1;
  }
  
  .form-actions {
    @apply flex-col;
  }
  
  .response-stats {
    @apply grid-cols-1;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .contact-method,
  .social-link,
  .method-arrow {
    transition: none !important;
  }
  
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .status-dot.available {
    animation: none !important;
  }
  
  .contact-method:hover .method-arrow {
    transform: none !important;
  }
}
</style>