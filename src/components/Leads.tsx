import { Button } from '@apideck/components'
import Table from 'components/Table'
import { columns } from 'constants/columns'
import { FC } from 'react'
import { Lead } from 'types/Lead'
import { useLeads } from 'utils/useLeads'
import LoadingTable from './LoadingTable'

const Leads: FC = () => {
  const { leads, nextPage, prevPage, hasNextPage, hasPrevPage, isLoading, isError } = useLeads()

  const mappedData = leads?.data.map((lead: Lead) => {
    const data = {
      ...lead,
      email: lead.emails?.length ? lead.emails[0].email : '',
      phone: lead.phone_numbers?.length ? lead.phone_numbers[0].number : ''
    }
    return data
  })

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto rounded-lg shadow sm:-mx-6 lg:-mx-8">
        <div className="overflow-auto border-b border-gray-200">
          {isLoading && <LoadingTable />}
          {!isLoading && <Table columns={columns} data={mappedData} />}
        </div>
        <div className="flex flex-row-reverse p-4 border-gray-200 bg-gray-50">
          <Button
            onClick={() => nextPage()}
            text="Next"
            className="ml-2"
            isLoading={isLoading}
            disabled={!hasNextPage}
          />

          <Button
            onClick={() => prevPage()}
            text="Previous"
            isLoading={isLoading}
            disabled={!hasPrevPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Leads
