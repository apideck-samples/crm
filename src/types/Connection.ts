import { FormField } from './FormField'
import { RawJSON } from './RawJson'

export interface Settings extends RawJSON {
  instance_url?: string
  base_url?: string
}

export interface Connection {
  id: string
  service_id: string
  unified_api: string
  auth_type: string | null
  name: string
  state: 'available' | 'added' | 'authorized' | 'callable'
  icon: string
  logo?: string
  website?: string
  tag_line?: string
  authorize_url?: string
  revoke_url?: string | null
  configured: boolean
  enabled?: boolean
  settings?: Settings
  settings_required_for_authorization?: string[]
  configurable_resources: string[]
  configuration?: FormField[]
  form_fields: FormField[]
  created_at: number
}

export interface CreateConnectionInput {
  unifiedApi: string
  serviceId: string
}

export interface UpdateConnectionInput {
  unifiedApi: string
  serviceId: string
  enabled: boolean
  settings?: Settings
}

export interface UpdateConnectionConfigInput {
  configuration: ResourceConfig[]
}

export interface ResourceConfig {
  resource: string
  defaults: Partial<FormField>[]
}
