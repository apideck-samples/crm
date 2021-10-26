import Companies from 'components/companies/Companies'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { useCompanies } from 'utils/useCompanies'
import { useConnection } from 'utils'

const CompaniesPage: NextPage = () => {
  const { connection } = useConnection()
  const { companies, isError } = useCompanies()

  return (
    <Layout title={`Companies - ${connection?.name + ' | Apideck CRM'}`} pageHeader="Companies">
      {isError && (
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">{companies?.error}</h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>{companies?.detail}</p>
            </div>
          </div>
        </div>
      )}
      <Companies />
    </Layout>
  )
}

export default CompaniesPage
