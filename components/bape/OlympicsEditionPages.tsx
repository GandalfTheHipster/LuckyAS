import type { ReactNode } from "react"
import Image from "next/image"

import {
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsEditionHeader } from "@/components/bape/OlympicsEditionHeader"
import { OlympicsEventCard } from "@/components/bape/OlympicsEventCard"
import { OlympicsImageCarousel } from "@/components/bape/OlympicsImageCarousel"
import { OlympicsSectionNav } from "@/components/bape/OlympicsSectionNav"
import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { PersonProfileCardByName } from "@/components/entity/PersonProfileButton"
import { BAPE_PROFILES, getBapeProfileAvatar } from "@/lib/data/BapeProfiles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import type {
  OlympicEvent,
  OlympicMedalTableEntry,
  OlympicPageData,
} from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

type OlympicsEditionPageProps = {
  data: OlympicPageData
}

export function OlympicsOverviewPage({ data }: OlympicsEditionPageProps) {
  const teamRosters = getTeamRosters(data)

  return (
    <OlympicsPageFrame
      data={data}
    >
      <section className="grid gap-5">
        <BapeSectionHeader
          title="Overview"
          description="The full edition snapshot: nations, squads, medal position, and the photo archive."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <TeamRosterPanel
            rosters={teamRosters}
            mvp={data.mvp}
          />

          <BapePanel className="overflow-hidden lg:self-start">
            <OlympicsImageCarousel
              images={getOlympicImages(data)}
              title={data.title}
              location={data.location}
              host={data.host}
            />
          </BapePanel>
        </div>
      </section>
    </OlympicsPageFrame>
  )
}

export function OlympicsMedalTablePage({ data }: OlympicsEditionPageProps) {
  return (
    <OlympicsPageFrame
      data={data}
    >
      <section className="flex flex-col gap-5">
        <BapeSectionHeader
          title="Medal Table"
          description="Ranked by points, then medal count. Gold, silver, and bronze decide bragging rights."
        />

        <BapePanel className="overflow-hidden">
          <div className="border-b bg-muted/20 px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {data.date} MEDAL TABLE
            </p>
          </div>
          <OlympicsMedalTable entries={data.medalTable} />
        </BapePanel>
      </section>
    </OlympicsPageFrame>
  )
}

export function OlympicsEventsPage({ data }: OlympicsEditionPageProps) {
  const completedEvents = data.events.filter(
    (event) => event.status === "completed",
  )
  const upcomingEvents = data.events.filter(
    (event) => event.status !== "completed",
  )

  return (
    <OlympicsPageFrame
      data={data}
    >
      <section className="flex flex-col gap-5">
        <BapeSectionHeader
          title="Events"
          description="Every completed event from the edition, grouped by category with podium results."
        />

        {data.events.length > 0 ? (
          <EventCategoryList events={completedEvents} year={data.date} />
        ) : (
          <BapePanel className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              To be decided.
            </p>
          </BapePanel>
        )}
      </section>

      {upcomingEvents.length > 0 ? (
        <section className="flex flex-col gap-5">
          <BapeSectionHeader
            title="Upcoming"
            description="Events still waiting for a result."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.map((event) => (
              <OlympicsEventCard key={event.id} event={event} year={data.date} />
            ))}
          </div>
        </section>
      ) : null}
    </OlympicsPageFrame>
  )
}

function OlympicsPageFrame({
  data,
  children,
}: OlympicsEditionPageProps & {
  children: ReactNode
}) {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <OlympicsEditionHeader
          data={data}
          logo={getOlympicsEditionLogo(data.date)}
        />
        <OlympicsSectionNav year={data.date} />
        {children}
      </div>
    </BapePageShell>
  )
}

function getOlympicsEditionLogo(year: string) {
  if (year === "2023") {
    return {
      light: "https://i.postimg.cc/T16hcGMv/Black-Bape-Olympics2023.png",
      dark: "https://i.postimg.cc/J0LtQmVL/White-Bape-Olympics2023.png",
      alt: "Bape Olympics 2023 logo",
    }
  }

  if (year === "2021") {
    return {
      light:
        "https://i.postimg.cc/Kv1C5TNW/Bape-Olympics-Logo-Rockingham-Black.png",
      dark:
        "https://i.postimg.cc/hPN6ZGZh/Bape-Olympics-Rockingham-White.png",
      alt: "Bape Olympics Rockingham 2021 logo",
    }
  }
}

function EventCategoryList({
  events,
  year,
}: {
  events: OlympicEvent[]
  year: string
}) {
  const categories = groupEventsByCategory(events)

  return (
    <div className="grid gap-6">
      {categories.map((category) => (
        <section key={category.name} className="grid gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {category.name}
          </p>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {category.events.map((event) => (
              <OlympicsEventCard key={event.id} event={event} year={year} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

type TeamRoster = {
  team: string
  members: string[]
  captain?: string
  entry: OlympicMedalTableEntry
}

function TeamRosterPanel({
  rosters,
  mvp,
}: {
  rosters: TeamRoster[]
  mvp?: string
}) {
  const pointsLeader = Math.max(...rosters.map((roster) => roster.entry.pts))
  const shouldTintLeader = pointsLeader > 0

  return (
    <BapePanel className="p-4 sm:p-6">
      <BapeSectionHeader
        title="Nations & Squads"
        description="Each country roster, ordered by the current medal table."
      />

      <div className="mt-5 grid gap-4">
        {rosters.map((roster, index) => {
          const isPointsLeader =
            shouldTintLeader && roster.entry.pts === pointsLeader

          return (
            <div
              key={roster.team}
              className={cn(
                "rounded-2xl border bg-background p-4 shadow-sm",
                isPointsLeader &&
                  "border-yellow-400/45 bg-yellow-400/[0.08] shadow-md shadow-yellow-900/5 dark:border-yellow-300/30 dark:bg-yellow-300/[0.07]",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold tabular-nums",
                    isPointsLeader
                      ? "border-yellow-400/70 bg-yellow-400/20 text-yellow-950 dark:border-yellow-300/40 dark:bg-yellow-300/20 dark:text-yellow-100"
                      : "bg-muted/35 text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <CountryProfileButton
                    country={roster.team}
                    className="border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                  />
                </div>

                <div className="flex shrink-0 items-start gap-3 text-right">
                  {isPointsLeader ? (
                    <span className="mt-1 inline-flex rounded-full bg-yellow-400/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-yellow-950 ring-1 ring-yellow-400/45 dark:text-yellow-100 dark:ring-yellow-300/35">
                      Winner
                    </span>
                  ) : null}
                  <div>
                    <p className="text-2xl font-bold tabular-nums">
                      {roster.entry.pts}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      pts
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:hidden">
                {roster.members.map((member) => (
                  <RosterMemberRow
                    key={member}
                    name={member}
                    subtitles={getRosterSubtitles(member, roster.captain, mvp)}
                  />
                ))}
              </div>

              <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {roster.members.map((member) => (
                  <PersonProfileCardByName
                    key={member}
                    name={member}
                    size="sm"
                    className="w-full"
                    subtitles={getRosterSubtitles(member, roster.captain, mvp)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </BapePanel>
  )
}

function getRosterSubtitles(member: string, captain?: string, mvp?: string) {
  return [
    ...(member === captain ? [{ label: "Captain" }] : []),
    ...(member === mvp ? [{ label: "MVP", tone: "gold" as const }] : []),
  ]
}

function RosterMemberRow({
  name,
  subtitles,
}: {
  name: string
  subtitles: Array<{
    label: string
    tone?: "default" | "gold"
  }>
}) {
  const profile = BAPE_PROFILES.find(
    (profile) => `${profile.firstName} ${profile.lastName}` === name,
  )

  if (!profile) {
    return <p className="text-sm font-medium text-foreground">{name}</p>
  }

  return (
    <EntityTrigger
      type="person"
      id={String(profile.bapeID)}
      className="group flex min-w-0 items-center gap-3 rounded-2xl border bg-background p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:no-underline hover:shadow-md"
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={getBapeProfileAvatar(profile)}
          alt={name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block whitespace-normal text-base font-semibold leading-tight text-foreground group-hover:underline">
          {name}
        </span>
        {subtitles.length ? (
          <span className="mt-1 flex flex-wrap gap-1.5">
            {subtitles.map((subtitle) => (
              <span
                key={`${subtitle.label}-${subtitle.tone ?? "default"}`}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  subtitle.tone === "gold"
                    ? "border-yellow-400/45 bg-yellow-400/15 text-[#f5c451]"
                    : "bg-muted/45 text-muted-foreground",
                )}
              >
                {subtitle.label}
              </span>
            ))}
          </span>
        ) : null}
      </span>
    </EntityTrigger>
  )
}

function OlympicsMedalTable({
  entries,
}: {
  entries: OlympicMedalTableEntry[]
}) {
  return (
    <>
      <div className="grid gap-3 p-3 md:hidden">
        {entries.map((entry, index) => (
          <MedalTableMobileCard
            key={entry.name}
            entry={entry}
            rank={index + 1}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-background">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16 px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Rank
              </TableHead>
              <TableHead className="min-w-[280px] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Team
              </TableHead>
              <MedalHead label="Gold" />
              <MedalHead label="Silver" />
              <MedalHead label="Bronze" />
              <TableHead className="px-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Total
              </TableHead>
              <TableHead className="px-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                PTS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow
                key={entry.name}
                className={cn(
                  "group border-border/80 hover:bg-muted/25",
                  index === 0 && "bg-amber-50/60 hover:bg-amber-50/80 dark:bg-amber-950/15 dark:hover:bg-amber-950/25",
                )}
              >
                <TableCell className="px-4 py-5 text-center text-sm font-semibold text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-5">
                  <CountryProfileButton
                    country={entry.name}
                    className="border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                  />
                </TableCell>
                <TableCell className="px-4 py-5 text-right">
                  <MedalCount value={entry.gold} tone="gold" />
                </TableCell>
                <TableCell className="px-4 py-5 text-right">
                  <MedalCount value={entry.silver} tone="silver" />
                </TableCell>
                <TableCell className="px-4 py-5 text-right">
                  <MedalCount value={entry.bronze} tone="bronze" />
                </TableCell>
                <TableCell className="px-4 py-5 text-right text-base font-semibold">
                  {getMedalTotal(entry)}
                </TableCell>
                <TableCell className="px-4 py-5 text-right text-sm font-semibold text-muted-foreground">
                  {entry.pts}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function MedalTableMobileCard({
  entry,
  rank,
}: {
  entry: OlympicMedalTableEntry
  rank: number
}) {
  const isLeader = rank === 1

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-sm",
        isLeader && "bg-amber-50/60 dark:bg-amber-950/15",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold tabular-nums",
            isLeader
              ? "border-foreground bg-foreground text-background shadow-sm"
              : "bg-muted/35 text-muted-foreground",
          )}
        >
          {rank}
        </span>

        <div className="min-w-0 flex-1">
          <CountryProfileButton
            country={entry.name}
            className="border-transparent bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
          />
        </div>

        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            PTS
          </p>
          <p className="text-2xl font-bold tabular-nums">{entry.pts}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MobileMedalStat label="Gold" value={entry.gold} tone="gold" />
        <MobileMedalStat label="Silver" value={entry.silver} tone="silver" />
        <MobileMedalStat label="Bronze" value={entry.bronze} tone="bronze" />
      </div>
    </div>
  )
}

function MedalHead({ label }: { label: string }) {
  return (
    <TableHead className="px-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <span className="inline-flex items-center justify-end gap-2">
        <span
          className={cn(
            "size-2.5 rounded-full",
            label === "Gold" && "bg-[#f8c75c]",
            label === "Silver" && "bg-[#d9dde1]",
            label === "Bronze" && "bg-[#d9a66f]",
          )}
        />
        {label}
      </span>
    </TableHead>
  )
}

function MedalCount({
  value,
  tone,
}: {
  value: number
  tone: "gold" | "silver" | "bronze"
}) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-base font-bold text-neutral-950 shadow-sm ring-1 ring-inset",
        tone === "gold" && "bg-[#f8c75c] ring-[#b47a00]/35",
        tone === "silver" && "bg-[#e5e7e9] ring-black/10 dark:bg-[#d8dde3]",
        tone === "bronze" && "bg-[#dfb582] ring-[#8a4f18]/30",
      )}
    >
      {value}
    </span>
  )
}

function MobileMedalStat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "gold" | "silver" | "bronze"
}) {
  return (
    <div className="rounded-xl border bg-background p-3">
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
          tone === "gold" && "text-[#9a6500] dark:text-[#f8c75c]",
          tone === "silver" && "text-slate-600 dark:text-[#d8dde3]",
          tone === "bronze" && "text-[#9a5724] dark:text-[#d98a4b]",
        )}
      >
        {label}
      </p>
      <div className="mt-2 flex justify-center">
        <MedalCount value={value} tone={tone} />
      </div>
    </div>
  )
}

function getMedalTotal(entry: OlympicMedalTableEntry) {
  return entry.gold + entry.silver + entry.bronze
}

function getOlympicImages(data: OlympicPageData) {
  return data.images && data.images.length > 0
    ? data.images
    : [data.imageOfTheDay]
}

function getTeamRosters(data: OlympicPageData): TeamRoster[] {
  const hasResults = data.medalTable.some((entry) => entry.pts > 0)

  return data.medalTable
    .map((entry) => {
      const country = getOlympicCountry(entry.name)
      const captain = data.captains?.[entry.name]
      const members = country
        ? BAPE_PROFILES.filter((profile) =>
            profile.country.includes(country.flag),
          )
            .map((profile) => `${profile.firstName} ${profile.lastName}`)
            .sort((a, b) => {
              const aRank = getRosterSortRank(a, captain, data.mvp)
              const bRank = getRosterSortRank(b, captain, data.mvp)
              return aRank - bRank || a.localeCompare(b)
            })
        : []

      return {
        team: entry.name,
        entry,
        captain,
        members,
      }
    })
    .sort((a, b) => {
      if (!hasResults) return a.team.localeCompare(b.team)
      return b.entry.pts - a.entry.pts || a.team.localeCompare(b.team)
    })
}

function getRosterSortRank(name: string, captain?: string, mvp?: string) {
  if (name === captain) return 0
  if (name === mvp) return 1
  return 2
}

function groupEventsByCategory(events: OlympicEvent[]) {
  const categories = [
    "Video Games",
    "Team Sports",
    "Table Games",
    "Drinking",
    "Food & Skill",
    "Other Events",
  ]
  const grouped = new Map<string, OlympicEvent[]>(
    categories.map((category) => [category, []]),
  )

  for (const event of events) {
    grouped.get(getEventCategory(event))?.push(event)
  }

  return categories
    .map((name) => ({ name, events: grouped.get(name) ?? [] }))
    .filter((category) => category.events.length > 0)
}

function getEventCategory(event: OlympicEvent) {
  const key = `${event.id} ${event.name}`.toLowerCase()

  if (key.includes("fifa")) return "Video Games"
  if (
    key.includes("basketball") ||
    key.includes("futsal") ||
    key.includes("soccer") ||
    key.includes("cricket") ||
    key.includes("handball")
  ) {
    return "Team Sports"
  }
  if (
    key.includes("pool") ||
    key.includes("darts") ||
    key.includes("table") ||
    key.includes("chess") ||
    key.includes("beer-pong")
  ) {
    return "Table Games"
  }
  if (key.includes("drink")) return "Drinking"
  if (
    key.includes("cooking") ||
    key.includes("trivia") ||
    key.includes("sprint") ||
    key.includes("two-square") ||
    key.includes("eggs")
  ) {
    return "Food & Skill"
  }

  return "Other Events"
}
