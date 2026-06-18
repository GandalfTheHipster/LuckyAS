import {
  BapeHero,
  BapeMetricCard,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BapeTable } from "@/components/bape/bape_table"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

const columns = [
  { key: "avatarUrl", label: "", align: "center", type: "avatar" },
  { key: "name", label: "Name", align: "left" },
  { key: "country", label: "Teams", align: "center" },
  { key: "pts", label: "PTS", align: "right" },
  { key: "gold", label: "Gold", align: "right" },
  { key: "silver", label: "Silver", align: "right" },
  { key: "bronze", label: "Bronze", align: "right" },
] as const

const athletes = BAPE_PROFILES.map((profile) => ({
  name: `${profile.firstName} ${profile.lastName}`,
  avatarUrl: profile.avatarUrl,
  country: profile.country.join(" "),
  pts: profile.pointsAllTime,
  gold: profile.gold,
  silver: profile.silver,
  bronze: profile.bronze,
})).sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.gold !== a.gold) return b.gold - a.gold
  return b.silver - a.silver
})

const leader = athletes[0]
const mostGold = [...athletes].sort((a, b) => b.gold - a.gold)[0]
const totalMedals = athletes.reduce(
  (total, athlete) => total + athlete.gold + athlete.silver + athlete.bronze,
  0,
)

export default function OlympicsAllTimePage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          eyebrow="BAPE Olympics"
          title="All-Time Leaderboard"
          description="The long-running record book for BAPE Olympics athletes, combining points and medal counts across every tracked edition."
        >
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <BapeMetricCard
              label="Leader"
              value={leader?.name ?? "TBA"}
              detail={leader ? `${leader.pts} points` : undefined}
            />
            <BapeMetricCard
              label="Most Golds"
              value={mostGold?.name ?? "TBA"}
              detail={mostGold ? `${mostGold.gold} gold medals` : undefined}
            />
            <BapeMetricCard
              label="Total Medals"
              value={totalMedals}
              detail="Across all athletes"
            />
          </div>
        </BapeHero>

        <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <BapePanel className="p-6">
            <BapeSectionHeader
              eyebrow="How to read it"
              title="Points first, medals second"
              description="The table is sorted by all-time points, with medal counts included so big-event specialists and consistent performers both show up clearly."
            />
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>Gold, silver, and bronze are tracked from event podium data.</p>
              <p>
                Team names reflect the countries or squads each athlete has
                represented across editions.
              </p>
            </div>
          </BapePanel>

          <BapePanel className="overflow-hidden p-3 sm:p-4">
            <div className="mb-4 px-2">
              <BapeSectionHeader
                eyebrow="Leaderboard"
                title="Athlete records"
                description="Every profile ranked across the complete BAPE Olympics archive."
              />
            </div>
            <div className="overflow-x-auto">
              <BapeTable columns={columns} athletes={athletes} />
            </div>
          </BapePanel>
        </section>
      </div>
    </BapePageShell>
  )
}
