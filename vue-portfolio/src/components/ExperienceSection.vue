<template>
  <section id="experience" class="section-padding">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing">
        <h2 class="section-title">Experience</h2>
        <p class="section-subtitle">
          Professional journey building scalable web applications and robust backend systems.
        </p>
      </div>

      <div class="max-w-4xl">
        <div
          v-for="(exp, index) in portfolioData.experience"
          :key="index"
          class="timeline-item"
        >
          <div class="mb-4">
            <span class="text-sm text-slate-500 uppercase tracking-wider">
              {{ exp.period }}
            </span>
          </div>
          <h3 class="text-2xl font-semibold text-soft-dark mb-2">
            {{ exp.position }}
          </h3>
          <p class="text-lg text-soft-gray mb-8">
            {{ exp.company }}
          </p>
          <ul class="space-y-4">
            <li
              v-for="responsibility in exp.responsibilities"
              :key="responsibility"
              class="text-soft-gray leading-relaxed flex items-start"
            >
              <span class="text-cyan-600 mr-3 mt-2 text-xs">●</span>
              <span>{{ responsibility }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import portfolioData from '@/data/portfolio.json'
</script>
