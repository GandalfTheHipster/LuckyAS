import Image from "next/image"

import { PersonName } from "@/components/entity/PersonName"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { BEERPONG_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"

type TeamModalContentProps = {
  teamCode: string
}

type Result = "W" | "L" | "D"

function getResultClass(result: Result) {
  if (result === "W") return "bg-green-500/10 text-green-600 dark:text-green-400"
  if (result === "L") return "bg-red-500/10 text-red-600 dark:text-red-400"
  return "bg-muted text-muted-foreground"
}

function getOrdinal(value: number) {
  if (value % 100 >= 11 && value % 100 <= 13) return `${value}th`

  switch (value % 10) {
    case 1:
      return `${value}st`
    case 2:
      return `${value}nd`
    case 3:
      return `${value}rd`
    default:
      return `${value}th`
  }
}

export function TeamModalContent({ teamCode }: TeamModalContentProps) {
  const team = BEERPONG_TEAMS.find((team) => team.code === teamCode)

  if (!team) {
    return (
      <div className="pr-8">
        <h2 className="text-xl font-semibold">Team not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No team exists for code: {teamCode}
        </p>
      </div>
    )
  }

  const standings = [...BEERPONG_TEAMS].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.w !== a.w) return b.w - a.w
    return b.netCups - a.netCups
  })

  const ranking = standings.findIndex((standingTeam) => standingTeam.code === team.code) + 1

  const lastFiveGames = BEERPONG_FIXTURES
    .filter(
      (fixture) =>
        fixture.status === "completed" &&
        fixture.scoreA !== null &&
        fixture.scoreB !== null &&
        (fixture.teamA === team.code || fixture.teamB === team.code),
    )
    .sort((a, b) => {
      if (b.round !== a.round) return b.round - a.round
      return b.game - a.game
    })
    .slice(0, 5)
    .map((fixture) => {
      const isTeamA = fixture.teamA === team.code
      const opponentCode = isTeamA ? fixture.teamB : fixture.teamA
      const teamScore = isTeamA ? fixture.scoreA : fixture.scoreB
      const opponentScore = isTeamA ? fixture.scoreB : fixture.scoreA

      const result: Result =
        teamScore > opponentScore ? "W" : teamScore < opponentScore ? "L" : "D"

      return {
        round: fixture.round,
        game: fixture.game,
        opponentCode,
        teamScore,
        opponentScore,
        result,
      }
    })

  const streakResult = lastFiveGames[0]?.result
  const streakCount = streakResult
    ? lastFiveGames.findIndex((game) => game.result !== streakResult) === -1
      ? lastFiveGames.length
      : lastFiveGames.findIndex((game) => game.result !== streakResult)
    : 0

  const streakLabel =
    streakResult && streakCount > 0
      ? `${streakCount} game ${streakResult === "W" ? "winning" : streakResult === "L" ? "losing" : "draw"} streak`
      : "No current streak"

  return (
    <div className="pr-8">
      <div className="flex items-center gap-4">
        <Image
          src={team.logo}
          alt={team.name}
          width={72}
          height={72}
          className="h-16 w-16 object-contain"
        />

        <div>
          <h2 className="text-2xl font-bold">{team.name}</h2>
          <p className="text-sm text-muted-foreground">
            {team.shortName} · {team.code}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">Rank</p>
          <p className="text-lg font-bold">{getOrdinal(ranking)}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">MP</p>
          <p className="text-lg font-bold">{team.mp}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">W</p>
          <p className="text-lg font-bold">{team.w}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">PTS</p>
          <p className="text-lg font-bold">{team.pts}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/40 p-4">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Players
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {team.players.map((playerId) => (
            <PersonName
              key={playerId}
              bapeID={String(playerId)}
              className="rounded-full border bg-background px-3 py-1 text-sm font-medium transition hover:text-red-600 hover:underline"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/40 p-4">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Current Form
        </h3>

        <p className="mt-2 text-sm font-medium">{streakLabel}</p>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/40 p-4">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Last 5 Games
        </h3>

        {lastFiveGames.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2">
            {lastFiveGames.map((game) => (
              <div
                key={`${game.round}-${game.game}`}
                className="flex items-center justify-between rounded-lg border bg-background px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${getResultClass(
                      game.result,
                    )}`}
                  >
                    {game.result}
                  </span>

                  <div>
                    <p className="text-sm font-medium">
                      vs {game.opponentCode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Round {game.round}, Game {game.game}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold tabular-nums">
                  {game.teamScore}-{game.opponentScore}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            No completed games yet.
          </p>
        )}
      </div>
    </div>
  )
}