import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import {
  getOlympicCountry,
  OLYMPIC_COUNTRIES,
} from "@/lib/data/olympics/countries"

type CountryModalContentProps = {
  countryId: string
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

export function CountryModalContent({ countryId }: CountryModalContentProps) {
  const country =
    getOlympicCountry(countryId) ??
    OLYMPIC_COUNTRIES.find((country) => country.name === countryId)

  if (!country) {
    return (
      <div className="pr-10">
        <h2 className="text-xl font-semibold">Country not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No Olympic country exists for: {countryId}
        </p>
      </div>
    )
  }

  const members = BAPE_PROFILES.filter((profile) =>
    profile.country.includes(country.flag),
  )

  const medalTableEntries = olympicsArchive
    .map((olympics) => {
      const medalTableEntry = olympics.medalTable.find(
        (entry) => entry.name === country.name,
      )

      if (!medalTableEntry) return null

      return {
        title: olympics.title,
        year: olympics.date,
        rank:
          olympics.medalTable.findIndex((entry) => entry.name === country.name) +
          1,
        medalTableEntry,
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

  const memberNames = new Set(
    members.map((member) => `${member.firstName} ${member.lastName}`),
  )

  const eventsWon = olympicsArchive.flatMap((olympics) => {
    const hasTeamEntry = olympics.medalTable.some(
      (entry) => entry.name === country.name,
    )

    if (!hasTeamEntry) return []

    return olympics.events
      .filter(
        (event) =>
          event.winner === country.name ||
          event.gold?.some((name) => memberNames.has(name)),
      )
      .map((event) => ({
        year: olympics.date,
        name: event.name,
        emoji: event.emoji,
        gold: event.gold ?? [],
      }))
  })

  const olympicsTitle = medalTableEntries[0]?.title ?? "Olympics"
  const finalRank = medalTableEntries[0]?.rank

  const totals = medalTableEntries.reduce(
    (total, entry) => ({
      gold: total.gold + entry.medalTableEntry.gold,
      silver: total.silver + entry.medalTableEntry.silver,
      bronze: total.bronze + entry.medalTableEntry.bronze,
      pts: total.pts + entry.medalTableEntry.pts,
    }),
    { gold: 0, silver: 0, bronze: 0, pts: 0 },
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 pr-10">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border bg-muted/35 text-5xl">
          {country.flag}
        </div>

        <div className="min-w-0 pt-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Olympic Team
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {country.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {olympicsTitle} · {eventsWon.length} event wins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Final Rank"
          value={finalRank ? formatRank(finalRank) : "TBA"}
        />
        <StatTile label="Gold" value={totals.gold} />
        <StatTile label="Silver" value={totals.silver} />
        <StatTile label="Bronze" value={totals.bronze} />
      </div>

      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Members
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {members.map((member) => (
            <PersonProfileButton
              key={member.bapeID}
              bapeID={String(member.bapeID)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Events Won
        </h3>

        {eventsWon.length > 0 ? (
          <div className="mt-3 grid gap-2">
            {eventsWon.map((event) => (
              <div
                key={`${event.year}-${event.name}`}
                className="rounded-xl border bg-background px-3 py-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">
                    <span className="mr-2">{event.emoji}</span>
                    {event.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{event.year}</p>
                </div>
                {event.gold.length > 0 ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.gold.join(", ")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No event wins recorded yet.
          </p>
        )}
      </div>
    </div>
  )
}

function formatRank(rank: number) {
  const suffix =
    rank % 100 >= 11 && rank % 100 <= 13
      ? "th"
      : rank % 10 === 1
        ? "st"
        : rank % 10 === 2
          ? "nd"
          : rank % 10 === 3
            ? "rd"
            : "th"

  return `${rank}${suffix}`
}
