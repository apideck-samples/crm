import 'styles/tailwind.css'

import { ConnectorProvider, ModalProvider, ToastProvider } from 'utils'

import { AppProps } from 'next/app'

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
