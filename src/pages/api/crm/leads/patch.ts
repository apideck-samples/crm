import { VercelRequest, VercelResponse } from '@vercel/node'

import { init } from '../../_utils'

interface Params {
  consumerId?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { id, lead } = JSON.parse(req.body)
  const { consumerId }: Params = req.query
  const apideck = init(consumerId)

  const result = await apideck.crm.leads
    .update({ id, lead })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
