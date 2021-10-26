import { Button, TextInput, useModal, useToast } from '@apideck/components'

import { Company } from '@apideck/node'
import { CompanyResponse } from 'types/CompanyResponse'
import { mutate } from 'swr'
import { useCompanies } from 'utils'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface Props {
  defaultValues?: Company
}

const CompanyForm = ({ defaultValues }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [error, setError] = useState<string | null | undefined>()
  const { removeModal } = useModal()
  const { addToast } = useToast()
  const { createCompany, updateCompany, deleteCompany, getCompaniesUrl } = useCompanies()
  const { register, errors, handleSubmit } = useForm({
    defaultValues
  })

  const companyID = defaultValues?.id

  const onSubmit = (values: Company) => {
    setIsLoading(true)
    setError(null)

    const response: Promise<CompanyResponse> = companyID
      ? updateCompany(companyID, values)
      : createCompany(values)

    response
      .then((response: CompanyResponse) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          mutate(getCompaniesUrl)
          removeModal()
          addToast({
            title: `Successfully ${companyID ? 'updated' : 'created'}!`,
            description: `${values.name} is successfully ${companyID ? 'updated' : 'added'}`,
            type: 'success',
            autoClose: true
          })
        } else {
          const { error, message, detail } = response
          setError(message || error)
          console.log(detail)
        }
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => setIsLoading(false))
  }

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    setError(null)
    deleteCompany(id)
      .then((response: CompanyResponse) => {
        if (response.statusCode === 200) {
          mutate(getCompaniesUrl)
          removeModal()
          addToast({
            title: `Successfully deleted!`,
            description: `Company with ID ${id} is successfully deleted`,
            type: 'success',
            autoClose: true
          })
        } else {
          const { error, message, detail } = response
          setError(message || error)
          console.log(detail)
        }
      })
      .catch((error) => {
        setError(error?.message)
      })
      .finally(() => setIsDeleting(false))
  }

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-gray-700">
        {`${companyID ? 'Update' : 'Create'} Company`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
            <span>{error}</span>
          </div>
        )}
        <input
          name="name"
          ref={register()}
          value={defaultValues?.name || ''}
          type="hidden"
          readOnly
        />
        <div className="mt-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 Companying-5">
            Name
          </label>
          <TextInput
            className="mt-1"
            name="name"
            required
            ref={register({
              required: 'Please enter a company name'
            })}
          />
          {errors.name && <div className="mt-2 text-xs text-red-600">{errors.name.message}</div>}
        </div>

        <div className="mt-4">
          <div className="p-4 mt-5 -m-5 sm:px-5 sm:mt-6 sm:-m-6 bg-gray-50">
            <div className={companyID ? 'flex justify-between' : ''}>
              {companyID && (
                <Button
                  text="Delete"
                  type="button"
                  variant="danger-outline"
                  className="ml-1"
                  isLoading={isDeleting}
                  onClick={() => onDelete(companyID)}
                />
              )}
              <div className="flex flex-row-reverse">
                <Button
                  text={companyID ? 'Update' : 'Create'}
                  type="submit"
                  isLoading={isLoading}
                  className="ml-3 mr-1"
                />
                <Button
                  text="Cancel"
                  className="inline-flex"
                  variant="outline"
                  onClick={() => removeModal()}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CompanyForm
