import { RefObject, useRef, useState } from 'react'

import Link from 'next/link'
import VaultSessionButton from './VaultSessionButton'
import { useRouter } from 'next/router'

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const router = useRouter()
  const navbarNode = useRef() as RefObject<HTMLDivElement>
  const hamburgerNode = useRef() as RefObject<HTMLDivElement>

  return (
    <nav className="bg-white border-b border-cool-gray-200">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-4 sm:px-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="flex">
                  <img className="w-20 h-8" src="/img/logo-black.svg" alt="" />{' '}
                  <span className="mt-0.5 ml-0.5 font-bold text-lg text-primary-700 text-size-lg">
                    CRM
                  </span>
                </a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10">
                <Link href="/">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
                      router?.pathname === '/' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Leads
                  </a>
                </Link>
                <Link href="/companies">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
                      router?.pathname === '/companies' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Companies
                  </a>
                </Link>
                <Link href="/contacts">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
                      router?.pathname === '/contacts' && 'text-blue-700 bg-cool-gray-100'
                    }`}
                  >
                    Contacts
                  </a>
                </Link>
                <Link href="/opportunities">
                  <a
                    className={`px-3 py-2 mr-4 text-sm font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
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
              <VaultSessionButton variant="outline" text="Integration settings" />
            </div>
          </div>
          <a
            href="https://github.com/apideck-samples/crm"
            target="_blank"
            rel="noreferrer"
            className="absolute hidden text-gray-500 transition-colors duration-200 xl:block hover:text-gray-600 top-5 right-5"
          >
            <svg width={24} height={24} viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
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
                className={`block px-3 py-2 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
                  router?.pathname === '/' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Leads
              </a>
            </Link>
            <Link href="/companies">
              <a
                className={`block px-3 py-2 mt-1 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
                  router?.pathname === '/companies' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Companies
              </a>
            </Link>
            <Link href="/contacts">
              <a
                className={`block px-3 py-2 mt-1 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
                  router?.pathname === '/contacts' && 'text-blue-700 bg-cool-gray-100'
                }`}
              >
                Contacts
              </a>
            </Link>
            <Link href="/opportunities">
              <a
                className={`block px-3 py-2 mt-1 text-base font-semibold text-gray-900 rounded-md hover:text-blue-700 hover:bg-cool-gray-100 focus:outline-none focus:text-blue-700 focus:bg-cool-gray-100 ${
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
