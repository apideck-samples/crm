import { Button } from '@apideck/components'
import Navbar from 'components/Navbar'
import PageHeader from 'components/PageHeader'
import { NextPage } from 'next'
import { useConnection } from 'utils'
import Layout from '../components/Layout'

const OpportunitiesPage: NextPage = () => {
  const { connection } = useConnection()

  return (
    <Layout title={`Opportunities - ${connection?.name + ' | Apideck CRM'}`}>
      <Navbar />
      <PageHeader title="Opportunities" />
      <div className="pl-2 mx-auto my-12 overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          This resource is not yet implemented
        </h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>Use the CRM API to implement opportunities</p>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <a
              href="https://developers.apideck.com/apis/crm/reference#tag/Opportunities"
              target="_blank"
              rel="noreferrer"
            >
              <Button text="Opportunities docs" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OpportunitiesPage
