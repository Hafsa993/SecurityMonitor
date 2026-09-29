/**
 * Component tests for SourcesBreakdown.js
 * Tests the collapsible "How they know this" list of data sources
 */

import React from 'react'
import { render, screen, fireEvent } from '../fixtures/renderWithLanguage'
import SourcesBreakdown from '@/components/SourcesBreakdown'

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

const toggle = () => fireEvent.click(screen.getByRole('button', { name: /How they know this/ }))

describe('SourcesBreakdown Component', () => {
  test.each([undefined, []])('renders nothing for sources=%p', (sources) => {
    const { container } = render(<SourcesBreakdown sources={sources} />)

    expect(container).toBeEmptyDOMElement()
  })

  test('starts collapsed', () => {
    render(<SourcesBreakdown sources={mockSources} />)

    expect(screen.getByRole('button')).toHaveTextContent('▶')
    expect(screen.queryByText('Location')).not.toBeInTheDocument()
  })

  test('shows every source when expanded', () => {
    render(<SourcesBreakdown sources={mockSources} />)
    toggle()

    expect(screen.getByRole('button')).toHaveTextContent('▼')
    mockSources.forEach((source) => {
      expect(screen.getByText(source.permissionName)).toBeInTheDocument()
      expect(screen.getByText(source.insight)).toBeInTheDocument()
      expect(screen.getByText(`→ ${source.adResult}`)).toBeInTheDocument()
    })
  })

  test('collapses again on a second click', () => {
    render(<SourcesBreakdown sources={mockSources} />)
    toggle()
    toggle()

    expect(screen.queryByText('Location')).not.toBeInTheDocument()
  })

  test('labels activity sources as notifications', () => {
    render(
      <SourcesBreakdown
        sources={[{ permissionEmoji: '🔔', permissionName: 'Activity', insight: 'Late night use', adResult: 'Night ads' }]}
      />
    )
    toggle()

    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  test('labels audio sources as microphone', () => {
    render(
      <SourcesBreakdown
        sources={[{ permissionEmoji: '🎤', permissionName: 'Audio', insight: 'Gaming talk', adResult: 'Gaming ads' }]}
      />
    )
    toggle()

    expect(screen.getByText('Microphone')).toBeInTheDocument()
  })

  test('uses translation keys when present', () => {
    render(
      <SourcesBreakdown
        sources={[
          {
            permissionEmoji: '📍',
            permissionName: 'Location',
            insight: 'fallback insight',
            insightKey: 'sources.max.location.gym.insight',
            adResult: 'fallback ad',
            adResultKey: 'sources.max.location.gym.adResult',
          },
        ]}
      />
    )
    toggle()

    expect(screen.queryByText('fallback insight')).not.toBeInTheDocument()
    expect(screen.queryByText('→ fallback ad')).not.toBeInTheDocument()
  })

  test('keeps its expanded state across re-renders', () => {
    const { rerender } = render(<SourcesBreakdown sources={mockSources} />)
    toggle()

    rerender(<SourcesBreakdown sources={mockSources} />)

    expect(screen.getByText('Location')).toBeInTheDocument()
  })
})
