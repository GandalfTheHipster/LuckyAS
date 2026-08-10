import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongLeagueTable } from "@/components/bape/BeerPongLeagueTable"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { BapePanel } from "@/components/bape/BapePageChrome"
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
          <BapeSectionHeader
            eyebrow="2025–26 season archive"
            title="Final standings"
            description="The regular season, preserved in one view."
          />
          <BapePanel className="overflow-hidden p-3 sm:p-4">
            <div className="border-b px-2 pb-4 pt-1 text-xs text-muted-foreground sm:px-3">
              Ranked by points, wins, then net cups.
            </div>
            <div className="pt-3">
              <BeerPongLeagueTable />
            </div>
          </BapePanel>
        </section>
      </div>
    </BapePageShell>
  )
}
