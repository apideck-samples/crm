import { Dispatch, ReactNode, createContext, useContext, useState } from 'react'

import { Connection } from 'types/Connection'

interface ContextProps {
  setConnection: Dispatch<Connection>
  connection: Connection | null
}

const ConnectorContext = createContext<Partial<ContextProps>>({})

export const ConnectorProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<Connection | null>(null)

  return (
    <ConnectorContext.Provider value={{ setConnection, connection }}>
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnection = () => {
  return useContext(ConnectorContext) as ContextProps
}
