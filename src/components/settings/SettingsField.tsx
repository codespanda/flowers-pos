import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface SettingsFieldProps {
  id: string
  label: string
  defaultValue?: string
  type?: string
}

export function SettingsField({ id, label, defaultValue, type = 'text' }: SettingsFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} defaultValue={defaultValue} className="h-10" />
    </div>
  )
}
