<template>
  <section id="projects" class="section-padding bg-slate-50/50">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing">
        <h2 class="section-title">Selected Work</h2>
        <p class="section-subtitle">
          A collection of projects showcasing modern web development and backend architecture.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div
          v-for="project in portfolioData.projects"
          :key="project.title"
          class="project-minimal"
        >
          <div class="h-48 bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center">
            <i
              :class="project.icon"
              class="text-4xl text-cyan-600"
            ></i>
          </div>
          <div class="p-8">
            <h3 class="text-xl font-semibold text-soft-dark mb-4">
              {{ project.title }}
            </h3>
            <p class="text-soft-gray mb-6 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 text-xs bg-slate-100 text-soft-gray rounded-full"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex space-x-4">
              <a
                :href="project.demoUrl || '#'"
                class="text-cyan-600 hover:text-cyan-700 text-sm font-medium transition-colors"
              >
                View Project →
              </a>
              <a
                :href="project.codeUrl || '#'"
                class="text-soft-light hover:text-soft-gray text-sm font-medium transition-colors"
              >
                Code →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import portfolioData from '@/data/portfolio.json'
</script>
