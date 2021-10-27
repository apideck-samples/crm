import Layout from '../components/Layout'

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  return (
    <Layout title={`Error Page | Apideck CRM'}`} pageHeader="Error">
      <div>
        <h3 className="mt-12 text-xl font-medium leading-6 text-gray-900">Something went wrong</h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>
              {statusCode
                ? `An error ${statusCode} occurred on the server`
                : 'An error occurred on the client'}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
