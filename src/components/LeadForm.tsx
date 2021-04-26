import { Button, TextInput, useModal, useToast } from '@apideck/components'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Lead } from '@apideck/node'
import { LeadResponse } from 'types/LeadResponse'
import { mutate } from 'swr'
import { useLeads } from 'utils'

interface Props {
  defaultValues?: Lead
}

const LeadForm = ({ defaultValues }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [error, setError] = useState<string | null | undefined>()
  const { removeModal } = useModal()
  const { addToast } = useToast()
  const { createLead, updateLead, deleteLead, getLeadsUrl } = useLeads()
  const { register, control, errors, handleSubmit, setValue } = useForm({
    defaultValues
  })
  const { fields: emails, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: 'emails',
    keyName: 'key'
  })
  const { fields: phoneNumbers, append: appendNumber, remove: removeNumber } = useFieldArray({
    control,
    name: 'phoneNumbers',
    keyName: 'key'
  })
  const leadID = defaultValues?.id

  useEffect(() => {
    const initializeArrayFields = () => {
      const emailsValue = defaultValues?.emails?.length
        ? defaultValues?.emails
        : [{ type: 'primary' }]
      const phoneNumbersValue = defaultValues?.phoneNumbers?.length
        ? defaultValues?.phoneNumbers
        : [{ type: 'primary' }]

      setValue('emails', emailsValue)
      setValue('phoneNumbers', phoneNumbersValue)
    }

    initializeArrayFields()
  }, [defaultValues?.emails, defaultValues?.phoneNumbers, setValue])

  const onSubmit = (values: Lead) => {
    setIsLoading(true)
    setError(null)

    const response: Promise<LeadResponse> = leadID ? updateLead(leadID, values) : createLead(values)

    response
      .then((response: LeadResponse) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          mutate(getLeadsUrl)
          removeModal()
          addToast({
            title: `Successfully ${leadID ? 'updated' : 'created'}!`,
            description: `${values.firstName} is successfully ${leadID ? 'updated' : 'added'}`,
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
    deleteLead(id)
      .then((response: LeadResponse) => {
        if (response.statusCode === 200) {
          mutate(getLeadsUrl)
          removeModal()
          addToast({
            title: `Successfully deleted!`,
            description: `Lead with ID ${id} is successfully deleted`,
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
        {`${leadID ? 'Update' : 'Create'} Lead`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
            <span>{error}</span>
          </div>
        )}
        <label htmlFor="companyName" className="block text-sm font-medium leading-5 text-gray-700">
          Company name
        </label>
        <TextInput
          className="mt-1"
          name="companyName"
          required
          ref={register({
            required: 'Please enter an company name'
          })}
        />
        {errors.companyName && (
          <div className="mt-2 text-xs text-red-600">{errors.companyName.message}</div>
        )}
        <input
          name="name"
          ref={register()}
          value={defaultValues?.name || ''}
          type="hidden"
          readOnly
        />
        <div className="mt-4">
          <label htmlFor="firstName" className="block text-sm font-medium leading-5 text-gray-700">
            First name
          </label>
          <TextInput
            className="mt-1"
            name="firstName"
            required
            ref={register({
              required: 'Please enter a first name'
            })}
          />
          {errors.firstName && (
            <div className="mt-2 text-xs text-red-600">{errors.firstName.message}</div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">
            Last name
          </label>
          <TextInput className="mt-1" name="lastName" ref={register()} />
          {errors.lastName && (
            <div className="mt-2 text-xs text-red-600">{errors.lastName.message}</div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="emails" className="block text-sm font-medium leading-5 text-gray-700">
            Emails
          </label>
          {emails.map((email, index) => {
            return (
              <div className="mt-2" key={`email-${index}`}>
                <TextInput
                  name={`emails[${index}].email`}
                  ref={register()}
                  required={index === 0}
                  placeholder={`Email ${email.type === 'primary' ? '(primary)' : '(secondary)'}`}
                />
                <input
                  type="hidden"
                  name={`emails[${index}].type`}
                  value={email.type || 'secondary'}
                  ref={register()}
                  readOnly
                />
                {email.id && (
                  <input
                    type="hidden"
                    name={`emails[${index}].id`}
                    ref={register()}
                    value={email.id}
                    readOnly
                  />
                )}
                {errors.emails?.length && errors.emails[index] && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors.emails?.length && errors.emails[index]?.email?.message}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            appendEmail({ email: '' })
          }}
          className="inline-block mt-2 mr-2"
        >
          Add email
        </Button>
        {emails?.length > 1 && (
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              removeEmail(emails?.length - 1)
            }}
            className="inline-block mt-2"
          >
            Remove email
          </Button>
        )}

        <div className="mt-4">
          <label
            htmlFor="phoneNumbers"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Phone numbers
          </label>
          {phoneNumbers.map((phone, index) => {
            return (
              <div className="mt-2" key={`phone-${index}`}>
                <TextInput
                  name={`phoneNumbers[${index}].number`}
                  ref={register()}
                  placeholder={`Phone number ${
                    phone.type === 'primary' ? '(primary)' : '(secondary)'
                  }`}
                />
                <input
                  type="hidden"
                  name={`phoneNumbers[${index}].type`}
                  value={phone.type || 'secondary'}
                  ref={register()}
                  readOnly
                />
                {phone.id && (
                  <input
                    type="hidden"
                    name={`phoneNumbers[${index}].id`}
                    ref={register()}
                    value={phone.id}
                    readOnly
                  />
                )}
                {errors.phoneNumbers?.length && errors.phoneNumbers[index] && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors.phoneNumbers?.length && errors.phoneNumbers[index]?.number?.message}
                  </div>
                )}
              </div>
            )
          })}
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              appendNumber({ number: '' })
            }}
            className="inline-block mt-2 mr-2"
          >
            Add number
          </Button>
          {phoneNumbers?.length > 1 && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                removeNumber(phoneNumbers?.length - 1)
              }}
              className="inline-block mt-2"
            >
              Remove number
            </Button>
          )}

          <div className="p-4 mt-5 -m-5 sm:px-5 sm:mt-6 sm:-m-6 bg-gray-50">
            <div className={leadID ? 'flex justify-between' : ''}>
              {leadID && (
                <Button
                  text="Delete"
                  type="button"
                  variant="danger-outline"
                  className="ml-1"
                  isLoading={isDeleting}
                  onClick={() => onDelete(leadID)}
                />
              )}
              <div className="flex flex-row-reverse">
                <Button
                  text={leadID ? 'Update' : 'Create'}
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

export default LeadForm
