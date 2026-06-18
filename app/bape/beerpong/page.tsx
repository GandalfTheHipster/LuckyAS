import Image from "next/image"

import {
  BapeHero,
  BapeMetricCard,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongLeagueTable } from "@/components/bape/BeerPongLeagueTable"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { TeamName } from "@/components/entity/TeamName"
import { Badge } from "@/components/ui/badge"
import {
  BEERPONG_COMPLETED_FIXTURES,
  BEERPONG_FIXTURES,
  BEERPONG_UPCOMING_FIXTURES,
} from "@/lib/data/beerpong/BeerPongFixture"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

const completedFixtures = BEERPONG_COMPLETED_FIXTURES
const upcomingFixtures = BEERPONG_UPCOMING_FIXTURES
const seasonProgress = Math.round(
  (completedFixtures.length / BEERPONG_FIXTURES.length) * 100,
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

function TeamBadge({ code, align = "left" }: { code: string; align?: "left" | "right" }) {
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
        className="min-w-0 truncate text-sm font-medium transition hover:underline"
      />
    </div>
  )
}

function FixtureCard({
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
            className="font-medium text-foreground hover:underline"
          />
        </p>
      ) : null}
    </BapePanel>
  )
}

export default function BapeLeagueTablePage() {
  const leader = sortedTeams[0]
  const longestWinStreak = getLongestWinStreak()
  const bestNetCups = [...BEERPONG_TEAMS].sort(
    (a, b) => b.netCups - a.netCups,
  )[0]
  const recentResults = [...completedFixtures]
    .sort((a, b) => {
      if (b.round !== a.round) return b.round - a.round
      return b.game - a.game
    })
    .slice(0, 6)

  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          eyebrow="BAPE Beer Pong League"
          title="The league table, fixture list, and playoff picture in one place."
          description="Track every club, result, point swing, and bracket seed from the current BAPE Beer Pong League season."
        >
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-5 rounded-full bg-foreground/10 blur-3xl" />
              <Image
                src={BEERPONG_LEAGUE_LOGO}
                alt="BAPE Beer Pong League logo"
                width={320}
                height={320}
                priority
                className="relative h-52 w-52 object-contain drop-shadow-2xl sm:h-64 sm:w-64 lg:h-72 lg:w-72"
              />
            </div>
          </div>
        </BapeHero>

        <section className="grid gap-4 md:grid-cols-4">
          <BapeMetricCard
            label="Leader"
            value={leader.name}
            detail={`${leader.pts} points`}
          />
          <BapeMetricCard
            label="Progress"
            value={`${seasonProgress}%`}
            detail={`${completedFixtures.length} of ${BEERPONG_FIXTURES.length} fixtures`}
          />
          <BapeMetricCard
            label="Win Streak"
            value={longestWinStreak.shortName}
            detail={`${longestWinStreak.longestStreak} straight wins`}
          />
          <BapeMetricCard
            label="Best Net Cups"
            value={bestNetCups.shortName}
            detail={`${getNetCupsLabel(bestNetCups.netCups)} net cups`}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <BapeSectionHeader
              eyebrow="Standings"
              title="League Table"
              description="Ranked by points, then wins, then net cups. The table also drives the current playoff seeding."
            />
            <BeerPongLeagueTable />
          </div>

          <BapePanel className="p-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Season Notes
            </p>
            <div className="mt-5 space-y-5 text-sm leading-6 text-muted-foreground">
              <p>
                The league is currently led by {leader.name}, with{" "}
                {leader.pts} points from {leader.mp} matches.
              </p>
              <p>
                Playoff seeds are generated directly from the table, so points,
                wins, and net cups all matter.
              </p>
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-[0.2em]">
                  Remaining Fixtures
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {upcomingFixtures.length}
                </p>
              </div>
            </div>
          </BapePanel>
        </section>

        <BeerPongPlayoffBracket />

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <BapeSectionHeader
              eyebrow="Next"
              title="Upcoming Games"
              description="The next fixtures on the board."
            />

            <div className="flex flex-col gap-3">
              {upcomingFixtures.length > 0 ? (
                upcomingFixtures.map((fixture) => (
                  <FixtureCard
                    key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                    fixture={fixture}
                  />
                ))
              ) : (
                <BapePanel className="p-5 text-sm text-muted-foreground">
                  No upcoming games are currently listed.
                </BapePanel>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <BapeSectionHeader
              eyebrow="Recent"
              title="Latest Results"
              description="The most recent completed fixtures from the season."
            />

            <div className="grid gap-3">
              {recentResults.map((fixture) => (
                <FixtureCard
                  key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                  fixture={fixture}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
