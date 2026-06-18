import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongLeagueTable } from "@/components/bape/BeerPongLeagueTable"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { TeamName } from "@/components/entity/TeamName"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import Image from "next/image"

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

export default function BeerPongLeagueTablePage() {
  const leader = sortedTeams[0]

  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          eyebrow="Beer Pong"
          title="League Table"
          description="Where is everyone stacking up on the table?"
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={BEERPONG_LEAGUE_LOGO}
              alt="Bape Beer Pong League logo"
              width={280}
              height={280}
              priority
              className="h-44 w-44 object-contain drop-shadow-2xl sm:h-56 sm:w-56 lg:h-64 lg:w-64"
            />
          </div>
        </BapeHero>

        <BeerPongSectionNav />

        <section className="grid gap-4 lg:grid-cols-3">
          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Top Seed
            </p>
            <div className="mt-3 text-sm leading-6 text-muted-foreground">
              <TeamName code={leader.code} className="font-semibold text-foreground" />{" "}
              finished first and takes seed 1.
            </div>
          </BapePanel>

          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Tie-breakers
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Ranking order is points, wins, then net cups.
            </p>
          </BapePanel>

          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Profiles
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Click a team or player name to open their profile card.
            </p>
          </BapePanel>
        </section>

        <section className="flex flex-col gap-5">
          <BapeSectionHeader title="Standings" />
          <BeerPongLeagueTable />
        </section>
      </div>
    </BapePageShell>
  )
}
