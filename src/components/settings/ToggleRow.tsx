import { useState, type ReactNode } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface ToggleRowProps {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  defaultChecked?: boolean
}

export function ToggleRow({ id, label, description, icon, defaultChecked = true }: ToggleRowProps) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="flex items-center gap-3">
        {icon && <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">{icon}</span>}
        <div>
          <Label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </Label>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={setChecked} />
    </div>
  )
}
