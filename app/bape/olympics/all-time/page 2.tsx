import { Suspense } from "react"

import { AllTimeLeaderboardTable } from "@/components/bape/AllTimeLeaderboardTable"
import {
  BapeHero,
  BapePageShell,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BAPE_PROFILES, type BapeProfile } from "@/lib/data/BapeProfiles"

const athletes = BAPE_PROFILES.map(toAllTimeAthlete).sort((a, b) => {
  if (b.points !== a.points) return b.points - a.points
  if (b.gold !== a.gold) return b.gold - a.gold
  if (b.silver !== a.silver) return b.silver - a.silver
  return b.bronze - a.bronze
})

export default function OlympicsAllTimePage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          eyebrow="Bape Olympics"
          title="All-Time Leaderboard"
          description="Every tracked athlete, medal, and point from the BAPE Olympics archive."
        />

        <section className="grid gap-6">
          <BapeSectionHeader
            eyebrow="Records"
            title="Medal Table"
            description="Sort by athlete, points, medals, or any podium finish."
          />
          <div className="overflow-x-auto">
            <Suspense fallback={null}>
              <AllTimeLeaderboardTable athletes={athletes} />
            </Suspense>
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}

function toAllTimeAthlete(profile: BapeProfile) {
  return {
    id: profile.bapeID,
    name: `${profile.firstName} ${profile.lastName}`,
    firstName: profile.firstName,
    teams: profile.country,
    points: profile.pointsAllTime,
    gold: profile.gold,
    silver: profile.silver,
    bronze: profile.bronze,
    medals: profile.gold + profile.silver + profile.bronze,
  }
}
