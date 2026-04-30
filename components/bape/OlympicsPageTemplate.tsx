import Image from "next/image"
import { BapeTable } from "@/components/bape/bape_table"
import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"

const standingColumns = [
  { key: "name", label: "Team", align: "left" },
  { key: "pts", label: "PTS", align: "right" },
  { key: "gold", label: "🥇", align: "right" },
  { key: "silver", label: "🥈", align: "right" },
  { key: "bronze", label: "🥉", align: "right" },
] as const

type OlympicsPageTemplateProps = {
  data: OlympicPageData
}

export function OlympicsPageTemplate({ data }: OlympicsPageTemplateProps) {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 px-4 py-6 sm:py-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {data.title}
              </h1>

              <p className="text-sm text-muted-foreground">
                {data.date} • {data.location}
              </p>

              <p className="max-w-2xl text-sm text-muted-foreground">
                {data.description}
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted">
              <Image
                src={data.imageOfTheDay}
                alt={`${data.title} image of the day`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard label="Host" value={data.host ?? "TBA"} />
              <InfoCard label="MVP" value={data.mvp ?? "TBA"} />
              <InfoCard label="Winner" value={data.winner ?? "TBA"} />
            </div>
          </div>

          <aside className="min-w-0 rounded-2xl border bg-background p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Final Standings</h2>

            <div className="overflow-x-auto">
              <BapeTable columns={standingColumns} athletes={data.standings} />
            </div>
          </aside>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Events
            </h2>
            <p className="text-sm text-muted-foreground">
              Every event from this Olympics.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{event.emoji}</div>

                <h3 className="font-semibold">{event.name}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {formatStatus(event.status)}
                </p>

                {event.winner && (
                  <p className="mt-3 text-sm">
                    Winner: <span className="font-medium">{event.winner}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  )
}

function formatStatus(status?: string) {
  if (!status) return "Upcoming"

  return status.charAt(0).toUpperCase() + status.slice(1)
}