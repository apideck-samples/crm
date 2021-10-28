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
  const company = JSON.parse(body)

  const result = await apideck.crm
    .companiesAdd({ serviceId, company })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
