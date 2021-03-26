import { VercelRequest, VercelResponse } from '@vercel/node'

import fetch from 'node-fetch'
import { headers } from '../_utils'

module.exports = async (_: VercelRequest, res: VercelResponse) => {
  const raw = await fetch(
    `${process.env.NEXT_PUBLIC_UNIFY_BASE_URL}/vault/connections?api=crm&configured=true`,
    {
      headers
    }
  )
  const response = await raw.json()
  res.json(response)
}
