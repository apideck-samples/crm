import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  consumerId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { consumerId }: Params = req.query
  const { id } = JSON.parse(req.body)
  const apideck = init(consumerId)

  const result = await apideck.crm.companies.delete({ id }).catch((error: Response) => error)
  res.json(result)
}
