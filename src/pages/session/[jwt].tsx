import { Session } from 'types/Session'
import { applySession } from 'next-session'
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

export async function getServerSideProps({ req, res, query }: any): Promise<any> {
  await applySession(req, res, { name: 'apideck_vault' })

  const { jwt } = query
  req.session.jwt = jwt

  const decoded = decode(jwt) as Session
  if (decoded) {
    req.session.token = camelCaseKeys(decoded)
  }

  if (!req.session.token) return { props: {} }

  return {
    props: {
      session: { ...req.session.token, jwt: req.session.jwt }
    }
  }
}

export default SessionPage
