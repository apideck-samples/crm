import { Button } from '@apideck/components'
import Table from 'components/Table'
import { columns } from 'constants/columns'
import { FC, useEffect } from 'react'
import { Lead } from 'types/Lead'
import { useLeads } from 'utils/useLeads'
import { usePrevious } from 'utils/usePrevious'
import { useToast } from 'utils/useToast'
import LoadingTable from './LoadingTable'

const Leads: FC = () => {
  const { leads, nextPage, prevPage, hasNextPage, hasPrevPage, isLoading } = useLeads()
  const prevStatusCode = usePrevious(leads?.status_code)
  const { addToast } = useToast()
  const hasLeads = hasLeads

  const mappedData = leads?.data?.map((lead: Lead) => {
    const data = {
      ...lead,
      email: lead.emails?.length ? lead.emails[0].email : '',
      phone: lead.phone_numbers?.length ? lead.phone_numbers[0].number : ''
    }
    return data
  })

  useEffect(() => {
    if ((prevStatusCode !== leads?.status_code && leads?.status_code) === 402) {
      addToast({
        title: leads.message,
        description: leads.detail,
        type: 'error'
      })
    }
  }, [addToast, leads, prevStatusCode])

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto rounded-lg shadow sm:-mx-6 lg:-mx-8">
        {isLoading && <LoadingTable />}
        {!isLoading && hasLeads && <Table columns={columns} data={mappedData} />}
        {hasLeads && (
          <div className="flex flex-row-reverse p-4 border-gray-200 bg-gray-50">
            {hasNextPage && (
              <Button
                onClick={() => nextPage()}
                text="Next"
                className="ml-2"
                isLoading={isLoading}
              />
            )}
            {hasPrevPage && (
              <Button onClick={() => prevPage()} text="Previous" isLoading={isLoading} />
            )}
            {isLoading && <Button disabled={true} text="Loading" isLoading={isLoading} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leads
