import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ChevronDown, ClipboardList, LogOut, Settings, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { STRINGS } from '@/config/strings'
import { ROUTES } from '@/config/routes'
import { getInitials } from '@/lib/utils'

export function UserMenu() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  if (!currentUser) return null

  function handleLogOut() {
    logout()
    toast(STRINGS.userMenu.signedOut)
    navigate(ROUTES.login)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center gap-1.5" aria-label="Account menu">
          <Avatar>
            <AvatarFallback className="bg-success text-success-foreground font-semibold">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="px-2 py-1.5">
          <p className="truncate text-sm font-semibold text-foreground">{currentUser.name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">{currentUser.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to={ROUTES.orders}>
            <ClipboardList className="size-4" />
            {STRINGS.userMenu.myOrders}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={ROUTES.customers}>
            <Users className="size-4" />
            {STRINGS.userMenu.customers}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={ROUTES.settings}>
            <Settings className="size-4" />
            {STRINGS.userMenu.settings}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleLogOut}>
          <LogOut className="size-4" />
          {STRINGS.userMenu.logOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
