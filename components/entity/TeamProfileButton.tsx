"use client"

import { useEffect, useRef, useState } from "react"
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

type TeamLabelMode = "full" | "short" | "code" | "icon"

export function TeamProfileButton({
  code,
  className,
  compact = false,
  meta,
  badge,
  align = "left",
}: TeamProfileButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [labelMode, setLabelMode] = useState<TeamLabelMode>("full")
  const team = BEERPONG_TEAMS.find((team) => team.code === code)

  useEffect(() => {
    const button = buttonRef.current
    if (!button || !team) return

    const fullWidth = 64 + team.name.length * 8
    const shortWidth = 62 + team.shortName.length * 8
    const codeWidth = 58 + team.code.length * 9

    function updateLabelMode(width: number) {
      if (width >= fullWidth) setLabelMode("full")
      else if (width >= shortWidth) setLabelMode("short")
      else if (width >= codeWidth) setLabelMode("code")
      else setLabelMode("icon")
    }

    updateLabelMode(button.getBoundingClientRect().width)

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) updateLabelMode(entry.contentRect.width)
    })

    observer.observe(button)

    return () => observer.disconnect()
  }, [team])

  if (!team) {
    return (
      <EntityTrigger type="team" id={code} className={className}>
        {code}
      </EntityTrigger>
    )
  }

  const visibleName =
    labelMode === "full"
      ? team.name
      : labelMode === "short"
        ? team.shortName
        : labelMode === "code"
          ? team.code
          : null

  return (
    <EntityTrigger
      ref={buttonRef}
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

      {visibleName ? (
        <span className="min-w-0">
          <span
            className={cn(
              "flex min-w-0 items-center gap-2",
              align === "right" && "flex-row-reverse",
            )}
          >
            <span className="whitespace-nowrap text-sm font-semibold text-foreground group-hover:underline">
              {visibleName}
            </span>
            {badge && labelMode === "full" ? (
              <span className="shrink-0 rounded-full border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase text-foreground">
                {badge}
              </span>
            ) : null}
          </span>
          {labelMode === "full" ? (
            <span className="mt-0.5 block whitespace-nowrap text-xs text-muted-foreground">
              {meta ?? `${team.shortName} · ${team.code}`}
            </span>
          ) : null}
        </span>
      ) : null}
    </EntityTrigger>
  )
}
