export interface Toast {
  title: string
  description: string
  type?: 'success' | 'warning' | 'error'
  id?: number
  autoClose?: boolean
}
