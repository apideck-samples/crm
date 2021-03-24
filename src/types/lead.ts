export interface Lead {
  id?: string
  owner_id?: string
  company_id?: string
  company_name: string
  name: string
  first_name?: string
  last_name?: string
  description?: string
  prefix?: string
  title?: string
  status?: string
  fax?: string
  websites?: Website[]
  addresses?: Address[]
  social_links?: SocialLink[]
  phone_numbers?: PhoneNumber[]
  emails?: Email[]
  custom_fields?: CustomField[]
  tags?: string[]
  updated_at?: string
  created_at?: string
}

interface Website {
  id?: string
  url?: string
  category: string
}

interface Address {
  id?: string
  type?: string
  name?: string
  line1?: string
  line2?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  latitude?: string
  longitude?: string
}

interface SocialLink {
  id?: string
  url: string
  platform?: string
}

interface PhoneNumber {
  id?: string
  number: string
  phone_type?: string
}

interface Email {
  id?: string
  email: string
  type?: string
}

interface CustomField {
  id?: string
  value?: string
}
