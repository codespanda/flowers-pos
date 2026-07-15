import { Search, Flower2 } from 'lucide-react'
import { NotificationsPopover } from '@/components/notifications/NotificationsPopover'
import { UserMenu } from './UserMenu'
import { STRINGS } from '@/config/strings'
import { APP_CONFIG } from '@/config/app'
import { formatDate, formatTime } from '@/lib/format'

interface TopBarProps {
  orderNumber: string
  now?: Date
}

export function TopBar({ orderNumber, now = new Date() }: TopBarProps) {
  return (
    <header className="flex h-20 shrink-0 items-center gap-6 border-b border-border bg-surface px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-muted text-brand">
          <Flower2 className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-base font-semibold text-foreground">{APP_CONFIG.storeName}</p>
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {APP_CONFIG.storeTagline}
          </p>
        </div>
      </div>

      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={STRINGS.header.searchPlaceholder}
          className="h-11 w-full rounded-xl border border-transparent bg-muted pr-14 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:bg-surface"
        />
        <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {STRINGS.header.searchShortcut}
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-foreground">
            {STRINGS.header.orderPrefix} {orderNumber}
          </p>
          <p className="text-xs text-muted-foreground">{APP_CONFIG.counterLabel}</p>
        </div>
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-foreground">{formatTime(now)}</p>
          <p className="text-xs text-muted-foreground">{formatDate(now)}</p>
        </div>

        <NotificationsPopover />

        <UserMenu />
      </div>
    </header>
  )
}
