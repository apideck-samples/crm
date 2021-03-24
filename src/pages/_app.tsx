import 'styles/tailwind.css'

import { ModalProvider, ToastProvider } from '@apideck/components'

import { AppProps } from 'next/app'
import { ConnectorProvider } from 'utils'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ConnectorProvider>
      <ToastProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ToastProvider>
    </ConnectorProvider>
  )
}
