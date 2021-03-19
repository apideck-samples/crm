import ErrorMessage from 'components/ErrorMessage'
import Leads from 'components/Leads'
import Navbar from 'components/Navbar'
import PageHeader from 'components/PageHeader'
import SelectConnection from 'components/SelectConnection'
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
      <Navbar />
      <PageHeader title={'Leads'}>
        <div className="flex flex-shrink-0 mt-4 md:mt-0 md:ml-4">
          <span className="rounded-md shadow-sm">
            <SelectConnection />
          </span>
        </div>
      </PageHeader>

      {/* <SidebarLayout> */}

      <div className="pl-2 mx-auto mt-6 mb-12 max-w-7xl sm:px-6 lg:px-8">
        {/* <PageHeading title="Leads" showButton={!leads?.error && !isError} /> */}
        <br />
        {(leads?.error || isError) && (
          <ErrorMessage error={leads?.error} message={leads?.message} />
        )}
        {/* {isLoading && <Spinner />} */}
        <Leads />
      </div>

      {/* </SidebarLayout> */}
    </Layout>
  )
}

export default IndexPage
