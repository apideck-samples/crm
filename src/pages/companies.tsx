import Layout from '../components/Layout'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import PageHeader from 'components/PageHeader'
import { useConnection } from 'utils'

const CompaniesPage: NextPage = () => {
  const { connection } = useConnection()

  return (
    <Layout title={`Companies | ${connection?.name || 'CRM'}`}>
      <Navbar />
      <PageHeader title="Companies" />
      {/* TODO       */}
    </Layout>
  )
}

export default CompaniesPage
