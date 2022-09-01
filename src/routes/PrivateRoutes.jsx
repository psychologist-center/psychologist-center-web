import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import { Spinner } from '@chakra-ui/react'

export const PrivateRoute = () => {
  const { signed, isFetching } = useContext(AuthContext)

  if (isFetching) return <Spinner />

  return signed ? <Outlet /> : <Navigate to="/" />
}
