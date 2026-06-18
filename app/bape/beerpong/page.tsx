import Image from "next/image"

import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

export default function BeerPongPlayoffsPage() {
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

        <BapeSectionHeader title="Playoffs" description="The playoffs are here! 6 Teams, Single Elimination." />

        <BeerPongPlayoffBracket />

      </div>
    </BapePageShell>
  )
}
