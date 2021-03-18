import React, { ReactNode } from 'react'

import Head from 'next/head'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  favicon?: string
}

const Layout = ({
  children,
  title = 'Apideck - Next Starter Kit',
  description = 'A Next.js starter kit with TypeScript, Tailwind, Jest, Prettier, and Eslint',
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
