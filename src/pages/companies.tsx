import Companies from 'components/companies/Companies'
import Layout from '../components/Layout'
import { Session } from 'types/Session'
import { applySession } from 'next-session'
import { useCompanies } from 'utils/useCompanies'
import { useConnection } from 'utils'
import { useEffect } from 'react'
import { useSession } from 'utils/useSession'

interface Props {
  jwt: string
  token: Session
}

const CompaniesPage = ({ jwt, token }: Props) => {
  const { connection } = useConnection()
  const { setSession, session } = useSession()
  const { companies, isError } = useCompanies()

  useEffect(() => {
    if (!session && jwt?.length) {
      setSession({ ...token, jwt })
    }
  }, [jwt, session, setSession, token])

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

export const getServerSideProps = async ({ req, res }: any): Promise<any> => {
  await applySession(req, res, { name: 'apideck_vault' })

  return {
    props: {
      jwt: req.session?.jwt || '',
      token: req.session?.token || {}
    }
  }
}
export default CompaniesPage
