<template>
  <footer class="py-16 border-t border-slate-200">
    <div class="max-w-6xl mx-auto px-8">
      <div class="text-center">
        <p class="text-soft-light">
          © 2024 {{ portfolioData.name }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import portfolioData from '@/data/portfolio.json'
</script>
