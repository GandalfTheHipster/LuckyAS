"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  BapeSortableHeader,
  BapeSortableTable,
} from "@/components/bape/BapeSortableTable"
import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
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
              "grid size-8 place-items-center rounded-full border text-sm font-semibold tabular-nums",
              row.index === 0
                ? "border-foreground bg-foreground text-background shadow-sm"
                : "bg-background text-foreground",
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
          <PersonProfileButton
            bapeID={String(row.original.id)}
            className="max-w-[220px] border-transparent bg-transparent px-0 shadow-none hover:bg-transparent hover:shadow-none"
          />
        ),
      },
      {
        accessorKey: "teams",
        header: "Teams",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex min-w-[150px] flex-wrap gap-1.5">
            {row.original.teams.map((team) => (
              <CountryProfileButton
                key={`${row.original.id}-${team}`}
                country={team}
                compact
                className="px-2.5 py-1"
              />
            ))}
          </div>
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
      {
        accessorKey: "medals",
        header: ({ column }) => (
          <BapeSortableHeader label="Medals" column={column} align="right" />
        ),
        cell: ({ row }) => <StrongNumber value={row.original.medals} />,
      },
    ],
    [],
  )

  return (
    <BapeSortableTable
      data={athletes}
      columns={columns}
      initialSort={[{ id: "points", desc: true }]}
      getRowKey={(athlete) => String(athlete.id)}
      isHighlighted={(_, index) => index === 0}
    />
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
          "inline-flex min-w-11 items-center justify-end gap-2 rounded-full border bg-background px-2.5 py-1 text-sm font-semibold tabular-nums",
          tone === "gold" && "border-yellow-500/25",
          tone === "silver" && "border-zinc-400/25",
          tone === "bronze" && "border-orange-700/25",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full",
            tone === "gold" && "bg-yellow-400",
            tone === "silver" && "bg-zinc-300",
            tone === "bronze" && "bg-orange-700",
          )}
        />
        {value}
      </span>
    </div>
  )
}
