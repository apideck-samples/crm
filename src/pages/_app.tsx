import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import { ModalProvider } from 'utils/useModal'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  )
}
