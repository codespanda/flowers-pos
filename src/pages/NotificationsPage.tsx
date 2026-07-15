import { PageHeader } from '@/components/layout/PageHeader'
import { PageMain } from '@/components/layout/PageMain'
import { Button } from '@/components/ui/button'
import { NotificationItem } from '@/components/notifications/NotificationItem'
import { STRINGS } from '@/config/strings'
import { useNotifications } from '@/context/NotificationsContext'

export function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  return (
    <PageMain>
      <PageHeader
        title={STRINGS.notificationsPage.title}
        subtitle={STRINGS.notificationsPage.subtitle}
        actions={
          unreadCount > 0 ? (
            <Button variant="outline" onClick={markAllAsRead}>
              {STRINGS.notificationsPage.markAllRead}
            </Button>
          ) : undefined
        }
      />

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {STRINGS.notificationsPage.empty}
        </div>
      ) : (
        <div className="divide-y divide-border rounded-2xl border border-border bg-card p-1.5">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClick={(n) => markAsRead(n.id)} />
          ))}
        </div>
      )}
    </PageMain>
  )
}
