import Layout from '../components/Layout'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import PageHeader from 'components/PageHeader'
import { useConnection } from 'utils'

const ContactsPage: NextPage = () => {
  const { connection } = useConnection()

  return (
    <Layout title={`CRM | ${connection?.name || 'Apideck'}`}>
      <Navbar />
      <PageHeader title="Contacts" />
      {/* TODO       */}
    </Layout>
  )
}

export default ContactsPage
