import Image from "next/image"

import { BeerPongLeagueTable } from "@/components/bape/BeerPongLeagueTable"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { TeamName } from "@/components/entity/TeamName"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong"
import { BEERPONG_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

const completedFixtures = BEERPONG_FIXTURES.filter(
  (fixture) => fixture.status === "completed",
)

const upcomingFixtures = BEERPONG_FIXTURES.filter(
  (fixture) => fixture.status === "upcoming",
)

function getTeam(code: string) {
  return BEERPONG_TEAMS.find((team) => team.code === code)
}

function getNetCupsLabel(value: number) {
  if (value > 0) return `+${value}`
  return value.toString()
}

function getLongestWinStreak() {
  const streaks = BEERPONG_TEAMS.map((team) => ({
    code: team.code,
    name: team.name,
    shortName: team.shortName,
    logo: team.logo,
    currentStreak: 0,
    longestStreak: 0,
  }))

  const completedGames = [...BEERPONG_FIXTURES]
    .filter(
      (fixture) =>
        fixture.status === "completed" &&
        fixture.scoreA !== null &&
        fixture.scoreB !== null,
    )
    .sort((a, b) => {
      if (a.round !== b.round) return a.round - b.round
      return a.game - b.game
    })

  for (const fixture of completedGames) {
    const teamA = streaks.find((team) => team.code === fixture.teamA)
    const teamB = streaks.find((team) => team.code === fixture.teamB)

    if (!teamA || !teamB) continue

    const teamAWon = fixture.scoreA! > fixture.scoreB!
    const teamBWon = fixture.scoreB! > fixture.scoreA!

    if (teamAWon) {
      teamA.currentStreak += 1
      teamA.longestStreak = Math.max(teamA.longestStreak, teamA.currentStreak)
      teamB.currentStreak = 0
    }

    if (teamBWon) {
      teamB.currentStreak += 1
      teamB.longestStreak = Math.max(teamB.longestStreak, teamB.currentStreak)
      teamA.currentStreak = 0
    }
  }

  return streaks.sort((a, b) => b.longestStreak - a.longestStreak)[0]
}

function TeamBadge({ code }: { code: string }) {
  const team = getTeam(code)
  const displayName = team?.shortName ?? code
  const altName = team?.name ?? code

  return (
    <div className="flex min-w-0 items-center gap-2">
      {team?.logo ? (
        <Image
          src={team.logo}
          alt={altName}
          width={34}
          height={34}
          className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
        />
      ) : (
        <div className="h-8 w-8 shrink-0 rounded-full border bg-muted sm:h-9 sm:w-9" />
      )}

      <TeamName
        code={code}
        fallback={displayName}
        className="min-w-0 truncate text-left text-xs font-medium transition hover:text-red-600 hover:underline sm:text-sm"
      />
    </div>
  )
}

function StatPill({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-xl border bg-background/80 px-3 py-2 shadow-sm sm:px-4 sm:py-3">
      <p className="text-[11px] text-muted-foreground sm:text-xs">{label}</p>
      <p className="truncate text-sm font-semibold sm:text-base">{value}</p>
    </div>
  )
}

function FixtureCard({
  fixture,
}: {
  fixture: (typeof BEERPONG_FIXTURES)[number]
}) {
  const isCompleted = fixture.status === "completed"

  return (
    <div className="rounded-xl border bg-background p-3 shadow-sm transition hover:bg-muted/40 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
          <span>Round {fixture.round}</span>
          <span>•</span>
          <span>Game {fixture.game}</span>
        </div>

        <span
          className={
            isCompleted
              ? "rounded-full bg-green-500/10 px-2 py-1 text-[11px] font-medium text-green-700 dark:text-green-400 sm:text-xs"
              : "rounded-full bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-700 dark:text-red-400 sm:text-xs"
          }
        >
          {isCompleted ? "Completed" : "Upcoming"}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
        <TeamBadge code={fixture.teamA} />

        <div className="flex justify-center">
          {isCompleted ? (
            <div className="rounded-lg border bg-muted px-2.5 py-1 text-sm font-semibold tabular-nums sm:px-3 sm:text-lg">
              {fixture.scoreA} - {fixture.scoreB}
            </div>
          ) : (
            <div className="rounded-lg border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground sm:px-3 sm:text-sm">
              VS
            </div>
          )}
        </div>

        <div className="flex min-w-0 justify-end">
          <TeamBadge code={fixture.teamB} />
        </div>
      </div>
    </div>
  )
}

export default function BapeLeagueTablePage() {
  const leader = sortedTeams[0]
  const longestWinStreak = getLongestWinStreak()

  const bestNetCups = [...BEERPONG_TEAMS].sort(
    (a, b) => b.netCups - a.netCups,
  )[0]

  return (
    <main className="flex w-full flex-1 flex-col items-center">
      <div className="flex w-full max-w-6xl flex-col gap-6 px-3 py-4 sm:px-4 sm:py-6 md:gap-8 md:py-8">
        <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background to-red-500/10 p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl sm:h-48 sm:w-48" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-red-500/10 blur-3xl sm:h-56 sm:w-56" />

          <div className="relative grid items-center gap-5 md:grid-cols-[1.1fr_320px] lg:grid-cols-[1.1fr_360px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 sm:gap-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  League Table & Fixtures
                </h1>

                <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  Current standings, completed results, and upcoming games for
                  the BAPE Beer Pong League.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 sm:flex sm:flex-wrap sm:gap-3 sm:pt-2">
                <StatPill label="Leader" value={leader.name} />
                <StatPill label="Played" value={completedFixtures.length} />
                <StatPill label="Upcoming" value={upcomingFixtures.length} />
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-4 rounded-full bg-red-500/20 blur-3xl" />

                <Image
                  src={BEERPONG_LEAGUE_LOGO}
                  alt="BAPE Beer Pong League logo"
                  width={360}
                  height={360}
                  priority
                  className="relative h-44 w-44 object-contain drop-shadow-2xl sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          <div className="rounded-xl border bg-background p-4 shadow-sm">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              League Leader
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Image
                src={leader.logo}
                alt={leader.name}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 object-contain"
              />

              <div className="min-w-0">
                <TeamName
                  code={leader.code}
                  className="truncate text-left font-semibold transition hover:text-red-600 hover:underline"
                />
                <p className="text-sm text-muted-foreground">
                  {leader.pts} points
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-4 shadow-sm">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Longest Win Streak
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Image
                src={longestWinStreak.logo}
                alt={longestWinStreak.name}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 object-contain"
              />

              <div className="min-w-0">
                <TeamName
                  code={longestWinStreak.code}
                  className="truncate text-left font-semibold transition hover:text-red-600 hover:underline"
                />
                <p className="text-sm text-muted-foreground">
                  {longestWinStreak.longestStreak} straight wins
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-4 shadow-sm sm:col-span-2 md:col-span-1">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Best Net Cups
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Image
                src={bestNetCups.logo}
                alt={bestNetCups.name}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 object-contain"
              />

              <div className="min-w-0">
                <TeamName
                  code={bestNetCups.code}
                  className="truncate text-left font-semibold transition hover:text-red-600 hover:underline"
                />
                <p className="text-sm text-muted-foreground">
                  {getNetCupsLabel(bestNetCups.netCups)} net cups
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              League Table
            </h2>

            <p className="text-sm text-muted-foreground">
              Ranked by points, then wins, then net cups.
            </p>
          </div>

          <BeerPongLeagueTable />

          <BeerPongPlayoffBracket />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Upcoming Games
              </h2>

              <p className="text-sm text-muted-foreground">
                Remaining fixtures still to be played.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {upcomingFixtures.length > 0 ? (
                upcomingFixtures.map((fixture) => (
                  <FixtureCard
                    key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                    fixture={fixture}
                  />
                ))
              ) : (
                <div className="rounded-xl border bg-background p-4 text-sm text-muted-foreground">
                  No upcoming games.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Completed Results
              </h2>

              <p className="text-sm text-muted-foreground">
                Games already played in the current season.
              </p>
            </div>

            <div className="flex max-h-[720px] flex-col gap-3 overflow-y-auto pr-1">
              {completedFixtures.map((fixture) => (
                <FixtureCard
                  key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                  fixture={fixture}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}