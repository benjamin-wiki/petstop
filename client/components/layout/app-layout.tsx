import { Outlet } from 'react-router-dom'

import Navigation from '@/components/layout/nav-bar'

export default function AppLayout() {
  return (
    <div>
      <Navigation />
      <main className="container px-2 md:px-4">
        <Outlet />
      </main>
    </div>
  )
}
