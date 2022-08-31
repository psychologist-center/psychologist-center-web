import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://mentesa.azurewebsites.net/api',
})
