"use client"

import Image from "next/image"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { cn } from "@/lib/utils"

type PersonProfileButtonProps = {
  bapeID: string
  className?: string
  compact?: boolean
  meta?: string
}

export function PersonProfileButton({
  bapeID,
  className,
  compact = false,
  meta,
}: PersonProfileButtonProps) {
  const numericBapeID = Number(bapeID)
  const profile = BAPE_PROFILES.find(
    (profile) => profile.bapeID === numericBapeID,
  )

  if (!profile) {
    return (
      <EntityTrigger type="person" id={bapeID} className={className}>
        {bapeID}
      </EntityTrigger>
    )
  }

  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <EntityTrigger
      type="person"
      id={bapeID}
      className={cn(
        "group flex min-w-0 items-center gap-2 rounded-full border bg-background px-2.5 py-1.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40 hover:no-underline hover:shadow-md",
        compact && "px-2 py-1",
        className,
      )}
    >
      <Image
        src={profile.avatarUrl}
        alt={fullName}
        width={compact ? 28 : 34}
        height={compact ? 28 : 34}
        className={cn(
          "shrink-0 rounded-full object-cover",
          compact ? "h-7 w-7" : "h-8 w-8",
        )}
      />

      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground group-hover:underline">
          {fullName}
        </span>
        {meta ? (
          <span className="block truncate text-xs text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </span>
    </EntityTrigger>
  )
}
