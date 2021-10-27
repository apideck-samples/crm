import { Company } from '@apideck/node'

export interface SuccessResponse {
  statusCode: number
  status: string
  service: string
  resource: string
  operation: string
  data: Company | Company[] | { id: string }
}

export interface CompanyResponse extends SuccessResponse {
  error?: string
  typeName?: string
  message?: string
  detail?: string[] | { [key: string]: any[] }
  ref?: string
}
