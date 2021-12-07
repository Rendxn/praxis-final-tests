import { del } from 'superagent'

export const teardown = async () => {
  await del('http://localhost:8080/api/customer/')
}
