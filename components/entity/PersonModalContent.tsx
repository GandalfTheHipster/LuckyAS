import Image from "next/image"
import type { ReactNode } from "react"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import {
  BAPE_PROFILES,
  getBapeProfileAvatar,
} from "@/lib/data/BapeProfiles"
import { getBadgesForPerson } from "@/lib/data/badges"
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
  tone,
}: {
  label: string
  value: string | number
  tone?: "gold" | "silver" | "bronze"
}) {
  return (
    <div className="rounded-xl border bg-muted/35 p-3">
      <p
        className={[
          "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
          tone === "gold" ? "text-[#9a6500] dark:text-[#f8c75c]" : "",
          tone === "silver" ? "text-slate-600 dark:text-[#d8dde3]" : "",
          tone === "bronze" ? "text-[#8a4f18] dark:text-[#dfb582]" : "",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="mt-1 text-xl font-bold tabular-nums">{value}</p>
    </div>
  )
}

function StatSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
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
  const badges = getBadgesForPerson(profile.bapeID)

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
            emoji: event.emoji,
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
      medals: edition.medals.toSorted(
        (a, b) => getMedalSortValue(a.medal) - getMedalSortValue(b.medal),
      ),
    }
  })
  const hasBeerPongClub = beerPongTeams.length > 0
  const beerPongSection = (
    <BeerPongClubSection beerPongTeams={beerPongTeams} />
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 pr-10">
        <Image
          src={getBapeProfileAvatar(profile)}
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

      {hasBeerPongClub ? beerPongSection : null}

      <StatSection title="Olympics">
        {olympicTeams.length > 0 ? (
          <div className="grid gap-4">

            {olympicTeams.map((edition) => (
              <div
                key={edition.year}
                className="rounded-xl border bg-background p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-wrap items-center gap-3">
                    <p className="text-base font-semibold">
                      {edition.year} Olympics
                    </p>
                    {edition.country ? (
                      <CountryProfileButton
                        country={edition.country.name}
                        compact
                      />
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <StatTile
                    label="Gold"
                    value={edition.gold.length}
                    tone="gold"
                  />
                  <StatTile
                    label="Silver"
                    value={edition.silver.length}
                    tone="silver"
                  />
                  <StatTile
                    label="Bronze"
                    value={edition.bronze.length}
                    tone="bronze"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {edition.medals.map((medal) => (
                    <MedalPill
                      key={`${medal.event}-${medal.medal}`}
                      medal={medal.medal}
                      emoji={medal.emoji}
                      event={medal.event}
                    />
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
      </StatSection>

      <StatSection title="Badges">
        {badges.length > 0 ? (
          <div className="grid gap-3">
            {badges.map((badge) => (
              <div
                key={`${badge.id}-${badge.dateReceived}`}
                className="flex gap-3 rounded-xl border bg-background p-3"
              >
                <Image
                  src={badge.imageUrl}
                  alt={badge.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBadgeDate(badge.dateReceived)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No badges assigned yet.
          </p>
        )}
      </StatSection>

      {!hasBeerPongClub ? beerPongSection : null}
    </div>
  )
}

function MedalPill({
  medal,
  emoji,
  event,
}: {
  medal: string
  emoji: string
  event: string
}) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-1 font-semibold",
        medal === "Gold"
          ? "border-[#b47a00]/25 bg-[#f8c75c]/25 text-[#7a5100] dark:text-[#f8c75c]"
          : "",
        medal === "Silver"
          ? "border-black/10 bg-[#e5e7e9]/55 text-slate-700 dark:bg-[#d8dde3]/20 dark:text-[#d8dde3]"
          : "",
        medal === "Bronze"
          ? "border-[#7a3f16]/35 bg-[#8a4f18]/25 text-[#8a3f0f] dark:border-[#ff9b54]/30 dark:bg-[#7a3f16]/35 dark:text-[#ff9b54]"
          : "",
      ].join(" ")}
    >
      {emoji} {event}
    </span>
  )
}

function BeerPongClubSection({
  beerPongTeams,
}: {
  beerPongTeams: typeof BEERPONG_TEAMS
}) {
  return (
    <StatSection title="Beer Pong Club">
      {beerPongTeams.length > 0 ? (
        <div className="grid gap-3">
          {beerPongTeams.map((team) => (
            <TeamProfileButton
              key={team.code}
              code={team.code}
              meta={`${team.pts} pts · ${getBeerPongPlace(team.code)} place · ${team.w}-${team.l}`}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Not currently listed on a beer pong team.
        </p>
      )}
    </StatSection>
  )
}

function getMedalSortValue(medal: string) {
  if (medal === "Gold") return 0
  if (medal === "Silver") return 1
  if (medal === "Bronze") return 2
  return 3
}

function getBeerPongPlace(teamCode: string) {
  const standings = [...BEERPONG_TEAMS].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.w !== a.w) return b.w - a.w
    return b.netCups - a.netCups
  })
  const place =
    standings.findIndex((standing) => standing.code === teamCode) + 1

  if (place <= 0) return "N/A"

  return getOrdinal(place)
}

function getOrdinal(value: number) {
  if (value % 100 >= 11 && value % 100 <= 13) return `${value}th`

  switch (value % 10) {
    case 1:
      return `${value}st`
    case 2:
      return `${value}nd`
    case 3:
      return `${value}rd`
    default:
      return `${value}th`
  }
}

function formatBadgeDate(dateReceived: string) {
  const date = new Date(`${dateReceived}T00:00:00`)

  if (Number.isNaN(date.getTime())) return dateReceived

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}
