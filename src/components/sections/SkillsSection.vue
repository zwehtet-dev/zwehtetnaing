<template>
  <section id="skills" class="skills-section">
    <div class="skills-container">
      <!-- Section Header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">{{ $t('skills.title') }}</h2>
        <p class="section-subtitle">{{ $t('skills.subtitle') }}</p>
        <div class="title-decoration"></div>
      </div>
      
      <!-- Skills Filter -->
      <div class="skills-filter animate-on-scroll" style="--delay: 0.2s">
        <div class="filter-buttons">
          <button
            v-for="category in skillCategories"
            :key="category.key"
            @click="activeCategory = category.key"
            class="filter-btn focus-ring"
            :class="{ 'active': activeCategory === category.key }"
          >
            <Icon :icon="category.icon" class="filter-icon" />
            <span>{{ $t(category.label) }}</span>
          </button>
        </div>
      </div>
      
      <!-- Skills Content -->
      <div class="skills-content">
        <!-- Technical Skills -->
        <Transition name="skills-fade" mode="out-in">
          <div v-if="activeCategory === 'technical'" class="skills-category">
            <div class="skills-grid">
              <BaseCard 
                v-for="(skill, index) in SKILLS.technical" 
                :key="skill.name"
                class="skill-card animate-on-scroll"
                :style="{ '--delay': `${0.4 + index * 0.1}s` }"
                hoverable
                @mouseenter="(e) => handleSkillHover(e, skill, 'technical')"
                @mouseleave="hideTooltip"
              >
                <div class="skill-content">
                  <div class="skill-header">
                    <div class="skill-icon">
                      <Icon :icon="skill.icon" class="icon" />
                    </div>
                    <div class="skill-info">
                      <h3 class="skill-name">{{ skill.name }}</h3>
                      <span class="skill-percentage">{{ skill.level }}%</span>
                    </div>
                  </div>
                  
                  <div class="skill-level">
                    <div class="skill-bar">
                      <div 
                        class="skill-progress" 
                        :style="{ 
                          width: `${skill.level}%`,
                          '--skill-level': `${skill.level}%`
                        }"
                      ></div>
                    </div>
                  </div>
                  
                  <div class="skill-proficiency">
                    <span class="proficiency-label">
                      {{ getProficiencyLabel(skill.level) }}
                    </span>
                  </div>
                </div>
              </BaseCard>
            </div>
          </div>
        </Transition>
        
        <!-- Soft Skills -->
        <Transition name="skills-fade" mode="out-in">
          <div v-if="activeCategory === 'soft'" class="skills-category">
            <div class="soft-skills-grid">
              <BaseCard 
                v-for="(skill, index) in SKILLS.soft" 
                :key="skill.name"
                class="soft-skill-card animate-on-scroll"
                :style="{ '--delay': `${0.4 + index * 0.1}s` }"
                hoverable
                @mouseenter="(e) => handleSkillHover(e, skill, 'soft')"
                @mouseleave="hideTooltip"
              >
                <div class="soft-skill-content">
                  <div class="soft-skill-header">
                    <div class="soft-skill-icon">
                      <Icon :icon="getSoftSkillIcon(skill.name)" class="icon" />
                    </div>
                    <h3 class="soft-skill-name">{{ skill.name }}</h3>
                  </div>
                  <p class="soft-skill-description">{{ skill.description }}</p>
                </div>
              </BaseCard>
            </div>
          </div>
        </Transition>
        
        <!-- Languages -->
        <Transition name="skills-fade" mode="out-in">
          <div v-if="activeCategory === 'languages'" class="skills-category">
            <div class="languages-grid">
              <BaseCard 
                v-for="(language, index) in SKILLS.languages" 
                :key="language.name"
                class="language-card animate-on-scroll"
                :style="{ '--delay': `${0.4 + index * 0.1}s` }"
                hoverable
                @mouseenter="(e) => handleSkillHover(e, language, 'language')"
                @mouseleave="hideTooltip"
              >
                <div class="language-content">
                  <div class="language-header">
                    <div class="language-flag">{{ language.flag }}</div>
                    <div class="language-info">
                      <h3 class="language-name">{{ language.name }}</h3>
                      <span class="language-level">{{ $t(`skills.proficiency.${language.level.toLowerCase()}`) }}</span>
                    </div>
                  </div>
                  
                  <div class="language-proficiency">
                    <div class="proficiency-dots">
                      <div 
                        v-for="dot in 5" 
                        :key="dot"
                        class="proficiency-dot"
                        :class="{ 'active': dot <= getLanguageDots(language.level) }"
                      ></div>
                    </div>
                  </div>
                </div>
              </BaseCard>
            </div>
          </div>
        </Transition>
      </div>
      
      <!-- Skills Summary -->
      <div class="skills-summary animate-on-scroll" style="--delay: 1s">
        <BaseCard class="summary-card" variant="glass">
          <div class="summary-content">
            <div class="summary-stats">
              <div class="stat-item">
                <div class="stat-number">{{ SKILLS.technical.length }}+</div>
                <div class="stat-label">{{ $t('skills.categories.backend') }}</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ SKILLS.soft.length }}</div>
                <div class="stat-label">{{ $t('skills.soft') }}</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ SKILLS.languages.length }}</div>
                <div class="stat-label">{{ $t('skills.languages') }}</div>
              </div>
            </div>
            
            <div class="summary-text">
              <p>{{ $t('skills.summary') }}</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useTooltip } from '@/composables/useTooltip'
import { SKILLS } from '@/utils/constants'

// Composables
const { observeElements } = useScrollAnimation({ threshold: 0.1, delay: 100 })
const { showTooltip, hideTooltip, updateTooltip } = useTooltip()

// State
const activeCategory = ref<'technical' | 'soft' | 'languages'>('technical')

// Computed
const skillCategories = computed(() => [
  {
    key: 'technical' as const,
    label: 'skills.technical',
    icon: 'ph:code-bold'
  },
  {
    key: 'soft' as const,
    label: 'skills.soft',
    icon: 'ph:users-bold'
  },
  {
    key: 'languages' as const,
    label: 'skills.languages',
    icon: 'ph:translate-bold'
  }
])

// Methods
const getProficiencyLabel = (level: number): string => {
  if (level >= 90) return 'Expert'
  if (level >= 75) return 'Advanced'
  if (level >= 60) return 'Intermediate'
  if (level >= 40) return 'Basic'
  return 'Beginner'
}

const getSoftSkillIcon = (skillName: string): string => {
  const iconMap: Record<string, string> = {
    'Team Collaboration': 'ph:users-three-bold',
    'Problem Solving': 'ph:lightbulb-bold',
    'Critical Thinking': 'ph:brain-bold',
    'Adaptability': 'ph:arrows-clockwise-bold'
  }
  return iconMap[skillName] || 'ph:star-bold'
}

const getLanguageDots = (level: string): number => {
  const levelMap: Record<string, number> = {
    'Fluent': 5,
    'Advanced': 4,
    'Intermediate': 3,
    'Basic': 2,
    'Beginner': 1
  }
  return levelMap[level] || 1
}

const getSkillTooltip = (skill: any): string => {
  const proficiency = getProficiencyLabel(skill.level)
  return `${skill.name} - ${proficiency} (${skill.level}%)\nClick to learn more about this technology`
}

const getSoftSkillTooltip = (skill: any): string => {
  return `${skill.name}\n${skill.description}`
}

const getLanguageTooltip = (language: any): string => {
  return `${language.name} - ${language.level}\nProficiency: ${getLanguageDots(language.level)}/5`
}

const handleSkillHover = (event: MouseEvent, skill: any, type: 'technical' | 'soft' | 'language'): void => {
  let tooltip = ''
  
  switch (type) {
    case 'technical':
      tooltip = getSkillTooltip(skill)
      break
    case 'soft':
      tooltip = getSoftSkillTooltip(skill)
      break
    case 'language':
      tooltip = getLanguageTooltip(skill)
      break
  }
  
  showTooltip(event, tooltip, { delay: 300 })
}

onMounted(() => {
  // Observe elements for scroll animations
  observeElements('.animate-on-scroll')
  
  // Initialize tooltips
  updateTooltip()
  
  // Animate skill bars when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate technical skill bars
          const skillBars = entry.target.querySelectorAll('.skill-progress')
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              const skillLevel = (bar as HTMLElement).style.getPropertyValue('--skill-level') || '0%'
              ;(bar as HTMLElement).style.width = skillLevel
              
              // Add glow effect for high-level skills
              const level = parseInt(skillLevel)
              if (level >= 85) {
                ;(bar as HTMLElement).classList.add('skill-expert')
              } else if (level >= 70) {
                ;(bar as HTMLElement).classList.add('skill-advanced')
              }
            }, index * 150)
          })
          
          // Animate language proficiency dots
          const proficiencyDots = entry.target.querySelectorAll('.proficiency-dot')
          proficiencyDots.forEach((dot, index) => {
            setTimeout(() => {
              if (dot.classList.contains('active')) {
                ;(dot as HTMLElement).style.animation = `dotPulse 0.6s ease-out ${index * 0.1}s`
              }
            }, 500)
          })
          
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  
  const skillsSection = document.getElementById('skills')
  if (skillsSection) {
    observer.observe(skillsSection)
  }
})

// Watch for tooltip updates
watch([activeCategory], () => {
  hideTooltip()
  updateTooltip()
})
</script>

<style scoped>
.skills-section {
  @apply py-20 lg:py-32 relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
}

.skills-section::before {
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

.skills-container {
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

/* Skills Filter */
.skills-filter {
  @apply mb-12;
}

.filter-buttons {
  @apply flex flex-wrap justify-center gap-4;
}

.filter-btn {
  @apply flex items-center gap-3 px-6 py-3 rounded-xl font-medium;
  @apply transition-all duration-300;
  @apply border border-secondary-200 dark:border-secondary-700;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}

.filter-btn:hover {
  @apply transform -translate-y-1;
  color: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 10px 25px -5px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border-color: transparent;
  box-shadow: 0 10px 25px -5px color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.filter-icon {
  @apply w-5 h-5;
}

/* Skills Grid */
.skills-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8;
}

.skill-card {
  @apply p-6 lg:p-8;
}

.skill-content {
  @apply space-y-6;
}

.skill-header {
  @apply flex items-center gap-4;
}

.skill-icon {
  @apply flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
}

.skill-icon .icon {
  @apply w-6 h-6 text-white;
}

.skill-info {
  @apply flex-1;
}

.skill-name {
  @apply text-lg font-semibold mb-1;
  color: var(--color-text-primary);
}

.skill-percentage {
  @apply text-sm font-medium;
  color: var(--color-primary);
}

.skill-level {
  @apply space-y-2;
}

.skill-bar {
  @apply w-full h-3 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden;
}

.skill-progress {
  @apply h-full rounded-full transition-all duration-1000 ease-out relative;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  width: 0%;
  overflow: hidden;
}

.skill-progress::after {
  content: '';
  @apply absolute inset-0 bg-white/20;
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

.skill-progress.skill-expert {
  box-shadow: 0 0 20px color-mix(in srgb, var(--color-accent) 50%, transparent);
  background: linear-gradient(90deg, var(--color-accent), #fbbf24);
}

.skill-progress.skill-advanced {
  box-shadow: 0 0 15px color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.skill-proficiency {
  @apply text-center;
}

.proficiency-label {
  @apply text-xs font-medium px-3 py-1 rounded-full transition-all duration-300;
  @apply bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300;
  @apply border border-primary-200 dark:border-primary-800;
}

.skill-card:hover .proficiency-label {
  @apply transform scale-105;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border-color: transparent;
}

/* Soft Skills */
.soft-skills-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8;
}

.soft-skill-card {
  @apply p-6 lg:p-8;
}

.soft-skill-content {
  @apply space-y-4;
}

.soft-skill-header {
  @apply flex items-center gap-4;
}

.soft-skill-icon {
  @apply flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center;
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
}

.soft-skill-icon .icon {
  @apply w-6 h-6 text-white;
}

.soft-skill-name {
  @apply text-lg font-semibold;
  color: var(--color-text-primary);
}

.soft-skill-description {
  @apply text-sm leading-relaxed;
  color: var(--color-text-secondary);
}

/* Languages */
.languages-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8;
}

.language-card {
  @apply p-6 lg:p-8;
}

.language-content {
  @apply space-y-6;
}

.language-header {
  @apply flex items-center gap-4;
}

.language-flag {
  @apply text-3xl;
}

.language-info {
  @apply flex-1;
}

.language-name {
  @apply text-lg font-semibold mb-1;
  color: var(--color-text-primary);
}

.language-level {
  @apply text-sm font-medium;
  color: var(--color-primary);
}

.language-proficiency {
  @apply flex justify-center;
}

.proficiency-dots {
  @apply flex gap-2;
}

.proficiency-dot {
  @apply w-3 h-3 rounded-full transition-all duration-300;
  @apply bg-secondary-300 dark:bg-secondary-600;
}

.proficiency-dot.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  @apply transform scale-110;
  box-shadow: 0 0 10px color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.language-card:hover .proficiency-dot.active {
  @apply transform scale-125;
  box-shadow: 0 0 15px color-mix(in srgb, var(--color-primary) 60%, transparent);
}

/* Skills Summary */
.skills-summary {
  @apply mt-16;
}

.summary-card {
  @apply p-8 lg:p-12;
}

.summary-content {
  @apply space-y-8;
}

.summary-stats {
  @apply flex items-center justify-center gap-8;
}

.stat-item {
  @apply text-center;
}

.stat-number {
  @apply text-2xl lg:text-3xl font-bold mb-2;
  color: var(--color-text-primary);
}

.stat-label {
  @apply text-sm font-medium;
  color: var(--color-text-secondary);
}

.stat-divider {
  @apply w-px h-12 bg-secondary-300 dark:bg-secondary-600;
}

.summary-text {
  @apply text-center max-w-2xl mx-auto;
}

.summary-text p {
  @apply text-base lg:text-lg leading-relaxed;
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

.skills-fade-enter-active,
.skills-fade-leave-active {
  transition: all 0.3s ease;
}

.skills-fade-enter-from,
.skills-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2;
  ring-offset-color: var(--color-background);
}

/* Responsive Design */
@media (max-width: 768px) {
  .filter-buttons {
    @apply flex-col;
  }
  
  .filter-btn {
    @apply justify-center;
  }
  
  .summary-stats {
    @apply flex-col gap-6;
  }
  
  .stat-divider {
    @apply w-12 h-px;
  }
}

/* Animations */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes dotPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes skillGlow {
  0%, 100% {
    box-shadow: 0 0 10px color-mix(in srgb, var(--color-primary) 30%, transparent);
  }
  50% {
    box-shadow: 0 0 20px color-mix(in srgb, var(--color-primary) 60%, transparent);
  }
}

/* Enhanced hover effects */
.skill-card:hover .skill-progress {
  animation: skillGlow 2s ease-in-out infinite;
}

.skill-card:hover .skill-icon {
  @apply transform scale-110;
  transition: transform 0.3s ease;
}

.soft-skill-card:hover .soft-skill-icon {
  @apply transform rotate-12 scale-110;
  transition: transform 0.3s ease;
}

.language-card:hover .language-flag {
  @apply transform scale-125;
  transition: transform 0.3s ease;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .filter-btn,
  .skill-progress,
  .proficiency-dot,
  .proficiency-label {
    transition: none !important;
    animation: none !important;
  }
  
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .filter-btn:hover,
  .skill-card:hover .skill-icon,
  .soft-skill-card:hover .soft-skill-icon,
  .language-card:hover .language-flag,
  .skill-card:hover .proficiency-label,
  .language-card:hover .proficiency-dot.active {
    transform: none !important;
  }
  
  .skill-progress::after {
    animation: none !important;
  }
}
</style>