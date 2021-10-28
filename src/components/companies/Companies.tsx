import { Button, useModal, usePrevious, useToast } from '@apideck/components'
import { FC, useEffect } from 'react'

import { Company } from '@apideck/node'
import CompanyForm from './CompanyForm'
import LoadingTable from '../LoadingTable'
import Table from 'components/Table'
import { useCompanies } from 'utils'

export const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Date added',
    accessor: 'createdAt'
  }
]

const Companies: FC = () => {
  const { companies, nextPage, prevPage, hasNextPage, hasPrevPage, isLoading } = useCompanies()
  const statusCode = companies?.statusCode
  const hasLeads = companies?.data?.length
  const prevStatusCode = usePrevious(statusCode)
  const { addToast } = useToast()
  const { addModal } = useModal()

  const mappedData = companies?.data?.map((company: Company) => {
    const data = {
      ...company,
      email: company.emails?.length ? company.emails[0].email : '',
      phone: company.phone_numbers?.length ? company.phone_numbers[0].number : '',
      createdAt: company?.created_at
        ? new Date(company.created_at).toLocaleDateString(undefined, {
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
        title: companies?.message,
        description: companies?.detail,
        type: 'error'
      })
    }
  }, [addToast, statusCode, prevStatusCode, companies?.message, companies?.detail])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        {isLoading && <LoadingTable />}
        {!isLoading && !companies?.error && (
          <div className="mb-4 sm:flex sm:justify-end">
            <Button
              text="New company"
              onClick={() => addModal(<CompanyForm />, { style: { maxWidth: 480 } })}
            />
          </div>
        )}
        {!isLoading && hasLeads && (
          <Table
            columns={columns}
            data={mappedData}
            actionText="Edit"
            action={(props: any) =>
              addModal(<CompanyForm defaultValues={props} />, {
                style: { maxWidth: 480 }
              })
            }
          />
        )}
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

export default Companies
