import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongSeasonResults } from "@/components/bape/BeerPongSeasonResults"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import {
  BEERPONG_COMPLETED_FIXTURES,
} from "@/lib/data/beerpong/BeerPongFixture"
import Image from "next/image"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

export default function BeerPongSchedulePage() {
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

        <section className="flex flex-col gap-6">
          <BapeSectionHeader
            eyebrow="2025–26 season archive"
            title="Regular-season results"
            description="All 30 results, grouped by round."
          />

          <BeerPongSeasonResults fixtures={BEERPONG_COMPLETED_FIXTURES} />
        </section>
      </div>
    </BapePageShell>
  )
}
