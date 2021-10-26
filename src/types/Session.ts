export interface Session {
  applicationId: string
  consumerId: string
  consumerMetadata?: {
    accountName: string
    userName: string
    email: string
    image: string
  }
  exp: number
  iat: number
  hideResourceSettings: boolean
  redirectUri: string
  theme: {
    favicon: string
    logo?: string
    primaryColor: string
    privacyUrl: string
    sidepanelBackgroundColor: string
    sidepanelTextColor: string
    termsUrl: string
    vaultName: string
  }
  settings?: {
    showLogs?: boolean
    showSuggestions?: boolean
    isolationMode?: boolean
    importerDestinationId?: string
  }
  jwt: string
}
