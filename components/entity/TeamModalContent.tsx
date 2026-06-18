import Image from "next/image"

import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { BEERPONG_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

type TeamModalContentProps = {
  teamCode: string
}

type Result = "W" | "L" | "D"

function getNetCupsLabel(value: number) {
  if (value > 0) return `+${value}`
  return value.toString()
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

function getResultClass(result: Result) {
  if (result === "W") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  if (result === "L") return "bg-red-500/10 text-red-700 dark:text-red-300"
  return "bg-muted text-muted-foreground"
}

function getFixtureNumber(round: number, game: number, teamA: string, teamB: string) {
  return (
    BEERPONG_FIXTURES.findIndex(
      (fixture) =>
        fixture.round === round &&
        fixture.game === game &&
        fixture.teamA === teamA &&
        fixture.teamB === teamB,
    ) + 1
  )
}

function StatTile({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string | number
  tone?: "default" | "good" | "muted"
}) {
  return (
    <div className="rounded-xl border bg-muted/35 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={
          tone === "good"
            ? "mt-1 text-xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300"
            : tone === "muted"
              ? "mt-1 text-xl font-bold tabular-nums text-muted-foreground"
              : "mt-1 text-xl font-bold tabular-nums"
        }
      >
        {value}
      </p>
    </div>
  )
}

export function TeamModalContent({ teamCode }: TeamModalContentProps) {
  const team = BEERPONG_TEAMS.find((team) => team.code === teamCode)

  if (!team) {
    return (
      <div className="pr-10">
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

  const ranking = standings.findIndex((standing) => standing.code === team.code) + 1

  const completedGames = BEERPONG_FIXTURES
    .filter(
      (fixture) =>
        fixture.status === "completed" &&
        (fixture.teamA === team.code || fixture.teamB === team.code),
    )
    .sort((a, b) => {
      if (b.round !== a.round) return b.round - a.round
      return b.game - a.game
    })
    .map((fixture) => {
      const isTeamA = fixture.teamA === team.code
      const opponentCode = isTeamA ? fixture.teamB : fixture.teamA
      const teamScore = isTeamA ? fixture.scoreA : fixture.scoreB
      const opponentScore = isTeamA ? fixture.scoreB : fixture.scoreA

      if (teamScore === null || opponentScore === null) return null

      const result: Result =
        teamScore > opponentScore ? "W" : teamScore < opponentScore ? "L" : "D"

      return {
        fixtureNumber: getFixtureNumber(
          fixture.round,
          fixture.game,
          fixture.teamA,
          fixture.teamB,
        ),
        opponentCode,
        opponentName:
          BEERPONG_TEAMS.find((opponent) => opponent.code === opponentCode)
            ?.shortName ?? opponentCode,
        opponentScore,
        result,
        teamScore,
      }
    })
    .filter((game): game is NonNullable<typeof game> => game !== null)

  const cupsFor = completedGames.reduce((total, game) => total + game.teamScore, 0)
  const cupsAgainst = completedGames.reduce(
    (total, game) => total + game.opponentScore,
    0,
  )
  const winRate = team.mp > 0 ? Math.round((team.w / team.mp) * 100) : 0
  const lastFiveGames = completedGames.slice(0, 5)

  const streakResult = lastFiveGames[0]?.result
  let streakCount = 0

  if (streakResult) {
    for (const game of lastFiveGames) {
      if (game.result === streakResult) streakCount += 1
      else break
    }
  }

  const streakLabel =
    streakResult && streakCount > 0
      ? `${streakResult}${streakCount}`
      : "None"

  const biggestWin = completedGames
    .filter((game) => game.result === "W")
    .sort(
      (a, b) =>
        b.teamScore - b.opponentScore - (a.teamScore - a.opponentScore),
    )[0]

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 pr-10">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border bg-muted/35 p-3">
          <Image
            src={team.logo}
            alt={team.name}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 pt-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Beer Pong Club
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {team.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {team.shortName} · {team.code} · {getOrdinal(ranking)} seed
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Points" value={team.pts} tone="good" />
        <StatTile label="Record" value={`${team.w}-${team.l}`} />
        <StatTile label="Net Cups" value={getNetCupsLabel(team.netCups)} />
        <StatTile label="Win Rate" value={`${winRate}%`} />
        <StatTile label="Matches" value={team.mp} />
        <StatTile label="Cups For" value={cupsFor} />
        <StatTile label="Cups Against" value={cupsAgainst} tone="muted" />
        <StatTile label="Current Form" value={streakLabel} />
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Player
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {team.players.map((playerId) => (
              <PersonProfileButton
                key={playerId}
                bapeID={String(playerId)}
                meta={`${team.code} player`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Best Result
          </h3>
          {biggestWin ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Beat{" "}
              <span className="font-semibold text-foreground">
                {biggestWin.opponentName}
              </span>{" "}
              {biggestWin.teamScore}-{biggestWin.opponentScore}.
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No wins recorded yet.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Recent Results
        </h3>

        {lastFiveGames.length > 0 ? (
          <div className="mt-3 grid gap-2">
            {lastFiveGames.map((game) => (
              <div
                key={`${game.fixtureNumber}-${game.opponentCode}`}
                className="flex items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getResultClass(
                      game.result,
                    )}`}
                  >
                    {game.result}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      vs {game.opponentName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Match {game.fixtureNumber}
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
          <p className="mt-3 text-sm text-muted-foreground">
            No completed games yet.
          </p>
        )}
      </div>
    </div>
  )
}
