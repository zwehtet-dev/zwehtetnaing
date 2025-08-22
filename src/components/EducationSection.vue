<template>
  <section id="education" class="section-padding">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing">
        <h2 class="section-title">Education</h2>
        <p class="section-subtitle">
          Continuous learning and skill development in modern web technologies.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div
          v-for="course in portfolioData.courses"
          :key="course.title"
          class="card-minimal hover-lift"
        >
          <div class="mb-4">
            <span class="text-sm text-slate-500 uppercase tracking-wider">
              {{ course.period }}
            </span>
          </div>
          <h3 class="text-xl font-semibold text-soft-dark mb-2">
            {{ course.title }}
          </h3>
          <p class="text-cyan-600 font-medium mb-4">
            {{ course.institution }}
          </p>
          <p class="text-soft-gray leading-relaxed">
            {{ course.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import portfolioData from '@/data/portfolio.json'
</script>
