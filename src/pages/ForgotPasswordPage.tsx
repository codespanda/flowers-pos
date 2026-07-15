import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { STRINGS } from '@/config/strings'
import { ROUTES } from '@/config/routes'
import { interpolate, isValidEmail } from '@/lib/utils'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const emailValid = isValidEmail(email)
  const showEmailError = touched && !emailValid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!emailValid) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <AuthLayout
        title={STRINGS.forgotPasswordPage.successTitle}
        subtitle=""
        footer={
          <Link to={ROUTES.login} className="font-medium text-brand hover:underline">
            {STRINGS.forgotPasswordPage.backToLogin}
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-success-muted text-success">
            <MailCheck className="size-5" />
          </span>
          <p className="text-sm text-muted-foreground">
            {interpolate(STRINGS.forgotPasswordPage.successMessage, { email })}
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title={STRINGS.forgotPasswordPage.title}
      subtitle={STRINGS.forgotPasswordPage.subtitle}
      footer={
        <Link to={ROUTES.login} className="font-medium text-brand hover:underline">
          {STRINGS.forgotPasswordPage.backToLogin}
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="forgot-email">{STRINGS.forgotPasswordPage.email}</Label>
          <Input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={STRINGS.forgotPasswordPage.emailPlaceholder}
            className="h-10"
            aria-invalid={showEmailError}
            autoFocus
          />
          {showEmailError && (
            <p className="text-xs text-destructive">{STRINGS.forgotPasswordPage.emailRequired}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!emailValid}
          className="h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {STRINGS.forgotPasswordPage.submit}
        </Button>
      </form>
    </AuthLayout>
  )
}
