import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  serviceId?: string
  consumerId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { body } = req
  const { consumerId, serviceId }: Params = req.query
  const apideck = init(consumerId)
  const company = JSON.parse(body)

  const result = await apideck.crm.companies
    .create({ serviceId, company })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
