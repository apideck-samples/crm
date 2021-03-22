import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import VaultSessionButton from './VaultSessionButton'

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const router = useRouter()
  const navbarNode = useRef()
  const hamburgerNode = useRef()

  return (
    <nav className="bg-white border-b border-cool-gray-200">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-4 sm:px-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a>
                  <img className="w-20 h-8" src="/img/logo-black.svg" alt="" />
                </a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10">
                <Link href="/">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                      router?.pathname === '/' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Leads
                  </a>
                </Link>
                <Link href="/companies">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                      router?.pathname === '/companies' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Companies
                  </a>
                </Link>
                <Link href="/contacts">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                      router?.pathname === '/contacts' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Contacts
                  </a>
                </Link>
                <Link href="/opportunities">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                      router?.pathname === '/opportunities' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Opportunities
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <VaultSessionButton />
            </div>
          </div>
          <div className="flex -mr-2 md:hidden" ref={hamburgerNode}>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-blue-700 hover:bg-cool-gray-200 focus:outline-none focus:bg-cool-gray-200 focus:text-blue-700"
            >
              <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {navbarOpen ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {navbarOpen && (
        <div className="block border-b border-cool-gray-200 md:hidden" ref={navbarNode}>
          <div className="px-2 py-3 sm:px-3">
            <Link href="/">
              <a
                className={`block px-3 py-2 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                  router?.pathname === '/' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Leads
              </a>
            </Link>
            <Link href="/companies">
              <a
                className={`block px-3 py-2 mt-1 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                  router?.pathname === '/companies' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Companies
              </a>
            </Link>
            <Link href="/contacts">
              <a
                className={`block px-3 py-2 mt-1 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                  router?.pathname === '/contacts' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Contacts
              </a>
            </Link>
            <Link href="/opportunities">
              <a
                className={`block px-3 py-2 mt-1 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-white focus:bg-cool-gray-100 ${
                  router?.pathname === '/opportunities' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Opportunities
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
