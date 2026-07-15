import { ClipboardList, PackageX, UserPlus, Info } from 'lucide-react'
import { STRINGS } from './strings'
import type { IconComponent, NotificationType } from '@/types'

interface NotificationTypeMeta {
  label: string
  icon: IconComponent
  iconClassName: string
}

export const NOTIFICATION_TYPE_META: Record<NotificationType, NotificationTypeMeta> = {
  order: {
    label: STRINGS.notificationType.order,
    icon: ClipboardList,
    iconClassName: 'bg-brand-muted text-brand',
  },
  stock: {
    label: STRINGS.notificationType.stock,
    icon: PackageX,
    iconClassName: 'bg-warning-muted text-warning',
  },
  customer: {
    label: STRINGS.notificationType.customer,
    icon: UserPlus,
    iconClassName: 'bg-success-muted text-success',
  },
  system: {
    label: STRINGS.notificationType.system,
    icon: Info,
    iconClassName: 'bg-muted text-muted-foreground',
  },
}
