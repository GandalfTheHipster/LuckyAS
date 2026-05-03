export type LeagueTeam = {
  name: string // full name
  shortName: string
  code: string // use this in fixtures data
  logo: string
  mp: number
  pts: number
  w: number
  l: number
  netCups: number
  players: number[]
}

export const BEERPONG_TEAMS: LeagueTeam[] = [
  {
    name: "Dempsey BPC",
    shortName: "Dempsey",
    code: "DEM",
    logo: "https://i.postimg.cc/7bvb1tpF/dempsey-bpc.png",
    mp: 10,
    pts: 24,
    w: 8,
    l: 2,
    netCups: 14,
    players: [6], // Thomas
  },
  {
    name: "Taplin BPC",
    shortName: "Taplin",
    code: "TAP",
    logo: "https://i.postimg.cc/0jS7qSxq/taplin-bpc.png",
    mp: 10,
    pts: 24,
    w: 8,
    l: 2,
    netCups: 14,
    players: [2], // Kyle
  },
  {
    name: "Hart Beer Pong Club",
    shortName: "Hart",
    code: "HAR",
    logo: "https://i.postimg.cc/4386vZwj/hart-bpc.png",
    mp: 10,
    pts: 15,
    w: 5,
    l: 5,
    netCups: 8,
    players: [8], // Joseph
  },
  {
    name: "Turnbull City",
    shortName: "Turnbull",
    code: "TUR",
    logo: "https://i.postimg.cc/rwMxvzPv/turnbull-city-bpc.png",
    mp: 10,
    pts: 12,
    w: 4,
    l: 6,
    netCups: -9,
    players: [3], // Andrew
  },
  {
    name: "Kobe Beer Pong",
    shortName: "Kobe",
    code: "KOB",
    logo: "https://i.postimg.cc/rmKSQbPs/kobe-bpc.png",
    mp: 10,
    pts: 9,
    w: 3,
    l: 7,
    netCups: -10,
    players: [9], // Noah
  },
  {
    name: "Pong Club Kvrgic",
    shortName: "Kvrgic",
    code: "PCK",
    logo: "https://i.postimg.cc/VvrPxx4h/PCK.png",
    mp: 10,
    pts: 6,
    w: 2,
    l: 8,
    netCups: -7,
    players: [5], // Aleksa
  },
]