module.exports = async (req, res) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNIFY_API_KEY}`,
    'X-APIDECK-CONSUMER-ID': 'test_user_id',
    'X-APIDECK-APP-ID': process.env.NEXT_PUBLIC_UNIFY_APP_ID || ''
  })
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
