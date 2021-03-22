import { Lead } from './Lead'

export interface SuccessResponse {
  status_code: number
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
