module.exports = async (req, res) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNIFY_API_KEY}`,
    'X-APIDECK-CONSUMER-ID': 'test_user_id',
    'X-APIDECK-APP-ID': process.env.NEXT_PUBLIC_UNIFY_APP_ID || ''
  })
  const raw = await fetch(`${process.env.NEXT_PUBLIC_UNIFY_BASE_URL}/crm/leads?limit=50`, {
    headers
  })
  const response = await raw.json()
  res.json(response)
}
