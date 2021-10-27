import { Apideck } from '@apideck/node'

export const init = (consumerId?: string) => {
  return new Apideck({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    applicationId: `${process.env.NEXT_PUBLIC_APP_ID}`,
    consumerId
  })
}
