import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  jwt?: string
  serviceId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { id, company } = JSON.parse(req.body)
  const { jwt, serviceId }: Params = req.query
  const apideck = init(jwt)

  const result = await apideck.crm
    .companiesUpdate({ serviceId, id, company })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
