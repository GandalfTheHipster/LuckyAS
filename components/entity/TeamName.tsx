"use client"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

type TeamNameProps = {
  code: string
  className?: string
  fallback?: string
}

export function TeamName({
  code,
  className,
  fallback,
}: TeamNameProps) {
  const team = BEERPONG_TEAMS.find((team) => team.code === code)

  const displayName = team?.name ?? fallback ?? code

  return (
    <EntityTrigger
      type="team"
      id={code}
      className={
        className ??
        "font-semibold"
      }
    >
      {displayName}
    </EntityTrigger>
  )
}
