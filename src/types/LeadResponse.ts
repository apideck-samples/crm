import { Lead } from '@apideck/node'

export interface SuccessResponse {
  statusCode: number
  status: string
  service: string
  resource: string
  operation: string
  data: Lead | Lead[] | { id: string }
}

export interface LeadResponse extends SuccessResponse {
  error?: string
  typeName?: string
  message?: string
  detail?: string[] | { [key: string]: any[] }
  ref?: string
}
