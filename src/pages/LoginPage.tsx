import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/context/AuthContext'
import { STAFF_MEMBERS } from '@/data/staff'
import { STRINGS } from '@/config/strings'
import { ROUTES } from '@/config/routes'
import { APP_CONFIG } from '@/config/app'
import { interpolate, isValidEmail } from '@/lib/utils'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailValid = isValidEmail(email)
  const passwordValid = password.length >= 6
  const isFormValid = emailValid && passwordValid

  const showEmailError = touched.email && !emailValid
  const showPasswordError = touched.password && !passwordValid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isFormValid) return

    const matchedStaff = STAFF_MEMBERS.find(
      (member) => member.email.toLowerCase() === email.trim().toLowerCase(),
    )
    const name = matchedStaff?.name ?? email.split('@')[0]!

    login({ name, email: email.trim(), storeName: APP_CONFIG.storeName })
    toast.success(interpolate(STRINGS.loginPage.welcomeToast, { name }))
    navigate(ROUTES.pos)
  }

  return (
    <AuthLayout
      title={STRINGS.loginPage.title}
      subtitle={STRINGS.loginPage.subtitle}
      footer={
        <p className="text-muted-foreground">
          {STRINGS.loginPage.noAccount}{' '}
          <Link to={ROUTES.signup} className="font-medium text-brand hover:underline">
            {STRINGS.loginPage.signUpLink}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">{STRINGS.loginPage.email}</Label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, email: true }))}
            placeholder={STRINGS.loginPage.emailPlaceholder}
            className="h-10"
            aria-invalid={showEmailError}
            autoFocus
          />
          {showEmailError && <p className="text-xs text-destructive">{STRINGS.loginPage.emailRequired}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">{STRINGS.loginPage.password}</Label>
            <Link to={ROUTES.forgotPassword} className="text-xs font-medium text-brand hover:underline">
              {STRINGS.loginPage.forgotPassword}
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, password: true }))}
            placeholder={STRINGS.loginPage.passwordPlaceholder}
            className="h-10"
            aria-invalid={showPasswordError}
          />
          {showPasswordError && (
            <p className="text-xs text-destructive">{STRINGS.loginPage.passwordRequired}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="login-remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="login-remember" className="text-sm font-normal text-muted-foreground">
            {STRINGS.loginPage.rememberMe}
          </Label>
        </div>

        <Button
          type="submit"
          disabled={!isFormValid}
          className="h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {STRINGS.loginPage.submit}
        </Button>

        <p className="text-center text-xs text-muted-foreground">{STRINGS.loginPage.demoHint}</p>
      </form>
    </AuthLayout>
  )
}
