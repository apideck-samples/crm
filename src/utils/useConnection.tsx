import { ReactNode, createContext, useContext, useState } from 'react'

interface ContextProps {
  setConnection: any
  connection: any
}

const ConnectorContext = createContext<Partial<ContextProps>>({})

export const ConnectorProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<any>(null)

  return (
    <ConnectorContext.Provider value={{ setConnection, connection }}>
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnection = () => {
  return useContext(ConnectorContext) as ContextProps
}
