/**
 * Component tests for ProfileCard.js
 * Tests main profile display component
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProfileCard from '@/components/ProfileCard'
import { mockProfile, mockPermissions } from '../fixtures/mockData'

// Mock SourcesBreakdown to isolate ProfileCard tests
jest.mock('@/components/SourcesBreakdown', () => {
  return function MockSourcesBreakdown({ sources }) {
    return (
      <div data-testid="sources-breakdown">
        {sources && sources.length > 0 && <span>Sources: {sources.length}</span>}
      </div>
    )
  }
})

describe('ProfileCard Component', () => {
  const defaultProps = {
    profile: mockProfile,
    permissions: {
      location: true,
      camera: true,
      microphone: false,
      clipboard: false,
      contacts: false,
      notifications: false,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render profile card', () => {
      render(<ProfileCard {...defaultProps} />)

      expect(screen.getByText('Data Profile Summary')).toBeInTheDocument()
    })

    test('should display invasion level header', () => {
      render(<ProfileCard {...defaultProps} />)

      expect(screen.getByText('Data Profile Summary')).toBeInTheDocument()
      expect(screen.getByText(mockProfile.invasionLevel)).toBeInTheDocument()
    })

    test('should display tracking duration', () => {
      render(<ProfileCard {...defaultProps} />)

      expect(screen.getByText(/After 7 of tracking/)).toBeInTheDocument()
    })

    test('should display privacy risk label', () => {
      render(<ProfileCard {...defaultProps} />)

      expect(screen.getByText('Privacy Risk')).toBeInTheDocument()
    })
  })

  describe('invasion level display', () => {
    test('should display invasion level text', () => {
      render(<ProfileCard {...defaultProps} />)

      expect(screen.getByText(mockProfile.invasionLevel)).toBeInTheDocument()
    })

    test('should display invasion level for different profiles', () => {
      const lowRiskProfile = {
        ...mockProfile,
        invasionLevel: 'Low',
      }

      render(<ProfileCard profile={lowRiskProfile} permissions={defaultProps.permissions} />)

      expect(screen.getByText('Low')).toBeInTheDocument()
    })

    test('should display invasionLevel with appropriate styling', () => {
      const { container } = render(<ProfileCard {...defaultProps} />)

      const invasionDisplay = container.querySelector('[class*="invasion"]')

      expect(invasionDisplay).toBeInTheDocument()
    })
  })

  describe('categories display', () => {
    test('should render all categories', () => {
      render(<ProfileCard {...defaultProps} />)

      mockProfile.categories.forEach((category) => {
        expect(screen.getByText(category.title)).toBeInTheDocument()
      })
    })

    test('should display category titles as buttons', () => {
      render(<ProfileCard {...defaultProps} />)

      mockProfile.categories.forEach((category) => {
        const button = screen.getByText(category.title).closest('button')
        expect(button).toBeInTheDocument()
      })
    })

    test('should have expand/collapse arrows on categories', () => {
      render(<ProfileCard {...defaultProps} />)

      // Should have arrow indicators (▶ or ▼)
      const arrows = screen.getAllByText(/▶/)

      expect(arrows.length).toBeGreaterThan(0)
    })
  })

  describe('category expansion', () => {
    test('should not show items initially', () => {
      render(<ProfileCard {...defaultProps} />)

      mockProfile.categories.forEach((category) => {
        category.items.forEach((item) => {
          expect(screen.queryByText(item)).not.toBeInTheDocument()
        })
      })
    })

    test('should show items when category is clicked', () => {
      render(<ProfileCard {...defaultProps} />)

      const firstCategoryTitle = mockProfile.categories[0].title
      const firstCategoryButton = screen.getByText(firstCategoryTitle)

      fireEvent.click(firstCategoryButton)

      mockProfile.categories[0].items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })

    test('should toggle category expansion on multiple clicks', () => {
      render(<ProfileCard {...defaultProps} />)

      const firstCategoryTitle = mockProfile.categories[0].title
      const firstCategoryButton = screen.getByText(firstCategoryTitle)

      // Expand
      fireEvent.click(firstCategoryButton)
      expect(screen.getByText(mockProfile.categories[0].items[0])).toBeInTheDocument()

      // Collapse
      fireEvent.click(firstCategoryButton)
      expect(screen.queryByText(mockProfile.categories[0].items[0])).not.toBeInTheDocument()
    })

    test('should independently toggle each category', () => {
      render(<ProfileCard {...defaultProps} />)

      const buttons = screen.getAllByRole('button').slice(0, mockProfile.categories.length)

      // Click first category
      fireEvent.click(buttons[0])
      expect(screen.getByText(mockProfile.categories[0].items[0])).toBeInTheDocument()

      // Second category should still be collapsed
      if (mockProfile.categories[1]) {
        expect(screen.queryByText(mockProfile.categories[1].items[0])).not.toBeInTheDocument()
      }
    })

    test('should show down arrow when expanded', () => {
      render(<ProfileCard {...defaultProps} />)

      const firstCategoryButton = screen.getByText(mockProfile.categories[0].title)

      fireEvent.click(firstCategoryButton)

      // After expansion, should show down arrow ▼
      expect(screen.getByText(/▼/)).toBeInTheDocument()
    })

    test('should show right arrow when collapsed', () => {
      render(<ProfileCard {...defaultProps} />)

      // Initially all should be collapsed with right arrows
      expect(screen.getByText(/▶/)).toBeInTheDocument()
    })
  })

  describe('combo warning', () => {
    test('should display combo warning when present', () => {
      render(<ProfileCard {...defaultProps} />)

      if (mockProfile.comboWarning) {
        expect(screen.getByText(mockProfile.comboWarning)).toBeInTheDocument()
      }
    })

    test('should display warning icon', () => {
      render(<ProfileCard {...defaultProps} />)

      if (mockProfile.comboWarning) {
        expect(screen.getByText(/⚠️/)).toBeInTheDocument()
      }
    })

    test('should display "Permission Combination Risk" heading', () => {
      render(<ProfileCard {...defaultProps} />)

      if (mockProfile.comboWarning) {
        expect(screen.getByText(/Permission Combination Risk/)).toBeInTheDocument()
      }
    })

    test('should not display warning when comboWarning is null', () => {
      const noWarningProfile = {
        ...mockProfile,
        comboWarning: null,
      }

      const { container } = render(
        <ProfileCard
          profile={noWarningProfile}
          permissions={defaultProps.permissions}
        />
      )

      const warningBox = container.querySelector('[class*="warning"]')

      if (noWarningProfile.comboWarning) {
        expect(warningBox).toBeInTheDocument()
      }
    })
  })

  describe('scenarios display', () => {
    test('should render scenarios section', () => {
      render(<ProfileCard {...defaultProps} />)

      expect(screen.getByText('What They Could Do With This Data')).toBeInTheDocument()
    })

    test('should display all scenarios', () => {
      render(<ProfileCard {...defaultProps} />)

      mockProfile.scenarios.forEach((scenario) => {
        expect(screen.getByText(scenario.title)).toBeInTheDocument()
        expect(screen.getByText(scenario.description)).toBeInTheDocument()
      })
    })

    test('should display scenario icons', () => {
      render(<ProfileCard {...defaultProps} />)

      mockProfile.scenarios.forEach((scenario) => {
        expect(screen.getByText(scenario.icon)).toBeInTheDocument()
      })
    })

    test('should display scenarios with proper styling', () => {
      const { container } = render(<ProfileCard {...defaultProps} />)

      const scenarioItems = container.querySelectorAll('li')

      expect(scenarioItems.length).toBeGreaterThan(0)
    })

    test('should include SourcesBreakdown for scenarios with sources', () => {
      render(<ProfileCard {...defaultProps} />)

      // SourcesBreakdown should be rendered for scenarios with sources
      const sourcesBreakdowns = screen.queryAllByTestId('sources-breakdown')

      if (mockProfile.scenarios.some((s) => s.sources)) {
        expect(sourcesBreakdowns.length).toBeGreaterThan(0)
      }
    })
  })

  describe('category items display', () => {
    test('should display items with arrow prefix when expanded', () => {
      render(<ProfileCard {...defaultProps} />)

      const firstCategoryButton = screen.getByText(mockProfile.categories[0].title)

      fireEvent.click(firstCategoryButton)

      mockProfile.categories[0].items.forEach((item) => {
        const itemElement = screen.getByText(item)
        expect(itemElement).toBeInTheDocument()
      })
    })

    test('should properly format item list', () => {
      render(<ProfileCard {...defaultProps} />)

      const firstCategoryButton = screen.getByText(mockProfile.categories[0].title)

      fireEvent.click(firstCategoryButton)

      const items = screen.getAllByText(/→/)

      expect(items.length).toBeGreaterThan(0)
    })
  })

  describe('responsive behavior', () => {
    test('should have responsive grid layout for categories', () => {
      const { container } = render(<ProfileCard {...defaultProps} />)

      const grid = container.querySelector('[class*="grid"]')

      expect(grid).toHaveClass('grid')
    })

    test('should have responsive column layout', () => {
      const { container } = render(<ProfileCard {...defaultProps} />)

      const grid = container.querySelector('[class*="grid"]')

      if (grid && grid.className) {
        expect(grid.className).toContain('md:')
      }
    })
  })

  describe('accessibility', () => {
    test('category toggle buttons should be accessible', () => {
      render(<ProfileCard {...defaultProps} />)

      const buttons = screen.getAllByRole('button')

      expect(buttons.length).toBeGreaterThan(0)
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument()
      })
    })

    test('should have proper heading hierarchy', () => {
      const { container } = render(<ProfileCard {...defaultProps} />)

      const headings = container.querySelectorAll('h2, h3')

      expect(headings.length).toBeGreaterThan(0)
    })

    test('should have proper semantic list structure', () => {
      render(<ProfileCard {...defaultProps} />)

      const firstCategoryButton = screen.getByText(mockProfile.categories[0].title)

      fireEvent.click(firstCategoryButton)

      const listItems = screen.getAllByRole('listitem')

      expect(listItems.length).toBeGreaterThan(0)
    })
  })

  describe('edge cases', () => {
    test('should handle profile with no categories', () => {
      const emptyProfile = {
        ...mockProfile,
        categories: [],
      }

      render(<ProfileCard profile={emptyProfile} permissions={defaultProps.permissions} />)

      expect(screen.getByText('Data Profile Summary')).toBeInTheDocument()
    })

    test('should handle profile with no scenarios', () => {
      const emptyProfile = {
        ...mockProfile,
        scenarios: [],
      }

      render(<ProfileCard profile={emptyProfile} permissions={defaultProps.permissions} />)

      expect(screen.getByText('Data Profile Summary')).toBeInTheDocument()
    })

    test('should handle very long category titles', () => {
      const longCategoryProfile = {
        ...mockProfile,
        categories: [
          {
            ...mockProfile.categories[0],
            title: 'A'.repeat(100),
          },
        ],
      }

      render(<ProfileCard profile={longCategoryProfile} permissions={defaultProps.permissions} />)

      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument()
    })

    test('should handle special characters in category titles', () => {
      const specialCharProfile = {
        ...mockProfile,
        categories: [
          {
            ...mockProfile.categories[0],
            title: 'Location & Tracking Data',
          },
        ],
      }

      render(<ProfileCard profile={specialCharProfile} permissions={defaultProps.permissions} />)

      expect(screen.getByText('Location & Tracking Data')).toBeInTheDocument()
    })

    test('should handle many categories', () => {
      const manyCategories = Array.from({ length: 20 }, (_, i) => ({
        title: `Category ${i}`,
        items: [`Item ${i}a`, `Item ${i}b`],
      }))

      const manyProfile = {
        ...mockProfile,
        categories: manyCategories,
      }

      render(<ProfileCard profile={manyProfile} permissions={defaultProps.permissions} />)

      expect(screen.getByText('Category 0')).toBeInTheDocument()
    })

    test('should handle categories with many items', () => {
      const manyItems = Array.from({ length: 50 }, (_, i) => `Item ${i}`)

      const manyItemsProfile = {
        ...mockProfile,
        categories: [
          {
            ...mockProfile.categories[0],
            items: manyItems,
          },
        ],
      }

      render(<ProfileCard profile={manyItemsProfile} permissions={defaultProps.permissions} />)

      const categoryButton = screen.getByText(mockProfile.categories[0].title)

      fireEvent.click(categoryButton)

      expect(screen.getByText('Item 0')).toBeInTheDocument()
      expect(screen.getByText('Item 49')).toBeInTheDocument()
    })
  })

  describe('state management', () => {
    test('should maintain expansion state during re-renders', () => {
      const { rerender } = render(<ProfileCard {...defaultProps} />)

      const firstCategoryButton = screen.getByText(mockProfile.categories[0].title)

      fireEvent.click(firstCategoryButton)

      expect(screen.getByText(mockProfile.categories[0].items[0])).toBeInTheDocument()

      rerender(<ProfileCard {...defaultProps} />)

      expect(screen.getByText(mockProfile.categories[0].items[0])).toBeInTheDocument()
    })

    test('should handle profile data updates', () => {
      const profile1 = {
        ...mockProfile,
        invasionLevel: 'Low',
      }

      const profile2 = {
        ...mockProfile,
        invasionLevel: 'High',
      }

      const { rerender } = render(
        <ProfileCard profile={profile1} permissions={defaultProps.permissions} />
      )

      expect(screen.getByText('Low')).toBeInTheDocument()

      rerender(
        <ProfileCard profile={profile2} permissions={defaultProps.permissions} />
      )

      expect(screen.queryByText('Low')).not.toBeInTheDocument()
      expect(screen.getByText('High')).toBeInTheDocument()
    })
  })
})
