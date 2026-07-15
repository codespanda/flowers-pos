import type { ReactElement } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRIMARY_NAV, SECONDARY_NAV } from '@/config/nav'
import { STRINGS } from '@/config/strings'
import { ROUTES } from '@/config/routes'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { NavItem, SecondaryNavItem } from '@/types'

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapsed?: () => void
}

export function Sidebar({ collapsed = false, onToggleCollapsed }: SidebarProps) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'
  const onPosPage = location.pathname === ROUTES.pos

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar py-4 transition-[width] duration-200',
        collapsed ? 'w-[76px] px-2' : 'w-60 px-3',
      )}
    >
      <nav className="flex flex-1 flex-col gap-1">
        {PRIMARY_NAV.map((item) => (
          <CategoryLink
            key={item.id}
            item={item}
            active={onPosPage && item.id === activeCategory}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="my-3 h-px bg-sidebar-border" />

      <nav className="flex flex-col gap-1">
        {SECONDARY_NAV.map((item) => (
          <SecondaryLink
            key={item.id}
            item={item}
            active={location.pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {onToggleCollapsed && (
        <SidebarTooltip label={collapsed ? STRINGS.nav.expand : null}>
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={cn(
              'mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/60 transition-colors hover:bg-muted hover:text-sidebar-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
            {!collapsed && <span>{STRINGS.nav.collapse}</span>}
          </button>
        </SidebarTooltip>
      )}
    </aside>
  )
}

interface SidebarTooltipProps {
  label: string | null
  children: ReactElement
}

function SidebarTooltip({ label, children }: SidebarTooltipProps) {
  if (!label) return children

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

interface CategoryLinkProps {
  item: NavItem
  active: boolean
  collapsed: boolean
}

function CategoryLink({ item, active, collapsed }: CategoryLinkProps) {
  const to = item.id === 'all' ? ROUTES.pos : `${ROUTES.pos}?category=${item.id}`

  return (
    <SidebarTooltip label={collapsed ? item.label : null}>
      <Link
        to={to}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
          collapsed && 'justify-center px-0',
          active
            ? 'bg-brand-muted text-brand'
            : 'text-sidebar-foreground/80 hover:bg-muted hover:text-sidebar-foreground',
        )}
      >
        <item.icon className="size-[18px] shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    </SidebarTooltip>
  )
}

interface SecondaryLinkProps {
  item: SecondaryNavItem
  active: boolean
  collapsed: boolean
}

function SecondaryLink({ item, active, collapsed }: SecondaryLinkProps) {
  return (
    <SidebarTooltip label={collapsed ? item.label : null}>
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          collapsed && 'justify-center px-0',
          active
            ? 'bg-brand-muted text-brand'
            : 'text-sidebar-foreground/70 hover:bg-muted hover:text-sidebar-foreground',
        )}
      >
        <item.icon className="size-[18px] shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    </SidebarTooltip>
  )
}
