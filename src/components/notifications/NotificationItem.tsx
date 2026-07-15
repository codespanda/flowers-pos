import { NOTIFICATION_TYPE_META } from '@/config/notifications'
import { formatRelativeDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { AppNotification } from '@/types'

interface NotificationItemProps {
  notification: AppNotification
  onClick?: (notification: AppNotification) => void
  compact?: boolean
}

export function NotificationItem({ notification, onClick, compact }: NotificationItemProps) {
  const meta = NOTIFICATION_TYPE_META[notification.type]

  return (
    <button
      type="button"
      onClick={() => onClick?.(notification)}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-muted',
        !notification.read && 'bg-brand-muted/40',
      )}
    >
      <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-full', meta.iconClassName)}>
        <meta.icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-semibold text-foreground">{notification.title}</p>
          {!notification.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />}
        </div>
        <p className={cn('text-sm text-muted-foreground', compact && 'line-clamp-2')}>
          {notification.message}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{formatRelativeDate(notification.createdAt)}</p>
      </div>
    </button>
  )
}
