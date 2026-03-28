/**
 * Component tests for SourcesBreakdown.js
 * Tests permission sources disclosure component
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SourcesBreakdown from '@/components/SourcesBreakdown'

describe('SourcesBreakdown Component', () => {
  const mockSources = [
    {
      permissionEmoji: '📍',
      permissionName: 'Location',
      insight: 'Your home address is revealed',
      adResult: 'Ads for local businesses',
    },
    {
      permissionEmoji: '📹',
      permissionName: 'Camera',
      insight: 'Your appearance is tracked',
      adResult: 'Fashion and beauty ads',
    },
  ]

  const defaultProps = {
    sources: mockSources,
  }

  describe('rendering with sources', () => {
    test('should render sources breakdown button', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      expect(screen.getByText(/How they know this/)).toBeInTheDocument()
    })

    test('should display source count', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      expect(screen.getByText(/How they know this \(2 data points\)/)).toBeInTheDocument()
    })

    test('should not display sources initially', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      expect(screen.queryByText('Location')).not.toBeInTheDocument()
    })

    test('should display arrow indicator', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      // Should show closed arrow initially
      const button = screen.getByText(/How they know this/)?.parentElement
      expect(button).toBeInTheDocument()
    })
  })

  describe('expanding/collapsing sources', () => {
    test('should expand sources when clicking button', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement

      fireEvent.click(button)

      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Camera')).toBeInTheDocument()
    })

    test('should show arrow pointing down when expanded', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement

      fireEvent.click(button)

      const arrow = button.querySelector('span')
      expect(arrow.textContent).toContain('▼')
    })

    test('should show arrow pointing right when collapsed', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement

      expect(button.querySelector('span').textContent).toContain('▶')
    })

    test('should toggle expanded state on multiple clicks', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement

      // Expand
      fireEvent.click(button)
      expect(screen.getByText('Location')).toBeInTheDocument()

      // Collapse
      fireEvent.click(button)
      expect(screen.queryByText('Location')).not.toBeInTheDocument()

      // Expand again
      fireEvent.click(button)
      expect(screen.getByText('Location')).toBeInTheDocument()
    })
  })

  describe('source content display', () => {
    test('should display all source items when expanded', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      mockSources.forEach((source) => {
        expect(screen.getByText(source.permissionName)).toBeInTheDocument()
        expect(screen.getByText(source.insight)).toBeInTheDocument()
        expect(screen.getByText(source.adResult)).toBeInTheDocument()
      })
    })

    test('should display permission emoji for each source', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      mockSources.forEach((source) => {
        expect(screen.getByText(source.permissionEmoji)).toBeInTheDocument()
      })
    })

    test('should display insight text for each source', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      mockSources.forEach((source) => {
        expect(screen.getByText(source.insight)).toBeInTheDocument()
      })
    })

    test('should display ad result with arrow indicator', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      mockSources.forEach((source) => {
        expect(screen.getByText(`→ ${source.adResult}`)).toBeInTheDocument()
      })
    })
  })

  describe('empty sources', () => {
    test('should not render when sources is empty array', () => {
      const { container } = render(<SourcesBreakdown sources={[]} />)

      expect(container.firstChild).toBeNull()
    })

    test('should not render when sources is null', () => {
      const { container } = render(<SourcesBreakdown sources={null} />)

      expect(container.firstChild).toBeNull()
    })

    test('should not render when sources is undefined', () => {
      const { container } = render(<SourcesBreakdown />)

      expect(container.firstChild).toBeNull()
    })
  })

  describe('single source', () => {
    test('should handle single source correctly', () => {
      const singleSource = [mockSources[0]]

      render(<SourcesBreakdown sources={singleSource} />)

      expect(screen.getByText(/How they know this \(1 data point\)/)).toBeInTheDocument()

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      expect(screen.getByText('Location')).toBeInTheDocument()
    })
  })

  describe('multiple sources', () => {
    test('should correctly count multiple sources', () => {
      const multipleSources = [
        mockSources[0],
        mockSources[1],
        {
          permissionEmoji: '🎤',
          permissionName: 'Microphone',
          insight: 'Your voice patterns',
          adResult: 'Voice-related products',
        },
      ]

      render(<SourcesBreakdown sources={multipleSources} />)

      expect(screen.getByText(/3 data points/)).toBeInTheDocument()
    })
  })

  describe('styling and visual structure', () => {
    test('should have proper button styling', () => {
      const { container } = render(<SourcesBreakdown {...defaultProps} />)

      const button = container.querySelector('button')

      expect(button).toHaveClass('flex', 'items-center', 'gap-2', 'text-sm', 'font-medium')
    })

    test('should have proper source item styling when expanded', () => {
      const { container } = render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      const sourceItems = container.querySelectorAll('[class*="card-bg"]')

      expect(sourceItems.length).toBeGreaterThan(0)
    })

    test('should have border separator between button and sources', () => {
      const { container } = render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      const borderElement = container.querySelector('[class*="border"]')

      expect(borderElement).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    test('button should be accessible via keyboard', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement

      expect(button).toBeInTheDocument()
    })

    test('should have proper text content for screen readers', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      mockSources.forEach((source) => {
        expect(screen.queryByText(source.permissionName)).toBeInTheDocument()
      })
    })

    test('should display source information with proper semantic structure', () => {
      render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      mockSources.forEach((source) => {
        expect(screen.getByText(source.permissionName)).toBeInTheDocument()
      })
    })
  })

  describe('edge cases', () => {
    test('should handle very long source names', () => {
      const longNameSource = [
        {
          ...mockSources[0],
          permissionName: 'A'.repeat(100),
        },
      ]

      render(<SourcesBreakdown sources={longNameSource} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument()
    })

    test('should handle very long insight text', () => {
      const longInsightSource = [
        {
          ...mockSources[0],
          insight: 'B'.repeat(200),
        },
      ]

      render(<SourcesBreakdown sources={longInsightSource} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      expect(screen.getByText('B'.repeat(200))).toBeInTheDocument()
    })

    test('should handle special characters in source data', () => {
      const specialCharSource = [
        {
          permissionEmoji: '📍',
          permissionName: 'Location & Tracking',
          insight: 'Data from <script>, & other sources',
          adResult: 'Ads for "special" products',
        },
      ]

      render(<SourcesBreakdown sources={specialCharSource} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      expect(screen.getByText('Location & Tracking')).toBeInTheDocument()
    })

    test('should handle many sources without performance issues', () => {
      const manySources = Array.from({ length: 50 }, (_, i) => ({
        permissionEmoji: '📍',
        permissionName: `Permission ${i}`,
        insight: `Insight ${i}`,
        adResult: `Ad ${i}`,
      }))

      render(<SourcesBreakdown sources={manySources} />)

      expect(screen.getByText(/50 data points/)).toBeInTheDocument()
    })
  })

  describe('state management', () => {
    test('should maintain expanded state during re-renders', () => {
      const { rerender } = render(<SourcesBreakdown {...defaultProps} />)

      const button = screen.getByText(/How they know this/).parentElement
      fireEvent.click(button)

      expect(screen.getByText('Location')).toBeInTheDocument()

      rerender(<SourcesBreakdown {...defaultProps} />)

      expect(screen.getByText('Location')).toBeInTheDocument()
    })
  })
})
