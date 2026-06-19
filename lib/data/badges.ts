import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

export type BapeBadge = {
  id: string
  name: string
  description: string
  imageUrl: string
}

export type PersonBadgeAssignment = {
  personName: string
  badgeId: string
  dateReceived: string
}

export const BAPE_BADGES: BapeBadge[] = [
  {
    id: "pistolshrimp",
    name: "Pistolshrimp",
    description: "A badge awarded for playing for the Pistolshrimps.",
    imageUrl: "https://i.postimg.cc/Pq8StZ5z/pistolshrimp.png",
  },
  {
    id: "olympicchampion_2021",
    name: "Ivory March",
    description: "A badge awarded for winning the 2021 Olympics with Cote D'Ivoire",
    imageUrl: "https://i.postimg.cc/htvC5NFY/ivorycoastchamps.png",
  },
  {
    id: "olympicchampion_2023",
    name: "Very Nice!",
    description: "A badge awarded for winning the 2023 Olympics with Kazakhstan",
    imageUrl: "https://i.postimg.cc/7ZRB8XwZ/kazak.png",
  },
]

// Current BAPE roster reference:
// 1 Jack Coleman
// 2 Kyle Taplin
// 3 Andrew Turnbull
// 4 Lucas Cinquina
// 5 Aleksa Kvrgic
// 6 Thomas Dempsey
// 7 Priyen Moodley
// 8 Joseph Hart
// 9 Noah Edge
// 10 Daniel Morrell
// 11 Todd Williams
// 12 Elvin Lamprecht
// 13 Sam Collings
// 14 Cian Bye
// 15 Brady Swift

export const PERSON_BADGE_ASSIGNMENTS: PersonBadgeAssignment[] = [
  {
    personName: "Noah Edge",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Elvin Lamprecht",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Andrew Turnbull",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Daniel Morrell",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Jack Coleman",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Thomas Dempsey",
    badgeId: "pistolshrimp",
    dateReceived: "2021-10-19",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Andrew Turnbull",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Lucas Cinquina",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Jack Coleman",
    badgeId: "olympicchampion_2021",
    dateReceived: "2021-09-27",
  },
  {
    personName: "Kyle Taplin",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Aleksa Kvrgic",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Elvin Lamprecht",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
  {
    personName: "Brady Swift",
    badgeId: "olympicchampion_2023",
    dateReceived: "2023-11-27",
  },
]

export function getBadgesForPerson(bapeID: number) {
  const fullName = getPersonNameByBapeID(bapeID)
  const assignments = PERSON_BADGE_ASSIGNMENTS.filter(
    (assignment) => assignment.personName === fullName,
  )

  return assignments
    .map((assignment) => {
      const badge = BAPE_BADGES.find((item) => item.id === assignment.badgeId)

      if (!badge) return null

      return {
        ...badge,
        dateReceived: assignment.dateReceived,
      }
    })
    .filter((badge): badge is BapeBadge & { dateReceived: string } =>
      Boolean(badge),
    )
}

function getPersonNameByBapeID(bapeID: number) {
  const profile = BAPE_PROFILES.find((item) => item.bapeID === bapeID)

  return profile ? `${profile.firstName} ${profile.lastName}` : null
}
