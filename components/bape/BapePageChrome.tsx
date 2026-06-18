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
  variant = "default",
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
  variant?: "default" | "wordmark"
}) {
  const hasAside = Boolean(children)
  const isWordmark = variant === "wordmark"

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border bg-card shadow-sm",
        isWordmark &&
          "overflow-visible rounded-none border-0 bg-transparent shadow-none",
        className,
      )}
    >
      {!isWordmark ? (
        <div className="absolute inset-x-0 top-0 h-1 bg-foreground" />
      ) : null}
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--muted))_0%,transparent_42%)] opacity-60",
          isWordmark && "hidden",
        )}
      />
      {!isWordmark ? (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      ) : null}
      <div
        className={cn(
          isWordmark
            ? "relative flex flex-wrap items-center gap-4 p-0 sm:gap-5"
            : "relative grid gap-8 p-6 sm:p-8 lg:p-10",
          hasAside &&
            !isWordmark &&
            "lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center",
        )}
      >
        <div className={cn("max-w-3xl", isWordmark && "max-w-none")}>
          {!isWordmark && eyebrow ? (
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-foreground/15 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground backdrop-blur"
            >
              {eyebrow}
            </Badge>
          ) : null}
          <h1
            className={cn(
              "max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl",
              isWordmark && "text-3xl sm:text-4xl lg:text-5xl",
            )}
          >
            {title}
          </h1>
          {!isWordmark && description ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children ? (
          <div
            className={cn(
              "relative flex justify-center lg:justify-end",
              isWordmark && "items-center justify-start lg:justify-start",
            )}
          >
            {!isWordmark ? (
              <div className="absolute inset-y-3 right-0 hidden w-px bg-border lg:block" />
            ) : null}
            <div
              className={cn(
                "relative rounded-2xl border bg-background/55 p-4 shadow-sm backdrop-blur",
                isWordmark && "border-0 bg-transparent p-0 shadow-none",
              )}
            >
              {children}
            </div>
          </div>
        ) : null}
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
