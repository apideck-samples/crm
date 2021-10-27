import Layout from '../components/Layout'

const Custom404 = () => {
  return (
    <Layout title={`Error Page | Apideck CRM'}`} pageHeader="Page not found">
      <div>
        <h3 className="mt-12 text-xl font-medium leading-6 text-center text-gray-900">
          We could not find that page
        </h3>
      </div>
    </Layout>
  )
}

export default Custom404
