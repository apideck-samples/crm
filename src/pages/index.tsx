import Layout from '../components/Layout'
import Leads from 'components/Leads'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import PageHeader from 'components/PageHeader'
import { useConnection } from 'utils'
import { useLeads } from 'utils/useLeads'

const IndexPage: NextPage = () => {
  const { connection } = useConnection()
  const { isError } = useLeads()

  return (
    <Layout title={`Leads | ${connection?.name || 'CRM'}`}>
      <Navbar />
      <PageHeader title="Leads" />
      <div className="pl-2 mx-auto my-12 overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        {isError && (
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isError?.error || isError}
            </h3>
            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
              <div className="max-w-xl text-sm text-gray-500">
                <p>{isError?.message}</p>
              </div>
            </div>
          </div>
        )}
        <Leads />
      </div>
    </Layout>
  )
}

export default IndexPage
