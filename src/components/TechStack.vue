<template>
  <section id="tech-stack" class="section-padding bg-slate-50/30">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing text-center">
        <h2 class="section-title">Tech Stack</h2>
        <p class="section-subtitle mx-auto">
          Technologies and tools I use to build modern, scalable applications.
        </p>
      </div>

      <div class="tech-stack-grid">
        <div
          v-for="tech in portfolioData.techStack"
          :key="tech.name"
          class="tech-item"
        >
          <div
            class="tech-icon"
            :style="{ backgroundColor: tech.color + '20' }"
          >
            <i
              :class="tech.icon"
              class="text-2xl"
              :style="{ color: tech.color }"
            ></i>
          </div>
          <h3 class="font-semibold text-soft-dark mb-1">
            {{ tech.name }}
          </h3>
          <p class="text-sm text-soft-light">
            {{ tech.category }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import portfolioData from '@/data/portfolio.json'
</script>
