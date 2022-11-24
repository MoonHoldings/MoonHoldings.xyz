export const SERVER_URL = `${import.meta.env.VITE_MOONSERVER_URL}/api`
export const SHYFT_URL = `${import.meta.env.VITE_SHYFTSERVER_URL}`
export const SHYFT_KEY = `${import.meta.env.VITE_SHYFT_KEY}`
export const AXIOS_CONFIG = { headers: { 'Content-Type': 'application/json' } }
export const AXIOS_CONFIG_SHYFT_KEY = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': SHYFT_KEY
  }
}
