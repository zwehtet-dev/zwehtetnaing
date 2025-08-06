<template>
  <section id="projects" class="projects-section">
    <div class="projects-container">
      <!-- Section Header -->
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">{{ $t('projects.title') }}</h2>
        <p class="section-subtitle">{{ $t('projects.subtitle') }}</p>
        <div class="title-decoration"></div>
      </div>
      
      <!-- Project Filter -->
      <div class="project-filter animate-on-scroll" style="--delay: 0.2s">
        <div class="filter-buttons">
          <button
            v-for="filter in projectFilters"
            :key="filter.key"
            @click="activeFilter = filter.key"
            class="filter-btn focus-ring"
            :class="{ 'active': activeFilter === filter.key }"
          >
            <Icon :icon="filter.icon" class="filter-icon" />
            <span>{{ $t(filter.label) }}</span>
          </button>
        </div>
      </div>
      
      <!-- Projects Grid -->
      <div class="projects-content">
        <Transition name="projects-fade" mode="out-in">
          <div :key="activeFilter" class="projects-grid">
            <div 
              v-for="(project, index) in filteredProjects" 
              :key="project.id"
              class="project-card-wrapper animate-on-scroll"
              :style="{ '--delay': `${0.4 + index * 0.1}s` }"
            >
              <BaseCard class="project-card" hoverable>
                <!-- Project Image/Preview -->
                <div class="project-image">
                  <div class="image-placeholder">
                    <Icon icon="ph:code-bold" class="placeholder-icon" />
                    <div class="image-overlay">
                      <div class="overlay-content">
                        <BaseButton 
                          variant="ghost" 
                          size="sm"
                          icon-left="ph:eye-bold"
                          class="overlay-btn"
                          @click="viewProject(project)"
                        >
                          {{ $t('projects.viewDemo') }}
                        </BaseButton>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Project Status Badge -->
                  <div class="project-status">
                    <span class="status-badge">
                      {{ getProjectStatus(project) }}
                    </span>
                  </div>
                </div>
                
                <!-- Project Content -->
                <div class="project-content">
                  <!-- Project Header -->
                  <div class="project-header">
                    <div class="project-meta">
                      <h3 class="project-title">{{ project.title }}</h3>
                      <p class="project-role">
                        <Icon icon="ph:user-bold" class="role-icon" />
                        {{ project.role }}
                      </p>
                    </div>
                    
                    <div class="project-links">
                      <a
                        v-if="project.links.github && project.links.github !== '#'"
                        :href="project.links.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link focus-ring"
                        :title="$t('projects.viewCode')"
                      >
                        <Icon icon="ph:github-logo-bold" class="w-5 h-5" />
                      </a>
                      
                      <a
                        v-if="project.links.demo && project.links.demo !== '#'"
                        :href="project.links.demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link focus-ring"
                        :title="$t('projects.viewDemo')"
                      >
                        <Icon icon="ph:arrow-square-out-bold" class="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <!-- Project Description -->
                  <p class="project-description">{{ project.description }}</p>
                  
                  <!-- Project Features -->
                  <div class="project-features">
                    <h4 class="features-title">{{ $t('projects.features') }}</h4>
                    <ul class="features-list">
                      <li 
                        v-for="feature in project.features.slice(0, 3)" 
                        :key="feature"
                        class="feature-item"
                      >
                        <Icon icon="ph:check-circle-bold" class="feature-icon" />
                        <span>{{ feature }}</span>
                      </li>
                    </ul>
                    
                    <button
                      v-if="project.features.length > 3"
                      @click="toggleFeatures(project.id)"
                      class="show-more-btn focus-ring"
                    >
                      <span v-if="!expandedFeatures.includes(project.id)">
                        {{ $t('common.showMore') }} (+{{ project.features.length - 3 }})
                      </span>
                      <span v-else>{{ $t('common.showLess') }}</span>
                      <Icon 
                        :icon="expandedFeatures.includes(project.id) ? 'ph:caret-up-bold' : 'ph:caret-down-bold'" 
                        class="w-4 h-4 ml-1"
                      />
                    </button>
                    
                    <Transition name="features-expand">
                      <ul v-if="expandedFeatures.includes(project.id)" class="features-list additional-features">
                        <li 
                          v-for="feature in project.features.slice(3)" 
                          :key="feature"
                          class="feature-item"
                        >
                          <Icon icon="ph:check-circle-bold" class="feature-icon" />
                          <span>{{ feature }}</span>
                        </li>
                      </ul>
                    </Transition>
                  </div>
                  
                  <!-- Project Technologies -->
                  <div class="project-technologies">
                    <div class="tech-header">
                      <Icon icon="ph:stack-bold" class="tech-header-icon" />
                      <span class="tech-header-text">{{ $t('projects.technologies') }}</span>
                    </div>
                    <div class="tech-tags">
                      <span 
                        v-for="tech in project.technologies" 
                        :key="tech"
                        class="tech-tag"
                        :title="tech"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Project Actions -->
                  <div class="project-actions">
                    <BaseButton 
                      variant="primary" 
                      size="sm"
                      icon-left="ph:eye-bold"
                      @click="viewProject(project)"
                      class="action-btn"
                    >
                      {{ $t('projects.viewDetails') }}
                    </BaseButton>
                    
                    <BaseButton 
                      v-if="project.links.github && project.links.github !== '#'"
                      variant="secondary" 
                      size="sm"
                      icon-left="ph:github-logo-bold"
                      @click="openLink(project.links.github)"
                      class="action-btn"
                    >
                      {{ $t('projects.viewCode') }}
                    </BaseButton>
                    
                    <BaseButton 
                      v-else
                      variant="ghost" 
                      size="sm"
                      disabled
                      class="action-btn"
                    >
                      {{ $t('projects.comingSoon') }}
                    </BaseButton>
                  </div>
                </div>
              </BaseCard>
            </div>
          </div>
        </Transition>
      </div>
      
      <!-- View All Projects Button -->
      <div class="view-all-section animate-on-scroll" style="--delay: 1s">
        <BaseButton 
          variant="secondary" 
          size="lg"
          icon-right="ph:arrow-right-bold"
          @click="viewAllProjects"
        >
          {{ $t('projects.allProjects') }}
        </BaseButton>
      </div>
    </div>
    
    <!-- Project Modal -->
    <BaseModal 
      v-model="showProjectModal" 
      :title="selectedProject?.title"
      size="lg"
      @close="closeProjectModal"
    >
      <div v-if="selectedProject" class="project-modal-content">
        <div class="modal-project-header">
          <div class="modal-project-meta">
            <h3 class="modal-project-title">{{ selectedProject.title }}</h3>
            <p class="modal-project-role">{{ selectedProject.role }}</p>
          </div>
        </div>
        
        <div class="modal-project-description">
          <p>{{ selectedProject.description }}</p>
        </div>
        
        <div class="modal-project-features">
          <h4 class="modal-features-title">{{ $t('projects.features') }}</h4>
          <ul class="modal-features-list">
            <li 
              v-for="feature in selectedProject.features" 
              :key="feature"
              class="modal-feature-item"
            >
              <Icon icon="ph:check-circle-bold" class="modal-feature-icon" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        
        <div class="modal-project-tech">
          <h4 class="modal-tech-title">{{ $t('projects.technologies') }}</h4>
          <div class="modal-tech-tags">
            <span 
              v-for="tech in selectedProject.technologies" 
              :key="tech"
              class="modal-tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="modal-actions">
          <BaseButton 
            v-if="selectedProject?.links.demo && selectedProject.links.demo !== '#'"
            variant="primary"
            icon-left="ph:arrow-square-out-bold"
            @click="openLink(selectedProject.links.demo)"
          >
            {{ $t('projects.viewDemo') }}
          </BaseButton>
          
          <BaseButton 
            v-if="selectedProject?.links.github && selectedProject.links.github !== '#'"
            variant="secondary"
            icon-left="ph:github-logo-bold"
            @click="openLink(selectedProject.links.github)"
          >
            {{ $t('projects.viewCode') }}
          </BaseButton>
          
          <BaseButton 
            variant="ghost"
            @click="closeProjectModal"
          >
            {{ $t('common.close') }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { PROJECTS } from '@/utils/constants'
import type { Project } from '@/types'

// Composables
const { observeElements } = useScrollAnimation({ threshold: 0.1, delay: 100 })

// State
const activeFilter = ref<'all' | 'web' | 'api' | 'mobile'>('all')
const expandedFeatures = ref<number[]>([])
const showProjectModal = ref(false)
const selectedProject = ref<Project | null>(null)

// Computed
const projectFilters = computed(() => [
  {
    key: 'all' as const,
    label: 'projects.filter.all',
    icon: 'ph:squares-four-bold'
  },
  {
    key: 'web' as const,
    label: 'projects.filter.web',
    icon: 'ph:globe-bold'
  },
  {
    key: 'api' as const,
    label: 'projects.filter.api',
    icon: 'ph:plugs-bold'
  }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return PROJECTS
  }
  
  return PROJECTS.filter(project => project.category === activeFilter.value)
})

// Methods
const getProjectStatus = (project: Project): string => {
  // Use project status if available, otherwise determine from links
  if (project.status) {
    switch (project.status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'planned':
        return 'Planned'
      default:
        return 'Live'
    }
  }
  
  // Fallback to link-based status
  if (project.links.demo && project.links.demo !== '#') {
    return 'Live'
  }
  if (project.links.github && project.links.github !== '#') {
    return 'Development'
  }
  return 'Coming Soon'
}

const toggleFeatures = (projectId: number): void => {
  const index = expandedFeatures.value.indexOf(projectId)
  if (index > -1) {
    expandedFeatures.value.splice(index, 1)
  } else {
    expandedFeatures.value.push(projectId)
  }
}

const viewProject = (project: Project): void => {
  selectedProject.value = project
  showProjectModal.value = true
}

const closeProjectModal = (): void => {
  showProjectModal.value = false
  selectedProject.value = null
}

const openLink = (url: string): void => {
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const viewAllProjects = (): void => {
  // In a real app, this would navigate to a dedicated projects page
  console.log('Navigate to all projects page')
}

onMounted(() => {
  // Observe elements for scroll animations
  observeElements('.animate-on-scroll')
})
</script>

<style scoped>
.projects-section {
  @apply py-20 lg:py-32 relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
}

.projects-section::before {
  content: '';
  @apply absolute top-0 left-0 w-full h-full opacity-20;
  background-image: radial-gradient(
    circle at 20% 30%,
    color-mix(in srgb, var(--color-accent) 15%, transparent) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 70%,
    color-mix(in srgb, var(--color-primary) 15%, transparent) 0%,
    transparent 50%
  );
}

.projects-container {
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

/* Project Filter */
.project-filter {
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

/* Projects Grid */
.projects-grid {
  @apply grid gap-8 lg:gap-10;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Masonry-like layout for larger screens */
@media (min-width: 1024px) {
  .projects-grid {
    @apply grid-cols-2;
  }
  
  /* Alternate heights for visual interest */
  .project-card-wrapper:nth-child(3n+1) .project-image {
    @apply h-64;
  }
  
  .project-card-wrapper:nth-child(3n+2) .project-image {
    @apply h-48;
  }
  
  .project-card-wrapper:nth-child(3n+3) .project-image {
    @apply h-56;
  }
}

.project-card-wrapper {
  @apply opacity-0 transform translate-y-8;
  @apply transition-all duration-700 ease-out;
  transition-delay: var(--delay, 0s);
}

.project-card-wrapper.in-view {
  @apply opacity-100 transform translate-y-0;
}

.project-card {
  @apply overflow-hidden transition-all duration-500;
  @apply hover:shadow-luxury-lg;
}

.project-card:hover {
  @apply transform -translate-y-2;
}

/* Grid item entrance animations */
.project-card-wrapper:nth-child(odd) {
  animation-delay: calc(var(--delay) + 0.1s);
}

.project-card-wrapper:nth-child(even) {
  animation-delay: calc(var(--delay) + 0.2s);
}

/* Staggered grid animation */
@keyframes gridItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.project-card-wrapper.in-view {
  animation: gridItemFadeIn 0.6s ease-out forwards;
}

/* Project Image */
.project-image {
  @apply relative h-48 lg:h-56 overflow-hidden;
}

.image-placeholder {
  @apply w-full h-full flex items-center justify-center relative;
  @apply bg-gradient-to-br from-secondary-100 to-secondary-200;
  @apply dark:from-secondary-800 dark:to-secondary-700;
}

.placeholder-icon {
  @apply w-16 h-16 opacity-30;
  color: var(--color-text-secondary);
}

.image-overlay {
  @apply absolute inset-0 bg-black/60 flex items-center justify-center;
  @apply opacity-0 transition-opacity duration-300;
}

.project-card:hover .image-overlay {
  @apply opacity-100;
}

.overlay-content {
  @apply transform translate-y-4 transition-transform duration-300;
}

.project-card:hover .overlay-content {
  @apply transform translate-y-0;
}

.overlay-btn {
  @apply bg-white/20 backdrop-blur-sm border border-white/30 text-white;
}

.overlay-btn:hover {
  @apply bg-white/30;
}

/* Project Status */
.project-status {
  @apply absolute top-4 right-4;
}

.status-badge {
  @apply px-3 py-1 text-xs font-medium rounded-full;
  @apply backdrop-blur-sm border;
}

/* Status-specific styling */
.project-card-wrapper:has(.status-badge:contains("Completed")) .status-badge,
.project-card-wrapper:has(.status-badge:contains("Live")) .status-badge {
  @apply bg-green-100/80 text-green-800 border-green-200;
  @apply dark:bg-green-900/80 dark:text-green-200 dark:border-green-800;
}

.project-card-wrapper:has(.status-badge:contains("In Progress")) .status-badge,
.project-card-wrapper:has(.status-badge:contains("Development")) .status-badge {
  @apply bg-blue-100/80 text-blue-800 border-blue-200;
  @apply dark:bg-blue-900/80 dark:text-blue-200 dark:border-blue-800;
}

.project-card-wrapper:has(.status-badge:contains("Coming Soon")) .status-badge,
.project-card-wrapper:has(.status-badge:contains("Planned")) .status-badge {
  @apply bg-amber-100/80 text-amber-800 border-amber-200;
  @apply dark:bg-amber-900/80 dark:text-amber-200 dark:border-amber-800;
}

/* Project Content */
.project-content {
  @apply p-6 lg:p-8 space-y-6;
}

.project-header {
  @apply flex items-start justify-between gap-4;
}

.project-meta {
  @apply flex-1;
}

.project-title {
  @apply text-xl lg:text-2xl font-bold mb-2;
  color: var(--color-text-primary);
}

.project-role {
  @apply flex items-center gap-2 text-sm font-medium;
  color: var(--color-primary);
}

.role-icon {
  @apply w-4 h-4;
}

.project-links {
  @apply flex gap-2;
}

.project-link {
  @apply w-10 h-10 rounded-lg flex items-center justify-center;
  @apply transition-all duration-200;
  @apply bg-secondary-100 hover:bg-secondary-200;
  @apply dark:bg-secondary-800 dark:hover:bg-secondary-700;
  color: var(--color-text-secondary);
}

.project-link:hover {
  color: var(--color-primary);
  @apply transform -translate-y-1;
}

.project-description {
  @apply text-base leading-relaxed;
  color: var(--color-text-secondary);
}

/* Project Features */
.project-features {
  @apply space-y-3;
}

.features-title {
  @apply text-sm font-semibold uppercase tracking-wider;
  color: var(--color-text-primary);
}

.features-list {
  @apply space-y-2;
}

.additional-features {
  @apply mt-3;
}

.feature-item {
  @apply flex items-start gap-3 text-sm;
}

.feature-icon {
  @apply w-4 h-4 mt-0.5 flex-shrink-0;
  color: var(--color-primary);
}

.show-more-btn {
  @apply flex items-center text-sm font-medium;
  @apply transition-colors duration-200;
  color: var(--color-primary);
}

.show-more-btn:hover {
  color: var(--color-accent);
}

/* Project Technologies */
.project-technologies {
  @apply space-y-3;
}

.tech-header {
  @apply flex items-center gap-2;
}

.tech-header-icon {
  @apply w-4 h-4;
  color: var(--color-primary);
}

.tech-header-text {
  @apply text-sm font-semibold uppercase tracking-wider;
  color: var(--color-text-primary);
}

.tech-tags {
  @apply flex flex-wrap gap-2;
}

.tech-tag {
  @apply px-3 py-1 text-xs font-medium rounded-full;
  @apply bg-primary-100 text-primary-700;
  @apply dark:bg-primary-900 dark:text-primary-300;
  @apply transition-all duration-200 hover:scale-105;
}

/* Project Actions */
.project-actions {
  @apply flex flex-wrap gap-3;
}

.action-btn {
  @apply flex-1 sm:flex-none;
}

/* View All Section */
.view-all-section {
  @apply text-center mt-16;
}

/* Modal Styles */
.project-modal-content {
  @apply space-y-6;
}

.modal-project-header {
  @apply border-b pb-4;
  border-color: var(--color-border-light);
}

.modal-project-title {
  @apply text-2xl font-bold mb-2;
  color: var(--color-text-primary);
}

.modal-project-role {
  @apply text-base font-medium;
  color: var(--color-primary);
}

.modal-project-description {
  @apply text-base leading-relaxed;
  color: var(--color-text-secondary);
}

.modal-features-title,
.modal-tech-title {
  @apply text-lg font-semibold mb-3;
  color: var(--color-text-primary);
}

.modal-features-list {
  @apply space-y-2;
}

.modal-feature-item {
  @apply flex items-start gap-3;
}

.modal-feature-icon {
  @apply w-5 h-5 mt-0.5 flex-shrink-0;
  color: var(--color-primary);
}

.modal-tech-tags {
  @apply flex flex-wrap gap-2;
}

.modal-tech-tag {
  @apply px-4 py-2 text-sm font-medium rounded-lg;
  @apply bg-primary-100 text-primary-700;
  @apply dark:bg-primary-900 dark:text-primary-300;
}

.modal-actions {
  @apply flex flex-wrap gap-3;
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

.projects-fade-enter-active,
.projects-fade-leave-active {
  transition: all 0.3s ease;
}

.projects-fade-enter-from,
.projects-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.features-expand-enter-active,
.features-expand-leave-active {
  transition: all 0.3s ease;
}

.features-expand-enter-from,
.features-expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.features-expand-enter-to,
.features-expand-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}

/* Focus States */
.focus-ring:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2;
  ring-offset-color: var(--color-background);
}

/* Enhanced Grid Responsiveness */
@media (min-width: 1280px) {
  .projects-grid {
    @apply grid-cols-3;
  }
  
  /* Featured project spans 2 columns */
  .project-card-wrapper:first-child {
    @apply col-span-2;
  }
  
  .project-card-wrapper:first-child .project-image {
    @apply h-64;
  }
}

@media (min-width: 1536px) {
  .projects-grid {
    @apply gap-12;
  }
}

/* Mobile Responsive Design */
@media (max-width: 640px) {
  .filter-buttons {
    @apply flex-col;
  }
  
  .filter-btn {
    @apply justify-center;
  }
  
  .project-header {
    @apply flex-col items-start gap-3;
  }
  
  .project-links {
    @apply self-end;
  }
  
  .projects-grid {
    @apply gap-6;
    grid-template-columns: 1fr;
  }
  
  .project-image {
    @apply h-40;
  }
  
  .project-content {
    @apply p-4 space-y-4;
  }
}

@media (max-width: 480px) {
  .tech-tags {
    @apply gap-1;
  }
  
  .tech-tag {
    @apply px-2 py-1 text-xs;
  }
  
  .project-actions {
    @apply flex-col gap-2;
  }
  
  .action-btn {
    @apply w-full;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .project-card-wrapper,
  .filter-btn,
  .project-link,
  .tech-tag {
    transition: none !important;
  }
  
  .animate-on-scroll,
  .project-card-wrapper {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .filter-btn:hover,
  .project-link:hover {
    transform: none !important;
  }
  
  .image-overlay,
  .overlay-content {
    transition: none !important;
  }
}
</style>