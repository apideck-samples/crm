import React, { ReactNode } from 'react'

import Head from 'next/head'
import Navbar from 'components/Navbar'
import PageHeader from 'components/PageHeader'

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
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href={favicon} />
    </Head>
    <Navbar />
    <PageHeader title={pageHeader} />
    <div className="pl-2 mx-auto my-12 overflow-hidden max-w-7xl sm:px-6 lg:px-8">{children}</div>
  </div>
)

export default Layout
