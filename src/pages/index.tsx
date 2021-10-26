import Layout from '../components/Layout'
import Leads from 'components/leads/Leads'
import { Session } from 'types/Session'
import VaultSessionButton from 'components/VaultSessionButton'
import { useConnection } from 'utils'
import { useEffect } from 'react'
import { useLeads } from 'utils/useLeads'
import { useSession } from 'utils/useSession'

interface Props {
  jwt: string
  token: Session
}

const IndexPage = ({ jwt, token }: Props) => {
  const { connection } = useConnection()
  const { session, setSession } = useSession()
  const { isError, leads } = useLeads()
  const redirectUrl = connection?.service_id
    ? `https://vault.apideck.com/integrations/crm/${connection?.service_id}/enable`
    : undefined

  useEffect(() => {
    if (!session && token) {
      setSession({ ...token, jwt })
    }
  }, [jwt, session, setSession, token])

  return (
    <Layout title={`Leads - ${connection?.name + ' | Apideck CRM'}`} pageHeader="Leads">
      {isError && (
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">{leads?.error}</h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>{leads?.detail}</p>
            </div>
            {leads?.statusCode === 401 && connection?.service_id && (
              <VaultSessionButton
                text={`Authorize ${connection?.name}`}
                variant="primary"
                redirectUrl={redirectUrl}
              />
            )}
          </div>
        </div>
      )}
      <Leads />
    </Layout>
  )
}

export default IndexPage
