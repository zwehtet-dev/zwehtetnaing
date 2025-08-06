<template>
  <section id="about" class="about-section">
    <div class="about-container">
      <!-- Section Header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">{{ $t('about.title') }}</h2>
        <p class="section-subtitle">{{ $t('about.subtitle') }}</p>
        <div class="title-decoration"></div>
      </div>
      
      <div class="about-content">
        <!-- Main Content Grid -->
        <div class="about-grid">
          <!-- Profile Summary -->
          <div class="about-profile animate-on-scroll" style="--delay: 0.2s">
            <BaseCard class="profile-card" variant="elevated">
              <div class="profile-header">
                <div class="profile-avatar">
                  <Icon icon="ph:user-circle-bold" class="avatar-icon" />
                  <div class="avatar-status">
                    <div class="status-dot"></div>
                    <span class="status-text">{{ $t('contact.info.availability') }}</span>
                  </div>
                </div>
                
                <div class="profile-info">
                  <h3 class="profile-name">{{ PERSONAL_INFO.name }}</h3>
                  <p class="profile-title">{{ $t('hero.title') }}</p>
                  <p class="profile-location">
                    <Icon icon="ph:map-pin-bold" class="location-icon" />
                    {{ PERSONAL_INFO.contact.location }}
                  </p>
                </div>
              </div>
              
              <div class="profile-summary">
                <p class="summary-text">{{ $t('about.summary') }}</p>
              </div>
              
              <div class="profile-actions">
                <BaseButton 
                  variant="primary" 
                  size="lg"
                  icon-left="ph:download-bold"
                  :loading="isDownloading"
                  @click="downloadCV"
                  class="download-btn"
                >
                  {{ $t('about.downloadCV') }}
                </BaseButton>
                
                <BaseButton 
                  variant="secondary" 
                  size="lg"
                  icon-left="ph:envelope-bold"
                  @click="scrollToContact"
                  class="contact-btn"
                >
                  {{ $t('hero.cta.hireMe') }}
                </BaseButton>
              </div>
            </BaseCard>
          </div>
          
          <!-- Stats Cards -->
          <div class="about-stats animate-on-scroll" style="--delay: 0.4s">
            <div class="stats-grid">
              <BaseCard 
                v-for="(stat, index) in stats" 
                :key="stat.key"
                class="stat-card"
                hoverable
                :style="{ '--delay': `${0.6 + index * 0.1}s` }"
              >
                <div class="stat-content">
                  <div class="stat-icon">
                    <Icon :icon="stat.icon" class="w-8 h-8" />
                  </div>
                  <div class="stat-info">
                    <div class="stat-number" :data-target="stat.value">0</div>
                    <div class="stat-label">{{ $t(stat.key) }}</div>
                  </div>
                </div>
              </BaseCard>
            </div>
          </div>
        </div>
        
        <!-- Education & Career Timeline -->
        <div class="timeline-section animate-on-scroll" style="--delay: 0.8s">
          <BaseCard class="timeline-card">
            <div class="timeline-header">
              <h3 class="timeline-title">{{ $t('about.education') }}</h3>
              <p class="timeline-subtitle">{{ $t('about.timeline.subtitle') }}</p>
            </div>
            
            <div class="timeline-container">
              <!-- Experience Timeline -->
              <div class="timeline-group">
                <div class="timeline-group-header">
                  <Icon icon="ph:briefcase-bold" class="group-icon" />
                  <h4 class="group-title">{{ $t('experience.title') }}</h4>
                </div>
                
                <div class="timeline">
                  <div 
                    v-for="(exp, index) in EXPERIENCE" 
                    :key="exp.id"
                    class="timeline-item"
                    :style="{ '--delay': `${1 + index * 0.2}s` }"
                  >
                    <div class="timeline-marker">
                      <div class="marker-dot"></div>
                      <div class="marker-line"></div>
                    </div>
                    
                    <div class="timeline-content">
                      <div class="timeline-badge">
                        <span class="badge-text">{{ $t('about.timeline.present') }}</span>
                      </div>
                      
                      <div class="timeline-card-content">
                        <h5 class="timeline-position">{{ exp.position }}</h5>
                        <p class="timeline-company">{{ exp.company }}</p>
                        <p class="timeline-duration">{{ exp.duration }}</p>
                        
                        <ul class="timeline-responsibilities">
                          <li 
                            v-for="responsibility in exp.responsibilities.slice(0, 2)" 
                            :key="responsibility"
                            class="responsibility-item"
                          >
                            {{ responsibility }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Education Timeline -->
              <div class="timeline-group">
                <div class="timeline-group-header">
                  <Icon icon="ph:graduation-cap-bold" class="group-icon" />
                  <h4 class="group-title">{{ $t('about.education') }}</h4>
                </div>
                
                <div class="timeline">
                  <div 
                    v-for="(edu, index) in EDUCATION" 
                    :key="edu.id"
                    class="timeline-item"
                    :style="{ '--delay': `${1.4 + index * 0.2}s` }"
                  >
                    <div class="timeline-marker">
                      <div class="marker-dot"></div>
                      <div class="marker-line" v-if="index < EDUCATION.length - 1"></div>
                    </div>
                    
                    <div class="timeline-content">
                      <div class="timeline-badge" :class="{ 'in-progress': edu.status === 'In Progress' }">
                        <span class="badge-text">
                          {{ edu.status === 'In Progress' ? $t('about.timeline.inProgress') : $t('about.timeline.completed') }}
                        </span>
                      </div>
                      
                      <div class="timeline-card-content">
                        <h5 class="timeline-course">{{ edu.course }}</h5>
                        <p class="timeline-institution">{{ edu.institution }}</p>
                        <p class="timeline-duration">{{ edu.duration }}</p>
                        <p class="timeline-location">
                          <Icon icon="ph:map-pin-bold" class="location-icon" />
                          {{ edu.location }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
        
        <!-- Skills Preview -->
        <div class="skills-preview animate-on-scroll" style="--delay: 1.2s">
          <BaseCard class="skills-card" variant="glass">
            <div class="skills-header">
              <h3 class="skills-title">{{ $t('skills.technical') }}</h3>
              <BaseButton 
                variant="ghost" 
                size="sm"
                icon-right="ph:arrow-right-bold"
                @click="scrollToSkills"
              >
                {{ $t('common.showMore') }}
              </BaseButton>
            </div>
            
            <div class="skills-list">
              <div 
                v-for="skill in topSkills" 
                :key="skill.name"
                class="skill-item"
              >
                <div class="skill-info">
                  <Icon :icon="skill.icon" class="skill-icon" />
                  <span class="skill-name">{{ skill.name }}</span>
                </div>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div 
                      class="skill-progress" 
                      :style="{ width: `${skill.level}%` }"
                    ></div>
                  </div>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useFileDownload } from '@/composables/useFileDownload'
import { scrollToElement } from '@/utils/helpers'
import { PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION } from '@/utils/constants'

// Composables
const { observeElements } = useScrollAnimation({ threshold: 0.1, delay: 100 })
const { isDownloading, downloadFile } = useFileDownload()

// Computed
const topSkills = computed(() => SKILLS.technical.slice(0, 5))

const stats = computed(() => [
  {
    key: 'about.stats.experience',
    value: 2,
    icon: 'ph:calendar-bold'
  },
  {
    key: 'about.stats.projects',
    value: 15,
    icon: 'ph:code-bold'
  },
  {
    key: 'about.stats.technologies',
    value: SKILLS.technical.length,
    icon: 'ph:stack-bold'
  },
  {
    key: 'about.stats.clients',
    value: 5,
    icon: 'ph:users-bold'
  }
])

// Methods
const downloadCV = async (): Promise<void> => {
  await downloadFile(
    '/cv/zwe-htet-naing-cv.pdf',
    'Zwe-Htet-Naing-CV.pdf',
    {
      showNotification: true,
      fallbackAction: scrollToContact
    }
  )
}

const scrollToContact = (): void => {
  scrollToElement('#contact', 80)
}

const scrollToSkills = (): void => {
  scrollToElement('#skills', 80)
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 600)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    observer.observe(aboutSection)
  }
})
</script>

<style scoped>
.about-section {
  @apply py-20 lg:py-32 relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
}

.about-section::before {
  content: '';
  @apply absolute top-0 left-0 w-full h-full opacity-30;
  background-image: radial-gradient(
    circle at 20% 80%,
    color-mix(in srgb, var(--color-primary) 10%, transparent) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 20%,
    color-mix(in srgb, var(--color-accent) 10%, transparent) 0%,
    transparent 50%
  );
}

.about-container {
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
  @apply text-lg md:text-xl mb-6;
  color: var(--color-text-secondary);
}

.title-decoration {
  @apply w-24 h-1 mx-auto rounded-full;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

/* Content Grid */
.about-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12;
}

/* Profile Card */
.profile-card {
  @apply p-8 lg:p-10;
}

.profile-header {
  @apply flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8;
}

.profile-avatar {
  @apply relative flex-shrink-0;
}

.avatar-icon {
  @apply w-24 h-24 lg:w-28 lg:h-28 rounded-full;
  @apply bg-gradient-to-br from-primary-500 to-accent-500 text-white p-4;
  @apply shadow-luxury;
}

.avatar-status {
  @apply absolute -bottom-2 -right-2 flex items-center gap-2;
  @apply bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200;
  @apply px-3 py-1 rounded-full text-xs font-medium;
}

.status-dot {
  @apply w-2 h-2 bg-green-500 rounded-full animate-pulse;
}

.profile-info {
  @apply text-center sm:text-left;
}

.profile-name {
  @apply text-2xl lg:text-3xl font-bold mb-2;
  color: var(--color-text-primary);
}

.profile-title {
  @apply text-lg font-semibold mb-2;
  color: var(--color-primary);
}

.profile-location {
  @apply flex items-center justify-center sm:justify-start gap-2 text-sm;
  color: var(--color-text-secondary);
}

.location-icon {
  @apply w-4 h-4;
}

.summary-text {
  @apply text-base lg:text-lg leading-relaxed mb-8;
  color: var(--color-text-secondary);
}

.profile-actions {
  @apply flex flex-col sm:flex-row gap-4;
}

/* Stats Grid */
.stats-grid {
  @apply grid grid-cols-2 gap-4;
}

.stat-card {
  @apply p-6 text-center;
}

.stat-content {
  @apply space-y-4;
}

.stat-icon {
  @apply flex justify-center;
  color: var(--color-primary);
}

.stat-number {
  @apply text-2xl lg:text-3xl font-bold;
  color: var(--color-text-primary);
}

.stat-label {
  @apply text-sm font-medium;
  color: var(--color-text-secondary);
}

/* Timeline Section */
.timeline-section {
  @apply lg:col-span-2;
}

.timeline-card {
  @apply p-8;
}

.timeline-header {
  @apply text-center mb-8;
}

.timeline-title {
  @apply text-2xl font-bold mb-2;
  color: var(--color-text-primary);
}

.timeline-subtitle {
  @apply text-base;
  color: var(--color-text-secondary);
}

.timeline-container {
  @apply space-y-12;
}

.timeline-group {
  @apply space-y-6;
}

.timeline-group-header {
  @apply flex items-center gap-3 mb-6;
}

.group-icon {
  @apply w-6 h-6;
  color: var(--color-primary);
}

.group-title {
  @apply text-lg font-semibold;
  color: var(--color-text-primary);
}

.timeline {
  @apply relative space-y-8;
}

.timeline-item {
  @apply relative flex gap-6;
  @apply opacity-0 transform translate-x-8;
  @apply transition-all duration-700 ease-out;
  transition-delay: var(--delay, 0s);
}

.timeline-item.in-view {
  @apply opacity-100 transform translate-x-0;
}

.timeline-marker {
  @apply relative flex-shrink-0 flex flex-col items-center;
}

.marker-dot {
  @apply w-4 h-4 rounded-full border-4 border-white;
  @apply shadow-md z-10;
  background-color: var(--color-primary);
}

.marker-line {
  @apply w-0.5 h-16 mt-2;
  background-color: var(--color-border);
}

.timeline-content {
  @apply flex-1 pb-8;
}

.timeline-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4;
  @apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
}

.timeline-badge.in-progress {
  @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}

.timeline-card-content {
  @apply bg-white dark:bg-secondary-800 rounded-lg p-6;
  @apply border border-secondary-200 dark:border-secondary-700;
  @apply shadow-sm hover:shadow-md transition-shadow duration-300;
}

.timeline-position,
.timeline-course {
  @apply text-lg font-semibold mb-2;
  color: var(--color-text-primary);
}

.timeline-company,
.timeline-institution {
  @apply text-base font-medium mb-1;
  color: var(--color-primary);
}

.timeline-duration {
  @apply text-sm font-medium mb-3;
  color: var(--color-text-secondary);
}

.timeline-location {
  @apply flex items-center gap-2 text-sm mb-3;
  color: var(--color-text-secondary);
}

.timeline-responsibilities {
  @apply space-y-2;
}

.responsibility-item {
  @apply text-sm leading-relaxed relative pl-4;
  color: var(--color-text-secondary);
}

.responsibility-item::before {
  content: '';
  @apply absolute left-0 top-2 w-1.5 h-1.5 rounded-full;
  background-color: var(--color-primary);
}

/* Skills Preview */
.skills-preview {
  @apply lg:col-span-2;
}

.skills-card {
  @apply p-8;
}

.skills-header {
  @apply flex items-center justify-between mb-6;
}

.skills-title {
  @apply text-xl font-semibold;
  color: var(--color-text-primary);
}

.skills-list {
  @apply space-y-4;
}

.skill-item {
  @apply flex items-center justify-between gap-4;
}

.skill-info {
  @apply flex items-center gap-3;
}

.skill-icon {
  @apply w-6 h-6;
  color: var(--color-primary);
}

.skill-name {
  @apply font-medium;
  color: var(--color-text-primary);
}

.skill-level {
  @apply flex items-center gap-3 min-w-0 flex-1 max-w-32;
}

.skill-bar {
  @apply flex-1 h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden;
}

.skill-progress {
  @apply h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full;
  @apply transition-all duration-1000 ease-out;
}

.skill-percentage {
  @apply text-sm font-medium min-w-0;
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

.stat-card {
  @apply transform transition-all duration-300;
  animation-delay: var(--delay, 0s);
}

.stat-card:hover {
  @apply transform -translate-y-2;
}

/* Button Enhancements */
.download-btn {
  @apply relative overflow-hidden transition-all duration-300;
}

.download-btn::before {
  content: '';
  @apply absolute inset-0 bg-white/20;
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.download-btn:hover::before {
  transform: translateX(100%);
}

.download-btn.loading {
  @apply opacity-75 cursor-wait;
  pointer-events: none;
}

.download-btn.loading::after {
  content: '';
  @apply absolute inset-0 flex items-center justify-center;
  background: inherit;
}

.download-btn.loading::after {
  content: '';
  @apply w-5 h-5 border-2 border-white border-t-transparent rounded-full;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Contact Button */
.contact-btn {
  @apply transition-all duration-300;
}

.contact-btn:hover {
  @apply transform -translate-y-1;
  box-shadow: 0 10px 25px -5px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

/* Responsive Design */
@media (max-width: 640px) {
  .about-grid {
    @apply grid-cols-1 gap-6;
  }
  
  .stats-grid {
    @apply grid-cols-1 gap-4;
  }
  
  .profile-actions {
    @apply flex-col;
  }
  
  .skill-level {
    @apply max-w-24;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .stat-card:hover {
    transform: none !important;
  }
  
  .status-dot {
    animation: none !important;
  }
}
</style>