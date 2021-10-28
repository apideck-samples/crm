import 'styles/tailwind.css'

import { ModalProvider, ToastProvider } from '@apideck/components'

import { AppProps } from 'next/app'
import { ConnectorProvider } from 'utils'
import { SessionProvider } from 'utils/useSession'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ToastProvider>
      <SessionProvider>
        <ConnectorProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </ConnectorProvider>
      </SessionProvider>
    </ToastProvider>
  )
}
