import { BapeTable } from "@/components/bape/bape_table"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

const columns = [
  { key: "avatarUrl", label: "", align: "center", type: "avatar" },
  { key: "name", label: "Name", align: "left" },
  { key: "country", label: "Teams", align: "center" },
  { key: "pts", label: "PTS", align: "right" },
  { key: "gold", label: "Gold 🥇", align: "right" },
  { key: "silver", label: "Silver 🥈", align: "right" },
  { key: "bronze", label: "Bronze 🥉", align: "right" },
] as const

const athletes = BAPE_PROFILES.map((profile) => ({
  name: `${profile.firstName} ${profile.lastName}`,
  avatarUrl: profile.avatarUrl,
  country: profile.country.join(" "),
  pts: profile.pointsAllTime,
  gold: profile.gold,
  silver: profile.silver,
  bronze: profile.bronze,
}))

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Olympics All-Time Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Total points and medal counts across all Olympics events.
          </p>
        </div>

        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <BapeTable columns={columns} athletes={athletes} />
        </div>
      </div>
    </div>
  )
}