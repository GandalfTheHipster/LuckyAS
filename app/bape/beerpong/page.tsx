import { BapeTable } from "@/components/ui/bape_table"

type LeagueTeam = {
  name: string
  logo: string
  mp: number
  pts: number
  w: number
  l: number
  netCups: number
}

const columns = [
  { key: "logo", label: "Team", align: "center", type: "avatar" },
  { key: "mp", label: "MP", align: "center" },
  { key: "pts", label: "PTS", align: "center" },
  { key: "w", label: "W", align: "center" },
  { key: "l", label: "L", align: "center" },
  { key: "netCups", label: "Net Cups", align: "center" },
] as const

const teams: LeagueTeam[] = [
  {
    name: "Taplin BPC",
    logo: "https://i.postimg.cc/0jS7qSxq/taplin-bpc.png",
    mp: 7,
    pts: 18,
    w: 6,
    l: 1,
    netCups: 12,
  },
  {
    name: "Dempsey BPC",
    logo: "https://i.postimg.cc/7bvb1tpF/dempsey-bpc.png",
    mp: 7,
    pts: 15,
    w: 5,
    l: 2,
    netCups: 9,
  },
  {
    name: "Hart Beer Pong Club",
    logo: "https://i.postimg.cc/4386vZwj/hart-bpc.png",
    mp: 8,
    pts: 12,
    w: 4,
    l: 4,
    netCups: 5,
  },
  {
    name: "Kobe Beer Pong",
    logo: "https://i.postimg.cc/rmKSQbPs/kobe-bpc.png",
    mp: 7,
    pts: 9,
    w: 3,
    l: 4,
    netCups: -5,
  },
  {
    name: "Turnbull City",
    logo: "https://i.postimg.cc/rwMxvzPv/turnbull-city-bpc.png",
    mp: 7,
    pts: 9,
    w: 3,
    l: 4,
    netCups: -7,
  },
  {
    name: "FCK",
    logo: "https://i.postimg.cc/Vv0dCPH9/fck-bpc.png",
    mp: 5,
    pts: 0,
    w: 0,
    l: 5,
    netCups: -7,
  },
]

export default function BapeLeagueTablePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-center text-lg font-medium">
        Bape Beer Pong League Table
      </h1>

      <BapeTable columns={columns} athletes={teams} />
    </main>
  )
}