import { Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from '@/components/auth/ProtectedLayout'
import { PosPage } from '@/pages/PosPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { CustomersPage } from '@/pages/CustomersPage'
import { CouponsPage } from '@/pages/CouponsPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { DocsPage } from '@/pages/DocsPage'
import { ShowcasePage } from '@/pages/ShowcasePage'
import { ROUTES } from '@/config/routes'
import { AuthProvider } from '@/context/AuthContext'
import { CustomersProvider } from '@/context/CustomersContext'
import { CouponsProvider } from '@/context/CouponsContext'
import { NotificationsProvider } from '@/context/NotificationsContext'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <AuthProvider>
      <CustomersProvider>
        <CouponsProvider>
          <NotificationsProvider>
            <Routes>
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path={ROUTES.login} element={<LoginPage />} />
              <Route path={ROUTES.signup} element={<SignUpPage />} />
              <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />

              <Route element={<ProtectedLayout />}>
                <Route path={ROUTES.pos} element={<PosPage />} />
                <Route path={ROUTES.orders} element={<OrdersPage />} />
                <Route path={ROUTES.customers} element={<CustomersPage />} />
                <Route path={ROUTES.coupons} element={<CouponsPage />} />
                <Route path={ROUTES.reports} element={<ReportsPage />} />
                <Route path={ROUTES.settings} element={<SettingsPage />} />
                <Route path={ROUTES.notifications} element={<NotificationsPage />} />
              </Route>
            </Routes>
            <Toaster position="bottom-right" richColors />
          </NotificationsProvider>
        </CouponsProvider>
      </CustomersProvider>
    </AuthProvider>
  )
}

export default App
