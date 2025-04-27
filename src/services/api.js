import axios from 'axios'

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return instance
}

const api = createApiInstance()

const authApi = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export { api, authApi }
