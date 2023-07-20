import { useAuth0 } from '@auth0/auth0-react'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// import { useParams } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from '@/components/auth'
import Logo from '@/components/icons/logo'

const links = [
  { name: 'Home', to: '/' },
  { name: 'Random', to: '/random' },
  { name: 'Leaderboard', to: '/leaderboard' },
]

export default function Navigation() {
  // const { ownerId } = useParams()
  // const link = `/api/v1/owner/auth0|649015576ef896963ad50a97/pets`
  // const ownerId = useParams()
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleLogout = () => {
    logout()
  }

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: { screen_hint: 'signup', prompt: 'login' },
    })
  }

  return (
    <Popover as="nav" className="gradient-y-to-p relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Pet Stop</span>
              <Logo className="h-8 w-8 mix-blend-luminosity" />
            </Link>
          </div>

          {/* DESKTOP */}
          <ul className="hidden md:flex lg:space-x-2">
            {links.map((link) => (
              <li key={link.to}>
                <DesktopLink to={link.to}>{link.name}</DesktopLink>
              </li>
            ))}
            <IfAuthenticated>
              <li>
                <DesktopLink to={`/owners/${user?.sub}/pets`}>
                  {'Owners'}
                </DesktopLink>
              </li>
            </IfAuthenticated>
          </ul>

          {/* MOBILE */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 mix-blend-luminosity hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* DESKTOP */}
          <div className="hidden items-center justify-end md:flex md:flex-1 md:space-x-4 lg:w-0">
            <IfNotAuthenticated>
              <button
                onClick={handleLogin}
                className="rounded-md px-4 py-2 text-slate-600 mix-blend-luminosity transition hover:bg-slate-700/10 hover:text-slate-700"
              >
                Sign in
              </button>
              <button
                onClick={handleSignUp}
                className="rounded-md bg-fuchsia-200 px-4 py-2 font-medium text-fuchsia-900 shadow-sm transition hover:bg-fuchsia-300"
              >
                Sign up
              </button>
            </IfNotAuthenticated>
            {/* Render add sighting button & sign out if signed in */}
            <IfAuthenticated>
              <Link
                to="/add-pet"
                className="rainbow-border rounded-md px-4 py-2 text-white hover:text-slate-700"
              >
                <FontAwesomeIcon
                  icon={faPaw}
                  className="fa-bounce mr-1"
                  style={{ color: '#FFFF00' }}
                />
                Add Pet
                <FontAwesomeIcon
                  icon={faPaw}
                  className="fa-bounce ml-1"
                  style={{ color: '#FFFF00' }}
                />
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-md px-4 py-2 text-slate-600 mix-blend-luminosity transition hover:bg-slate-700/10 hover:text-slate-700"
              >
                Log off
              </button>
            </IfAuthenticated>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <MobileNavigation
            onLogin={handleLogin}
            onLogout={handleLogout}
            onSignUp={handleSignUp}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

interface MobileNavigationProps {
  onLogin: () => void
  onLogout: () => void
  onSignUp: () => void
}
export function MobileNavigation({
  onLogin,
  onLogout,
  onSignUp,
}: MobileNavigationProps) {
  return (
    <div className="divide-y divide-slate-300 rounded-lg border border-slate-300 bg-slate-100 shadow-lg ring-1 ring-blue ring-opacity-5">
      <div className="px-5 pb-6 pt-5">
        <div className="flex flex-row-reverse items-center justify-between">
          <Popover.Button className="-mr-2 inline-flex items-center justify-center rounded-md bg-slate-100 p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue">
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>

          <Popover.Button as={Link} to="/">
            <Logo />
          </Popover.Button>
        </div>
      </div>
      <div className="space-y-6 px-5 py-6">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
          {links.map((link) => (
            <li key={link.to}>
              <Popover.Button
                as={Link}
                to={link.to}
                className="text-base font-medium hover:text-slate-600"
              >
                {link.name}
              </Popover.Button>
            </li>
          ))}
        </ul>
        {/* Sign out and Sign in buttons */}
        <div>
          <IfAuthenticated>
            <Popover.Button
              onClick={onLogout}
              className="flex w-full justify-end rounded-md px-4 py-2 text-base font-medium"
            >
              <span className="rounded-md px-4 py-2 text-slate-600 mix-blend-luminosity transition hover:bg-slate-700/10 hover:text-slate-700">
                Log out
              </span>
            </Popover.Button>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Popover.Button
              onClick={onSignUp}
              className="gradient-y-to-p flex w-full items-center justify-center rounded-md px-4 py-2 text-base font-medium"
            >
              <span className="text-slate-600 mix-blend-luminosity hover:text-slate-500">
                Sign up
              </span>
            </Popover.Button>
            <p className="mt-6 text-center text-base font-medium">
              Existing pet lover?{' '}
              <Popover.Button
                onClick={onLogin}
                className="text-purple hover:underline"
              >
                Sign in
              </Popover.Button>
            </p>
          </IfNotAuthenticated>
        </div>
      </div>
    </div>
  )
}

export function DesktopLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="rounded-md px-4 py-2 text-base font-semibold text-slate-600 mix-blend-luminosity transition-colors hover:bg-slate-700/10 hover:text-slate-700 lg:text-lg"
    >
      {children}
    </Link>
  )
}
