"use client"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

type PersonNameProps = {
  bapeID: string
  className?: string
  fallback?: string
}

export function PersonName({
  bapeID,
  className,
  fallback,
}: PersonNameProps) {
  const profile = Object.values(BAPE_PROFILES).find(
    (profile) => profile.bapeID === bapeID,
  )

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : fallback ?? bapeID

  return (
    <EntityTrigger
      type="person"
      id={bapeID}
      className={
        className ??
        "transition hover:text-red-600 hover:underline"
      }
    >
      {displayName}
    </EntityTrigger>
  )
}