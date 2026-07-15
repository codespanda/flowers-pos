import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { STRINGS } from '@/config/strings'
import { ROUTES } from '@/config/routes'
import { interpolate, isValidEmail } from '@/lib/utils'

export function SignUpPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [storeName, setStoreName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ name: false, storeName: false, email: false, password: false })

  const nameValid = name.trim() !== ''
  const storeNameValid = storeName.trim() !== ''
  const emailValid = isValidEmail(email)
  const passwordValid = password.length >= 6
  const isFormValid = nameValid && storeNameValid && emailValid && passwordValid

  const showNameError = touched.name && !nameValid
  const showStoreNameError = touched.storeName && !storeNameValid
  const showEmailError = touched.email && !emailValid
  const showPasswordError = touched.password && !passwordValid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isFormValid) return

    login({ name: name.trim(), email: email.trim(), storeName: storeName.trim() })
    toast.success(interpolate(STRINGS.signUpPage.welcomeToast, { name: name.trim() }))
    navigate(ROUTES.pos)
  }

  return (
    <AuthLayout
      title={STRINGS.signUpPage.title}
      subtitle={STRINGS.signUpPage.subtitle}
      footer={
        <p className="text-muted-foreground">
          {STRINGS.signUpPage.haveAccount}{' '}
          <Link to={ROUTES.login} className="font-medium text-brand hover:underline">
            {STRINGS.signUpPage.loginLink}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="signup-name">{STRINGS.signUpPage.name}</Label>
          <Input
            id="signup-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, name: true }))}
            placeholder={STRINGS.signUpPage.namePlaceholder}
            className="h-10"
            aria-invalid={showNameError}
            autoFocus
          />
          {showNameError && <p className="text-xs text-destructive">{STRINGS.signUpPage.nameRequired}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-store-name">{STRINGS.signUpPage.storeName}</Label>
          <Input
            id="signup-store-name"
            value={storeName}
            onChange={(event) => setStoreName(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, storeName: true }))}
            placeholder={STRINGS.signUpPage.storeNamePlaceholder}
            className="h-10"
            aria-invalid={showStoreNameError}
          />
          {showStoreNameError && (
            <p className="text-xs text-destructive">{STRINGS.signUpPage.storeNameRequired}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-email">{STRINGS.signUpPage.email}</Label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, email: true }))}
            placeholder={STRINGS.signUpPage.emailPlaceholder}
            className="h-10"
            aria-invalid={showEmailError}
          />
          {showEmailError && <p className="text-xs text-destructive">{STRINGS.signUpPage.emailRequired}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-password">{STRINGS.signUpPage.password}</Label>
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, password: true }))}
            placeholder={STRINGS.signUpPage.passwordPlaceholder}
            className="h-10"
            aria-invalid={showPasswordError}
          />
          {showPasswordError && (
            <p className="text-xs text-destructive">{STRINGS.signUpPage.passwordRequired}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isFormValid}
          className="h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {STRINGS.signUpPage.submit}
        </Button>
      </form>
    </AuthLayout>
  )
}
