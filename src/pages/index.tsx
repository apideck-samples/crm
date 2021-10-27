import Layout from '../components/Layout'
import Leads from 'components/leads/Leads'
import { Session } from 'types/Session'
import VaultSessionButton from 'components/VaultSessionButton'
import { applySession } from 'next-session'
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
    if (!session && jwt?.length) {
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
              <p>{leads?.message}</p>
            </div>
            {leads?.status_code === 401 && connection?.service_id && (
              <VaultSessionButton
                text={`Authorize ${connection?.name}`}
                variant="primary"
                redirectUrl={redirectUrl}
              />
            )}
          </div>
        </div>
      )}
      {connection ? (
        <Leads />
      ) : (
        <div className="text-center">
          <h2 className="mt-2 text-lg font-medium text-gray-900">No integration selected</h2>
          <p className="mt-1 mb-4 text-sm text-gray-500">
            If no options are available{' '}
            <a
              href={`https://vault.apideck.com/session/${session?.jwt}`}
              className="font-medium text-gray-700 hover:text-primary-600"
            >
              visit Vault
            </a>{' '}
            to add and configure integrations
          </p>
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps = async ({ req, res }: any): Promise<any> => {
  await applySession(req, res, { name: 'apideck_vault' })

  return {
    props: {
      jwt: req.session?.jwt || '',
      token: req.session?.token || {}
    }
  }
}

export default IndexPage
