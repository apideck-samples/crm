import { VercelRequest, VercelResponse } from '@vercel/node'

import { apideck } from '../../_utils'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const result = await apideck.crm.leads
    .list({
      limit: 20,
      serviceId: req.query?.serviceId as string,
      cursor: req.query?.cursor as string
    })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
