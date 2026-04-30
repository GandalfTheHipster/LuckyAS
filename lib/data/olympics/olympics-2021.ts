import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"

export const OLYMPICS_2021_DATA: OlympicPageData = {
  title: "Bape Olympics 2021",
  date: "2021",
  location: "Rockingham",
  imageOfTheDay: "https://i.postimg.cc/JhNgyCnb/IMG-2088.jpg",
  description:
    "The 2021 Bape Olympics featured FIFA, pool, drinking, basketball, indoor soccer, handball, table tennis, chess, and trivia events.",

  host: "12 Seagate St, Safety Bay",
  mvp: "Jack Coleman",
  winner: "Yugoslavia",

  standings: [
    {
      name: "Cote d'Ivoire",
      gold: 12,
      silver: 2,
      bronze: 11,
      pts: 51,
    },
    {
      name: "Yugoslavia",
      gold: 10,
      silver: 8,
      bronze: 4,
      pts: 50,
    },
    {
      name: "Germany",
      gold: 2,
      silver: 13,
      bronze: 8,
      pts: 40,
    },
  ],

  events: [
    {
      id: "fifa-singles",
      name: "FIFA Singles",
      emoji: "🏟️",
      status: "completed",
      winner: "Priyen Moodley",
    },
    {
      id: "fifa-doubles",
      name: "FIFA Doubles",
      emoji: "🏟️",
      status: "completed",
      winner: "Cote d'Ivoire",
    },
    {
      id: "pool",
      name: "Pool",
      emoji: "🎱",
      status: "completed",
      winner: "Elvin Lamprecht",
    },
    {
      id: "drinking",
      name: "Drinking",
      emoji: "🍻",
      status: "completed",
      winner: "Yugoslavia",
    },
    {
      id: "basketball",
      name: "Basketball",
      emoji: "🏀",
      status: "completed",
      winner: "Yugoslavia",
    },
    {
      id: "indoor-soccer",
      name: "Indoor Soccer",
      emoji: "⚽️",
      status: "completed",
      winner: "Cote d'Ivoire",
    },
    {
      id: "handball",
      name: "Handball",
      emoji: "🎾",
      status: "completed",
      winner: "Daniel Morrell",
    },
    {
      id: "table-tennis",
      name: "Table Tennis",
      emoji: "🏓",
      status: "completed",
      winner: "Cote d'Ivoire",
    },
    {
      id: "chess",
      name: "Chess",
      emoji: "♟️",
      status: "completed",
      winner: "Jack Coleman",
    },
    {
      id: "individual-drinker",
      name: "Individual Drinker",
      emoji: "🍺",
      status: "completed",
      winner: "Aleksa Kvrgic",
    },
    {
      id: "trivia",
      name: "Trivia",
      emoji: "🙋‍♂️",
      status: "completed",
      winner: "Cote d'Ivoire",
    },
  ],
}