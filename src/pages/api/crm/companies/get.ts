import { VercelRequest, VercelResponse } from '@vercel/node'

import { GetCompaniesResponse } from '@apideck/node'
import { init } from '../../_utils'

interface Params {
  serviceId?: string
  cursor?: string
  consumerId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { consumerId, serviceId, cursor }: Params = req.query
  const apideck = init(consumerId)

  const result: Promise<GetCompaniesResponse> = await apideck.crm.companies
    .list({ limit: 20, serviceId, cursor })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
