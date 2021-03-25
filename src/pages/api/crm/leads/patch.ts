import { VercelRequest, VercelResponse } from '@vercel/node'

import { apideck } from '../../_utils'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const data = JSON.parse(req.body)
  const result = await apideck.crm.leads
    .update({
      id: data.id,
      lead: data.lead
    })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
