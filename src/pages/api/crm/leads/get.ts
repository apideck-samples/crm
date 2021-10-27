import { VercelRequest, VercelResponse } from '@vercel/node'

import { GetLeadsResponse } from '@apideck/node'
import { init } from '../../_utils'

interface Params {
  serviceId?: string
  cursor?: string
  consumerId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { consumerId, serviceId, cursor }: Params = req.query
  const apideck = init(consumerId)

  const result: Promise<GetLeadsResponse> = await apideck.crm.leads
    .list({ limit: 20, serviceId, cursor })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
