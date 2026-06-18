"use client"

import Image from "next/image"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { cn } from "@/lib/utils"

type TeamProfileButtonProps = {
  code: string
  className?: string
  compact?: boolean
  meta?: string
  badge?: string
  align?: "left" | "right"
}

export function TeamProfileButton({
  code,
  className,
  compact = false,
  meta,
  badge,
  align = "left",
}: TeamProfileButtonProps) {
  const team = BEERPONG_TEAMS.find((team) => team.code === code)

  if (!team) {
    return (
      <EntityTrigger type="team" id={code} className={className}>
        {code}
      </EntityTrigger>
    )
  }

  return (
    <EntityTrigger
      type="team"
      id={code}
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-xl border bg-background px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40 hover:no-underline hover:shadow-md",
        compact && "gap-2 rounded-lg border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none",
        align === "right" && "flex-row-reverse text-right",
        className,
      )}
    >
      <Image
        src={team.logo}
        alt={team.name}
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        className={cn(
          "shrink-0 object-contain",
          compact ? "h-9 w-9" : "h-11 w-11",
        )}
      />

      <span className="min-w-0">
        <span
          className={cn(
            "flex min-w-0 items-center gap-2",
            align === "right" && "flex-row-reverse",
          )}
        >
          <span className="truncate text-sm font-semibold text-foreground group-hover:underline">
            {team.name}
          </span>
          {badge ? (
            <span className="shrink-0 rounded-full border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase text-foreground">
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {meta ?? `${team.shortName} · ${team.code}`}
        </span>
      </span>
    </EntityTrigger>
  )
}
