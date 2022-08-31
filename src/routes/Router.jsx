import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'
import { PrivateRoute } from './PrivateRoutes'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  )
}
