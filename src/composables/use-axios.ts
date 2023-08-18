import axios from 'axios'

export const useAxios = () => {
  const { VITE_APP_API_URL: apiUrl, VITE_APP_API_VERSION: apiVersion } =
    import.meta.env

  const get = async (path: string, params: Record<string, string> = {}) => {
    const searchParams = new URLSearchParams(params)
    const url = new URL(`${apiUrl}/v${apiVersion}${path}`)
    url.search = `${searchParams}`

    return await axios.get(`${url}`)
  }

  return { get }
}
