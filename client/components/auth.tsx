import { useAuth0 } from '@auth0/auth0-react'

interface AuthenticatedProps {
  children: React.ReactNode
}

export function IfAuthenticated({ children }: AuthenticatedProps) {
  const { isAuthenticated } = useAuth0()

  return <>{isAuthenticated ? children : null}</>
}

export function IfNotAuthenticated({ children }: AuthenticatedProps) {
  const { isAuthenticated } = useAuth0()

  return <>{isAuthenticated ? null : children}</>
}
