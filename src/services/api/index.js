import axios from 'axios'
import { requestInterceptor, responseInterceptor } from './interceptors'

const baseURL = import.meta.env.VITE_API_URL || ''

const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    params: {},
  })

  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(responseInterceptor)

  return instance
}

const api = createInstance(baseURL)

export { api }
