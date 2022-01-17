import React, { ReactNode } from 'react'

import { Button } from '@apideck/components'
import Head from 'next/head'
import Navbar from 'components/Navbar'
import PageHeader from 'components/PageHeader'
import { useSession } from 'utils/useSession'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  favicon?: string
  pageHeader?: string
}

const Layout = ({
  children,
  title = 'Apideck CRM',
  description = 'An Apideck sample project that demonstrates how to embed CRM data into your product. Use Apideck and integrate APIs faster.',
  pageHeader = 'Leads',
  favicon = '/img/logo.png'
}: Props) => {
  const { session, createSession, isLoading } = useSession()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content={description}></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href={favicon} />
      </Head>
      <Navbar />
      <PageHeader title={pageHeader} />
      <div className="pl-2 mx-auto my-12 overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        {!session ? (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Invalid session</h2>
            <p className="mt-1 mb-4 text-sm text-gray-500">
              You need a valid session to use the Apideck CRM
            </p>
            <Button
              onClick={createSession}
              text="Create a test session"
              isLoading={isLoading}
              variant="outline"
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default Layout
