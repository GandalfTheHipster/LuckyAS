"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { BapePanel } from "@/components/bape/BapePageChrome"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import type { OlympicEvent } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

export function OlympicsEventCard({
  event,
  year,
}: {
  event: OlympicEvent
  year: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <BapePanel className="flex h-full flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <button
        type="button"
        className="flex w-full items-center gap-3 p-5 text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl border bg-background text-2xl">
          {event.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{event.name}</h3>
          <PodiumPreview event={event} year={year} />
        </div>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen ? (
        <div className="grid gap-2 px-5 pb-5 text-sm">
          <MedalLine medal="🥇" value={event.gold} year={year} />
          <MedalLine medal="🥈" value={event.silver} year={year} />
          <MedalLine medal="🥉" value={event.bronze} year={year} />
        </div>
      ) : null}
    </BapePanel>
  )
}

function PodiumPreview({
  event,
  year,
}: {
  event: OlympicEvent
  year: string
}) {
  return (
    <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
      <MedalFlag medal="🥇" value={event.gold} year={year} />
      <MedalFlag medal="🥈" value={event.silver} year={year} />
      <MedalFlag medal="🥉" value={event.bronze} year={year} />
    </div>
  )
}

function MedalLine({
  medal,
  value,
  year,
}: {
  medal: string
  value?: string[]
  year: string
}) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2">
      <span className="shrink-0 text-base leading-8">
        <MedalFlag medal={medal} value={value} year={year} />
      </span>
      <div className="flex min-w-0 flex-wrap justify-end gap-2">
        {value && value.length > 0 ? (
          value.map((name) => (
            <PersonProfileButtonByName
              key={name}
              name={name}
              teamFlag={getOlympicFlagForName(name, year)}
            />
          ))
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </div>
    </div>
  )
}

function MedalFlag({
  medal,
  value,
  year,
}: {
  medal: string
  value?: string[]
  year: string
}) {
  return (
    <span className="whitespace-nowrap">
      {medal} {getMedalFlag(value, year) || "TBA"}
    </span>
  )
}

function getMedalFlag(value: string[] | undefined, year: string) {
  const firstFlag = value?.[0] ? getOlympicFlagForName(value[0], year) : undefined
  return firstFlag ?? ""
}

function getOlympicFlagForName(name: string, year: string) {
  const country = getOlympicCountry(name)

  if (country) return country.flag

  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )

  if (!profile) return undefined
  if (year === "2021") return profile.country[0]
  if (year === "2023") {
    return profile.country.length > 1 ? profile.country[1] : profile.country[0]
  }

  return profile.country[0]
}
