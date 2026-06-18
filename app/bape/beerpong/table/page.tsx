import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongLeagueTable } from "@/components/bape/BeerPongLeagueTable"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import Image from "next/image"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

export default function BeerPongLeagueTablePage() {
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

        <section className="flex flex-col gap-5">
          <BapeSectionHeader title="League Table" description="Ranking order is points, wins, then net cups. If still undecided, head-to-head matchups." />
          <BeerPongLeagueTable />
        </section>
      </div>
    </BapePageShell>
  )
}
