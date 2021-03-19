import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import { ConnectorProvider } from 'utils/useConnector'
import { ModalProvider } from 'utils/useModal'
import { ToastProvider } from 'utils/useToast'

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
