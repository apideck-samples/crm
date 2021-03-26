import { Connection } from 'types/Connection'

const formFieldsConfigured = (connection: Connection): boolean => {
  const { form_fields: formFields } = connection
  if (formFields?.length === 0) return true

  const requiredFields = formFields.filter(({ required }) => {
    return required
  })
  if (requiredFields?.length === 0) return true

  return requiredFields.every(({ value }) => value !== '')
}

export const isAuthorized = (connection: Connection): boolean => {
  const { auth_type, configured } = connection

  if (!configured) return false

  if (auth_type === 'oauth2') {
    return !!connection?.revoke_url
  } else {
    return formFieldsConfigured(connection)
  }
}
