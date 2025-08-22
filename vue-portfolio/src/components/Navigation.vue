<template>
    <nav class="fixed top-0 w-full nav-blur z-50">
        <div class="max-w-6xl mx-auto px-8">
            <div class="flex justify-between items-center py-6">
                <div class="text-xl font-semibold text-slate-900">
                    {{ portfolioData.name }}
                </div>
                <div class="hidden md:flex space-x-12">
                    <a
                        v-for="item in navigationItems"
                        :key="item.name"
                        :href="item.href"
                        class="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                        @click="handleNavClick"
                    >
                        {{ item.name }}
                    </a>
                </div>
                <div class="md:hidden">
                    <button
                        @click="toggleMobileMenu"
                        class="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div
            v-show="mobileMenuOpen"
            class="md:hidden bg-white border-t border-slate-100 shadow-lg"
        >
            <div class="px-8 py-6 space-y-4">
                <a
                    v-for="item in navigationItems"
                    :key="item.name"
                    :href="item.href"
                    @click="handleMobileNavClick"
                    class="block text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                >
                    {{ item.name }}
                </a>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { NavigationItem } from "@/types/portfolio";
import navigationData from "@/data/navigation.json";
import portfolioData from "@/data/portfolio.json";

const mobileMenuOpen = ref(false);
const navigationItems = ref<NavigationItem[]>(navigationData);

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleNavClick = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const href = target.getAttribute("href");
    if (href && href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }
};

const handleMobileNavClick = (event: Event) => {
    mobileMenuOpen.value = false;
    handleNavClick(event);
};

// Close mobile menu when clicking outside
onMounted(() => {
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        const nav = document.querySelector("nav");
        if (nav && !nav.contains(target)) {
            mobileMenuOpen.value = false;
        }
    });
});
</script>
