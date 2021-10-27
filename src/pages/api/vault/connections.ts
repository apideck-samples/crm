import { VercelRequest, VercelResponse } from '@vercel/node'

import fetch from 'node-fetch'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    'X-APIDECK-CONSUMER-ID': req.query.consumerId as string,
    'X-APIDECK-APP-ID': `${process.env.NEXT_PUBLIC_APP_ID}`
  }
  const raw = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/vault/connections?api=crm`, {
    headers
  })
  const response = await raw.json()
  res.json(response)
}
