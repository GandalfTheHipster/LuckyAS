import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

const seededTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  if (b.netCups !== a.netCups) return b.netCups - a.netCups
  return a.name.localeCompare(b.name)
})

export default function BeerPongPlayoffsPage() {
  const topSeeds = seededTeams.slice(0, 2).map((team) => team.shortName)

  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          title="Bape Beer Pong League"
          variant="wordmark"
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={BEERPONG_LEAGUE_LOGO}
              alt="Bape Beer Pong League logo"
              width={280}
              height={280}
              priority
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </div>
        </BapeHero>

        <BeerPongSectionNav />

        <BapePanel className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="p-5 sm:p-6">
              <p className="w-fit rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-background">
                Playoffs Live
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Regular season complete. Finals mode is on.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                The table is locked, all six teams are seeded, and the league
                has moved into single elimination.
              </p>
            </div>

            <div className="grid grid-cols-3 border-t bg-muted/25 text-center lg:grid-cols-1 lg:border-l lg:border-t-0">
              <StatusStat label="Format" value="6 teams" />
              <StatusStat label="Top 2" value="Byes" />
            </div>
          </div>
        </BapePanel>

        <BapeSectionHeader
          title="Playoff Bracket"
          description="Six teams. Single elimination. The top two seeds skip straight to the semi finals."
        />

        <BeerPongPlayoffBracket />

      </div>
    </BapePageShell>
  )
}

function StatusStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r px-3 py-4 last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold sm:text-base">
        {value}
      </p>
    </div>
  )
}
