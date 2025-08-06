import { ref, onMounted } from 'vue'

export interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
  domContentLoaded?: number
  loadComplete?: number
}

export function usePerformance() {
  const metrics = ref<PerformanceMetrics>({})
  const isSupported = ref(false)

  // Check if Performance Observer is supported
  const checkSupport = (): void => {
    isSupported.value = 'PerformanceObserver' in window && 'performance' in window
  }

  // Measure First Contentful Paint
  const measureFCP = (): void => {
    if (!isSupported.value) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          metrics.value.fcp = fcpEntry.startTime
          observer.disconnect()
        }
      })
      observer.observe({ entryTypes: ['paint'] })
    } catch (error) {
      console.warn('FCP measurement failed:', error)
    }
  }

  // Measure Largest Contentful Paint
  const measureLCP = (): void => {
    if (!isSupported.value) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          metrics.value.lcp = lastEntry.startTime
        }
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('LCP measurement failed:', error)
    }
  }

  // Measure First Input Delay
  const measureFID = (): void => {
    if (!isSupported.value) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const firstEntry = entries[0] as any
        if (firstEntry && 'processingStart' in firstEntry) {
          metrics.value.fid = firstEntry.processingStart - firstEntry.startTime
          observer.disconnect()
        }
      })
      observer.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('FID measurement failed:', error)
    }
  }

  // Measure Cumulative Layout Shift
  const measureCLS = (): void => {
    if (!isSupported.value) return

    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            metrics.value.cls = clsValue
          }
        })
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('CLS measurement failed:', error)
    }
  }

  // Measure Time to First Byte
  const measureTTFB = (): void => {
    if (!isSupported.value) return

    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        metrics.value.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      }
    } catch (error) {
      console.warn('TTFB measurement failed:', error)
    }
  }

  // Measure DOM Content Loaded and Load Complete
  const measureLoadTimes = (): void => {
    if (!isSupported.value) return

    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any
      if (navigationEntry && 'navigationStart' in navigationEntry) {
        metrics.value.domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.navigationStart
        metrics.value.loadComplete = navigationEntry.loadEventEnd - navigationEntry.navigationStart
      }
    } catch (error) {
      console.warn('Load times measurement failed:', error)
    }
  }

  // Get performance score based on metrics
  const getPerformanceScore = (): number => {
    let score = 100
    
    // FCP scoring (good: <1.8s, needs improvement: 1.8s-3s, poor: >3s)
    if (metrics.value.fcp) {
      if (metrics.value.fcp > 3000) score -= 20
      else if (metrics.value.fcp > 1800) score -= 10
    }
    
    // LCP scoring (good: <2.5s, needs improvement: 2.5s-4s, poor: >4s)
    if (metrics.value.lcp) {
      if (metrics.value.lcp > 4000) score -= 25
      else if (metrics.value.lcp > 2500) score -= 15
    }
    
    // FID scoring (good: <100ms, needs improvement: 100ms-300ms, poor: >300ms)
    if (metrics.value.fid) {
      if (metrics.value.fid > 300) score -= 20
      else if (metrics.value.fid > 100) score -= 10
    }
    
    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.value.cls) {
      if (metrics.value.cls > 0.25) score -= 25
      else if (metrics.value.cls > 0.1) score -= 15
    }
    
    // TTFB scoring (good: <200ms, needs improvement: 200ms-600ms, poor: >600ms)
    if (metrics.value.ttfb) {
      if (metrics.value.ttfb > 600) score -= 10
      else if (metrics.value.ttfb > 200) score -= 5
    }
    
    return Math.max(0, score)
  }

  // Get performance grade
  const getPerformanceGrade = (): string => {
    const score = getPerformanceScore()
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  // Log performance metrics to console (development only)
  const logMetrics = (): void => {
    if (import.meta.env.DEV) {
      console.group('?š€ Performance Metrics')
      console.log('First Contentful Paint:', metrics.value.fcp ? `${metrics.value.fcp.toFixed(2)}ms` : 'N/A')
      console.log('Largest Contentful Paint:', metrics.value.lcp ? `${metrics.value.lcp.toFixed(2)}ms` : 'N/A')
      console.log('First Input Delay:', metrics.value.fid ? `${metrics.value.fid.toFixed(2)}ms` : 'N/A')
      console.log('Cumulative Layout Shift:', metrics.value.cls ? metrics.value.cls.toFixed(4) : 'N/A')
      console.log('Time to First Byte:', metrics.value.ttfb ? `${metrics.value.ttfb.toFixed(2)}ms` : 'N/A')
      console.log('DOM Content Loaded:', metrics.value.domContentLoaded ? `${metrics.value.domContentLoaded.toFixed(2)}ms` : 'N/A')
      console.log('Load Complete:', metrics.value.loadComplete ? `${metrics.value.loadComplete.toFixed(2)}ms` : 'N/A')
      console.log('Performance Score:', `${getPerformanceScore()}/100 (${getPerformanceGrade()})`)
      console.groupEnd()
    }
  }

  // Send metrics to analytics (placeholder)
  const sendToAnalytics = (): void => {
    // This would typically send to Google Analytics, DataDog, etc.
    if (import.meta.env.PROD) {
      // Example: gtag('event', 'performance_metrics', metrics.value)
      console.log('Sending performance metrics to analytics:', metrics.value)
    }
  }

  // Initialize all measurements
  const initializeMetrics = (): void => {
    checkSupport()
    
    if (!isSupported.value) {
      console.warn('Performance Observer not supported')
      return
    }

    measureFCP()
    measureLCP()
    measureFID()
    measureCLS()
    measureTTFB()
    measureLoadTimes()

    // Log metrics after a delay to ensure all measurements are captured
    setTimeout(() => {
      logMetrics()
      sendToAnalytics()
    }, 5000)
  }

  // Resource timing analysis
  const analyzeResourceTiming = (): any[] => {
    if (!isSupported.value) return []

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    
    return resources.map(resource => ({
      name: resource.name,
      type: resource.initiatorType,
      size: resource.transferSize || 0,
      duration: resource.duration,
      startTime: resource.startTime
    })).sort((a, b) => b.duration - a.duration)
  }

  // Memory usage (if available)
  const getMemoryUsage = (): any => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      }
    }
    return null
  }

  onMounted(() => {
    // Initialize metrics after component is mounted
    setTimeout(initializeMetrics, 100)
  })

  return {
    metrics,
    isSupported,
    getPerformanceScore,
    getPerformanceGrade,
    logMetrics,
    analyzeResourceTiming,
    getMemoryUsage,
    initializeMetrics
  }
}