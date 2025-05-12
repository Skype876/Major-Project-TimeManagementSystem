import axios from 'axios'

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: 'https://student-queue-f9fmhac6gcgpf4dd.canadacentral-01.azurewebsites.net/',
    // baseURL: ' http://127.0.0.1:8080',
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
  baseURL: 'https://student-queue-f9fmhac6gcgpf4dd.canadacentral-01.azurewebsites.net/',
  // baseURL: ' http://127.0.0.1:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export { api, authApi }
