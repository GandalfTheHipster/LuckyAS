import Image from "next/image"
import Link from "next/link"

import {
  BapeHero,
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
    disabled: true,
  },
  {
    href: "/bape/olympics/2023",
    data: OLYMPICS_2023_DATA,
    status: "Complete",
    disabled: false,
  },
  {
    href: "/bape/olympics/2021",
    data: OLYMPICS_2021_DATA,
    status: "Complete",
    disabled: false,
  },
]

export default function OlympicsHubPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          title="Bape Olympics"
          variant="wordmark"
        />

        <section className="grid gap-5 lg:grid-cols-[1fr_0px]">
          <BapePanel className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-72">
                <Image
                  src={OLYMPICS_2023_DATA.imageOfTheDay}
                  alt="Bape Olympics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  All-Time Leaderboard
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The complete athlete ranking across every completed Olympics.
                </p>
                <Button asChild className="mt-6 w-fit">
                  <Link href="/bape/olympics/all-time">
                    View All-Time Stats
                  </Link>
                </Button>
              </div>
            </div>
          </BapePanel>
        </section>

        <section className="flex flex-col gap-6">
          <BapeSectionHeader
            title="Years"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {editions.map(({ href, data, status, disabled }) => {
              const card = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={data.imageOfTheDay}
                      alt={data.title}
                      fill
                      className={
                        disabled
                          ? "object-cover opacity-70"
                          : "object-cover transition duration-500 group-hover:scale-105"
                      }
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
                    {disabled ? (
                      <p className="text-sm text-muted-foreground">
                        Coming soon. Details will appear here once the 2026
                        format is confirmed.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-xl border bg-background p-3">
                          <p className="text-xs text-muted-foreground">
                            Winner
                          </p>
                          <p className="truncate font-semibold">
                            {data.winner}
                          </p>
                        </div>
                        <div className="rounded-xl border bg-background p-3">
                          <p className="text-xs text-muted-foreground">MVP</p>
                          <p className="truncate font-semibold">{data.mvp}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )

              if (disabled) {
                return (
                  <div
                    key={href}
                    className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm"
                  >
                    {card}
                  </div>
                )
              }

              return (
                <Link
                key={href}
                href={href}
                className="group overflow-hidden rounded-[1.5rem] border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                  {card}
              </Link>
              )
            })}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
