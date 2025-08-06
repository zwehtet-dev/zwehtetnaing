<template>
  <section id="hero" class="hero-section">
    <!-- Background Elements -->
    <div class="hero-background">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
      <div class="floating-elements">
        <div v-for="i in 6" :key="i" class="floating-element" :style="{
          '--delay': `${i * 0.5}s`,
          '--duration': `${4 + i}s`,
          '--size': `${20 + i * 10}px`
        }"></div>
      </div>
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- Profile Image -->
        <div class="hero-avatar animate-on-scroll">
          <div class="avatar-container">
            <div class="avatar-image">
              <Icon icon="ph:user-circle-bold" class="w-full h-full" />
            </div>
            <div class="avatar-glow"></div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="hero-text">
          <div class="hero-greeting animate-on-scroll" style="--delay: 0.2s">
            <span class="greeting-text">{{ $t('hero.greeting') }}</span>
          </div>

          <h1 class="hero-name animate-on-scroll" style="--delay: 0.4s">
            <span class="name-text">{{ PERSONAL_INFO.name }}</span>
          </h1>

          <div class="hero-title animate-on-scroll" style="--delay: 0.6s">
            <span class="title-text">{{ $t('hero.title') }}</span>
          </div>

          <p class="hero-tagline animate-on-scroll" style="--delay: 0.8s">
            {{ $t('hero.tagline') }}
          </p>

          <p class="hero-description animate-on-scroll" style="--delay: 1s">
            {{ $t('hero.description') }}
          </p>
        </div>

        <!-- Call to Action -->
        <div class="hero-actions animate-on-scroll" style="--delay: 1.2s">
          <BaseButton variant="primary" size="lg" icon-right="ph:arrow-right-bold" class="cta-primary"
            @click="scrollToProjects">
            {{ $t('hero.cta.viewWork') }}
          </BaseButton>

          <BaseButton variant="secondary" size="lg" icon-right="ph:envelope-bold" class="cta-secondary"
            @click="scrollToContact">
            {{ $t('hero.cta.hireMe') }}
          </BaseButton>

          <BaseButton variant="ghost" size="lg" icon-right="ph:download-bold" class="cta-download" @click="downloadCV">
            {{ $t('hero.cta.downloadCV') }}
          </BaseButton>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator animate-on-scroll" style="--delay: 1.4s">
          <button @click="scrollToAbout" class="scroll-button focus-ring" :aria-label="$t('hero.scrollDown')">
            <span class="scroll-text">{{ $t('hero.scrollDown') }}</span>
            <Icon icon="ph:arrow-down-bold" class="scroll-icon" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useHeroAnimations } from '@/composables/useHeroAnimations'
import { scrollToElement } from '@/utils/helpers'
import { PERSONAL_INFO } from '@/utils/constants'

// Animations
const { observeElements } = useScrollAnimation({ threshold: 0.1, delay: 100 })
const { initAnimations } = useHeroAnimations()

// Methods
const scrollToProjects = (): void => {
  scrollToElement('#projects', 80)
}

const scrollToContact = (): void => {
  scrollToElement('#contact', 80)
}

const scrollToAbout = (): void => {
  scrollToElement('#about', 80)
}

const downloadCV = (): void => {
  // Create a temporary link to download CV
  const link = document.createElement('a')
  link.href = '/cv/zwe-htet-naing-cv.pdf' // This would be the actual CV file
  link.download = 'Zwe-Htet-Naing-CV.pdf'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  // Initialize hero animations
  initAnimations()

  // Observe elements for scroll animations
  observeElements('.animate-on-scroll')
})
</script>

<style scoped>
.hero-section {
  @apply relative min-h-screen flex items-center justify-center overflow-hidden;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
}

/* Background Elements */
.hero-background {
  @apply absolute inset-0 pointer-events-none;
}

.bg-gradient {
  @apply absolute inset-0;
  background: radial-gradient(ellipse at center,
      color-mix(in srgb, var(--color-primary) 5%, transparent) 0%,
      transparent 70%);
}

.bg-pattern {
  @apply absolute inset-0 opacity-30;
  background-image: radial-gradient(circle at 25% 25%,
      color-mix(in srgb, var(--color-primary) 10%, transparent) 0%,
      transparent 50%),
    radial-gradient(circle at 75% 75%,
      color-mix(in srgb, var(--color-accent) 10%, transparent) 0%,
      transparent 50%);
}

.floating-elements {
  @apply absolute inset-0;
}

.floating-element {
  @apply absolute rounded-full opacity-20;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  animation: float var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

.floating-element:nth-child(1) {
  top: 10%;
  left: 10%;
}

.floating-element:nth-child(2) {
  top: 20%;
  right: 15%;
}

.floating-element:nth-child(3) {
  top: 60%;
  left: 5%;
}

.floating-element:nth-child(4) {
  bottom: 20%;
  right: 10%;
}

.floating-element:nth-child(5) {
  bottom: 30%;
  left: 20%;
}

.floating-element:nth-child(6) {
  top: 40%;
  right: 30%;
}

/* Container */
.hero-container {
  @apply relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.hero-content {
  @apply text-center space-y-8 lg:space-y-12;
}

/* Avatar */
.hero-avatar {
  @apply flex justify-center mb-8;
}

.avatar-container {
  @apply relative;
}

.avatar-image {
  @apply w-32 h-32 lg:w-40 lg:h-40 rounded-full;
  @apply bg-gradient-to-br from-primary-500 to-accent-500;
  @apply flex items-center justify-center text-white;
  @apply shadow-luxury;
}

.avatar-glow {
  @apply absolute inset-0 rounded-full;
  @apply bg-gradient-to-br from-primary-400 to-accent-400;
  @apply opacity-30 blur-xl scale-110;
  @apply animate-pulse;
}

/* Text Content */
.hero-text {
  @apply space-y-4 lg:space-y-6;
}

.hero-greeting {
  @apply text-lg md:text-xl font-medium;
  color: var(--color-text-secondary);
}

.greeting-text {
  @apply inline-block;
}

.hero-name {
  @apply text-4xl md:text-6xl lg:text-7xl font-bold leading-tight;
}

.name-text {
  @apply inline-block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent;
  @apply dark:from-primary-400 dark:to-accent-400;
}

.hero-title {
  @apply text-xl md:text-2xl lg:text-3xl font-semibold;
}

.title-text {
  @apply inline-block;
  color: var(--color-primary);
}

.hero-tagline {
  @apply text-lg md:text-xl lg:text-2xl font-medium max-w-4xl mx-auto leading-relaxed;
  color: var(--color-text-primary);
}

.hero-description {
  @apply text-base md:text-lg max-w-2xl mx-auto leading-relaxed;
  color: var(--color-text-secondary);
}

/* Actions */
.hero-actions {
  @apply flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center;
}

.hero-actions :deep(.cta-primary) {
  @apply relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  box-shadow: 0 10px 30px -5px color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.hero-actions :deep(.cta-primary:hover) {
  box-shadow: 0 15px 40px -5px color-mix(in srgb, var(--color-primary) 60%, transparent);
  transform: translateY(-2px);
}

.hero-actions :deep(.cta-primary::before) {
  content: '';
  @apply absolute inset-0 bg-white/20;
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.hero-actions :deep(.cta-primary:hover::before) {
  transform: translateX(100%);
}

.hero-actions :deep(.cta-secondary) {
  @apply relative;
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.hero-actions :deep(.cta-secondary:hover) {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 10px 30px -5px color-mix(in srgb, var(--color-primary) 40%, transparent);
  transform: translateY(-2px);
}

.hero-actions :deep(.cta-download) {
  @apply relative;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.hero-actions :deep(.cta-download:hover) {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 5%, transparent);
  transform: translateY(-1px);
}

/* Scroll Indicator */
.scroll-indicator {
  @apply mt-12 lg:mt-16;
}

.scroll-button {
  @apply flex flex-col items-center space-y-2 text-sm font-medium;
  @apply transition-all duration-300 hover:transform hover:translate-y-1;
  color: var(--color-text-secondary);
}

.scroll-button:hover {
  color: var(--color-primary);
}

.scroll-text {
  @apply text-xs uppercase tracking-wider;
}

.scroll-icon {
  @apply w-5 h-5 animate-bounce;
}

/* Animations */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  33% {
    transform: translateY(-20px) rotate(120deg);
  }

  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

.animate-on-scroll {
  @apply opacity-0 transform translate-y-8;
  @apply transition-all duration-700 ease-out;
  transition-delay: var(--delay, 0s);
}

.animate-on-scroll.in-view {
  @apply opacity-100 transform translate-y-0;
}

/* Specific animations for different elements */
.hero-avatar.animate-on-scroll {
  animation: fadeInScale 0.8s ease-out forwards;
  animation-delay: 0s;
}

.hero-greeting.animate-on-scroll.in-view {
  animation: slideInLeft 0.6s ease-out forwards;
}

.hero-name.animate-on-scroll.in-view {
  animation: textReveal 0.8s ease-out forwards;
}

.hero-title.animate-on-scroll.in-view {
  animation: slideInRight 0.6s ease-out forwards;
}

.hero-tagline.animate-on-scroll.in-view {
  animation: fadeInUp 0.6s ease-out forwards;
}

.hero-description.animate-on-scroll.in-view {
  animation: fadeInUp 0.6s ease-out forwards;
}

.hero-actions.animate-on-scroll.in-view {
  animation: fadeInScale 0.6s ease-out forwards;
}

.scroll-indicator.animate-on-scroll.in-view {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Staggered animation for action buttons */
.hero-actions :deep(.base-button) {
  @apply opacity-0 transform translate-y-4;
  animation: fadeInUp 0.5s ease-out forwards;
}

.hero-actions :deep(.base-button:nth-child(1)) {
  animation-delay: 1.4s;
}

.hero-actions :deep(.base-button:nth-child(2)) {
  animation-delay: 1.6s;
}

.hero-actions :deep(.base-button:nth-child(3)) {
  animation-delay: 1.8s;
}

/* Typing effect for name */
.name-text {
  @apply inline-block;
  overflow: hidden;
  border-right: 2px solid var(--color-primary);
  white-space: nowrap;
  animation: typing 2s steps(20) 0.5s forwards, blink 1s infinite 2.5s;
  width: 0;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes blink {

  0%,
  50% {
    border-color: var(--color-primary);
  }

  51%,
  100% {
    border-color: transparent;
  }
}

/* Parallax effect for floating elements */
.floating-element {
  will-change: transform;
}

/* Hover effects */
.hero-avatar:hover .avatar-image {
  @apply transform scale-105;
  transition: transform 0.3s ease;
}

.hero-avatar:hover .avatar-glow {
  @apply opacity-50 scale-125;
  transition: all 0.3s ease;
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2;
  ring-offset-color: var(--color-background);
}

/* Responsive Design */
@media (max-width: 640px) {
  .hero-name {
    @apply text-3xl;
  }

  .hero-title {
    @apply text-lg;
  }

  .hero-tagline {
    @apply text-base;
  }

  .hero-actions {
    @apply flex-col w-full;
  }

  .hero-actions :deep(.base-button) {
    @apply w-full;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {

  .floating-element,
  .avatar-glow,
  .scroll-icon {
    animation: none !important;
  }

  .animate-on-scroll {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .scroll-button:hover {
    transform: none !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .name-text {
    @apply text-primary-600 dark:text-primary-400;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
  }

  .floating-element {
    @apply opacity-40;
  }
}
</style>