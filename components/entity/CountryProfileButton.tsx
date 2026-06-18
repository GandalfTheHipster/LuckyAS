"use client"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import { cn } from "@/lib/utils"

type CountryProfileButtonProps = {
  country: string
  className?: string
  compact?: boolean
  meta?: string
}

export function CountryProfileButton({
  country,
  className,
  compact = false,
  meta,
}: CountryProfileButtonProps) {
  const olympicCountry = getOlympicCountry(country)
  const label = olympicCountry?.name ?? country
  const flag = olympicCountry?.flag

  return (
    <EntityTrigger
      type="country"
      id={label}
      className={cn(
        "group inline-flex min-w-0 items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40 hover:no-underline hover:shadow-md",
        compact && "px-2 py-1",
        className,
      )}
    >
      {flag ? <span className="shrink-0 text-lg">{flag}</span> : null}
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-sm font-semibold text-foreground group-hover:underline">
          {label}
        </span>
        {meta ? (
          <span className="block whitespace-nowrap text-xs text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </span>
    </EntityTrigger>
  )
}
