"use client"

import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

type TeamPlayer = {
  id: number
}

function isTeamPlayer(player: TeamPlayer | null): player is TeamPlayer {
  return player !== null
}

const sortedTeams = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

const teams = sortedTeams.map((team) => ({
  ...team,
  players: team.players
    .map((bapeID): TeamPlayer | null => {
      const profile = Object.values(BAPE_PROFILES).find(
        (profile) => profile.bapeID === bapeID,
      )

      if (!profile) return null

      return {
        id: profile.bapeID,
      }
    })
    .filter(isTeamPlayer),
}))

function getNetCupsLabel(value: number) {
  if (value > 0) return `+${value}`
  return value.toString()
}

function getWinRate(wins: number, matchesPlayed: number) {
  if (matchesPlayed === 0) return "0%"
  return `${Math.round((wins / matchesPlayed) * 100)}%`
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
          ? "rounded-2xl border bg-foreground/[0.03] p-4 shadow-sm"
          : "rounded-2xl border bg-card p-4 shadow-sm"
      }
    >
      <div className="flex items-start gap-3">
        <div
          className={
            isLeader
              ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background"
              : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-semibold"
          }
        >
          {rank}
        </div>

        <div className="min-w-0 flex-1">
          <TeamProfileButton
            code={team.code}
            compact
          />

          {team.players.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {team.players.map((player) => (
                <PersonProfileButton
                  key={player.id}
                  bapeID={String(player.id)}
                  compact
                  className="max-w-full"
                />
              ))}
            </div>
          )}
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
          <p className="text-[10px] uppercase text-muted-foreground">L</p>
          <p className="text-sm font-semibold tabular-nums">{team.l}</p>
        </div>

        <div className="rounded-lg border bg-muted/40 px-2 py-2">
          <p className="text-[10px] uppercase text-muted-foreground">Net</p>
          <p
            className={
              team.netCups > 0
                ? "text-sm font-semibold tabular-nums text-green-600 dark:text-green-400"
                : team.netCups < 0
                  ? "text-sm font-semibold tabular-nums text-muted-foreground"
                  : "text-sm font-semibold tabular-nums text-muted-foreground"
            }
          >
            {getNetCupsLabel(team.netCups)}
          </p>
        </div>
      </div>
    </div>
  )
}

export function BeerPongLeagueTable() {
  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {teams.map((team, index) => (
          <TeamMobileCard key={team.code} team={team} rank={index + 1} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[1.5rem] border bg-card shadow-sm md:block">
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
                key={team.code}
                className={
                  isLeader
                    ? "grid grid-cols-[48px_1.8fr_1fr_64px_64px_64px_64px_90px_90px] items-center gap-3 bg-foreground/[0.03] px-4 py-4 transition hover:bg-foreground/[0.06] max-lg:grid-cols-[42px_1.8fr_64px_64px_64px_80px]"
                    : "grid grid-cols-[48px_1.8fr_1fr_64px_64px_64px_64px_90px_90px] items-center gap-3 px-4 py-4 transition hover:bg-muted/40 max-lg:grid-cols-[42px_1.8fr_64px_64px_64px_80px]"
                }
              >
                <div>
                  <div
                    className={
                      isLeader
                        ? "flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background"
                        : "flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-semibold"
                    }
                  >
                    {rank}
                  </div>
                </div>

                <TeamProfileButton
                  code={team.code}
                  className="min-w-0"
                />

                <div className="flex items-center gap-2 max-lg:hidden">
                  {team.players.map((player) => (
                    <PersonProfileButton
                      key={player.id}
                      bapeID={String(player.id)}
                      className="max-w-full"
                    />
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
                        ? "text-center text-sm font-semibold tabular-nums text-muted-foreground max-lg:hidden"
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
