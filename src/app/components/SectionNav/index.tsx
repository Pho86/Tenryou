"use client"
import { useEffect, useState } from "react"

export type Section = {
  id: string
  label: string
  index: string
}

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "")

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="Section navigation" className="sticky top-24 hidden lg:block">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-text/40">
        On this page
      </p>
      <ul className="flex flex-col gap-1 border-l border-bg-light/60">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById(section.id)
                  if (!element) return

                  const reduceMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                  ).matches
                  element.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start",
                  })
                  window.history.replaceState(null, "", `#${section.id}`)
                  setActive(section.id)
                }}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px flex w-full items-baseline gap-3 border-l-2 py-2 pl-4 text-left text-sm transition-colors ${isActive
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-text/55 hover:border-text/30 hover:text-text"
                  }`}
              >
                <span className="font-mono text-xs text-text/35">{section.index}</span>
                <span>{section.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
