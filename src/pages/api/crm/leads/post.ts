import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  serviceId?: string
  consumerId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { body, query } = req
  const { consumerId, serviceId }: Params = query
  const apideck = init(consumerId)
  const lead = JSON.parse(body)

  const result = await apideck.crm.leads
    .create({ serviceId, lead })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
