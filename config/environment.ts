export default {
  SELENIUM_BASE_URL:
    process.env.SELENIUM_BASE_URL || 'http://host.docker.internal:8080',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8080',
} as const
