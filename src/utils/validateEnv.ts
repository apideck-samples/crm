const message = (variable: string) => {
  return `No ${variable} found. Please update your environment variables.`
}

export const validateEnv = () => {
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw message('API key')
  }
  if (!process.env.NEXT_PUBLIC_APP_ID) {
    throw message('Application ID')
  }
}
