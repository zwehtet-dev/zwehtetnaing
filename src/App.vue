<template>
  <div id="app" class="bg-white text-slate-900">
    <!-- Navigation -->
    <Navigation />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Tech Stack Section -->
    <TechStack />

    <!-- About Section -->
    <AboutSection />

    <!-- Experience Section -->
    <ExperienceSection />

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Education Section -->
    <EducationSection />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navigation from '@/components/Navigation.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechStack from '@/components/TechStack.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'

onMounted(() => {
  // Simple fade in animations using Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
        }
      })
    },
    { threshold: 0.1 }
  )

  // Observe all section content containers
  const sections = document.querySelectorAll('section > div > div')
  sections.forEach((el) => {
    observer.observe(el)
  })

  // Add fade-in class to elements that are already in view
  setTimeout(() => {
    const heroSection = document.querySelector('#home')
    if (heroSection) {
      const heroContent = heroSection.querySelector('div > div')
      if (heroContent) {
        heroContent.classList.add('fade-in')
      }
    }
  }, 100)
})
</script>

<style>
/* Global styles are imported in main.ts */
</style>
