import Image from "next/image"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { BEERPONG_FIXTURES } from "@/lib/data/BeerPong/BeerPongFixture"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

const teams = sortedTeams.map((team) => ({
  ...team,
  players: team.players
    .map((bapeID) => {
      const profile = Object.values(BAPE_PROFILES).find(
        (profile) => profile.bapeID === bapeID,
      )

      if (!profile) return null

      return {
        src: profile.avatarUrl,
        alt: `${profile.firstName} ${profile.lastName}`,
        name: `${profile.firstName} ${profile.lastName}`,
      }
    })
    .filter(Boolean),
}))

const completedFixtures = BEERPONG_FIXTURES.filter(
  (fixture) => fixture.status === "completed",
)

const upcomingFixtures = BEERPONG_FIXTURES.filter(
  (fixture) => fixture.status === "upcoming",
)

function getTeam(name: string) {
  return BEERPONG_TEAMS.find((team) => team.name === name)
}

function getNetCupsLabel(value: number) {
  if (value > 0) return `+${value}`
  return value.toString()
}

function getWinRate(wins: number, matchesPlayed: number) {
  if (matchesPlayed === 0) return "0%"
  return `${Math.round((wins / matchesPlayed) * 100)}%`
}

function getLongestWinStreak() {
  const streaks = BEERPONG_TEAMS.map((team) => ({
    name: team.name,
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
    const teamA = streaks.find((team) => team.name === fixture.teamA)
    const teamB = streaks.find((team) => team.name === fixture.teamB)

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

function TeamBadge({ name }: { name: string }) {
  const team = getTeam(name)

  return (
    <div className="flex min-w-0 items-center gap-2">
      {team?.logo ? (
        <Image
          src={team.logo}
          alt={name}
          width={34}
          height={34}
          className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
        />
      ) : (
        <div className="h-8 w-8 shrink-0 rounded-full border bg-muted sm:h-9 sm:w-9" />
      )}

      <span className="min-w-0 truncate text-xs font-medium sm:text-sm">
        {name}
      </span>
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
      <p className="text-sm font-semibold sm:text-base">{value}</p>
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
        <TeamBadge name={fixture.teamA} />

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
          <TeamBadge name={fixture.teamB} />
        </div>
      </div>
    </div>
  )
}

function TeamMobileCard({
  team,
  rank,
}: {
  team: (typeof teams)[number]
  rank: number
}) {
  const isLeader = rank === 1

  return (
    <div
      className={
        isLeader
          ? "rounded-2xl border bg-red-500/5 p-4 shadow-sm"
          : "rounded-2xl border bg-background p-4 shadow-sm"
      }
    >
      <div className="flex items-start gap-3">
        <div
          className={
            isLeader
              ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white"
              : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-semibold"
          }
        >
          {rank}
        </div>

        <Image
          src={team.logo}
          alt={team.name}
          width={52}
          height={52}
          className="h-12 w-12 shrink-0 object-contain"
        />

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate font-semibold">{team.name}</p>

            {isLeader && (
              <span className="shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600 dark:text-red-400">
                Leader
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {team.w}W / {team.l}L
          </p>
        </div>

        <div className="text-right">
          <p className="text-[11px] uppercase text-muted-foreground">PTS</p>
          <p className="text-2xl font-bold tabular-nums">{team.pts}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-lg border bg-muted/40 px-2 py-2">
          <p className="text-[10px] uppercase text-muted-foreground">MP</p>
          <p className="text-sm font-semibold tabular-nums">{team.mp}</p>
        </div>

        <div className="rounded-lg border bg-muted/40 px-2 py-2">
          <p className="text-[10px] uppercase text-muted-foreground">W</p>
          <p className="text-sm font-semibold tabular-nums">{team.w}</p>
        </div>

        <div className="rounded-lg border bg-muted/40 px-2 py-2">
          <p className="text-[10px] uppercase text-muted-foreground">Win %</p>
          <p className="text-sm font-semibold tabular-nums">
            {getWinRate(team.w, team.mp)}
          </p>
        </div>

        <div className="rounded-lg border bg-muted/40 px-2 py-2">
          <p className="text-[10px] uppercase text-muted-foreground">Net</p>
          <p
            className={
              team.netCups > 0
                ? "text-sm font-semibold tabular-nums text-green-600 dark:text-green-400"
                : team.netCups < 0
                  ? "text-sm font-semibold tabular-nums text-red-600 dark:text-red-400"
                  : "text-sm font-semibold tabular-nums text-muted-foreground"
            }
          >
            {getNetCupsLabel(team.netCups)}
          </p>
        </div>
      </div>

      {team.players.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {team.players.map((player) => (
            <div
              key={player?.alt}
              className="flex min-w-0 items-center gap-2 rounded-full border bg-background px-2 py-1"
            >
              {player?.src && (
                <Image
                  src={player.src}
                  alt={player.alt}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}

              <span className="max-w-32 truncate text-xs text-muted-foreground">
                {player?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LeagueTable() {
  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {teams.map((team, index) => (
          <TeamMobileCard key={team.name} team={team} rank={index + 1} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border bg-background shadow-sm md:block">
        <div className="border-b bg-muted/40 px-4 py-3">
          <div className="grid grid-cols-[48px_1.8fr_1fr_64px_64px_64px_64px_90px_90px] items-center gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground max-lg:grid-cols-[42px_1.8fr_64px_64px_64px_80px]">
            <div>#</div>
            <div>Club</div>
            <div className="max-lg:hidden">Player</div>
            <div className="text-center">MP</div>
            <div className="text-center">W</div>
            <div className="text-center max-lg:hidden">L</div>
            <div className="text-center max-lg:hidden">Net</div>
            <div className="text-center">Win %</div>
            <div className="text-right">PTS</div>
          </div>
        </div>

        <div className="divide-y">
          {teams.map((team, index) => {
            const rank = index + 1
            const isLeader = rank === 1

            return (
              <div
                key={team.name}
                className={
                  isLeader
                    ? "grid grid-cols-[48px_1.8fr_1fr_64px_64px_64px_64px_90px_90px] items-center gap-3 bg-red-500/5 px-4 py-4 transition hover:bg-red-500/10 max-lg:grid-cols-[42px_1.8fr_64px_64px_64px_80px]"
                    : "grid grid-cols-[48px_1.8fr_1fr_64px_64px_64px_64px_90px_90px] items-center gap-3 px-4 py-4 transition hover:bg-muted/40 max-lg:grid-cols-[42px_1.8fr_64px_64px_64px_80px]"
                }
              >
                <div>
                  <div
                    className={
                      isLeader
                        ? "flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white"
                        : "flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-semibold"
                    }
                  >
                    {rank}
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={52}
                    height={52}
                    className="h-12 w-12 shrink-0 object-contain"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold">{team.name}</p>

                      {isLeader && (
                        <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600 dark:text-red-400">
                          Leader
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {team.w}W / {team.l}L
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 max-lg:hidden">
                  {team.players.map((player) => (
                    <div
                      key={player?.alt}
                      className="flex min-w-0 items-center gap-2"
                    >
                      {player?.src && (
                        <Image
                          src={player.src}
                          alt={player.alt}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      )}

                      <span className="truncate text-sm text-muted-foreground">
                        {player?.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm font-medium tabular-nums">
                  {team.mp}
                </div>

                <div className="text-center text-sm font-medium tabular-nums">
                  {team.w}
                </div>

                <div className="text-center text-sm font-medium tabular-nums max-lg:hidden">
                  {team.l}
                </div>

                <div
                  className={
                    team.netCups > 0
                      ? "text-center text-sm font-semibold tabular-nums text-green-600 dark:text-green-400 max-lg:hidden"
                      : team.netCups < 0
                        ? "text-center text-sm font-semibold tabular-nums text-red-600 dark:text-red-400 max-lg:hidden"
                        : "text-center text-sm font-semibold tabular-nums text-muted-foreground max-lg:hidden"
                  }
                >
                  {getNetCupsLabel(team.netCups)}
                </div>

                <div className="text-center">
                  <span className="rounded-full border bg-muted px-2 py-1 text-xs font-medium tabular-nums">
                    {getWinRate(team.w, team.mp)}
                  </span>
                </div>

                <div className="text-right text-xl font-bold tabular-nums">
                  {team.pts}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function BapeLeagueTablePage() {
  const leader = teams[0]
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
                <p className="truncate font-semibold">{leader.name}</p>
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
                <p className="truncate font-semibold">
                  {longestWinStreak.name}
                </p>
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
                <p className="truncate font-semibold">{bestNetCups.name}</p>
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

          <LeagueTable />

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