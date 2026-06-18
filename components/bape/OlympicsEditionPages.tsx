import type { ReactNode } from "react"
import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BapeTable } from "@/components/bape/bape_table"
import { OlympicsEventCard } from "@/components/bape/OlympicsEventCard"
import { OlympicsImageCarousel } from "@/components/bape/OlympicsImageCarousel"
import { OlympicsSectionNav } from "@/components/bape/OlympicsSectionNav"
import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
import { getOlympicCountry } from "@/lib/data/olympics/countries"
import type {
  OlympicEvent,
  OlympicPageData,
} from "@/lib/data/olympics/olympics-template"

const standingColumns = [
  { key: "name", label: "Team", align: "left", type: "country" },
  { key: "pts", label: "PTS", align: "right" },
  { key: "gold", label: "Gold", align: "right" },
  { key: "silver", label: "Silver", align: "right" },
  { key: "bronze", label: "Bronze", align: "right" },
] as const

const OLYMPICS_2023_LOGO =
  "https://i.postimg.cc/15jcNzGy/Bape-Olymics2023Logo.png"
const OLYMPICS_2023_LOGO_DARK =
  "https://i.postimg.cc/fTNkqQMp/white-Bape-Olympics2023Logo.png"

type OlympicsEditionPageProps = {
  data: OlympicPageData
}

export function OlympicsOverviewPage({ data }: OlympicsEditionPageProps) {
  const champion = data.winner ?? data.standings[0]?.name

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

export function OlympicsStandingsPage({ data }: OlympicsEditionPageProps) {
  return (
    <OlympicsPageFrame
      data={data}
      title={data.title}
    >
      <section className="flex flex-col gap-5">
        <BapeSectionHeader
          title="Standings"
          description="Ranked by total points, then medal count."
        />
        <BapePanel className="overflow-hidden p-3 sm:p-4">
          <div className="overflow-x-auto">
            <BapeTable columns={standingColumns} athletes={data.standings} />
          </div>
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
