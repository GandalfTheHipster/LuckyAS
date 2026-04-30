import { BapeTable } from "@/components/bape/bape_table"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

const columns = [
  {
    key: "logo",
    label: "Team",
    align: "center",
    type: "avatar",
    rounded: false,
    size: 44,
  },
  {
    key: "players",
    label: "Player",
    align: "center",
    type: "avatars",
    rounded: true,
    size: 32,
  },
  { key: "mp", label: "MP", align: "center" },
  { key: "pts", label: "PTS", align: "center" },
  { key: "w", label: "W", align: "center" },
  { key: "l", label: "L", align: "center" },
  { key: "netCups", label: "Net Cups", align: "center" },
] as const

const teams = BEERPONG_TEAMS.map((team) => ({
  ...team,
  players: team.players
    .map((bapeID) => {
      const profile = Object.values(BAPE_PROFILES).find(
        (profile) => profile.bapeID === bapeID
      )

      if (!profile) return null

      return {
        src: profile.avatarUrl,
        alt: `${profile.firstName} ${profile.lastName}`,
      }
    })
    .filter(Boolean),
}))

export default function BapeLeagueTablePage() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bape Beer Pong League Table
          </h1>
          <p className="text-sm text-muted-foreground">
            Current standings for the Bape Beer Pong League, including teams,
            players, matches played, points, wins, losses, and net cups.
          </p>
        </div>

        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <BapeTable columns={columns} athletes={teams} />
        </div>
      </div>
    </main>
  )
}