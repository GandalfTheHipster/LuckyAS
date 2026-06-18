import Image from "next/image"

import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

type PersonModalContentProps = {
  personId: string
}

function StatTile({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-xl border bg-muted/35 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums">{value}</p>
    </div>
  )
}

export function PersonModalContent({ personId }: PersonModalContentProps) {
  const numericPersonId = Number(personId)

  const profile = BAPE_PROFILES.find(
    (profile) => profile.bapeID === numericPersonId,
  )

  const beerPongTeams = BEERPONG_TEAMS.filter((team) =>
    team.players.includes(numericPersonId),
  )

  if (!profile) {
    return (
      <div className="pr-10">
        <h2 className="text-xl font-semibold">Person not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No person exists for ID: {personId}
        </p>
      </div>
    )
  }

  const fullName = `${profile.firstName} ${profile.lastName}`
  const medalCount = profile.gold + profile.silver + profile.bronze
  const allTimeRank =
    [...BAPE_PROFILES]
      .sort((a, b) => b.pointsAllTime - a.pointsAllTime)
      .findIndex((person) => person.bapeID === profile.bapeID) + 1

  const primaryTeam = beerPongTeams[0]
  const winRate = primaryTeam?.mp
    ? Math.round((primaryTeam.w / primaryTeam.mp) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 pr-10">
        <Image
          src={profile.avatarUrl}
          alt={fullName}
          width={88}
          height={88}
          className="h-20 w-20 shrink-0 rounded-2xl border object-cover"
        />

        <div className="min-w-0 pt-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            BAPE Profile
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {fullName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            BAPE ID {profile.bapeID} · {profile.country.join(" ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="All-Time Rank" value={`#${allTimeRank}`} />
        <StatTile label="BAPE Points" value={profile.pointsAllTime} />
        <StatTile label="Medals" value={medalCount} />
        <StatTile label="Golds" value={profile.gold} />
        <StatTile label="Silver" value={profile.silver} />
        <StatTile label="Bronze" value={profile.bronze} />
        <StatTile label="Beer Pong W%" value={`${winRate}%`} />
        <StatTile label="Net Cups" value={primaryTeam?.netCups ?? "N/A"} />
      </div>

      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Beer Pong Club
        </h3>

        {beerPongTeams.length > 0 ? (
          <div className="mt-3 grid gap-3">
            {beerPongTeams.map((team) => (
              <TeamProfileButton
                key={team.code}
                code={team.code}
                meta={`${team.pts} pts · ${team.mp} matches · ${team.w}-${team.l}`}
              />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Not currently listed on a beer pong team.
          </p>
        )}
      </div>
    </div>
  )
}
