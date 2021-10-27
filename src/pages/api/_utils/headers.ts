export const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  'X-APIDECK-CONSUMER-ID': `${process.env.NEXT_PUBLIC_CONSUMER_ID}`,
  'X-APIDECK-APP-ID': `${process.env.NEXT_PUBLIC_APP_ID}`
}
