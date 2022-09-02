import { Route, Routes } from 'react-router-dom'
import { HomeLayout } from '../layouts/HomeLayout'
import { DashboardPage } from '../pages/Dashboard'
import { LoginPage } from '../pages/Login'
import { PacientePage } from '../pages/Paciente'
import { RegisterPage } from '../pages/Register'
import { SessionPage } from '../pages/Session'
import { PrivateRoute } from './PrivateRoutes'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<HomeLayout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="paciente" element={<PacientePage />} />
          <Route path="sessao" element={<SessionPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
