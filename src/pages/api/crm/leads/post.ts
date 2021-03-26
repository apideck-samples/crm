import { VercelRequest, VercelResponse } from '@vercel/node'

import { apideck } from '../../_utils'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { body, query } = req
  const { serviceId }: { serviceId?: string } = query
  const lead = JSON.parse(body)

  const result = await apideck.crm.leads
    .create({ serviceId, lead })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
