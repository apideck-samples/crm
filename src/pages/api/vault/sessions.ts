import { VercelRequest, VercelResponse } from '@vercel/node'

//import fetch from 'node-fetch'
import { Apideck } from '@apideck/node'
// If not provided create a random consumer ID for demo purposes
const consumerId =
  process.env.NEXT_PUBLIC_CONSUMER_ID ||
  `demo-crm-${Math.random().toString(36).substring(7)}-${new Date().toISOString()}`
const apiKeyValue = process.env.NEXT_PUBLIC_API_KEY
const apiIdValue = process.env.NEXT_PUBLIC_APP_ID
// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
//   'X-APIDECK-CONSUMER-ID': consumerId,
//   'X-APIDECK-APP-ID': `${process.env.NEXT_PUBLIC_APP_ID}`
// }

const createSession = async (_: VercelRequest, res: VercelResponse) => {
  const apideck = new Apideck({
    apiKey: apiKeyValue as string,
    appId: apiIdValue as string,
    consumerId: consumerId
  })
  //'test-consumer'
  const settings = {}
  const { data } = await apideck.vault.sessionsCreate(settings)
  res.json(data)
}

export default createSession
