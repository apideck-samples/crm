import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  jwt?: string
  serviceId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { id, lead } = JSON.parse(req.body)
  const { jwt, serviceId }: Params = req.query
  const apideck = init(jwt)

  const result = await apideck.crm
    .leadsUpdate({ serviceId, id, lead })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
