import { Button } from '@apideck/components'
import { FC, useState } from 'react'

const VaultSessionButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const redirectToVault = async () => {
    setIsLoading(true)
    const response = await createSession()
    if (response.data.session_uri) window.location.href = response.data.session_uri
    setIsLoading(false)
  }
  const createSession = async () => {
    const response = await fetch('/api/vault/sessions', {
      method: 'POST',
      body: JSON.stringify({ redirect_uri: 'http://localhost:3000/' })
    })

    return response.json()
  }

  return (
    <Button
      text="Integration settings"
      className="w-full"
      variant="outline"
      isLoading={isLoading}
      onClick={() => redirectToVault()}
    />
  )
}

export default VaultSessionButton
