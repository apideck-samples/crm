import { BASE_URL, headers } from '../_utils'
import { VercelRequest, VercelResponse } from '@vercel/node'

import fetch from 'node-fetch'

module.exports = async (_: VercelRequest, res: VercelResponse) => {
  const raw = await fetch(`${BASE_URL}/vault/connections?api=crm&configured=true`, {
    headers
  })
  const response = await raw.json()
  res.json(response)
}
