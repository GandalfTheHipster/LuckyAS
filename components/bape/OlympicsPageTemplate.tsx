import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BapeTable } from "@/components/bape/bape_table"
import { Badge } from "@/components/ui/badge"
import type {
  OlympicEvent,
  OlympicPageData,
} from "@/lib/data/olympics/olympics-template"

const standingColumns = [
  { key: "name", label: "Team", align: "left" },
  { key: "pts", label: "PTS", align: "right" },
  { key: "gold", label: "Gold", align: "right" },
  { key: "silver", label: "Silver", align: "right" },
  { key: "bronze", label: "Bronze", align: "right" },
] as const

type OlympicsPageTemplateProps = {
  data: OlympicPageData
}

export function OlympicsPageTemplate({ data }: OlympicsPageTemplateProps) {
  const completedEvents = data.events.filter(
    (event) => event.status === "completed",
  ).length
  const champion = data.standings[0]

  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          eyebrow={data.date}
          title={data.title}
          description={data.description}
        />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <BapePanel className="overflow-hidden">
            <div className="relative aspect-[16/10] min-h-80">
              <Image
                src={data.imageOfTheDay}
                alt={`${data.title} image of the day`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 760px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <Badge variant="secondary" className="mb-3">
                  Image of the Day
                </Badge>
                <h2 className="text-2xl font-semibold">{data.location}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                  {data.host ? `Hosted at ${data.host}.` : "Host TBA."}
                </p>
              </div>
            </div>
          </BapePanel>

          <BapePanel className="p-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Snapshot
            </p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>Champion: {data.winner ?? "TBA"}</p>
              <p>MVP: {data.mvp ?? "TBA"}</p>
              <p>
                {completedEvents} of {data.events.length} events completed.
              </p>
              {champion ? <p>{champion.name} topped the standings.</p> : null}
            </div>
          </BapePanel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <BapePanel className="p-5 sm:p-6">
            <BapeSectionHeader
              eyebrow="Podium"
              title="Final Standings"
              description="Ranked by total points, with medal counts shown for each team."
            />

            <div className="mt-6 space-y-3">
              {data.standings.slice(0, 3).map((team, index) => (
                <div
                  key={team.name}
                  className="flex items-center justify-between rounded-2xl border bg-background p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{team.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {team.gold} gold, {team.silver} silver, {team.bronze}{" "}
                        bronze
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-semibold tabular-nums">
                    {team.pts}
                  </p>
                </div>
              ))}
            </div>
          </BapePanel>

          <BapePanel className="overflow-hidden p-3 sm:p-4">
            <div className="overflow-x-auto">
              <BapeTable columns={standingColumns} athletes={data.standings} />
            </div>
          </BapePanel>
        </section>

        <section className="flex flex-col gap-6">
          <BapeSectionHeader
            eyebrow="Events"
            title="Event Results"
            description="Each event card records its winner and podium where that data is available."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}

function EventCard({ event }: { event: OlympicEvent }) {
  return (
    <BapePanel className="flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl border bg-background text-2xl">
            {event.emoji}
          </div>
          <div>
            <h3 className="font-semibold">{event.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatStatus(event.status)}
            </p>
          </div>
        </div>
        <Badge variant={event.status === "completed" ? "secondary" : "outline"}>
          {event.status ?? "upcoming"}
        </Badge>
      </div>

      <div className="mt-5 rounded-2xl border bg-background p-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Winner
        </p>
        <p className="mt-1 font-semibold">{event.winner ?? "TBA"}</p>
      </div>

      <div className="mt-4 grid gap-2 text-sm">
        <MedalLine label="Gold" value={event.gold} />
        <MedalLine label="Silver" value={event.silver} />
        <MedalLine label="Bronze" value={event.bronze} />
      </div>
    </BapePanel>
  )
}

function MedalLine({ label, value }: { label: string; value?: string[] }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2">
      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0 text-right text-sm">
        {value && value.length > 0 ? value.join(", ") : "-"}
      </span>
    </div>
  )
}

function formatStatus(status?: string) {
  if (!status) return "Upcoming"

  return status.charAt(0).toUpperCase() + status.slice(1)
}
