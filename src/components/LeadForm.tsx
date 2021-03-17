import { Button, TextInput } from '@apideck/components'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Lead } from 'types/lead'
import { useModal } from 'utils/useModal'

interface Props {
  defaultValues?: Lead
}

const LeadForm = ({ defaultValues }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { removeModal } = useModal()
  const { register, control, errors, handleSubmit, setValue } = useForm({
    defaultValues
  })
  const { fields: emails, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: 'emails'
  })

  const { fields: phoneNumbers, append: appendNumber, remove: removeNumber } = useFieldArray({
    control,
    name: 'phone_numbers'
  })
  const leadID = defaultValues?.id

  useEffect(() => {
    const initializeArrayFields = () => {
      const defaultEmailsValue = [
        {
          email: '',
          type: 'default'
        }
      ]
      const defaultPhoneValue = [
        {
          number: '',
          type: 'default'
        }
      ]
      const emailsValue = defaultValues?.emails?.length ? defaultValues?.emails : defaultEmailsValue
      const defaultPhoneNumbers = defaultValues?.phone_numbers?.length
        ? defaultValues?.phone_numbers
        : defaultPhoneValue
      setValue('emails', emailsValue)
      setValue('phone_numbers', defaultPhoneNumbers)
    }

    initializeArrayFields()
  }, [defaultValues?.emails, defaultValues?.phone_numbers, setValue])

  const createOrUpdateLead = async (values: Lead) => {
    let response
    if (leadID) {
      response = await fetch(`/api/crm/leads/patch/`, {
        method: 'PATCH',
        body: JSON.stringify({ id: leadID, ...values })
      })
    } else {
      response = await fetch('/api/crm/leads/post', {
        method: 'POST',
        body: JSON.stringify({ ...values, emails: [{ email: 'test@test.com' }] })
      })
    }

    return response.json()
  }

  const onSubmit = (values: Lead) => {
    setIsLoading(true)
    setError(null)
    createOrUpdateLead(values)
      .then((response: { data: Lead; error: { message: string } }) => {
        console.log(response)
        const { error, data } = response
        if (error) {
          return setError(error?.message)
        } else {
          console.log(data)
          // removeModal()
        }
      })
      .catch((error: { message: string }) => {
        console.log(error)
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
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

        <label htmlFor="company_name" className="block text-sm font-medium leading-5 text-gray-700">
          Company name
        </label>

        <TextInput
          className="mt-1"
          name="company_name"
          required
          ref={register({
            required: 'Please enter an company name'
          })}
        />
        {errors.company_name && (
          <div className="mt-2 text-xs text-red-600">{errors.company_name.message}</div>
        )}

        <div className="mt-4">
          <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
            Name
          </label>

          <TextInput
            className="mt-1"
            name="name"
            required
            ref={register({
              required: 'Please enter a name'
            })}
          />
          {errors.name && <div className="mt-2 text-xs text-red-600">{errors.name.message}</div>}
        </div>
        <div className="mt-4">
          <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
            First name
          </label>

          <TextInput className="mt-1" name="first_name" ref={register()} />
          {errors.first_name && (
            <div className="mt-2 text-xs text-red-600">{errors.first_name.message}</div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
            Last name
          </label>

          <TextInput className="mt-1" name="last_name" ref={register()} />
          {errors.last_name && (
            <div className="mt-2 text-xs text-red-600">{errors.last_name.message}</div>
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
                  ref={register({ required: email.type === 'default' })}
                  placeholder={`Email ${email.type === 'default' ? '(default)' : ''}`}
                />
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
            htmlFor="phone_numbers"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Phone numbers
          </label>
          {phoneNumbers.map((phone, index) => {
            return (
              <div className="mt-2" key={`phone-${index}`}>
                <TextInput
                  name={`phone_numbers[${index}].number`}
                  ref={register({ required: phone.phone_type === 'default' })}
                  placeholder={`Phone number ${phone.phone_type === 'default' ? '(default)' : ''}`}
                />
                {errors.phone_numbers?.length && errors.phone_numbers[index] && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors.phone_numbers?.length && errors.phone_numbers[index]?.number?.message}
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

          <div className="flex flex-row-reverse p-4 mt-5 -m-5 sm:px-5 sm:mt-6 sm:-m-6 bg-gray-50">
            <Button
              text={leadID ? 'Update' : 'Create'}
              type="submit"
              isLoading={isLoading}
              className="ml-3"
            />
            <Button
              text="Cancel"
              className="inline-flex"
              variant="outline"
              onClick={() => removeModal()}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default LeadForm
