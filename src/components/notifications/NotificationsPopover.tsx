import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { NotificationItem } from './NotificationItem'
import { useNotifications } from '@/context/NotificationsContext'
import { STRINGS } from '@/config/strings'
import { ROUTES } from '@/config/routes'

const POPOVER_LIMIT = 5

export function NotificationsPopover() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const recent = notifications.slice(0, POPOVER_LIMIT)

  function handleViewMore() {
    setOpen(false)
    navigate(ROUTES.notifications)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={STRINGS.notificationsPopover.title}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 pt-3 pb-1">
          <p className="text-sm font-semibold text-foreground">{STRINGS.notificationsPopover.title}</p>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs font-medium text-brand hover:underline"
            >
              {STRINGS.notificationsPopover.markAllRead}
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">
            {STRINGS.notificationsPopover.empty}
          </p>
        ) : (
          <div className="max-h-80 overflow-y-auto px-1.5 pb-1.5">
            {recent.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} onClick={(n) => markAsRead(n.id)} compact />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleViewMore}
          className="w-full rounded-b-lg border-t border-border py-2.5 text-center text-sm font-medium text-brand transition-colors hover:bg-muted"
        >
          {STRINGS.notificationsPopover.viewMore}
        </button>
      </PopoverContent>
    </Popover>
  )
}
