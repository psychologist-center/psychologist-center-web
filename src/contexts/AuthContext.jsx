import { useToast } from '@chakra-ui/react'
import { useState, createContext, useEffect } from 'react'
import { parseCookies, destroyCookie, setCookie } from 'nookies'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { AxiosError } from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const { token } = parseCookies()

    async function getUserData() {
      try {
        const { data } = await api.get('/checktoken', {
          headers: { Authorization: 'Bearer ' + token },
        })
        setUser(data)
      } catch (e) {
        destroyCookie(null, 'token')
        toast({
          title: 'Usuário deslogado',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        })
      }
    }

    if (token) {
      getUserData()
    }
  }, [])

  const signIn = async (inputData) => {
    try {
      const { data } = await api.post('/auth', {
        email: inputData.email,
        password: inputData.password,
      })

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      setUser(data.data)
      setCookie(null, 'token', data.token)
    } catch (e) {
      toast({
        title:
          e instanceof AxiosError ? e.response.data.message : 'Erro Interno',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const signUp = async (inputData) => {
    try {
      const { data } = await api.post('/user/professional/register', inputData)

      setUser(data.data)
      setCookie(null, 'token', data.token)
      navigate('/home')
    } catch (e) {
      toast({
        title:
          e instanceof AxiosError ? e.response.data.message : 'Erro Interno',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const signOut = async () => {
    destroyCookie(null, 'token')
    window.location.reload(true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
