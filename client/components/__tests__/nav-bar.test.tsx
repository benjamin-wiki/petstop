// @vitest-environment jsdom
import { useAuth0 } from '@auth0/auth0-react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderRoute, screen, within } from '@/test/utils'
vi.mock('@auth0/auth0-react')

const mockUseAuth0 = vi.mocked(useAuth0)

beforeEach(() => {
  mockUseAuth0.mockReturnValue({
    ...useAuth0(),
    isAuthenticated: false,
    logout: vi.fn(),
    loginWithRedirect: vi.fn(),
  })
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('<Navigation>', () => {
  it('renders navigation', () => {
    renderRoute('/')

    const list = screen.getByRole('list')
    const links = within(list).getAllByRole('listitem')

    links.forEach((link) => {
      expect(link).toBeVisible()
    })

    expect(links.map((link) => link.textContent)).toMatchInlineSnapshot(`
      [
        "Home",
        "Random",
        "Leaderboard",
      ]
    `)
  })

  it('can render mobile navigation', async () => {
    const { user } = renderRoute('/')

    await user.click(screen.getByRole('button', { name: /open menu/i }))

    expect(screen.getByText(/existing pet lover/i)).toBeVisible()
  })

  describe('when authenticated', () => {
    beforeEach(() => {
      mockUseAuth0.mockReturnValue({
        ...mockUseAuth0(),
        isAuthenticated: true,
      })
    })

    it('displays sign out button', () => {
      renderRoute('/')

      expect(screen.getByRole('button', { name: /log off/i })).toBeVisible()
    })

    it('signs a user out when clicking the sign out button', async () => {
      const { user } = renderRoute('/')

      const { logout } = mockUseAuth0()

      expect(screen.getByRole('button', { name: /log off/i })).toBeVisible()

      await user.click(screen.getByRole('button', { name: /log off/i }))

      expect(logout).toHaveBeenCalled()
    })
  })

  describe('when not authenticated', () => {
    it('displays sign in and sign up buttons', () => {
      renderRoute('/')

      expect(screen.getByRole('button', { name: /sign in/i })).toBeVisible()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeVisible()
    })

    it('signs a user in when clicking the sign in button', async () => {
      const { user } = renderRoute('/')

      const { loginWithRedirect } = mockUseAuth0()

      await user.click(screen.getByRole('button', { name: /sign in/i }))

      expect(loginWithRedirect).toHaveBeenCalled()
    })

    it('signs a user up when clicking the sign up button', async () => {
      const { user } = renderRoute('/')

      const { loginWithRedirect } = mockUseAuth0()

      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(loginWithRedirect).toHaveBeenCalledWith({
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'signup',
        },
      })
    })
  })
})
