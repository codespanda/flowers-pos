import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import type { StaffMember } from '@/types'

interface TeamListProps {
  members: StaffMember[]
}

export function TeamList({ members }: TeamListProps) {
  return (
    <div className="divide-y divide-border">
      {members.map((member) => (
        <div key={member.id} className="flex items-center gap-3 py-3">
          <Avatar>
            <AvatarFallback className="bg-brand-muted font-semibold text-brand">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
            <p className="truncate text-xs text-muted-foreground">{member.email}</p>
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {member.role}
          </span>
        </div>
      ))}
    </div>
  )
}
