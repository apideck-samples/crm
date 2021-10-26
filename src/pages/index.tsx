import Layout from '../components/Layout'
import Leads from 'components/leads/Leads'
import { NextPage } from 'next'
import VaultSessionButton from 'components/VaultSessionButton'
import { useConnection } from 'utils'
import { useLeads } from 'utils/useLeads'

const IndexPage: NextPage = () => {
  const { connection } = useConnection()
  const { isError, leads } = useLeads()
  const redirectUrl = connection?.service_id
    ? `https://vault.apideck.com/integrations/crm/${connection?.service_id}/enable`
    : undefined

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
