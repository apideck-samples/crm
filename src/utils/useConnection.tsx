import { Dispatch, ReactNode, createContext, useContext } from 'react'

import { Connection } from 'types/Connection'
import { useStickyState } from './useStickyState'

interface ContextProps {
  setConnection: Dispatch<Connection>
  connection: Connection | null
}

const ConnectorContext = createContext<Partial<ContextProps>>({})

export const ConnectorProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useStickyState(null, 'connection')

  return (
    <ConnectorContext.Provider value={{ setConnection, connection }}>
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnection = () => {
  return useContext(ConnectorContext) as ContextProps
}
