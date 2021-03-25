import Layout from '../components/Layout'
import Leads from 'components/Leads'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import PageHeader from 'components/PageHeader'
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
    <Layout title={`Leads - ${connection?.name + ' | Apideck CRM'}`}>
      <Navbar />
      <PageHeader title="Leads" />
      <div className="pl-2 mx-auto my-12 overflow-hidden max-w-7xl sm:px-6 lg:px-8">
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
      </div>
    </Layout>
  )
}

export default IndexPage
