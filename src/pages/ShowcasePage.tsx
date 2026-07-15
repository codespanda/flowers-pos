import { useEffect } from 'react'

const SHOWCASE_URL = 'https://codespanda.com/templates/flowers'

export function ShowcasePage() {
  useEffect(() => {
    window.location.replace(SHOWCASE_URL)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">
        Redirecting to{' '}
        <a href={SHOWCASE_URL} className="text-brand hover:underline">
          {SHOWCASE_URL}
        </a>
        …
      </p>
    </div>
  )
}
