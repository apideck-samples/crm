import { VercelRequest, VercelResponse } from '@vercel/node'

import { apideck } from '../../_utils'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { id, lead } = JSON.parse(req.body)

  const result = await apideck.crm.leads
    .update({ id, lead })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
