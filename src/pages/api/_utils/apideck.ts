import { Apideck } from '@apideck/node'
import { Session } from 'types/Session'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { decode } from 'jsonwebtoken'

export const init = (jwt?: string) => {
  const decoded: any = decode(jwt as string)
  const { applicationId, consumerId } = camelcaseKeysDeep(decoded) as Session

  return new Apideck({
    apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
    appId: `${applicationId}`,
    consumerId
  })
}
