import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  jwt?: string
  serviceId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { body, query } = req
  const { jwt, serviceId }: Params = query
  const apideck = init(jwt)
  const lead = JSON.parse(body)

  const result = await apideck.crm
    .leadsAdd({ serviceId, lead })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
