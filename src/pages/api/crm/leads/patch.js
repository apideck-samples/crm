import { headers } from '../../_utils'

module.exports = async (req, res) => {
  const { body } = req
  const data = JSON.parse(body)
  const raw = await fetch(`${process.env.NEXT_PUBLIC_UNIFY_BASE_URL}/crm/leads/${data.id}`, {
    method: 'PATCH',
    headers,
    body
  })
  const response = await raw.json()
  res.json(response)
}
