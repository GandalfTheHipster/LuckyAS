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

export type OlympicImage = {
  /** Paste the image link here. */
  src: string
  caption?: string
  orientation?: "landscape" | "portrait" | "square"
}

export type OlympicHighlight = {
  title: string
  description: string
  /** Optional image link for the highlight card. */
  imageSrc?: string
}

export type OlympicPageData = {
  title: string
  date: string
  startDate?: string
  location: string
  imageOfTheDay: string
  images?: Array<string | OlympicImage>
  highlights?: OlympicHighlight[]
  description: string
  host?: string
  mvp?: string
  winner?: string
  captains?: Record<string, string>
  medalTable: OlympicMedalTableEntry[]
  events: OlympicEvent[]
}
