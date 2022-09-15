export const requestInterceptor = (config) => {
  const token = localStorage.getItem('@Auth:token')
  config.headers.Authorization = `Bearer ${token}`

  return config
}
