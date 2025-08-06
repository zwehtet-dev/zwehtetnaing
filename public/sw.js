// Service Worker for caching and offline support
const CACHE_NAME = 'zwe-htet-naing-portfolio-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png'
]

// Assets to cache on first request
const DYNAMIC_ASSETS = [
  '/assets/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url)
          return cachedResponse
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse
            }
            
            // Determine which cache to use
            const shouldCacheDynamic = DYNAMIC_ASSETS.some(asset => 
              request.url.includes(asset)
            )
            
            if (shouldCacheDynamic) {
              const responseClone = networkResponse.clone()
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  console.log('Service Worker: Caching dynamic asset', request.url)
                  cache.put(request, responseClone)
                })
            }
            
            return networkResponse
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error)
            
            // Return offline fallback for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html')
            }
            
            // Return empty response for other requests
            return new Response('', {
              status: 408,
              statusText: 'Request timeout'
            })
          })
      })
  )
})

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions
      handleOfflineFormSubmission()
    )
  }
})

// Handle offline form submissions
async function handleOfflineFormSubmission() {
  try {
    // Get stored form data from IndexedDB
    const formData = await getStoredFormData()
    
    if (formData) {
      // Try to submit the form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        // Clear stored data on successful submission
        await clearStoredFormData()
        console.log('Service Worker: Offline form submitted successfully')
      }
    }
  } catch (error) {
    console.error('Service Worker: Failed to submit offline form', error)
  }
}

// Placeholder functions for IndexedDB operations
async function getStoredFormData() {
  // Implementation would use IndexedDB to retrieve stored form data
  return null
}

async function clearStoredFormData() {
  // Implementation would clear stored form data from IndexedDB
}

// Push notification handling (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    
    const options = {
      body: data.body,
      icon: '/favicon-192x192.png',
      badge: '/favicon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'View Portfolio',
          icon: '/favicon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon-192x192.png'
        }
      ]
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})