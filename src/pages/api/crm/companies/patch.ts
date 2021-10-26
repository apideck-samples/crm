import { VercelRequest, VercelResponse } from '@vercel/node'

import { apideck } from '../../_utils'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { id, company } = JSON.parse(req.body)

  const result = await apideck.crm.companies
    .update({ id, company })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
