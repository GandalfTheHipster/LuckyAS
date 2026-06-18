import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongFixtureCard } from "@/components/bape/BeerPongFixtureCard"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import {
  BEERPONG_COMPLETED_FIXTURES,
  BEERPONG_UPCOMING_FIXTURES,
} from "@/lib/data/beerpong/BeerPongFixture"
import Image from "next/image"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

const completedFixtures = [...BEERPONG_COMPLETED_FIXTURES].sort((a, b) => {
  if (b.round !== a.round) return b.round - a.round
  return b.game - a.game
})

const upcomingFixtures = [...BEERPONG_UPCOMING_FIXTURES]
  .sort((a, b) => {
    if (a.round !== b.round) return a.round - b.round
    return a.game - b.game
  })

export default function BeerPongSchedulePage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          eyebrow="Beer Pong"
          title="Schedule"
          description="See results and upcoming games in the league."
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={BEERPONG_LEAGUE_LOGO}
              alt="Bape Beer Pong League logo"
              width={180}
              height={180}
              priority
              className="h-44 w-44 object-contain drop-shadow-2xl sm:h-56 sm:w-56 lg:h-64 lg:w-64"
            />
          </div>
        </BapeHero>

        <BeerPongSectionNav />

        <section className="flex flex-col gap-6">
          <BapeSectionHeader
            title="Results"
            description="Winners are highlighted in green."
          />

          <div className="grid gap-3 lg:grid-cols-3">
            {completedFixtures.map((fixture) => (
              <BeerPongFixtureCard
                key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                fixture={fixture}
              />
            ))}
          </div>
        </section>

        {upcomingFixtures.length > 0 ? (
          <section className="flex flex-col gap-6">
            <BapeSectionHeader title="Upcoming" />

            <div className="grid gap-3 lg:grid-cols-3">
              {upcomingFixtures.map((fixture) => (
                <BeerPongFixtureCard
                  key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                  fixture={fixture}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </BapePageShell>
  )
}
