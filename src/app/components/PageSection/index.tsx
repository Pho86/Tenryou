export default function PageSection({
  id,
  index,
  title,
  description,
  children,
}: {
  id: string
  index: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="w-full scroll-mt-24">
      <div className="mb-8 flex flex-col gap-3 border-b border-bg-light/70 pb-5">
        <span className="font-mono text-sm font-semibold text-primary">{index}</span>
        <h2 className="text-2xl font-bold text-text md:text-4xl">{title}</h2>
        {description && (
          <p className="max-w-3xl text-sm text-text/55 md:text-base">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
