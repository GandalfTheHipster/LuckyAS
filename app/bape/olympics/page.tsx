import Image from "next/image"
import Link from "next/link"

import {
  BapeHero,
  BapeMetricCard,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"

const editions = [
  {
    href: "/bape/olympics/2026",
    data: OLYMPICS_2026_DATA,
    status: "Upcoming",
  },
  {
    href: "/bape/olympics/2023",
    data: OLYMPICS_2023_DATA,
    status: "Complete",
  },
  {
    href: "/bape/olympics/2021",
    data: OLYMPICS_2021_DATA,
    status: "Complete",
  },
]

const completedEditions = editions.filter(
  (edition) => edition.status === "Complete",
)
const completedEvents = editions.reduce(
  (total, edition) =>
    total +
    edition.data.events.filter((event) => event.status === "completed").length,
  0,
)
const medalCount = completedEditions.reduce(
  (total, edition) =>
    total +
    edition.data.standings.reduce(
      (editionTotal, team) =>
        editionTotal + team.gold + team.silver + team.bronze,
      0,
    ),
  0,
)

export default function OlympicsHubPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          eyebrow="BAPE Olympics"
          title="The archive of every event, champion, and ridiculous podium."
          description="Browse yearly Olympics results, team standings, medal tables, hosts, MVPs, and the all-time leaderboard for the BAPE sporting calendar."
        >
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <BapeMetricCard
              label="Editions"
              value={editions.length}
              detail="Past and upcoming"
            />
            <BapeMetricCard
              label="Events"
              value={completedEvents}
              detail="Completed events tracked"
            />
            <BapeMetricCard
              label="Medals"
              value={medalCount}
              detail="Gold, silver, and bronze"
            />
          </div>
        </BapeHero>

        <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <BapePanel className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-72">
                <Image
                  src={OLYMPICS_2023_DATA.imageOfTheDay}
                  alt="BAPE Olympics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <Badge variant="secondary" className="mb-4 w-fit">
                  Start Here
                </Badge>
                <h2 className="text-2xl font-semibold tracking-tight">
                  All-Time Leaderboard
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The complete ranking across every tracked BAPE Olympics,
                  combining points, golds, silvers, and bronzes from every
                  athlete profile.
                </p>
                <Button asChild className="mt-6 w-fit">
                  <Link href="/bape/olympics/all-time">
                    View All-Time Stats
                  </Link>
                </Button>
              </div>
            </div>
          </BapePanel>

          <BapePanel className="p-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Format
            </p>
            <div className="mt-5 space-y-5 text-sm leading-6 text-muted-foreground">
              <p>
                Each edition records event winners, final team standings, medal
                counts, the host location, and the MVP.
              </p>
              <p>
                Finished editions feed the all-time leaderboard. Upcoming
                editions stay visible here so the calendar has a clear next
                stop.
              </p>
            </div>
          </BapePanel>
        </section>

        <section className="flex flex-col gap-6">
          <BapeSectionHeader
            eyebrow="Editions"
            title="Choose a year"
            description="Each card opens a full yearly breakdown with event cards, podiums, standings, and key details."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {editions.map(({ href, data, status }) => (
              <Link
                key={href}
                href={href}
                className="group overflow-hidden rounded-[1.5rem] border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={data.imageOfTheDay}
                    alt={data.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <Badge className="absolute left-4 top-4" variant="secondary">
                    {status}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm text-white/75">{data.location}</p>
                    <h3 className="mt-1 text-2xl font-semibold">
                      {data.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-xl border bg-background p-3">
                      <p className="text-xs text-muted-foreground">Events</p>
                      <p className="font-semibold">{data.events.length}</p>
                    </div>
                    <div className="rounded-xl border bg-background p-3">
                      <p className="text-xs text-muted-foreground">Winner</p>
                      <p className="truncate font-semibold">{data.winner}</p>
                    </div>
                    <div className="rounded-xl border bg-background p-3">
                      <p className="text-xs text-muted-foreground">MVP</p>
                      <p className="truncate font-semibold">{data.mvp}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
