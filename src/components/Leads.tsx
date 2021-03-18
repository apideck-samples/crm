import { FC } from 'react'
import { Lead } from 'types/Lead'
import Table from 'components/Table'
import { columns } from 'constants/columns'

const Leads: FC<{ data: Lead[] }> = ({ data }) => {
  const mappedData = data.map((lead: Lead) => {
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
