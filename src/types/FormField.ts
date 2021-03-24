export interface FormField {
  id: string
  label: string
  value: string | string[] | number | boolean | undefined | null
  default_value?: string | string[] | number | boolean | undefined | null
  placeholder: string
  mask: boolean
  type:
    | 'select'
    | 'multi-select'
    | 'text'
    | 'textarea'
    | 'number'
    | 'phone'
    | 'email'
    | 'url'
    | 'boolean'
    | 'hidden'
    | 'date'
    | 'datetime'
    | unknown
  required: boolean
  description?: string
  disabled: boolean
  options: FormFieldOption[]
  custom_field: boolean
}

export interface FormFieldOption {
  label: string
  value: string | number | readonly string[] | undefined
}
