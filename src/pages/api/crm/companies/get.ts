import { VercelRequest, VercelResponse } from '@vercel/node'

import { GetCompaniesResponse } from '@apideck/node'
import { apideck } from '../../_utils'

interface Params {
  serviceId?: string
  cursor?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { serviceId, cursor }: Params = req.query

  const result: Promise<GetCompaniesResponse> = await apideck.crm.companies
    .list({ limit: 20, serviceId, cursor })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
