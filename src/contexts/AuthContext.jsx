import { useState, createContext, useEffect } from 'react'
import { parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})

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
      }
    }

    if (token) {
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
