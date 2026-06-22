"use client"

import Image from "next/image"
import { X } from "lucide-react"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import {
  BAPE_PROFILES,
  getBapeProfileAvatar,
} from "@/lib/data/BapeProfiles"
import { BEERPONG_FIXTURES } from "@/lib/data/beerpong/BeerPongFixture"

type BeerPongTeamModalProps = {
  teamCode: string | null
  onClose: () => void
}

function getNetCupsLabel(value: number) {
  if (value > 0) return `+${value}`
  return value.toString()
}

function getResultForTeam(
  fixture: (typeof BEERPONG_FIXTURES)[number],
  teamCode: string,
) {
  if (fixture.scoreA === null || fixture.scoreB === null) return null

  const isTeamA = fixture.teamA === teamCode
  const teamScore = isTeamA ? fixture.scoreA : fixture.scoreB
  const opponentScore = isTeamA ? fixture.scoreB : fixture.scoreA

  if (teamScore > opponentScore) return "W"
  if (teamScore < opponentScore) return "L"
  return "D"
}

function getOpponentCode(
  fixture: (typeof BEERPONG_FIXTURES)[number],
  teamCode: string,
) {
  return fixture.teamA === teamCode ? fixture.teamB : fixture.teamA
}

function getTeamByCode(code: string) {
  return BEERPONG_TEAMS.find((team) => team.code === code)
}

export function BeerPongTeamModal({
  teamCode,
  onClose,
}: BeerPongTeamModalProps) {
  if (!teamCode) return null

  const team = getTeamByCode(teamCode)

  if (!team) return null

  const players = team.players
    .map((bapeID) => {
      const profile = Object.values(BAPE_PROFILES).find(
        (profile) => profile.bapeID === bapeID,
      )

      if (!profile) return null

      return {
        src: getBapeProfileAvatar(profile),
        name: `${profile.firstName} ${profile.lastName}`,
      }
    })
    .filter(Boolean)

  const teamFixtures = BEERPONG_FIXTURES.filter(
    (fixture) => fixture.teamA === team.code || fixture.teamB === team.code,
  )

  const completedFixtures = teamFixtures
    .filter(
      (fixture) =>
        fixture.status === "completed" &&
        fixture.scoreA !== null &&
        fixture.scoreB !== null,
    )
    .sort((a, b) => {
      if (b.round !== a.round) return b.round - a.round
      return b.game - a.game
    })

  const upcomingFixtures = teamFixtures
    .filter((fixture) => fixture.status === "upcoming")
    .sort((a, b) => {
      if (a.round !== b.round) return a.round - b.round
      return a.game - b.game
    })

  const recentResults = completedFixtures.slice(0, 3)
  const nextFixture = upcomingFixtures[0]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 sm:items-center">
      <button
        type="button"
        aria-label="Close team modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-[1.5rem] border bg-card shadow-2xl">
        <div className="relative border-b bg-muted/35 p-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border bg-background/80 p-2 transition hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4 pr-12">
            <Image
              src={team.logo}
              alt={team.name}
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 object-contain"
            />

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {team.code}
              </p>
              <h2 className="truncate text-2xl font-bold tracking-tight">
                {team.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {team.shortName}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-xl border bg-muted/40 px-2 py-3">
              <p className="text-[10px] uppercase text-muted-foreground">MP</p>
              <p className="font-bold tabular-nums">{team.mp}</p>
            </div>

            <div className="rounded-xl border bg-muted/40 px-2 py-3">
              <p className="text-[10px] uppercase text-muted-foreground">W</p>
              <p className="font-bold tabular-nums">{team.w}</p>
            </div>

            <div className="rounded-xl border bg-muted/40 px-2 py-3">
              <p className="text-[10px] uppercase text-muted-foreground">L</p>
              <p className="font-bold tabular-nums">{team.l}</p>
            </div>

            <div className="rounded-xl border bg-muted/40 px-2 py-3">
              <p className="text-[10px] uppercase text-muted-foreground">PTS</p>
              <p className="font-bold tabular-nums">{team.pts}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border bg-muted/30 p-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Net Cups
            </p>
            <p
              className={
                team.netCups > 0
                  ? "text-lg font-bold tabular-nums text-green-600 dark:text-green-400"
                  : team.netCups < 0
                    ? "text-lg font-bold tabular-nums text-muted-foreground"
                    : "text-lg font-bold tabular-nums text-muted-foreground"
              }
            >
              {getNetCupsLabel(team.netCups)}
            </p>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Players</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {players.length > 0 ? (
                players.map((player) => (
                  <div
                    key={player?.name}
                    className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5"
                  >
                    {player?.src && (
                      <Image
                        src={player.src}
                        alt={player.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    )}

                    <span className="text-sm font-medium">{player?.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No players listed.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Recent Form</h3>

            <div className="mt-2 flex gap-2">
              {recentResults.length > 0 ? (
                recentResults.map((fixture) => {
                  const result = getResultForTeam(fixture, team.code)
                  const opponent = getTeamByCode(
                    getOpponentCode(fixture, team.code),
                  )

                  return (
                    <div
                      key={`${fixture.round}-${fixture.game}`}
                      className="flex flex-1 flex-col rounded-xl border bg-background p-3"
                    >
                      <span
                        className={
                          result === "W"
                            ? "mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10 text-xs font-bold text-green-700 dark:text-green-400"
                            : "mb-2 flex h-7 w-7 items-center justify-center rounded-full border bg-muted text-xs font-bold text-muted-foreground"
                        }
                      >
                        {result}
                      </span>

                      <p className="truncate text-xs text-muted-foreground">
                        vs {opponent?.shortName ?? getOpponentCode(fixture, team.code)}
                      </p>

                      <p className="text-sm font-semibold tabular-nums">
                        {fixture.teamA === team.code
                          ? `${fixture.scoreA}-${fixture.scoreB}`
                          : `${fixture.scoreB}-${fixture.scoreA}`}
                      </p>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  No completed games yet.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Next Game</h3>

            {nextFixture ? (
              <div className="mt-2 rounded-xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">
                  Round {nextFixture.round} · Game {nextFixture.game}
                </p>

                <p className="mt-1 font-semibold">
                  vs{" "}
                  {getTeamByCode(getOpponentCode(nextFixture, team.code))
                    ?.shortName ?? getOpponentCode(nextFixture, team.code)}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No upcoming game.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
