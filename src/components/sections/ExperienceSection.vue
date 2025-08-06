<template>
  <section id="experience" class="experience-section">
    <div class="experience-container">
      <!-- Section Header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">{{ $t('experience.title') }}</h2>
        <p class="section-subtitle">{{ $t('experience.subtitle') }}</p>
        <div class="title-decoration"></div>
      </div>
      
      <!-- Experience Stats -->
      <div class="experience-stats animate-on-scroll" style="--delay: 0.2s">
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number" data-target="2">0</div>
            <div class="stat-label">{{ $t('about.stats.experience') }}</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number" data-target="1">0</div>
            <div class="stat-label">{{ $t('experience.companies') }}</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number" data-target="15">0</div>
            <div class="stat-label">{{ $t('about.stats.projects') }}</div>
          </div>
        </div>
      </div>
      
      <!-- Experience Timeline -->
      <div class="experience-content">
        <div class="timeline-container">
          <!-- Timeline Line -->
          <div class="timeline-line"></div>
          
          <!-- Experience Items -->
          <div class="timeline">
            <div 
              v-for="(exp, index) in EXPERIENCE" 
              :key="exp.id"
              class="timeline-item animate-on-scroll"
              :style="{ '--delay': `${0.4 + index * 0.2}s` }"
            >
              <!-- Timeline Marker -->
              <div class="timeline-marker">
                <div class="marker-outer">
                  <div class="marker-inner">
                    <Icon icon="ph:briefcase-bold" class="marker-icon" />
                  </div>
                </div>
                <div class="marker-pulse"></div>
              </div>
              
              <!-- Experience Card -->
              <BaseCard class="experience-card" hoverable>
                <!-- Card Header -->
                <div class="card-header">
                  <div class="company-info">
                    <div class="company-logo">
                      <Icon icon="ph:buildings-bold" class="logo-icon" />
                    </div>
                    <div class="company-details">
                      <h3 class="company-name">{{ exp.company }}</h3>
                      <div class="company-meta">
                        <Icon icon="ph:map-pin-bold" class="meta-icon" />
                        <span class="company-location">{{ $t('contact.info.location') }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="duration-badge">
                    <Icon icon="ph:calendar-bold" class="duration-icon" />
                    <span class="duration-text">{{ exp.duration }}</span>
                  </div>
                </div>
                
                <!-- Position Info -->
                <div class="position-info">
                  <h4 class="position-title">{{ exp.position }}</h4>
                  <div class="position-type">
                    <Icon icon="ph:user-bold" class="type-icon" />
                    <span>{{ $t('experience.fullTime') }}</span>
                  </div>
                </div>
                
                <!-- Experience Description -->
                <div class="experience-description">
                  <p class="description-text">{{ exp.description }}</p>
                </div>
                
                <!-- Key Responsibilities -->
                <div class="responsibilities-section">
                  <div class="section-title-small">
                    <Icon icon="ph:list-checks-bold" class="section-icon" />
                    <h5 class="section-title-text">{{ $t('experience.responsibilities') }}</h5>
                  </div>
                  
                  <ul class="responsibilities-list">
                    <li 
                      v-for="(responsibility, idx) in exp.responsibilities" 
                      :key="responsibility"
                      class="responsibility-item"
                      :style="{ '--item-delay': `${idx * 0.1}s` }"
                    >
                      <div class="responsibility-marker">
                        <Icon icon="ph:check-circle-bold" class="responsibility-icon" />
                      </div>
                      <span class="responsibility-text">{{ responsibility }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Key Achievements -->
                <div class="achievements-section" v-if="exp.achievements">
                  <div class="section-title-small">
                    <Icon icon="ph:trophy-bold" class="section-icon" />
                    <h5 class="section-title-text">{{ $t('experience.achievements') }}</h5>
                  </div>
                  
                  <ul class="achievements-list">
                    <li 
                      v-for="achievement in exp.achievements" 
                      :key="achievement"
                      class="achievement-item"
                    >
                      <div class="achievement-marker">
                        <Icon icon="ph:star-bold" class="achievement-icon" />
                      </div>
                      <span class="achievement-text">{{ achievement }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Technologies Used -->
                <div class="technologies-section">
                  <div class="section-title-small">
                    <Icon icon="ph:stack-bold" class="section-icon" />
                    <h5 class="section-title-text">{{ $t('experience.technologies') }}</h5>
                  </div>
                  
                  <div class="tech-tags">
                    <span 
                      v-for="tech in exp.technologies" 
                      :key="tech"
                      class="tech-tag"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
                
                <!-- Experience Actions -->
                <div class="experience-actions">
                  <BaseButton 
                    variant="ghost" 
                    size="sm"
                    icon-left="ph:arrow-square-out-bold"
                    @click="viewCompany(exp.company)"
                  >
                    {{ $t('experience.viewCompany') }}
                  </BaseButton>
                  
                  <BaseButton 
                    variant="ghost" 
                    size="sm"
                    icon-left="ph:envelope-bold"
                    @click="requestReference"
                  >
                    {{ $t('experience.requestReference') }}
                  </BaseButton>
                </div>
              </BaseCard>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Career Summary -->
      <div class="career-summary animate-on-scroll" style="--delay: 1s">
        <BaseCard class="summary-card" variant="glass">
          <div class="summary-content">
            <div class="summary-header">
              <Icon icon="ph:chart-line-up-bold" class="summary-icon" />
              <h3 class="summary-title">{{ $t('experience.careerSummary') }}</h3>
            </div>
            
            <p class="summary-text">
              {{ $t('experience.summaryText') }}
            </p>
            
            <div class="summary-highlights">
              <div class="highlight-item">
                <Icon icon="ph:code-bold" class="highlight-icon" />
                <span class="highlight-text">{{ $t('experience.highlight1') }}</span>
              </div>
              <div class="highlight-item">
                <Icon icon="ph:users-three-bold" class="highlight-icon" />
                <span class="highlight-text">{{ $t('experience.highlight2') }}</span>
              </div>
              <div class="highlight-item">
                <Icon icon="ph:rocket-launch-bold" class="highlight-icon" />
                <span class="highlight-text">{{ $t('experience.highlight3') }}</span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useFileDownload } from '@/composables/useFileDownload'
import { EXPERIENCE } from '@/utils/constants'

// Composables
const { observeElements } = useScrollAnimation({ threshold: 0.1, delay: 100 })
const { showToast } = useFileDownload()

// Methods
const viewCompany = (companyName: string): void => {
  // In a real app, this would navigate to company info or website
  showToast(`Learn more about ${companyName}`, 'info')
}

const requestReference = (): void => {
  // In a real app, this would open a contact form or email
  showToast('Reference request feature coming soon!', 'info')
}

// Counter animation for stats
const animateCounters = (): void => {
  const counters = document.querySelectorAll('.stat-number')
  
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target') || '0')
    const increment = target / 50
    let current = 0
    
    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current).toString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toString()
      }
    }
    
    updateCounter()
  })
}

onMounted(() => {
  // Observe elements for scroll animations
  observeElements('.animate-on-scroll')
  
  // Start counter animation when section is visible
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 600)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  
  const experienceSection = document.getElementById('experience')
  if (experienceSection) {
    statsObserver.observe(experienceSection)
  }
  
  // Animate timeline line drawing
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const timelineLine = entry.target.querySelector('.timeline-line') as HTMLElement
          if (timelineLine) {
            timelineLine.style.animation = 'drawLine 2s ease-out forwards'
          }
          timelineObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  
  const timelineContainer = document.querySelector('.timeline-container')
  if (timelineContainer) {
    timelineObserver.observe(timelineContainer)
  }
  
  // Animate responsibility items when timeline items come into view
  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const responsibilityItems = entry.target.querySelectorAll('.responsibility-item')
          responsibilityItems.forEach((item, index) => {
            setTimeout(() => {
              ;(item as HTMLElement).style.animationDelay = `${index * 0.1}s`
              ;(item as HTMLElement).classList.add('animate-in')
            }, 300)
          })
          itemObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  
  const timelineItems = document.querySelectorAll('.timeline-item')
  timelineItems.forEach(item => {
    itemObserver.observe(item)
  })
})
</script>

<style scoped>
.experience-section {
  @apply py-20 lg:py-32 relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
}

.experience-section::before {
  content: '';
  @apply absolute top-0 left-0 w-full h-full opacity-20;
  background-image: radial-gradient(
    circle at 25% 25%,
    color-mix(in srgb, var(--color-primary) 15%, transparent) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 75% 75%,
    color-mix(in srgb, var(--color-accent) 15%, transparent) 0%,
    transparent 50%
  );
}

.experience-container {
  @apply relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Section Header */
.section-header {
  @apply text-center mb-12 lg:mb-16;
}

.section-title {
  @apply text-3xl md:text-4xl lg:text-5xl font-bold mb-4;
  color: var(--color-text-primary);
}

.section-subtitle {
  @apply text-lg md:text-xl mb-6;
  color: var(--color-text-secondary);
}

.title-decoration {
  @apply w-24 h-1 mx-auto rounded-full;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

/* Experience Stats */
.experience-stats {
  @apply mb-16;
}

.stats-container {
  @apply flex items-center justify-center gap-8 lg:gap-12;
}

.stat-item {
  @apply text-center;
}

.stat-number {
  @apply text-3xl lg:text-4xl font-bold mb-2;
  color: var(--color-text-primary);
}

.stat-label {
  @apply text-sm font-medium;
  color: var(--color-text-secondary);
}

.stat-divider {
  @apply w-px h-12 bg-secondary-300 dark:bg-secondary-600;
}

/* Timeline Container */
.timeline-container {
  @apply relative max-w-4xl mx-auto;
}

.timeline-line {
  @apply absolute left-8 top-0 w-0.5;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-accent));
  height: 0;
  opacity: 0;
  transform-origin: top;
}

.timeline {
  @apply space-y-12 lg:space-y-16;
}

.timeline-item {
  @apply relative pl-20;
}

/* Timeline Marker */
.timeline-marker {
  @apply absolute left-0 top-8;
}

.marker-outer {
  @apply relative w-16 h-16 rounded-full flex items-center justify-center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  box-shadow: 0 0 0 4px var(--color-background), 0 0 0 8px color-mix(in srgb, var(--color-primary) 20%, transparent);
  animation: bounceIn 0.6s ease-out forwards;
  animation-delay: calc(var(--delay, 0s) + 0.3s);
  opacity: 0;
  transform: scale(0.3);
}

.marker-inner {
  @apply w-12 h-12 rounded-full flex items-center justify-center;
  background-color: var(--color-background);
}

.marker-icon {
  @apply w-6 h-6;
  color: var(--color-primary);
}

.marker-pulse {
  @apply absolute inset-0 rounded-full;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  animation: pulse 2s infinite;
  opacity: 0.3;
}

/* Experience Card */
.experience-card {
  @apply p-8 lg:p-10;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: calc(var(--delay, 0s) + 0.5s);
  opacity: 0;
  transform: translateY(20px);
}

.card-header {
  @apply flex items-start justify-between mb-6;
}

.company-info {
  @apply flex items-start gap-4;
}

.company-logo {
  @apply w-12 h-12 rounded-xl flex items-center justify-center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
}

.logo-icon {
  @apply w-6 h-6 text-white;
}

.company-details {
  @apply space-y-1;
}

.company-name {
  @apply text-xl font-bold;
  color: var(--color-text-primary);
}

.company-meta {
  @apply flex items-center gap-2 text-sm;
  color: var(--color-text-secondary);
}

.meta-icon {
  @apply w-4 h-4;
}

.duration-badge {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg;
  @apply bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300;
}

.duration-icon {
  @apply w-4 h-4;
}

.duration-text {
  @apply text-sm font-medium;
}

/* Position Info */
.position-info {
  @apply mb-6;
}

.position-title {
  @apply text-2xl font-semibold mb-2;
  color: var(--color-text-primary);
}

.position-type {
  @apply flex items-center gap-2 text-sm;
  color: var(--color-primary);
}

.type-icon {
  @apply w-4 h-4;
}

/* Experience Description */
.experience-description {
  @apply mb-8;
}

.description-text {
  @apply text-base leading-relaxed;
  color: var(--color-text-secondary);
}

/* Section Titles */
.section-title-small {
  @apply flex items-center gap-3 mb-4;
}

.section-icon {
  @apply w-5 h-5;
  color: var(--color-primary);
}

.section-title-text {
  @apply text-lg font-semibold;
  color: var(--color-text-primary);
}

/* Responsibilities */
.responsibilities-section {
  @apply mb-8;
}

.responsibilities-list {
  @apply space-y-3;
}

.responsibility-item {
  @apply flex items-start gap-3;
  @apply opacity-0 transform translate-x-4;
}

.responsibility-item.animate-in {
  animation: slideInLeft 0.5s ease-out forwards;
}

.responsibility-marker {
  @apply flex-shrink-0 mt-0.5;
}

.responsibility-icon {
  @apply w-5 h-5;
  color: var(--color-primary);
}

.responsibility-text {
  @apply text-sm leading-relaxed;
  color: var(--color-text-secondary);
}

/* Achievements */
.achievements-section {
  @apply mb-8;
}

.achievements-list {
  @apply space-y-3;
}

.achievement-item {
  @apply flex items-start gap-3;
}

.achievement-marker {
  @apply flex-shrink-0 mt-0.5;
}

.achievement-icon {
  @apply w-5 h-5;
  color: var(--color-accent);
}

.achievement-text {
  @apply text-sm leading-relaxed font-medium;
  color: var(--color-text-primary);
}

/* Technologies */
.technologies-section {
  @apply mb-8;
}

.tech-tags {
  @apply flex flex-wrap gap-2;
}

.tech-tag {
  @apply px-3 py-1 text-xs font-medium rounded-full;
  @apply bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300;
  @apply transition-all duration-200 hover:scale-105;
}

/* Experience Actions */
.experience-actions {
  @apply flex flex-wrap gap-3 pt-6 border-t;
  border-color: var(--color-border-light);
}

/* Career Summary */
.career-summary {
  @apply mt-16;
}

.summary-card {
  @apply p-8 lg:p-12;
}

.summary-content {
  @apply space-y-6;
}

.summary-header {
  @apply flex items-center gap-4;
}

.summary-icon {
  @apply w-8 h-8;
  color: var(--color-primary);
}

.summary-title {
  @apply text-2xl font-bold;
  color: var(--color-text-primary);
}

.summary-text {
  @apply text-base lg:text-lg leading-relaxed;
  color: var(--color-text-secondary);
}

.summary-highlights {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.highlight-item {
  @apply flex items-center gap-3 p-4 rounded-lg;
  background-color: var(--color-surface);
}

.highlight-icon {
  @apply w-6 h-6 flex-shrink-0;
  color: var(--color-primary);
}

.highlight-text {
  @apply text-sm font-medium;
  color: var(--color-text-primary);
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes drawLine {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 100%;
    opacity: 0.3;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Hover Effects */
.experience-card:hover .marker-pulse {
  animation-duration: 1s;
}

.experience-card:hover .tech-tag {
  @apply transform scale-105;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-item {
    @apply pl-16;
  }
  
  .marker-outer {
    @apply w-12 h-12;
  }
  
  .marker-inner {
    @apply w-8 h-8;
  }
  
  .marker-icon {
    @apply w-4 h-4;
  }
  
  .timeline-line {
    @apply left-6;
  }
  
  .stats-container {
    @apply flex-col gap-6;
  }
  
  .stat-divider {
    @apply w-12 h-px;
  }
  
  .card-header {
    @apply flex-col items-start gap-4;
  }
  
  .summary-highlights {
    @apply grid-cols-1 gap-3;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .responsibility-item,
  .tech-tag {
    transition: none !important;
    animation: none !important;
  }
  
  .animate-on-scroll,
  .responsibility-item {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .marker-pulse {
    animation: none !important;
  }
  
  .tech-tag:hover,
  .experience-card:hover .tech-tag {
    transform: none !important;
  }
}
</style>