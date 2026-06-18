import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
} from "@/components/bape/BapePageChrome"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { TeamName } from "@/components/entity/TeamName"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

export default function BeerPongPlayoffsPage() {
  const seed1 = sortedTeams[0]
  const seed2 = sortedTeams[1]

  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          eyebrow="Beer Pong"
          title="Playoffs"
          description="Regular season complete. The bracket is set."
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={BEERPONG_LEAGUE_LOGO}
              alt="BAPE Beer Pong League logo"
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
              Top Seeds
            </p>
            <div className="mt-3 text-sm leading-6 text-muted-foreground">
              <TeamName code={seed1.code} className="font-semibold text-foreground" />{" "}
              and{" "}
              <TeamName code={seed2.code} className="font-semibold text-foreground" />{" "}
              start in the semi finals.
            </div>
          </BapePanel>

          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Quarter Finals
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              3rd plays 6th. 4th plays 5th.
            </p>
          </BapePanel>

          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Grand Final
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Semi-final winners meet for the league title.
            </p>
          </BapePanel>
        </section>

        <BeerPongPlayoffBracket />
      </div>
    </BapePageShell>
  )
}
