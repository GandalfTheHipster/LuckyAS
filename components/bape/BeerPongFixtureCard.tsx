import { BapePanel } from "@/components/bape/BapePageChrome"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BEERPONG_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"

function TeamBadge({
  code,
  align = "left",
}: {
  code: string
  align?: "left" | "right"
}) {
  return (
    <TeamProfileButton
      code={code}
      compact
      align={align}
      showMeta={false}
      className="w-full"
    />
  )
}

function getFixtureNumber(fixture: (typeof BEERPONG_FIXTURES)[number]) {
  return (
    BEERPONG_FIXTURES.findIndex(
      (item) =>
        item.round === fixture.round &&
        item.game === fixture.game &&
        item.teamA === fixture.teamA &&
        item.teamB === fixture.teamB,
    ) + 1
  )
}

export function BeerPongFixtureCard({
  fixture,
}: {
  fixture: (typeof BEERPONG_FIXTURES)[number]
}) {
  const isCompleted = fixture.status === "completed"
  const teamAWon =
    isCompleted && fixture.scoreA !== null && fixture.scoreB !== null
      ? fixture.scoreA > fixture.scoreB
      : false
  const teamBWon =
    isCompleted && fixture.scoreA !== null && fixture.scoreB !== null
      ? fixture.scoreB > fixture.scoreA
      : false
  const fixtureNumber = getFixtureNumber(fixture)

  return (
    <BapePanel className="p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Regular season</span>
          {fixtureNumber > 0 ? (
            <>
              <span>/</span>
              <span>Match {fixtureNumber}</span>
            </>
          ) : null}
        </div>

        <Badge variant={isCompleted ? "secondary" : "outline"}>
          {isCompleted ? "Final" : "Upcoming"}
        </Badge>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div
          className={cn(
            "rounded-xl border bg-background px-3 py-2",
            teamAWon &&
              "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100",
          )}
        >
          <TeamBadge code={fixture.teamA} />
        </div>

        <div className="rounded-xl border bg-muted px-3 py-2 text-center text-sm font-semibold tabular-nums">
          {isCompleted ? `${fixture.scoreA} - ${fixture.scoreB}` : "VS"}
        </div>

        <div
          className={cn(
            "rounded-xl border bg-background px-3 py-2",
            teamBWon &&
              "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100",
          )}
        >
          <TeamBadge code={fixture.teamB} align="right" />
        </div>
      </div>
    </BapePanel>
  )
}
