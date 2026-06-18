import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongFixtureCard } from "@/components/bape/BeerPongFixtureCard"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import {
  BEERPONG_COMPLETED_FIXTURES,
  BEERPONG_FIXTURES,
  BEERPONG_UPCOMING_FIXTURES,
} from "@/lib/data/beerpong/BeerPongFixture"

const rounds = [...new Set(BEERPONG_FIXTURES.map((fixture) => fixture.round))]
  .sort((a, b) => a - b)
  .map((round) => ({
    round,
    fixtures: BEERPONG_FIXTURES.filter((fixture) => fixture.round === round),
  }))

export default function BeerPongSchedulePage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          eyebrow="Beer Pong"
          title="Schedule"
          description="Every regular-season fixture and result."
        />

        <BeerPongSectionNav />

        <section className="grid gap-5 md:grid-cols-2">
          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Completed
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {BEERPONG_COMPLETED_FIXTURES.length}
            </p>
          </BapePanel>
          <BapePanel className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Upcoming
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {BEERPONG_UPCOMING_FIXTURES.length}
            </p>
          </BapePanel>
        </section>

        <section className="flex flex-col gap-6">
          <BapeSectionHeader title="Rounds" />

          <div className="grid gap-6">
            {rounds.map(({ round, fixtures }) => (
              <BapePanel key={round} className="p-5">
                <h2 className="text-xl font-semibold tracking-tight">
                  Round {round}
                </h2>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {fixtures.map((fixture) => (
                    <BeerPongFixtureCard
                      key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                      fixture={fixture}
                    />
                  ))}
                </div>
              </BapePanel>
            ))}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
