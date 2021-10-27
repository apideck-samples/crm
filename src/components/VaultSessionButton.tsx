import { FC, useState } from 'react'

import { Button } from '@apideck/components'
import { createVaultSession } from 'utils'
import { useSession } from 'utils/useSession'

interface Props {
  text: string
  variant: 'outline' | 'primary' | 'secondary' | 'danger' | 'danger-outline'
  redirectUrl?: string
}

const VaultSessionButton: FC<Props> = ({
  text = 'Integration settings',
  variant = 'outline',
  redirectUrl
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { session } = useSession()

  const redirectToVault = async () => {
    setIsLoading(true)
    if (session?.jwt) {
      window.location.href = `https://vault.apideck.com/session/${session?.jwt}`
      return
    }

    const response = await createVaultSession()
    const url = response.data?.session_uri
    if (!url) return
    if (redirectUrl) {
      const token = url.substring(url.lastIndexOf('/') + 1)
      window.location.href = `${redirectUrl}?jwt=${token}`
    } else {
      window.location.href = url
    }
  }

  return (
    <Button text={text} variant={variant} isLoading={isLoading} onClick={() => redirectToVault()} />
  )
}

export default VaultSessionButton
