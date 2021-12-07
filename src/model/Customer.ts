export interface Customer {
  customerId: number
  name: string
  address: string
  email: string
  username: string
  phone: string
  password?: string
  enabled?: boolean
  role?: 'USER'
}
