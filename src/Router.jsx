import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}
