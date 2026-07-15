import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-muted">
      {language && (
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="uppercase tracking-wide">{language}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
