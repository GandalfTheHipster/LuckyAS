export type OlympicCountry = {
  name: string
  flag: string
  aliases?: string[]
}

export const OLYMPIC_COUNTRIES: OlympicCountry[] = [
  {
    name: "Cote d'Ivoire",
    flag: "🇨🇮",
    aliases: ["Côte d'Ivoire", "Ivory Coast"],
  },
  {
    name: "Yugoslavia",
    flag: "🇷🇸",
    aliases: ["Serbia"],
  },
  {
    name: "Germany",
    flag: "🇩🇪",
  },
  {
    name: "Norway",
    flag: "🇳🇴",
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    aliases: ["Korea"],
  },
]

export function getOlympicCountry(value: string) {
  return OLYMPIC_COUNTRIES.find(
    (country) =>
      country.name === value ||
      country.flag === value ||
      country.aliases?.includes(value),
  )
}
