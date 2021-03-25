import { Apideck } from '@apideck/node'

export const apideck = new Apideck({
  apiKey: process.env.NEXT_PUBLIC_UNIFY_API_KEY,
  applicationId: `${process.env.NEXT_PUBLIC_UNIFY_APP_ID}`,
  consumerId: process.env.NEXT_PUBLIC_UNIFY_CONSUMER_ID
})
