import { BASE_URL, headers } from '../_utils'
import { VercelRequest, VercelResponse } from '@vercel/node'

import fetch from 'node-fetch'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { body } = req
  const raw = await fetch(`${BASE_URL}/vault/sessions`, {
    method: 'POST',
    headers,
    body
  })
  const response = await raw.json()
  res.json(response)
}
