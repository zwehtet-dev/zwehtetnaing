import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Lazy load components for better performance
const Home = () => import('@/views/Home.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Zwe Htet Naing - Backend Developer Portfolio',
      description: 'Junior Backend Developer specializing in Laravel, PHP, and scalable web applications',
      preload: true // Mark for preloading
    }
  },
  // Catch-all route for 404s
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Return saved position if available (browser back/forward)
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 300)
      })
    }
    
    // Scroll to anchor if hash is present
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
              top: 80 // Account for fixed header
            })
          } else {
            resolve({ top: 0 })
          }
        }, 300)
      })
    }
    
    // Default to top
    return { top: 0, behavior: 'smooth' }
  }
})

// Performance and SEO optimizations
router.beforeEach((to, _from, next) => {
  // Update document title
  const title = (to.meta?.title as string) || 'Zwe Htet Naing - Portfolio'
  document.title = title
  
  // Update meta description if available
  const description = to.meta?.description as string
  if (description) {
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (metaDescription) {
      metaDescription.content = description
    }
  }
  
  // Preload critical resources for the route
  if (to.meta?.preload) {
    // This could preload critical images, fonts, etc.
    preloadCriticalResources()
  }
  
  next()
})

// Preload critical resources
const preloadCriticalResources = (): void => {
  // Preload critical images
  const criticalImages = [
    '/hero-bg.jpg',
    '/profile-photo.jpg'
  ]
  
  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
  
  // Preload critical fonts (if not already loaded)
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
  ]
  
  criticalFonts.forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = href
      document.head.appendChild(link)
    }
  })
}

// Error handling
router.onError((error) => {
  console.error('Router error:', error)
  // Could send to error tracking service
})

export default router