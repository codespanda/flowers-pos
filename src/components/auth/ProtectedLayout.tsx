import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/config/routes'

export function ProtectedLayout() {
  const { isAuthenticated } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />
  }

  return (
    <AppShell
      header={<TopBar orderNumber="#1042" />}
      sidebar={
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
        />
      }
    >
      <Outlet />
    </AppShell>
  )
}
