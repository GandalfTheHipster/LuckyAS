export type LeagueTeam = {
  name: string
  logo: string
  mp: number
  pts: number
  w: number
  l: number
  netCups: number
  players: number[] // 👈 new
}

export const BEERPONG_TEAMS: LeagueTeam[] = [
  {
    name: "Taplin BPC",
    logo: "https://i.postimg.cc/0jS7qSxq/taplin-bpc.png",
    mp: 7,
    pts: 18,
    w: 6,
    l: 1,
    netCups: 12,
    players: [2], // Kyle
  },
  {
    name: "Dempsey BPC",
    logo: "https://i.postimg.cc/7bvb1tpF/dempsey-bpc.png",
    mp: 7,
    pts: 15,
    w: 5,
    l: 2,
    netCups: 9,
    players: [6], // Thomas
  },
  {
    name: "Hart Beer Pong Club",
    logo: "https://i.postimg.cc/4386vZwj/hart-bpc.png",
    mp: 8,
    pts: 12,
    w: 4,
    l: 4,
    netCups: 5,
    players: [8], // Joseph
  },
  {
    name: "Kobe Beer Pong",
    logo: "https://i.postimg.cc/rmKSQbPs/kobe-bpc.png",
    mp: 7,
    pts: 9,
    w: 3,
    l: 4,
    netCups: -5,
    players: [9], // Noah
  },
  {
    name: "Turnbull City",
    logo: "https://i.postimg.cc/rwMxvzPv/turnbull-city-bpc.png",
    mp: 7,
    pts: 9,
    w: 3,
    l: 4,
    netCups: -7,
    players: [3], // Andrew
  },
  {
    name: "FCK",
    logo: "https://i.postimg.cc/Vv0dCPH9/fck-bpc.png",
    mp: 5,
    pts: 0,
    w: 0,
    l: 5,
    netCups: -7,
    players: [5], // Aleksa 😭
  },
]