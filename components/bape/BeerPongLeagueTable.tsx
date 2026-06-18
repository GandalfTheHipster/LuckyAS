"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  BapeSortableHeader,
  BapeSortableTable,
} from "@/components/bape/BapeSortableTable"
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

type LeagueTeam = (typeof teams)[number]

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
            labelMode="short"
          />

          {team.players.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {team.players.map((player) => (
                <PersonProfileButton
                  key={player.id}
                  bapeID={String(player.id)}
                  compact
                  labelMode="first"
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
  const columns = useMemo<ColumnDef<LeagueTeam>[]>(
    () => [
      {
        id: "rank",
        header: "#",
        enableSorting: false,
        cell: ({ row }) => <RankBadge rank={row.index + 1} />,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <BapeSortableHeader label="Club" column={column} />
        ),
        cell: ({ row }) => (
          <TeamProfileButton
            code={row.original.code}
            labelMode="short"
            className="w-full min-w-0"
          />
        ),
      },
      {
        id: "player",
        header: "Player",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.players.map((player) => (
              <PersonProfileButton
                key={player.id}
                bapeID={String(player.id)}
                labelMode="first"
                className="max-w-40"
              />
            ))}
          </div>
        ),
      },
      {
        accessorKey: "mp",
        header: ({ column }) => (
          <BapeSortableHeader label="MP" column={column} align="right" />
        ),
        cell: ({ row }) => <NumberCell value={row.original.mp} />,
      },
      {
        accessorKey: "w",
        header: ({ column }) => (
          <BapeSortableHeader label="W" column={column} align="right" />
        ),
        cell: ({ row }) => <NumberCell value={row.original.w} />,
      },
      {
        accessorKey: "l",
        header: ({ column }) => (
          <BapeSortableHeader label="L" column={column} align="right" />
        ),
        cell: ({ row }) => <NumberCell value={row.original.l} />,
      },
      {
        accessorKey: "netCups",
        header: ({ column }) => (
          <BapeSortableHeader label="Net" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <NumberCell
            value={getNetCupsLabel(row.original.netCups)}
            positive={row.original.netCups > 0}
            muted={row.original.netCups <= 0}
          />
        ),
      },
      {
        accessorKey: "pts",
        header: ({ column }) => (
          <BapeSortableHeader label="PTS" column={column} align="right" />
        ),
        cell: ({ row }) => <NumberCell value={row.original.pts} strong />,
      },
    ],
    [],
  )

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {teams.map((team, index) => (
          <TeamMobileCard key={team.code} team={team} rank={index + 1} />
        ))}
      </div>

      <div className="hidden md:block">
        <BapeSortableTable
          data={teams}
          columns={columns}
          initialSort={[{ id: "pts", desc: true }]}
          getRowKey={(team) => team.code}
          isHighlighted={(_, index) => index === 0}
        />
      </div>
    </>
  )
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={
        rank === 1
          ? "grid size-8 place-items-center rounded-full bg-foreground text-sm font-semibold text-background"
          : "grid size-8 place-items-center rounded-full border bg-background text-sm font-semibold"
      }
    >
      {rank}
    </span>
  )
}

function NumberCell({
  value,
  strong,
  positive,
  muted,
}: {
  value: number | string
  strong?: boolean
  positive?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={
        positive
          ? "text-right text-sm font-semibold tabular-nums text-green-600 dark:text-green-400"
          : muted
            ? "text-right text-sm font-semibold tabular-nums text-muted-foreground"
            : strong
              ? "text-right text-base font-semibold tabular-nums"
              : "text-right text-sm font-medium tabular-nums"
      }
    >
      {value}
    </div>
  )
}
