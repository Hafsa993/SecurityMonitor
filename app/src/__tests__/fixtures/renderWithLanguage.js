/**
 * Testing Library re-export whose render() wraps components in LanguageProvider,
 * since every translated component calls useLanguage().
 */

import React from 'react'
import { render } from '@testing-library/react'
import { LanguageProvider } from '@/context/LanguageContext'

function Providers({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

function renderWithLanguage(ui, options) {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { renderWithLanguage as render }
