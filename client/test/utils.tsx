import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { routes } from '../routes'

export const testQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
}

/**
 * Use this function to render a route in a test. This function will create a
 * memory router, query client, and user object for you.
 *
 * @example renderRoute('/')
 * @param location initial location to render
 */
function renderRoute(location: string) {
  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })

  const queryClient = new QueryClient(testQueryClientConfig)

  const container = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )

  const user = userEvent.setup()

  return {
    ...container,
    user,
  }
}

export * from '@testing-library/react'
export { renderRoute }
