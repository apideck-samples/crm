import ErrorMessage from 'components/ErrorMessage'
import Leads from 'components/Leads'
import PageHeading from 'components/PageHeading'
import SidebarLayout from 'components/SidebarLayout'
import Spinner from 'components/Spinner'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { useConnector } from 'utils/useConnector'
import { useLeads } from 'utils/useLeads'
import { usePrevious } from 'utils/usePrevious'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  const { connection } = useConnector()
  const { leads, isLoading, isError, revalidate } = useLeads(connection?.service_id)
  const prefServiceId = usePrevious(connection?.service_id)

  useEffect(() => {
    if (prefServiceId !== connection?.service_id) revalidate()
  }, [connection?.service_id, prefServiceId, revalidate])

  return (
    <Layout title={`CRM | ${connection?.name}`}>
      <SidebarLayout>
        <div className="max-w-5xl p-6 mx-auto mt-6">
          <PageHeading title="Leads" showButton={!leads?.error && !isError} />
          <br />
          {(leads?.error || isError) && (
            <ErrorMessage error={leads?.error} message={leads?.message} />
          )}
          {isLoading && <Spinner />}
          {leads?.data && <Leads data={leads?.data} />}
        </div>
      </SidebarLayout>
    </Layout>
  )
}

export default IndexPage
