export type OlympicMedalTableEntry = {
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

  gold?: string[]
  silver?: string[]
  bronze?: string[]
}

export type OlympicPageData = {
  title: string
  date: string
  location: string
  imageOfTheDay: string
  images?: string[]
  description: string
  host?: string
  mvp?: string
  winner?: string
  medalTable: OlympicMedalTableEntry[]
  events: OlympicEvent[]
}
