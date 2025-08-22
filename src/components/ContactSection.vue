<template>
  <section id="contact" class="section-padding bg-slate-50/50">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing">
        <h2 class="section-title">Get in Touch</h2>
        <p class="section-subtitle">
          Let's discuss your next project and how we can work together.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <h3 class="text-2xl font-semibold text-soft-dark mb-8">
            Contact Information
          </h3>
          <div class="space-y-8">
            <div>
              <p class="text-soft-light text-sm uppercase tracking-wider mb-2">
                Email
              </p>
              <a
                :href="`mailto:${portfolioData.contact.email}`"
                class="text-lg text-soft-dark hover:text-cyan-600 transition-colors"
              >
                {{ portfolioData.contact.email }}
              </a>
            </div>
            <div>
              <p class="text-soft-light text-sm uppercase tracking-wider mb-2">
                Phone
              </p>
              <a
                :href="`tel:${portfolioData.contact.phone}`"
                class="text-lg text-soft-dark hover:text-cyan-600 transition-colors"
              >
                {{ portfolioData.contact.phone }}
              </a>
            </div>
            <div>
              <p class="text-soft-light text-sm uppercase tracking-wider mb-2">
                Location
              </p>
              <p class="text-lg text-soft-dark">
                {{ portfolioData.contact.location }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-semibold text-soft-dark mb-8">
            Send a Message
          </h3>
          <form class="space-y-6" @submit.prevent="sendMessage">
            <div>
              <input
                type="text"
                placeholder="Your name"
                v-model="contactForm.name"
                class="input-minimal"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                v-model="contactForm.email"
                class="input-minimal"
                required
              />
            </div>
            <div>
              <textarea
                rows="6"
                placeholder="Your message"
                v-model="contactForm.message"
                class="input-minimal resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn-minimal btn-primary w-full"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Sending...
              </span>
              <span v-else>
                Send Message
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import portfolioData from '@/data/portfolio.json'

interface ContactForm {
  name: string
  email: string
  message: string
}

const contactForm = reactive<ContactForm>({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const sendMessage = async () => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Message sent:', contactForm)
    alert('Thank you for your message! I\'ll get back to you soon.')

    // Reset form
    contactForm.name = ''
    contactForm.email = ''
    contactForm.message = ''
  } catch (error) {
    console.error('Error sending message:', error)
    alert('Sorry, there was an error sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
