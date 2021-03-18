import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import { ConnectorProvider } from 'utils/useConnector'
import { ModalProvider } from 'utils/useModal'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ConnectorProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ConnectorProvider>
  )
}
