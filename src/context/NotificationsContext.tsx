import { createContext, useContext, useState, type ReactNode } from 'react'
import { NOTIFICATIONS } from '@/data/notifications'
import type { AppNotification } from '@/types'

interface NotificationsContextValue {
  notifications: AppNotification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS)

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  function markAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const value = { notifications, unreadCount, markAsRead, markAllAsRead }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications(): NotificationsContextValue {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}
