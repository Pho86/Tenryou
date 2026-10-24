export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="flex flex-col gap-3 border-b border-bg-light/60">
      <span className="font-mono text-sm font-semibold text-primary">{eyebrow}</span>
      <h1 className="text-4xl font-bold text-text md:text-6xl">{title}</h1>
      <p className="max-w-2xl text-base text-text/65 md:text-lg">{description}</p>
    </header>
  )
}
