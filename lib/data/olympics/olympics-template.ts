export type OlympicStanding = {
  name: string
  logo?: string
  gold: number
  silver: number
  bronze: number
  pts: number
}

export type OlympicEvent = {
  id: string
  name: string
  emoji: string
  winner?: string
  status?: "completed" | "upcoming" | "cancelled"
}

export type OlympicPageData = {
  title: string
  date: string
  location: string
  imageOfTheDay: string
  description: string
  host?: string
  mvp?: string
  winner?: string
  standings: OlympicStanding[]
  events: OlympicEvent[]
}

export const OLYMPICS_2026_DATA: OlympicPageData = {
  title: "Bape Olympics 2026",
  date: "TBA 2026",
  location: "Perth, Western Australia",
  imageOfTheDay: "https://i.postimg.cc/example/image-of-the-day.png",
  description:
    "The official hub for the 2026 Bape Olympics, including standings, events, highlights, and results.",
  host: "TBA",
  mvp: "TBA",
  winner: "Let the games begin.",

  standings: [
    {
      name: "Germany",
      logo: "https://i.postimg.cc/example/germany.png",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "Norway",
      logo: "https://i.postimg.cc/example/norway.png",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
  ],

  events: [
    {
      id: "beer-pong",
      name: "Beer Pong",
      emoji: "🍺",
      status: "upcoming",
    },
    {
      id: "basketball",
      name: "Basketball",
      emoji: "🏀",
      status: "upcoming",
    },
    {
      id: "pool",
      name: "Pool",
      emoji: "🎱",
      status: "upcoming",
    },
    {
      id: "sprint",
      name: "Sprint",
      emoji: "🏃",
      status: "upcoming",
    },
  ],
}