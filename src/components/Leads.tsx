import { FC } from 'react'
import Layout from '../components/Layout'
import { Lead } from 'types/lead'
import Table from 'components/Table'
import { columns } from 'constants/columns'
import useSWR from 'swr'

const Leads: FC = () => {
  const getLeads = async (url: string) => {
    const response = await fetch(url)
    return await response.json()
  }

  const { data, error } = useSWR(`/api/crm/leads/get`, getLeads)

  if (!data && !error) {
    return (
      <Layout title="Home | Next Starter Kit">
        <div className="flex items-center justify-center h-64">
          <svg
            className="w-10 h-10 mr-3 -ml-1 text-indigo-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </Layout>
    )
  }

  if (error) return <p>{error}</p>
  if (!data.data) {
    return (
      <div>
        <p>No data</p>
        <p>Error: {data.error}</p>
        <p>Message: {data.message}</p>
      </div>
    )
  }

  const mappedData = data.data.map((lead: Lead) => {
    const data = {
      ...lead,
      email: lead.emails?.length ? lead.emails[0].email : '',
      phone: lead.phone_numbers?.length ? lead.phone_numbers[0].number : ''
    }
    return data
  })

  return <Table columns={columns} data={mappedData} />
}

export default Leads
