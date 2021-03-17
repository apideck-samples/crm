import Layout from '../components/Layout'
import Leads from 'components/Leads'
import { NextPage } from 'next'
import PageHeading from 'components/PageHeading'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next Starter Kit">
      <div className="min-h-full p-3 sm:p-10 lg:p-20 bg-gray-50">
        <PageHeading title={`Leads`} />
        <br />
        <Leads />
      </div>
    </Layout>
  )
}

export default IndexPage
