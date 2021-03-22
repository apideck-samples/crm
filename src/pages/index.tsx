import ErrorMessage from 'components/ErrorMessage'
import Layout from '../components/Layout'
import Leads from 'components/Leads'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import PageHeader from 'components/PageHeader'
import { useConnection } from 'utils'
import { useLeads } from 'utils/useLeads'

const IndexPage: NextPage = () => {
  const { connection } = useConnection()
  const { leads, isError } = useLeads()

  return (
    <Layout title={`CRM | ${connection?.name || 'Apideck'}`}>
      <Navbar />
      <PageHeader title="Leads" />
      <div className="pl-2 mx-auto mt-6 mb-12 max-w-7xl sm:px-6 lg:px-8">
        <br />
        {(leads?.error || isError) && (
          <ErrorMessage error={leads?.error} message={leads?.message} />
        )}
        <Leads />
      </div>
    </Layout>
  )
}

export default IndexPage
