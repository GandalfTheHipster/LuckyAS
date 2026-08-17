import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"

export const OLYMPICS_2026_DATA: OlympicPageData = {
  title: "Bape Olympics 2026",
  date: "2026",
  startDate: "November 20th 2026",
  location: "Mundaring",
  imageOfTheDay: "https://i.postimg.cc/DySHpqn9/IMG-3906.jpg",
  // Add image links for the Images page here.
  images: [
    // {
    //   src: "https://example.com/olympics-photo.jpg",
    //   caption: "Photo caption",
    //   orientation: "landscape",
    // },
  ],
  highlights: [
    // {
    //   title: "Highlight title",
    //   description: "What happened.",
    //   imageSrc: "https://example.com/highlight-image.jpg",
    // },
  ],
  description: "",

  host: "Mundaring",
  captains: {
    "South Africa": "Noah Edge",
    Mongolia: "Joseph Hart",
    Brazil: "Aleksa Kvrgic",
    Scotland: "Elvin Lamprecht",
  },

  medalTable: [
    {
      name: "Mongolia",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "Scotland",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "South Africa",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
    {
      name: "Brazil",
      gold: 0,
      silver: 0,
      bronze: 0,
      pts: 0,
    },
  ],

  events: [],
}
