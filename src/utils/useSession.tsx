import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

import { Session } from 'types/Session'
import { createVaultSession } from './createVaultSession'
import { useRouter } from 'next/router'
import { useToast } from '@apideck/components'

interface ContextProps {
  createSession: () => Promise<void>
  setSession: Dispatch<SetStateAction<Session | null>>
  session: Session | null
  isLoading: boolean
}

const SessionContext = createContext<Partial<ContextProps>>({})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push } = useRouter()
  const { addToast } = useToast()

  // Creates a test session with a random consumerID
  const createSession = async () => {
    setIsLoading(true)
    const response = await createVaultSession(`${window.location.href}`)

    if (response.error) {
      addToast({ title: response.message, description: response.detail, type: 'error' })
      return
    }

    const sessionUrl = response?.data?.session_uri
    const jwt = sessionUrl.substring(sessionUrl.lastIndexOf('/') + 1)
    if (jwt) {
      push(`/session/${jwt}`)
    }
    setIsLoading(false)
  }

  return (
    <SessionContext.Provider value={{ createSession, session, setSession, isLoading }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContext) as ContextProps
}
