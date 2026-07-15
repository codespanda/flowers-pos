export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-wide text-brand uppercase">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
