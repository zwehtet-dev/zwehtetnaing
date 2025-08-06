import { ref } from 'vue'

export function useFileDownload() {
  const isDownloading = ref(false)
  const downloadError = ref<string | null>(null)

  const downloadFile = async (
    url: string, 
    filename: string,
    options: {
      showNotification?: boolean
      fallbackAction?: () => void
    } = {}
  ): Promise<boolean> => {
    const { showNotification = true, fallbackAction } = options
    
    isDownloading.value = true
    downloadError.value = null

    try {
      // Check if file exists
      const response = await fetch(url, { method: 'HEAD' })
      
      if (response.ok) {
        // File exists, proceed with download
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.target = '_blank'
        link.style.display = 'none'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        if (showNotification) {
          showToast(`${filename} download started successfully!`, 'success')
        }
        
        return true
      } else {
        // File doesn't exist
        downloadError.value = 'File not found'
        
        if (showNotification) {
          showToast('File will be available soon. Please contact me directly.', 'info')
        }
        
        if (fallbackAction) {
          setTimeout(fallbackAction, 2000)
        }
        
        return false
      }
    } catch (error) {
      console.error('Download error:', error)
      downloadError.value = error instanceof Error ? error.message : 'Download failed'
      
      if (showNotification) {
        showToast('Unable to download file. Please try again later.', 'error')
      }
      
      return false
    } finally {
      isDownloading.value = false
    }
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning'): void => {
    // Create toast element
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    
    // Toast content
    const icon = getToastIcon(type)
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
      </div>
    `
    
    // Apply styles
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      minWidth: '300px',
      maxWidth: '400px',
      padding: '16px',
      borderRadius: '12px',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      backdropFilter: 'blur(8px)',
      ...getToastColors(type)
    })
    
    // Toast content styles
    const toastContent = toast.querySelector('.toast-content') as HTMLElement
    if (toastContent) {
      Object.assign(toastContent.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      })
    }
    
    const toastIcon = toast.querySelector('.toast-icon') as HTMLElement
    if (toastIcon) {
      Object.assign(toastIcon.style, {
        fontSize: '18px',
        flexShrink: '0'
      })
    }
    
    document.body.appendChild(toast)
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)'
    })
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, 4000)
    
    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    })
  }

  const getToastIcon = (type: string): string => {
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    }
    return icons[type as keyof typeof icons] || 'ℹ️'
  }

  const getToastColors = (type: string) => {
    const colors = {
      success: {
        backgroundColor: 'rgba(16, 185, 129, 0.9)',
        borderLeft: '4px solid #10b981'
      },
      error: {
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        borderLeft: '4px solid #ef4444'
      },
      info: {
        backgroundColor: 'rgba(59, 130, 246, 0.9)',
        borderLeft: '4px solid #3b82f6'
      },
      warning: {
        backgroundColor: 'rgba(245, 158, 11, 0.9)',
        borderLeft: '4px solid #f59e0b'
      }
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  return {
    isDownloading,
    downloadError,
    downloadFile,
    showToast
  }
}