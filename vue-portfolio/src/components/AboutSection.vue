<template>
  <section id="about" class="section-padding bg-slate-50/50">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing">
        <h2 class="section-title">About</h2>
        <p class="section-subtitle">
          Building robust, scalable backend solutions with modern technologies and best practices.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-24">
        <div>
          <p class="text-lg text-soft-gray leading-relaxed mb-12">
            {{ portfolioData.professionalSummary }}
          </p>

          <div class="space-y-8">
            <div>
              <p class="text-soft-light text-sm uppercase tracking-wider mb-2">
                Location
              </p>
              <p class="text-soft-dark font-medium">
                {{ portfolioData.contact.location }}
              </p>
            </div>
            <div>
              <p class="text-soft-light text-sm uppercase tracking-wider mb-2">
                Email
              </p>
              <p class="text-soft-dark font-medium">
                {{ portfolioData.contact.email }}
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-12">
          <div>
            <h3 class="text-xl font-semibold text-soft-dark mb-6">
              Technical Skills
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="skill in portfolioData.skills.technical"
                :key="skill"
                class="skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-soft-dark mb-6">
              Languages
            </h3>
            <div class="space-y-4">
              <div
                v-for="lang in portfolioData.languages"
                :key="lang.name"
                class="flex justify-between items-center"
              >
                <span class="text-soft-gray">{{ lang.name }}</span>
                <span class="text-sm text-soft-light">{{ lang.level }}</span>
              </div>
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
