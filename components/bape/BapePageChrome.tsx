import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function BapePageShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full flex-1 flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-8 sm:px-5 sm:py-10">
        {children}
      </div>
    </main>
  )
}

export function BapeHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
  className?: string
}) {
  const hasAside = Boolean(children)

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-sm sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-foreground" />
      <div
        className={cn(
          "relative grid gap-8 lg:items-end",
          hasAside && "lg:grid-cols-[minmax(0,1fr)_360px]",
        )}
      >
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-5 rounded-full bg-background">
            {eyebrow}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

export function BapePanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-[1.5rem] border bg-card shadow-sm", className)}>
      {children}
    </div>
  )
}

export function BapeSectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
