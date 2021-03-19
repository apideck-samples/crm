import ErrorMessage from 'components/ErrorMessage'
import Leads from 'components/Leads'
import PageHeading from 'components/PageHeading'
import SidebarLayout from 'components/SidebarLayout'
import { NextPage } from 'next'
import { useConnector } from 'utils/useConnector'
import { useLeads } from 'utils/useLeads'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  const { connection } = useConnector()
  const { leads, isError } = useLeads()

  console.log(leads?.data)

  return (
    <Layout title={`CRM | ${connection?.name}`}>
      <SidebarLayout>
        <div className="max-w-5xl p-6 mx-auto mt-6">
          <PageHeading title="Leads" showButton={!leads?.error && !isError} />
          <br />
          {(leads?.error || isError) && (
            <ErrorMessage error={leads?.error} message={leads?.message} />
          )}
          {/* {isLoading && <Spinner />} */}
          <Leads />
        </div>
      </SidebarLayout>
    </Layout>
  )
}

export default IndexPage
