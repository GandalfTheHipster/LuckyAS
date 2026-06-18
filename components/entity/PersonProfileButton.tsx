"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { cn } from "@/lib/utils"

type PersonProfileButtonProps = {
  bapeID: string
  className?: string
  compact?: boolean
  meta?: string
  teamFlag?: string
  labelMode?: PersonLabelMode
}

type PersonLabelMode = "full" | "first" | "icon"

export function PersonProfileButton({
  bapeID,
  className,
  compact = false,
  meta,
  teamFlag,
  labelMode: fixedLabelMode,
}: PersonProfileButtonProps) {
  const numericBapeID = Number(bapeID)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [adaptiveLabelMode, setAdaptiveLabelMode] =
    useState<PersonLabelMode>("full")
  const profile = BAPE_PROFILES.find(
    (profile) => profile.bapeID === numericBapeID,
  )

  useEffect(() => {
    const button = buttonRef.current
    if (!button || !profile) return

    const fullName = `${profile.firstName} ${profile.lastName}`
    const fullWidth = 62 + fullName.length * 8
    const firstWidth = 58 + profile.firstName.length * 8

    function getAvailableWidth(element: HTMLButtonElement) {
      const buttonWidth = element.getBoundingClientRect().width
      const parentWidth =
        element.parentElement?.getBoundingClientRect().width ?? 0

      if (parentWidth <= buttonWidth + 2) {
        return fullWidth
      }

      return Math.max(buttonWidth, parentWidth)
    }

    function updateLabelMode(width: number) {
      if (width >= fullWidth) setAdaptiveLabelMode("full")
      else if (width >= firstWidth) setAdaptiveLabelMode("first")
      else setAdaptiveLabelMode("icon")
    }

    updateLabelMode(getAvailableWidth(button))

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) updateLabelMode(getAvailableWidth(button))
    })

    observer.observe(button)
    if (button.parentElement) observer.observe(button.parentElement)

    return () => observer.disconnect()
  }, [profile, fixedLabelMode])

  if (!profile) {
    return (
      <EntityTrigger type="person" id={bapeID} className={className}>
        {bapeID}
      </EntityTrigger>
    )
  }

  const fullName = `${profile.firstName} ${profile.lastName}`
  const labelMode = fixedLabelMode ?? adaptiveLabelMode
  const visibleName =
    labelMode === "full"
      ? fullName
      : labelMode === "first"
        ? profile.firstName
        : null

  return (
    <EntityTrigger
      ref={buttonRef}
      type="person"
      id={bapeID}
      className={cn(
        "group flex min-w-0 items-center gap-2 rounded-full border bg-background px-2.5 py-1.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40 hover:no-underline hover:shadow-md",
        compact && "px-2 py-1",
        labelMode === "icon" && "justify-center px-1.5",
        className,
      )}
    >
      <span className="relative shrink-0">
        <Image
          src={profile.avatarUrl}
          alt={fullName}
          width={compact ? 28 : 34}
          height={compact ? 28 : 34}
          className={cn(
            "rounded-full object-cover",
            compact ? "h-7 w-7" : "h-8 w-8",
          )}
        />
        {teamFlag ? (
          <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full border bg-background text-[10px] leading-none">
            {teamFlag}
          </span>
        ) : null}
      </span>

      {visibleName ? (
        <span className="min-w-0">
          <span className="block whitespace-nowrap text-sm font-medium text-foreground group-hover:underline">
            {visibleName}
          </span>
          {meta && labelMode === "full" ? (
            <span className="block whitespace-nowrap text-xs text-muted-foreground">
              {meta}
            </span>
          ) : null}
        </span>
      ) : null}
    </EntityTrigger>
  )
}

export function PersonProfileButtonByName({
  name,
  className,
  compact = true,
  meta,
  teamFlag,
}: {
  name: string
  className?: string
  compact?: boolean
  meta?: string
  teamFlag?: string
}) {
  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )

  if (!profile) {
    return (
      <span className={cn("text-sm font-medium text-foreground", className)}>
        {name}
      </span>
    )
  }

  return (
    <PersonProfileButton
      bapeID={String(profile.bapeID)}
      className={className}
      compact={compact}
      meta={meta}
      teamFlag={teamFlag}
    />
  )
}
