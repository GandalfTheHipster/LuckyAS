import type { ReactNode } from "react"
import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsEventCard } from "@/components/bape/OlympicsEventCard"
import { OlympicsImageCarousel } from "@/components/bape/OlympicsImageCarousel"
import { OlympicsSectionNav } from "@/components/bape/OlympicsSectionNav"
import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
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

const OLYMPICS_2023_LOGO =
  "https://i.postimg.cc/15jcNzGy/Bape-Olymics2023Logo.png"
const OLYMPICS_2023_LOGO_DARK =
  "https://i.postimg.cc/fTNkqQMp/white-Bape-Olympics2023Logo.png"

type OlympicsEditionPageProps = {
  data: OlympicPageData
}

export function OlympicsOverviewPage({ data }: OlympicsEditionPageProps) {
  const champion = data.winner ?? data.medalTable[0]?.name

  return (
    <OlympicsPageFrame
      data={data}
      title={data.title}
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <OlympicsImageCarousel
          images={getOlympicImages(data)}
          title={data.title}
          location={data.location}
          host={data.host}
        />

        <BapePanel className="p-5 sm:p-6">
          <BapeSectionHeader title="Key Details" />
          <div className="mt-6 grid gap-3">
            <DetailRow label="Champion">
              {champion ? <OlympicEntityBadge value={champion} /> : "TBA"}
            </DetailRow>
            <DetailRow label="MVP">
              {data.mvp ? <PersonProfileButtonByName name={data.mvp} /> : "TBA"}
            </DetailRow>
            <DetailRow label="Host">{data.host ?? "TBA"}</DetailRow>
          </div>
        </BapePanel>
      </section>
    </OlympicsPageFrame>
  )
}

export function OlympicsMedalTablePage({ data }: OlympicsEditionPageProps) {
  return (
    <OlympicsPageFrame
      data={data}
      title={data.title}
    >
      <section className="flex flex-col gap-5">
        <BapeSectionHeader
          title="Medal Table"
          description="Ranked by total points, then medal count."
        />

        <BapePanel className="overflow-hidden">
          <div className="border-b bg-muted/20 px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {data.date} standings
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
      title={data.title}
    >
      <section className="flex flex-col gap-6">
        <BapeSectionHeader
          title="Events"
        />

        <EventCategoryList events={completedEvents} year={data.date} />
      </section>

      {upcomingEvents.length > 0 ? (
        <section className="flex flex-col gap-6">
          <BapeSectionHeader title="Upcoming" />
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
  title,
  children,
}: OlympicsEditionPageProps & {
  title: string
  children: ReactNode
}) {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero title={title} variant="wordmark">
          {data.date === "2023" ? (
            <>
              <Image
                src={OLYMPICS_2023_LOGO}
                alt="Bape Olympics 2023 logo"
                width={80}
                height={80}
                priority
                className="h-14 w-14 object-contain dark:hidden sm:h-16 sm:w-16"
              />
              <Image
                src={OLYMPICS_2023_LOGO_DARK}
                alt="Bape Olympics 2023 logo"
                width={80}
                height={80}
                priority
                className="hidden h-14 w-14 object-contain dark:block sm:h-16 sm:w-16"
              />
            </>
          ) : null}
        </BapeHero>
        <OlympicsSectionNav year={data.date} />
        {children}
      </div>
    </BapePageShell>
  )
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
    <div className="grid gap-8">
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

function DetailRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 rounded-2xl border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="min-w-0 text-right text-sm font-medium">{children}</div>
    </div>
  )
}

function OlympicEntityBadge({ value }: { value: string }) {
  const country = getOlympicCountry(value)

  if (country) {
    return <CountryProfileButton country={value} compact />
  }

  return <PersonProfileButtonByName name={value} compact />
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

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <MobileMedalStat label="Gold" value={entry.gold} tone="gold" />
        <MobileMedalStat label="Silver" value={entry.silver} tone="silver" />
        <MobileMedalStat label="Bronze" value={entry.bronze} tone="bronze" />
        <div className="rounded-xl border bg-background p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Total
          </p>
          <p className="mt-2 text-xl font-bold tabular-nums">
            {getMedalTotal(entry)}
          </p>
        </div>
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
