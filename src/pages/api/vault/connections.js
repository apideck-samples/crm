import { headers } from '../_utils'

module.exports = async (_, res) => {
  const raw = await fetch(`${process.env.NEXT_PUBLIC_UNIFY_BASE_URL}/vault/connections`, {
    headers
  })
  const response = await raw.json()
  res.json(response)
}
