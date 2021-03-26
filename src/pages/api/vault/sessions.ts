import { VercelRequest, VercelResponse } from '@vercel/node'

import fetch from 'node-fetch'
import { headers } from '../_utils'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { body } = req
  const raw = await fetch(`${process.env.NEXT_PUBLIC_UNIFY_BASE_URL}/vault/sessions`, {
    method: 'POST',
    headers,
    body
  })
  const response = await raw.json()
  res.json(response)
}
