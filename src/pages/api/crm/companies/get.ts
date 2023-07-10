import { VercelRequest, VercelResponse } from '@vercel/node'

import { GetCompaniesResponse } from '@apideck/node'
import { init } from '../../_utils'
// import { Apideck } from '@apideck/node'

// const apideck = new Apideck({
//   apiKey: 'REPLACE_WITH_API_KEY',
//   appId: 'REPLACE_WITH_APP_ID',
//   consumerId: 'REPLACE_WITH_CONSUMER_ID'
// })

interface Params {
  serviceId?: string
  cursor?: string
  jwt?: string
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { jwt, serviceId, cursor }: Params = req.query
  const apideck = init(jwt)

  const result: Promise<GetCompaniesResponse> = await apideck.crm
    .companiesAll({ limit: 20, serviceId, cursor })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
