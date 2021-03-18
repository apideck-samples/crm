import { headers } from '../../_utils'

module.exports = async (req, res) => {
  if (req.query?.serviceId) {
    headers.append('X-APIDECK-SERVICE-ID', req.query?.serviceId)
  }
  const raw = await fetch(`${process.env.NEXT_PUBLIC_UNIFY_BASE_URL}/crm/leads`, {
    headers
  })
  const response = await raw.json()
  res.json(response)
}
