import { Button } from '@apideck/components'
import Table from 'components/Table'
import { columns } from 'constants/columns'
import { FC, useEffect } from 'react'
import { Lead } from 'types/Lead'
import { useLeads, useModal, usePrevious } from 'utils'
import { useToast } from 'utils'
import LeadForm from './LeadForm'
import LoadingTable from './LoadingTable'

const Leads: FC = () => {
  const { leads, nextPage, prevPage, hasNextPage, hasPrevPage, currentPage, isLoading } = useLeads()
  const statusCode = leads?.status_code
  const hasLeads = leads?.data?.length
  const prevStatusCode = usePrevious(statusCode)
  const { addToast } = useToast()
  const { addModal } = useModal()

  const mappedData = leads?.data?.map((lead: Lead) => {
    const data = {
      ...lead,
      email: lead.emails?.length ? lead.emails[0].email : '',
      phone: lead.phone_numbers?.length ? lead.phone_numbers[0].number : '',
      created_at: lead?.created_at
        ? new Date(lead.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : ''
    }
    return data
  })

  useEffect(() => {
    if ((prevStatusCode !== statusCode && statusCode) === 402) {
      addToast({
        title: leads?.message,
        description: leads?.detail,
        type: 'error'
      })
    }
  }, [addToast, statusCode, prevStatusCode, leads?.message, leads?.detail])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        {isLoading && <LoadingTable />}
        {!isLoading && !leads?.error && (
          <div className="mb-4 sm:flex sm:justify-end">
            <Button
              text="Create a lead"
              onClick={() => addModal(<LeadForm />, { style: { maxWidth: 480 } })}
            />
          </div>
        )}
        {!isLoading && hasLeads && <Table columns={columns} data={mappedData} />}
        {(hasLeads || isLoading) && (
          <div className="flex flex-row-reverse py-4 border-gray-200">
            {hasNextPage && (
              <Button
                onClick={() => nextPage()}
                text="Next"
                className="ml-2"
                isLoading={isLoading}
              />
            )}
            {(hasPrevPage || (!hasPrevPage && currentPage)) && (
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
