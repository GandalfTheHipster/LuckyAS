import Image from "next/image"
import { Medal, Sparkles, Trophy } from "lucide-react"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
  BapeSectionHeader,
} from "@/components/bape/BapePageChrome"
import { BeerPongPlayoffBracket } from "@/components/bape/BeerPongPlayoffBracket"
import { BeerPongSectionNav } from "@/components/bape/BeerPongSectionNav"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import {
  BEERPONG_2025_26_ARCHIVE,
  BEERPONG_2026_27_CLUBS,
} from "@/lib/data/beerpong/playoffs"

const BEERPONG_LEAGUE_LOGO =
  "https://i.postimg.cc/ZR6kb86T/beerponglogo.png"

export default function BeerPongPlayoffsPage() {
  const { champion, minorPremiers } = BEERPONG_2025_26_ARCHIVE

  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero
          title="Bape Beer Pong League"
          variant="wordmark"
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={BEERPONG_LEAGUE_LOGO}
              alt="Bape Beer Pong League logo"
              width={280}
              height={280}
              priority
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </div>
        </BapeHero>

        <BeerPongSectionNav />

        <section className="relative overflow-hidden rounded-[1.75rem] bg-foreground text-background shadow-sm">
          <div className="absolute -right-16 -top-16 size-64 rounded-full border border-background/10" />
          <div className="absolute -bottom-32 right-1/4 size-64 rounded-full border border-background/10" />
          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:p-10">
            <div className="max-w-2xl">
              <div className="flex w-fit items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-background/85">
                <Trophy className="size-3.5" aria-hidden="true" />
                2025–26 season honours
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Taplin BPC are 2026 champions.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-background/70 sm:text-base">
                Taplin BPC&apos;s 1–0 Grand Final win over Kobe Beer Pong delivered
                the playoff championship. Dempsey BPC finished the league
                season first to claim the minor premiership.
              </p>
            </div>

            <div className="grid gap-3">
              <HonourCard
                icon={<Trophy className="size-4" aria-hidden="true" />}
                label="Champions"
                team={champion}
                detail="Grand Final winner"
                priority
                champion
              />
              <HonourCard
                icon={<Medal className="size-4" aria-hidden="true" />}
                label="Minor premiers"
                team={minorPremiers}
                detail={`League leaders · ${minorPremiers.pts} pts`}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <BapeSectionHeader
            eyebrow="2025–26 season archive"
            title="The road to the title"
            description="Five knockout ties distilled into one champion. Winning teams are shown in black, with every official scoreline and player recorded below."
          />
          <BeerPongPlayoffBracket />
        </section>

        <BapePanel className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="size-4" aria-hidden="true" />
                Next season
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                2026–27 is on deck.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                A new campaign is waiting in the wings. The six returning clubs
                are ready to chase Taplin BPC and write the next chapter.
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {BEERPONG_2026_27_CLUBS.map((team) => (
                  <TeamProfileButton
                    key={team.code}
                    code={team.code}
                    labelMode="full"
                    showMeta={false}
                    className="w-full"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between border-t bg-muted/30 p-5 lg:border-l lg:border-t-0 lg:p-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Status
                </p>
                <p className="mt-2 text-xl font-semibold">Pre-season</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Teams locked in. Fixtures and format to follow.
                </p>
              </div>
              <p className="mt-8 border-t pt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Defending champions · Taplin BPC
              </p>
            </div>
          </div>
        </BapePanel>

      </div>
    </BapePageShell>
  )
}

function HonourCard({
  icon,
  label,
  team,
  detail,
  priority = false,
  champion = false,
}: {
  icon: React.ReactNode
  label: string
  team: (typeof BEERPONG_2025_26_ARCHIVE.champion)
  detail: string
  priority?: boolean
  champion?: boolean
}) {
  return (
    <div
      className={
        champion
          ? "flex items-center gap-3 rounded-2xl border border-[#9b7a35]/55 bg-[#9b7a35]/20 p-3.5 text-background shadow-sm"
          : "flex items-center gap-3 rounded-2xl border border-background/15 bg-background/10 p-3.5 backdrop-blur-sm"
      }
    >
      <Image
        src={team.logo}
        alt={team.name}
        width={52}
        height={52}
        priority={priority}
        className="size-12 shrink-0 object-contain"
      />
      <div className="min-w-0">
        <p
          className={
            champion
              ? "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/65"
              : "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/65"
          }
        >
          {icon}
          {label}
        </p>
        <p className="mt-1 truncate text-base font-semibold">{team.name}</p>
        <p
          className={
            champion
              ? "mt-0.5 truncate text-xs text-background/65"
              : "mt-0.5 truncate text-xs text-background/65"
          }
        >
          {detail}
        </p>
      </div>
    </div>
  )
}
