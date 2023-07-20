// @vitest-environment jsdom
import { useAuth0 } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import VoteButton from '@/components/vote-buttons'
import { testQueryClientConfig } from '@/test/utils'

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

describe('<VoteButton>', () => {
  describe('when authenticated', () => {
    beforeEach(() => {
      mockUseAuth0.mockReturnValue({
        ...mockUseAuth0(),
        isAuthenticated: true,
        user: {
          nickname: 'john.doe',
          email: 'john.doe@gmail.com',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getAccessTokenSilently: () => Promise.resolve('token') as any,
      })
    })

    it('should sucessfully add a vote ', async () => {
      const user = userEvent.setup()

      const queryClient = new QueryClient(testQueryClientConfig)

      render(
        <QueryClientProvider client={queryClient}>
          <VoteButton petId={1} />
        </QueryClientProvider>
      )

      const scope1 = nock('http://localhost')
        .post('/api/v1/pets/1/votes')
        .reply(201)

      const button = screen.getByRole('button')

      await user.click(button)

      await waitForElementToBeRemoved(() =>
        screen.queryByRole('button', { name: /voting/i })
      )

      const votedText = await screen.findByText(/voted!/i)
      expect(scope1.isDone()).toBeTruthy()

      expect(votedText).toBeInTheDocument()
    })

    it('should show a loading indicator when adding a vote', async () => {
      const user = userEvent.setup()

      const queryClient = new QueryClient(testQueryClientConfig)

      render(
        <QueryClientProvider client={queryClient}>
          <VoteButton petId={1} />
        </QueryClientProvider>
      )

      const scope1 = nock('http://localhost')
        .post('/api/v1/pets/1/votes')
        .reply(201)

      const button = screen.getByRole('button')

      await user.click(button)

      const votingText = await screen.findByText(/voting/i)
      expect(scope1.isDone()).toBeTruthy()

      expect(votingText).toBeInTheDocument()
    })
    it('should show an error message when it fails to add a vote', async () => {
      const user = userEvent.setup()

      const queryClient = new QueryClient(testQueryClientConfig)

      render(
        <QueryClientProvider client={queryClient}>
          <VoteButton petId={1} />
        </QueryClientProvider>
      )

      const scope1 = nock('http://localhost')
        .post('/api/v1/pets/1/votes')
        .reply(500)

      const button = screen.getByRole('button')

      await user.click(button)

      await waitForElementToBeRemoved(() =>
        screen.queryByRole('button', { name: /voting/i })
      )

      const errorMessage = await screen.findByText(/error/i)
      expect(scope1.isDone()).toBeTruthy()

      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe('when not authenticated', () => {
    beforeEach(() => {
      mockUseAuth0.mockReturnValue({
        ...mockUseAuth0(),
        isAuthenticated: false,
      })
    })

    it('should show a message telling user they need to be signed in to vote', async () => {
      const user = userEvent.setup()

      const queryClient = new QueryClient(testQueryClientConfig)

      render(
        <QueryClientProvider client={queryClient}>
          <VoteButton petId={1} />
        </QueryClientProvider>
      )

      const scope1 = nock('http://localhost')
        .post('/api/v1/pets/1/votes')
        .reply(201)

      const button = screen.getByRole('button')

      await user.click(button)

      await waitForElementToBeRemoved(() =>
        screen.queryByRole('button', { name: /voting/i })
      )

      const votedText = await screen.findByText(/voted!/i)
      expect(scope1.isDone()).toBeTruthy()

      expect(votedText).toBeInTheDocument()
    })
  })
})
