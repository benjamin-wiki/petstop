import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from '@/routes'

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app') as HTMLElement)

const domain = import.meta.env.VITE_AUTH0_DOMAIN as string
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string
const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      audience: audience,
      redirect_uri: window.location.origin,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Auth0Provider>
)
