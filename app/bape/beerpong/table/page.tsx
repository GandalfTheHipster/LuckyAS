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

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

export default function BeerPongLeagueTablePage() {
  const leader = sortedTeams[0]

  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          eyebrow="Beer Pong"
          title="League Table"
          description="Final regular-season standings."
        />

        <BeerPongSectionNav />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <BapeSectionHeader title="Standings" />
            <BeerPongLeagueTable />
          </div>

          <BapePanel className="p-6">
            <BapeSectionHeader eyebrow="Table Notes" title="Seeds are locked" />
            <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                <TeamName code={leader.code} className="font-semibold text-foreground" />{" "}
                finished first and takes seed 1.
              </p>
              <p>Ranking order is points, wins, then net cups.</p>
              <p>Click a team or player name to open their profile card.</p>
            </div>
          </BapePanel>
        </section>
      </div>
    </BapePageShell>
  )
}
