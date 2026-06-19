"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  BapeSortableHeader,
  BapeSortableTable,
} from "@/components/bape/BapeSortableTable"
import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { cn } from "@/lib/utils"

export type AllTimeLeaderboardAthlete = {
  id: number
  name: string
  firstName: string
  teams: string[]
  points: number
  gold: number
  silver: number
  bronze: number
  medals: number
}

type AllTimeLeaderboardTableProps = {
  athletes: AllTimeLeaderboardAthlete[]
}

export function AllTimeLeaderboardTable({
  athletes,
}: AllTimeLeaderboardTableProps) {
  const columns = useMemo<ColumnDef<AllTimeLeaderboardAthlete>[]>(
    () => [
      {
        id: "rank",
        header: "#",
        enableSorting: false,
        cell: ({ row }) => (
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full border text-sm font-bold tabular-nums",
              row.index === 0
                ? "border-foreground bg-foreground text-background shadow-sm"
                : "bg-muted/35 text-muted-foreground",
            )}
          >
            {row.index + 1}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <BapeSortableHeader label="Athlete" column={column} />
        ),
        cell: ({ row }) => (
          <div className="min-w-[220px] max-w-[320px]">
            <PersonProfileButton
              bapeID={String(row.original.id)}
              labelMode="full"
              className="w-full justify-start border-transparent bg-transparent px-0 shadow-none hover:bg-transparent hover:shadow-none"
            />
          </div>
        ),
      },
      {
        accessorKey: "teams",
        header: "Teams",
        enableSorting: false,
        cell: ({ row }) => (
          <CountryFlagRow
            athleteId={row.original.id}
            teams={row.original.teams}
          />
        ),
      },
      {
        accessorKey: "points",
        header: ({ column }) => (
          <BapeSortableHeader label="PTS" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <StrongNumber value={row.original.points} className="text-2xl" />
        ),
      },
      {
        accessorKey: "gold",
        header: ({ column }) => (
          <BapeSortableHeader label="Gold" column={column} align="right" />
        ),
        cell: ({ row }) => <MedalCount value={row.original.gold} tone="gold" />,
      },
      {
        accessorKey: "silver",
        header: ({ column }) => (
          <BapeSortableHeader label="Silver" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <MedalCount value={row.original.silver} tone="silver" />
        ),
      },
      {
        accessorKey: "bronze",
        header: ({ column }) => (
          <BapeSortableHeader label="Bronze" column={column} align="right" />
        ),
        cell: ({ row }) => (
          <MedalCount value={row.original.bronze} tone="bronze" />
        ),
      },
    ],
    [],
  )

  return (
    <>
      <div className="grid gap-3 md:hidden">
        {athletes.map((athlete, index) => (
          <AthleteMobileCard
            key={athlete.id}
            athlete={athlete}
            rank={index + 1}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <BapeSortableTable
          data={athletes}
          columns={columns}
          initialSort={[{ id: "points", desc: true }]}
          getRowKey={(athlete) => String(athlete.id)}
          isHighlighted={(_, index) => index === 0}
        />
      </div>
    </>
  )
}

function AthleteMobileCard({
  athlete,
  rank,
}: {
  athlete: AllTimeLeaderboardAthlete
  rank: number
}) {
  const isLeader = rank === 1

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-sm",
        isLeader && "bg-foreground/[0.03]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold tabular-nums",
            isLeader
              ? "border-foreground bg-foreground text-background shadow-sm"
              : "bg-muted/35 text-muted-foreground",
          )}
        >
          {rank}
        </span>

        <div className="min-w-0 flex-1">
          <PersonProfileButton
            bapeID={String(athlete.id)}
            labelMode="full"
            className="max-w-full border-transparent bg-transparent px-0 shadow-none hover:bg-transparent hover:shadow-none"
          />
          <div className="mt-2">
            <CountryFlagRow athleteId={athlete.id} teams={athlete.teams} />
          </div>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            PTS
          </p>
          <p className="text-2xl font-bold tabular-nums">{athlete.points}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <MobileMedalStat label="Gold" value={athlete.gold} tone="gold" />
        <MobileMedalStat label="Silver" value={athlete.silver} tone="silver" />
        <MobileMedalStat label="Bronze" value={athlete.bronze} tone="bronze" />
      </div>
    </div>
  )
}

function CountryFlagRow({
  athleteId,
  teams,
}: {
  athleteId: number
  teams: string[]
}) {
  return (
    <div className="flex min-w-[96px] items-center gap-1.5 whitespace-nowrap text-xl leading-none">
      {teams.map((team) => (
        <EntityTrigger
          key={`${athleteId}-${team}`}
          type="country"
          id={team}
          className="rounded-md px-1 py-0.5 text-xl leading-none hover:bg-muted/50 hover:no-underline"
        >
          {team}
        </EntityTrigger>
      ))}
    </div>
  )
}

function StrongNumber({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "text-right text-lg font-semibold tabular-nums text-foreground",
        className,
      )}
    >
      {value}
    </div>
  )
}

function MedalCount({
  value,
  tone,
}: {
  value: number
  tone: "gold" | "silver" | "bronze"
}) {
  return (
    <div className="flex justify-end">
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full text-base font-bold tabular-nums text-neutral-950 shadow-sm ring-1 ring-inset",
          tone === "gold" && "bg-[#f8c75c] ring-[#b47a00]/35",
          tone === "silver" && "bg-[#e5e7e9] ring-black/10 dark:bg-[#d8dde3]",
          tone === "bronze" && "bg-[#9a5724] text-white ring-[#7a3f16]/40 dark:bg-[#b66a31]",
        )}
      >
        {value}
      </span>
    </div>
  )
}

function MobileMedalStat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "gold" | "silver" | "bronze"
}) {
  return (
    <div className="rounded-xl border bg-background p-3 text-center">
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
          tone === "gold" && "text-[#9a6500] dark:text-[#f8c75c]",
          tone === "silver" && "text-slate-600 dark:text-[#d8dde3]",
          tone === "bronze" && "text-[#9a5724] dark:text-[#d98a4b]",
        )}
      >
        {label}
      </p>
      <div className="mt-2 flex justify-center">
        <MedalCount value={value} tone={tone} />
      </div>
    </div>
  )
}
