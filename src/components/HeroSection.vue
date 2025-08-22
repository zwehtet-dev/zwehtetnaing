<template>
  <section id="home" class="section-padding pt-32">
    <div class="max-w-6xl mx-auto px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="max-w-4xl">
          <div class="content-spacing">
            <h1 class="text-6xl md:text-7xl font-bold text-soft-dark mb-8 leading-tight">
              {{ portfolioData.name }}
            </h1>
            <div class="text-3xl md:text-4xl text-soft-gray mb-12 h-16">
              <span class="typing-cursor">{{ portfolioData.title }}</span>
            </div>
            <p class="text-xl text-soft-gray leading-relaxed mb-16 max-w-2xl">
              {{ portfolioData.summary }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-6">
            <a
              href="#contact"
              @click="handleNavClick"
              class="btn-minimal btn-primary text-center"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              @click="handleNavClick"
              class="btn-minimal btn-secondary text-center"
            >
              View work
            </a>
          </div>
        </div>

        <!-- Profile Photo -->
        <div class="flex justify-center lg:justify-end">
          <div class="profile-image">
            <i class="fas fa-user text-6xl text-soft-light"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import portfolioData from '@/data/portfolio.json'

const handleNavClick = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  if (href && href.startsWith('#')) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>
