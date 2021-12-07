import { Customer } from 'src/model/Customer'
import { post } from 'superagent'
import environment from 'config/environment'

export const setup = async () => {
  const testCustomer: Customer = {
    customerId: 0,
    name: 'Test User',
    address: 'Test address',
    email: 'test@user.com',
    phone: '300 000 0000',
    username: 't',
    password: 't',
    enabled: true,
    role: 'USER',
  }

  await post(`${environment.API_BASE_URL}/api/customer/`).send(testCustomer)
}
