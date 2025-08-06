import { ref, nextTick } from 'vue'

export function useTooltip() {
  const activeTooltip = ref<string | null>(null)
  const tooltipPosition = ref({ x: 0, y: 0 })

  const showTooltip = async (
    event: MouseEvent, 
    content: string, 
    options: {
      delay?: number
      position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
    } = {}
  ): Promise<void> => {
    const { delay = 500, position = 'auto' } = options
    
    // Clear any existing tooltip
    hideTooltip()
    
    // Set tooltip content after delay
    setTimeout(async () => {
      activeTooltip.value = content
      
      await nextTick()
      
    // Calculate position
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const tooltipElement = document.querySelector('.tooltip') as HTMLElement
    
    if (tooltipElement) {
      const tooltipRect = tooltipElement.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      let x = rect.left + rect.width / 2
      let y = rect.top - tooltipRect.height - 10
      // Auto positioning
      if (position === 'auto') {
        if (y < 10) {
          y = rect.bottom + 10
        }
        if (x + tooltipRect.width / 2 > viewportWidth - 10) {
          x = viewportWidth - tooltipRect.width - 10
        } else if (x - tooltipRect.width / 2 < 10) {
          x = tooltipRect.width / 2 + 10
        }
      }
      tooltipPosition.value = { x, y }
    }
    }, delay)
  }

  const hideTooltip = (): void => {
    activeTooltip.value = null
  }

  const createTooltipElement = (): HTMLElement => {
    let tooltip = document.querySelector('.tooltip') as HTMLElement
    
    if (!tooltip) {
      tooltip = document.createElement('div')
      tooltip.className = 'tooltip'
      document.body.appendChild(tooltip)
      
      // Apply styles
      Object.assign(tooltip.style, {
        position: 'fixed',
        zIndex: '9999',
        padding: '8px 12px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        fontSize: '12px',
        fontWeight: '500',
        borderRadius: '6px',
        pointerEvents: 'none',
        opacity: '0',
        transform: 'translateX(-50%) translateY(-100%)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        maxWidth: '200px',
        textAlign: 'center',
        lineHeight: '1.4',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      })
      
      // Add arrow
      const arrow = document.createElement('div')
      arrow.className = 'tooltip-arrow'
      Object.assign(arrow.style, {
        position: 'absolute',
        bottom: '-4px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderTop: '4px solid rgba(0, 0, 0, 0.9)'
      })
      tooltip.appendChild(arrow)
    }
    
    return tooltip
  }

  const updateTooltip = (): void => {
    const tooltip = createTooltipElement()
    
    if (activeTooltip.value) {
      tooltip.textContent = activeTooltip.value
      tooltip.style.left = `${tooltipPosition.value.x}px`
      tooltip.style.top = `${tooltipPosition.value.y}px`
      tooltip.style.opacity = '1'
      tooltip.style.transform = 'translateX(-50%) translateY(0)'
    } else {
      tooltip.style.opacity = '0'
      tooltip.style.transform = 'translateX(-50%) translateY(-10px)'
    }
  }

  // Watch for changes and update tooltip
  const watchTooltip = (): void => {
    const observer = new MutationObserver(updateTooltip)
    observer.observe(document.body, { childList: true, subtree: true })
    updateTooltip()
  }

  return {
    activeTooltip,
    tooltipPosition,
    showTooltip,
    hideTooltip,
    updateTooltip,
    watchTooltip
  }
}