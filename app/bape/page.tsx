import { BapeTable } from "@/components/ui/bape_table"

const columns = [
  { key: "name", label: "Name", align: "left" },
  { key: "pts", label: "PTS", align: "right" },
  { key: "gold", label: "Gold 🥇", align: "right" },
  { key: "silver", label: "Silver 🥈", align: "right" },
  { key: "bronze", label: "Bronze 🥉", align: "right" },
] as const

const athletes = [
  { name: "Aleksa Kvrgic", pts: 41, gold: 9, silver: 5, bronze: 4 },
  { name: "Jack Coleman", pts: 38, gold: 7, silver: 5, bronze: 7 },
  { name: "Andrew Turnbull", pts: 36, gold: 5, silver: 7, bronze: 7 },
  { name: "Daniel Morrell", pts: 33, gold: 5, silver: 6, bronze: 6 },
  { name: "Elvin Lamprecht", pts: 32, gold: 6, silver: 5, bronze: 4 },
  { name: "Kyle Taplin", pts: 31, gold: 7, silver: 3, bronze: 4 },
  { name: "Thomas Dempsey", pts: 30, gold: 3, silver: 7, bronze: 7 },
  { name: "Brady Swift", pts: 30, gold: 6, silver: 5, bronze: 2 },
  { name: "Joseph Hart", pts: 29, gold: 5, silver: 5, bronze: 4 },
  { name: "Lucas Cinquina", pts: 25, gold: 5, silver: 2, bronze: 6 },
  { name: "Cian Bye", pts: 24, gold: 4, silver: 3, bronze: 6 },
  { name: "Sam Collings", pts: 15, gold: 1, silver: 4, bronze: 4 },
  { name: "Priyen Moodley", pts: 14, gold: 3, silver: 2, bronze: 1 },
  { name: "Noah Edge", pts: 10, gold: 0, silver: 4, bronze: 2 },
  { name: "Todd Williams", pts: 8, gold: 0, silver: 3, bronze: 2 },
]

export default function Hello() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <BapeTable columns={columns} athletes={athletes} />
    </div>
  );
}