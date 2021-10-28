import { VercelRequest, VercelResponse } from '@vercel/node'

import { Session } from 'types/Session'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { decode } from 'jsonwebtoken'
import fetch from 'node-fetch'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { jwt } = req.query
  const decoded: any = decode(jwt as string)
  const { applicationId, consumerId } = camelcaseKeysDeep(decoded) as Session

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    'X-APIDECK-CONSUMER-ID': `${consumerId}`,
    'X-APIDECK-APP-ID': `${applicationId}`
  }

  const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/vault/connections?api=crm`, {
    headers
  })
  const response = await raw.json()

  res.json(response)
}
