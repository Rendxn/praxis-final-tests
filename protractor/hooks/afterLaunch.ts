import environment from 'config/environment'
import { del } from 'superagent'

export const teardown = async () => {
  await del(`${environment.API_BASE_URL}/api/customer/`)
}
