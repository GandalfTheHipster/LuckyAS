import Image from "next/image"
import Link from "next/link"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { OlympicsEditionCard } from "@/components/bape/OlympicsEditionCard"
import { Button } from "@/components/ui/button"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"
import { OLYMPICS_2023_DATA } from "@/lib/data/olympics/olympics-2023"
import { OLYMPICS_2026_DATA } from "@/lib/data/olympics/olympics-2026"

const editions = [
  {
    href: "/bape/olympics/2023",
    data: OLYMPICS_2023_DATA,
    status: "Complete",
    disabled: false,
    logo: {
      light: "https://i.postimg.cc/T16hcGMv/Black-Bape-Olympics2023.png",
      dark: "https://i.postimg.cc/J0LtQmVL/White-Bape-Olympics2023.png",
      alt: "Bape Olympics 2023 logo",
    },
  },
  {
    href: "/bape/olympics/2021",
    data: OLYMPICS_2021_DATA,
    status: "Complete",
    disabled: false,
    logo: {
      light:
        "https://i.postimg.cc/Kv1C5TNW/Bape-Olympics-Logo-Rockingham-Black.png",
      dark:
        "https://i.postimg.cc/hPN6ZGZh/Bape-Olympics-Rockingham-White.png",
      alt: "Bape Olympics Rockingham 2021 logo",
    },
  },
  {
    href: "/bape/olympics/2026",
    data: OLYMPICS_2026_DATA,
    status: "Upcoming",
    disabled: false,
  },
]

export default function OlympicsHubPage() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-10">
        <BapeHero
          title="Bape Olympics"
          variant="wordmark"
        />

        <section className="grid gap-5">
          <BapeSectionHeader
            title="All-Time Stats"
            description="Leaderboard, records, and future Olympics stats will live here."
          />

          <BapePanel className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-72">
                <Image
                  src={OLYMPICS_2023_DATA.imageOfTheDay}
                  alt="Bape Olympics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  All-Time Leaderboard
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The complete athlete ranking across every completed Olympics.
                </p>
                <Button asChild className="mt-6 w-fit">
                  <Link href="/bape/olympics/all-time">
                    View All-Time Stats
                  </Link>
                </Button>
              </div>
            </div>
          </BapePanel>
        </section>

        <section className="flex flex-col gap-6">
          <BapeSectionHeader
            title="Editions"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {editions.map((edition) => (
              <OlympicsEditionCard key={edition.href} {...edition} />
            ))}
          </div>
        </section>
      </div>
    </BapePageShell>
  )
}
