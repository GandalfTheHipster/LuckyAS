import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
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

        <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <BeerPongPlayoffBracket />

          <BapePanel className="p-6">
            <BapeSectionHeader eyebrow="Seeds" title="Top two wait" />
            <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                <TeamName code={seed1.code} className="font-semibold text-foreground" />{" "}
                and{" "}
                <TeamName code={seed2.code} className="font-semibold text-foreground" />{" "}
                go straight to the semi finals.
              </p>
              <p>
                The quarter finals are 3rd vs 6th and 4th vs 5th. Winners meet
                the top seeds.
              </p>
            </div>
          </BapePanel>
        </section>
      </div>
    </BapePageShell>
  )
}
