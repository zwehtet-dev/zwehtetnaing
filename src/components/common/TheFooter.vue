<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="brand-content">
            <div class="brand-icon">
              <Icon icon="ph:code-bold" class="w-8 h-8" />
            </div>
            <div class="brand-text">
              <h3 class="brand-name">{{ PERSONAL_INFO.name }}</h3>
              <p class="brand-tagline">{{ $t('hero.tagline') }}</p>
            </div>
          </div>
          
          <p class="brand-description">
            {{ $t('hero.description') }}
          </p>

          <!-- Social Links -->
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              :title="social.name"
              class="social-link focus-ring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon :icon="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="section-title">{{ $t('nav.home') }}</h4>
          <ul class="footer-links">
            <li v-for="link in NAVIGATION_LINKS" :key="link.href">
              <a
                :href="link.href"
                class="footer-link focus-ring"
                @click="handleNavClick"
              >
                {{ $t(link.key) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h4 class="section-title">{{ $t('contact.title') }}</h4>
          <div class="contact-info">
            <div class="contact-item">
              <Icon icon="ph:envelope-bold" class="contact-icon" />
              <a
                :href="`mailto:${PERSONAL_INFO.contact.email}`"
                class="contact-link focus-ring"
              >
                {{ PERSONAL_INFO.contact.email }}
              </a>
            </div>
            
            <div class="contact-item">
              <Icon icon="ph:phone-bold" class="contact-icon" />
              <a
                :href="`tel:${PERSONAL_INFO.contact.phone}`"
                class="contact-link focus-ring"
              >
                {{ PERSONAL_INFO.contact.phone }}
              </a>
            </div>
            
            <div class="contact-item">
              <Icon icon="ph:map-pin-bold" class="contact-icon" />
              <span class="contact-text">
                {{ PERSONAL_INFO.contact.location }}
              </span>
            </div>
          </div>
        </div>

        <!-- Newsletter/CTA -->
        <div class="footer-section">
          <h4 class="section-title">{{ $t('contact.subtitle') }}</h4>
          <p class="section-description">
            {{ $t('contact.description') }}
          </p>
          
          <div class="footer-cta">
            <a
              href="#contact"
              class="btn-primary"
              @click="handleNavClick"
            >
              {{ $t('hero.cta.hireMe') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <!-- Copyright -->
          <div class="copyright">
            <p class="copyright-text">
              {{ $t('footer.copyright') }}
            </p>
            <p class="made-with">
              {{ $t('footer.madeWith') }}
            </p>
          </div>

          <!-- Footer Links -->
          <div class="footer-bottom-links">
            <a
              href="#"
              class="footer-bottom-link focus-ring"
              @click.prevent
            >
              {{ $t('footer.links.privacy') }}
            </a>
            <span class="separator">•</span>
            <a
              href="#"
              class="footer-bottom-link focus-ring"
              @click.prevent
            >
              {{ $t('footer.links.terms') }}
            </a>
          </div>

          <!-- Back to Top -->
          <button
            @click="scrollToTop"
            class="back-to-top focus-ring"
            :aria-label="$t('common.backToTop')"
            :title="$t('common.backToTop')"
          >
            <Icon icon="ph:arrow-up-bold" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { scrollToElement } from '@/utils/helpers'
import { PERSONAL_INFO, NAVIGATION_LINKS } from '@/utils/constants'

// Social links data
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/zwehtet',
    icon: 'ph:github-logo-bold'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/zwehtet',
    icon: 'ph:linkedin-logo-bold'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/zwehtet',
    icon: 'ph:twitter-logo-bold'
  },
  {
    name: 'Email',
    url: `mailto:${PERSONAL_INFO.contact.email}`,
    icon: 'ph:envelope-bold'
  }
]

// Methods
const handleNavClick = (event: Event): void => {
  event.preventDefault()
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  
  if (href && href.startsWith('#')) {
    scrollToElement(href, 80)
  }
}

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.footer {
  @apply mt-auto;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
  border-top: 1px solid var(--color-border-light);
}

.footer-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.footer-content {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16;
}

/* Brand Section */
.footer-brand {
  @apply lg:col-span-1;
}

.brand-content {
  @apply flex items-center space-x-3 mb-4;
}

.brand-icon {
  @apply flex items-center justify-center w-12 h-12 rounded-xl;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
}

.brand-text {
  @apply flex flex-col;
}

.brand-name {
  @apply text-xl font-bold;
  color: var(--color-text-primary);
}

.brand-tagline {
  @apply text-sm font-medium opacity-75;
  color: var(--color-text-secondary);
}

.brand-description {
  @apply text-sm leading-relaxed mb-6;
  color: var(--color-text-secondary);
}

.social-links {
  @apply flex items-center space-x-3;
}

.social-link {
  @apply flex items-center justify-center w-10 h-10 rounded-lg;
  @apply transition-all duration-200;
  @apply transform hover:scale-110 hover:-translate-y-1;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}

.social-link:hover {
  background-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-glow);
}

/* Footer Sections */
.footer-section {
  @apply space-y-4;
}

.section-title {
  @apply text-lg font-semibold mb-4;
  color: var(--color-text-primary);
}

.section-description {
  @apply text-sm leading-relaxed mb-4;
  color: var(--color-text-secondary);
}

.footer-links {
  @apply space-y-2;
}

.footer-link {
  @apply block text-sm transition-colors duration-200;
  @apply hover:translate-x-1;
  color: var(--color-text-secondary);
}

.footer-link:hover {
  color: var(--color-primary);
}

/* Contact Info */
.contact-info {
  @apply space-y-3;
}

.contact-item {
  @apply flex items-center space-x-3;
}

.contact-icon {
  @apply w-5 h-5 flex-shrink-0;
  color: var(--color-primary);
}

.contact-link {
  @apply text-sm transition-colors duration-200;
  color: var(--color-text-secondary);
}

.contact-link:hover {
  color: var(--color-primary);
}

.contact-text {
  @apply text-sm;
  color: var(--color-text-secondary);
}

/* Footer CTA */
.footer-cta {
  @apply mt-6;
}

/* Footer Bottom */
.footer-bottom {
  @apply border-t py-6;
  border-color: var(--color-border-light);
}

.footer-bottom-content {
  @apply flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0;
}

.copyright {
  @apply text-center sm:text-left;
}

.copyright-text {
  @apply text-sm font-medium;
  color: var(--color-text-primary);
}

.made-with {
  @apply text-xs mt-1;
  color: var(--color-text-secondary);
}

.footer-bottom-links {
  @apply flex items-center space-x-2 text-sm;
}

.footer-bottom-link {
  @apply transition-colors duration-200;
  color: var(--color-text-secondary);
}

.footer-bottom-link:hover {
  color: var(--color-primary);
}

.separator {
  color: var(--color-text-muted);
}

/* Back to Top */
.back-to-top {
  @apply flex items-center justify-center w-10 h-10 rounded-full;
  @apply transition-all duration-300;
  @apply transform hover:scale-110 hover:-translate-y-1;
  background-color: var(--color-primary);
  color: white;
}

.back-to-top:hover {
  box-shadow: var(--shadow-glow);
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2;
  ring-offset-color: var(--color-background);
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    @apply grid-cols-1 gap-8;
  }
  
  .footer-brand {
    @apply text-center;
  }
  
  .social-links {
    @apply justify-center;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .social-link,
  .footer-link,
  .back-to-top {
    transition: none !important;
  }
  
  .social-link:hover,
  .back-to-top:hover {
    transform: none !important;
  }
  
  .footer-link:hover {
    transform: none !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .footer {
    border-top: 2px solid var(--color-border);
  }
  
  .social-link,
  .footer-link,
  .contact-link,
  .footer-bottom-link {
    border: 1px solid transparent;
  }
  
  .social-link:hover,
  .footer-link:hover,
  .contact-link:hover,
  .footer-bottom-link:hover {
    border-color: var(--color-primary);
  }
}
</style>