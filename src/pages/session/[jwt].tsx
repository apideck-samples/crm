import { Session } from 'types/Session'
import camelCaseKeys from 'camelcase-keys-deep'
import { decode } from 'jsonwebtoken'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'utils/useSession'
import { useToast } from '@apideck/components'

interface Props {
  session: Session
}

const SessionPage = ({ session }: Props) => {
  const { push } = useRouter()
  const { addToast } = useToast()
  const { setSession } = useSession()

  useEffect(() => {
    if (session) {
      setSession(session)
      push('/')
      addToast({
        title: 'Session created',
        description: 'You can now use the Apideck CRM',
        autoClose: true,
        type: 'success'
      })
    }
  }, [addToast, push, session, setSession])

  return <div />
}

export async function getServerSideProps({ query }: any): Promise<any> {
  const { jwt } = query
  const decoded = decode(jwt) as Session
  const token = camelCaseKeys(decoded)

  return {
    props: {
      session: { ...token, jwt }
    }
  }
}

export default SessionPage
