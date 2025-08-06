import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { PERSONAL_INFO } from '@/utils/constants'

export interface SEOMetaData {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  locale?: string
  siteName?: string
}

export function useSEO() {
  const { locale } = useI18n()
  const currentMeta = ref<SEOMetaData>({})

  // Default meta data
  const defaultMeta: SEOMetaData = {
    title: 'Zwe Htet Naing - Backend Developer Portfolio',
    description: 'Junior Backend Developer specializing in Laravel, PHP, and scalable web applications. View my portfolio and get in touch for your next project.',
    keywords: 'Backend Developer, Laravel, PHP, MySQL, API Development, Web Development, Myanmar Developer',
    image: '/og-image.jpg',
    url: 'https://zwehtetnaing.dev',
    type: 'website',
    author: PERSONAL_INFO.name,
    siteName: 'Zwe Htet Naing Portfolio',
    locale: 'en_US'
  }

  // Update document title
  const updateTitle = (title: string): void => {
    document.title = title
    updateMetaTag('og:title', title)
    updateMetaTag('twitter:title', title)
  }

  // Update meta description
  const updateDescription = (description: string): void => {
    updateMetaTag('description', description)
    updateMetaTag('og:description', description)
    updateMetaTag('twitter:description', description)
  }

  // Update meta keywords
  const updateKeywords = (keywords: string): void => {
    updateMetaTag('keywords', keywords)
  }

  // Update Open Graph image
  const updateImage = (image: string): void => {
    updateMetaTag('og:image', image)
    updateMetaTag('twitter:image', image)
  }

  // Update canonical URL
  const updateURL = (url: string): void => {
    updateMetaTag('og:url', url)
    updateMetaTag('twitter:url', url)
    updateCanonicalLink(url)
  }

  // Generic meta tag updater
  const updateMetaTag = (name: string, content: string): void => {
    // Handle different meta tag types
    let selector = ''
    let attribute = ''

    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      selector = `meta[property="${name}"]`
      attribute = 'property'
    } else {
      selector = `meta[name="${name}"]`
      attribute = 'name'
    }

    let metaTag = document.querySelector(selector) as HTMLMetaElement

    if (metaTag) {
      metaTag.content = content
    } else {
      metaTag = document.createElement('meta')
      metaTag.setAttribute(attribute, name)
      metaTag.content = content
      document.head.appendChild(metaTag)
    }
  }

  // Update canonical link
  const updateCanonicalLink = (url: string): void => {
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement

    if (canonicalLink) {
      canonicalLink.href = url
    } else {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      canonicalLink.href = url
      document.head.appendChild(canonicalLink)
    }
  }

  // Update structured data (JSON-LD)
  const updateStructuredData = (data: any): void => {
    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement

    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(data)
    } else {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.textContent = JSON.stringify(data)
      document.head.appendChild(scriptTag)
    }
  }

  // Set comprehensive meta data
  const setMeta = (meta: Partial<SEOMetaData>): void => {
    const mergedMeta = { ...defaultMeta, ...meta }
    currentMeta.value = mergedMeta

    // Update basic meta tags
    if (mergedMeta.title) updateTitle(mergedMeta.title)
    if (mergedMeta.description) updateDescription(mergedMeta.description)
    if (mergedMeta.keywords) updateKeywords(mergedMeta.keywords)
    if (mergedMeta.image) updateImage(mergedMeta.image)
    if (mergedMeta.url) updateURL(mergedMeta.url)

    // Update Open Graph meta tags
    updateMetaTag('og:type', mergedMeta.type || 'website')
    updateMetaTag('og:site_name', mergedMeta.siteName || defaultMeta.siteName!)
    updateMetaTag('og:locale', mergedMeta.locale || defaultMeta.locale!)

    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:creator', '@zwehtetnaing')
    updateMetaTag('twitter:site', '@zwehtetnaing')

    // Update author meta tag
    if (mergedMeta.author) {
      updateMetaTag('author', mergedMeta.author)
    }

    // Update structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      jobTitle: 'Junior Backend Developer',
      description: mergedMeta.description,
      url: mergedMeta.url,
      image: mergedMeta.image,
      sameAs: [
        'https://github.com/zwehtetnaing',
        'https://linkedin.com/in/zwehtetnaing'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: PERSONAL_INFO.contact.location
      },
      email: PERSONAL_INFO.contact.email,
      telephone: PERSONAL_INFO.contact.phone
    }

    updateStructuredData(structuredData)
  }

  // Set default meta tags on mount
  onMounted(() => {
    setMeta(defaultMeta)
  })

  // Watch for locale changes and update meta tags accordingly
  watch(locale, (newLocale) => {
    const localeMap: Record<string, string> = {
      'en': 'en_US',
      'my': 'my_MM'
    }

    setMeta({
      ...currentMeta.value,
      locale: localeMap[newLocale] || 'en_US'
    })
  })

  return {
    currentMeta,
    setMeta,
    updateTitle,
    updateDescription,
    updateKeywords,
    updateImage,
    updateURL,
    updateMetaTag,
    updateStructuredData
  }
}