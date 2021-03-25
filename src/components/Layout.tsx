import Head from 'next/head'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  favicon?: string
}

const Layout = ({
  children,
  title = 'Apideck CRM',
  description = 'An Apideck sample project that demonstrates how to embed CRM data into your product. Use Apideck and integrate APIs faster.',
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
    {children}
  </div>
)

export default Layout
