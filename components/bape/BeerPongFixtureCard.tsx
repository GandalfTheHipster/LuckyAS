import Image from "next/image"

import { BapePanel } from "@/components/bape/BapePageChrome"
import { TeamName } from "@/components/entity/TeamName"
import { Badge } from "@/components/ui/badge"
import { BEERPONG_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

function getTeam(code: string) {
  return BEERPONG_TEAMS.find((team) => team.code === code)
}

function TeamBadge({
  code,
  align = "left",
}: {
  code: string
  align?: "left" | "right"
}) {
  const team = getTeam(code)
  const displayName = team?.shortName ?? code
  const altName = team?.name ?? code

  return (
    <div
      className={
        align === "right"
          ? "flex min-w-0 flex-row-reverse items-center gap-2 text-right"
          : "flex min-w-0 items-center gap-2"
      }
    >
      {team?.logo ? (
        <Image
          src={team.logo}
          alt={altName}
          width={40}
          height={40}
          className="h-9 w-9 shrink-0 object-contain"
        />
      ) : (
        <div className="h-9 w-9 shrink-0 rounded-full border bg-muted" />
      )}

      <TeamName
        code={code}
        fallback={displayName}
        className="min-w-0 truncate text-sm font-medium"
      />
    </div>
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
  const winner = teamAWon ? fixture.teamA : teamBWon ? fixture.teamB : null

  return (
    <BapePanel className="p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Round {fixture.round}</span>
          <span>/</span>
          <span>Game {fixture.game}</span>
        </div>

        <Badge variant={isCompleted ? "secondary" : "outline"}>
          {isCompleted ? "Final" : "Upcoming"}
        </Badge>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className={teamAWon ? "font-semibold" : ""}>
          <TeamBadge code={fixture.teamA} />
        </div>

        <div className="rounded-xl border bg-muted px-3 py-2 text-center text-sm font-semibold tabular-nums">
          {isCompleted ? `${fixture.scoreA} - ${fixture.scoreB}` : "VS"}
        </div>

        <div className={teamBWon ? "font-semibold" : ""}>
          <TeamBadge code={fixture.teamB} align="right" />
        </div>
      </div>

      {winner ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Winner:{" "}
          <TeamName
            code={winner}
            className="font-medium text-foreground"
          />
        </p>
      ) : null}
    </BapePanel>
  )
}
