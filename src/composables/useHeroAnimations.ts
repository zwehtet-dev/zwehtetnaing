import { ref, onMounted, onUnmounted } from 'vue'
import { throttle } from '@/utils/helpers'

export function useHeroAnimations() {
  const isLoaded = ref(false)
  const scrollY = ref(0)
  
  // Parallax effect for floating elements
  const updateParallax = throttle(() => {
    scrollY.value = window.scrollY
    
    const floatingElements = document.querySelectorAll('.floating-element')
    floatingElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05)
      const yPos = scrollY.value * speed
      ;(element as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`
    })
  }, 16)
  
  // Typing animation controller
  const startTypingAnimation = (): void => {
    const nameElement = document.querySelector('.name-text') as HTMLElement
    if (nameElement) {
      nameElement.style.animation = 'typing 2s steps(20) 0.5s forwards, blink 1s infinite 2.5s'
    }
  }
  
  // Staggered button animations
  const animateButtons = (): void => {
    const buttons = document.querySelectorAll('.hero-actions .base-button')
    buttons.forEach((button, index) => {
      setTimeout(() => {
        ;(button as HTMLElement).style.opacity = '1'
        ;(button as HTMLElement).style.transform = 'translateY(0)'
      }, 1400 + (index * 200))
    })
  }
  
  // Initialize animations
  const initAnimations = (): void => {
    setTimeout(() => {
      isLoaded.value = true
      startTypingAnimation()
      animateButtons()
    }, 100)
  }
  
  // Mouse move parallax effect
  const handleMouseMove = throttle((event: MouseEvent) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window
    
    const xPercent = (clientX / innerWidth - 0.5) * 2
    const yPercent = (clientY / innerHeight - 0.5) * 2
    
    const floatingElements = document.querySelectorAll('.floating-element')
    floatingElements.forEach((element, index) => {
      const speed = 0.02 + (index * 0.01)
      const xMove = xPercent * speed * 20
      const yMove = yPercent * speed * 20
      
      ;(element as HTMLElement).style.transform += ` translate(${xMove}px, ${yMove}px)`
    })
  }, 16)
  
  // Intersection Observer for scroll animations
  const observeElements = (): void => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  }
  
  onMounted(() => {
    initAnimations()
    observeElements()
    
    // Add event listeners
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
  })
  
  onUnmounted(() => {
    // Remove event listeners
    window.removeEventListener('scroll', updateParallax)
    window.removeEventListener('mousemove', handleMouseMove)
  })
  
  return {
    isLoaded,
    scrollY,
    initAnimations,
    startTypingAnimation,
    animateButtons
  }
}