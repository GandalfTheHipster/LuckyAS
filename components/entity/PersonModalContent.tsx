import Image from "next/image"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { getOlympicCountry } from "@/lib/data/olympics/countries"

type PersonModalContentProps = {
  personId: string
}

const olympicsArchive = [OLYMPICS_2021_DATA, OLYMPICS_2023_DATA]

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
  const olympicEditions = olympicsArchive
    .map((olympics) => {
      const medals = olympics.events.flatMap((event) => {
        const results = [
          { medal: "Gold", names: event.gold ?? [] },
          { medal: "Silver", names: event.silver ?? [] },
          { medal: "Bronze", names: event.bronze ?? [] },
        ]

        return results
          .filter((result) => result.names.includes(fullName))
          .map((result) => ({
            event: event.name,
            medal: result.medal,
          }))
      })

      if (medals.length === 0) return null

      return {
        year: olympics.date,
        medals,
      }
    })
    .filter((edition): edition is NonNullable<typeof edition> =>
      Boolean(edition),
    )

  let countryIndex = 0
  const olympicTeams = olympicEditions.map((edition) => {
    const flag = profile.country[countryIndex] ?? profile.country[0]
    countryIndex += 1
    const country = flag ? getOlympicCountry(flag) : undefined
    const gold = edition.medals.filter((medal) => medal.medal === "Gold")
    const silver = edition.medals.filter((medal) => medal.medal === "Silver")
    const bronze = edition.medals.filter((medal) => medal.medal === "Bronze")

    return {
      ...edition,
      country,
      gold,
      silver,
      bronze,
      points: gold.length * 3 + silver.length * 2 + bronze.length,
    }
  })

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

      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Olympics
        </h3>

        {olympicTeams.length > 0 ? (
          <div className="mt-3 grid gap-3">
            {olympicTeams.map((edition) => (
              <div
                key={edition.year}
                className="rounded-xl border bg-background p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {edition.year} Olympics
                    </p>
                    {edition.country ? (
                      <div className="mt-2">
                        <CountryProfileButton
                          country={edition.country.name}
                          compact
                        />
                      </div>
                    ) : null}
                  </div>
                  <p className="text-lg font-bold tabular-nums">
                    {edition.points} pts
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <StatTile label="Gold" value={edition.gold.length} />
                  <StatTile label="Silver" value={edition.silver.length} />
                  <StatTile label="Bronze" value={edition.bronze.length} />
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {edition.medals.map((medal) => (
                    <span
                      key={`${medal.event}-${medal.medal}`}
                      className="rounded-full border bg-muted/40 px-2 py-1"
                    >
                      {medal.medal}: {medal.event}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No Olympics results recorded yet.
          </p>
        )}
      </div>
    </div>
  )
}
