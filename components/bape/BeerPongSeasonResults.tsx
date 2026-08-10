import Image from "next/image"

import { EntityTrigger } from "@/components/entity/EntityTrigger"
import { cn } from "@/lib/utils"
import type { BeerPongFixture } from "@/lib/data/beerpong/BeerPongFixture"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

const teamByCode = Object.fromEntries(
  BEERPONG_TEAMS.map((team) => [team.code, team]),
)

type CompletedFixture = BeerPongFixture & {
  scoreA: number
  scoreB: number
}

function isCompletedFixture(
  fixture: BeerPongFixture,
): fixture is CompletedFixture {
  return fixture.status === "completed" && fixture.scoreA !== null && fixture.scoreB !== null
}

function ArchiveTeam({
  code,
  winner,
  align = "left",
}: {
  code: string
  winner: boolean
  align?: "left" | "right"
}) {
  const team = teamByCode[code]

  if (!team) return null

  return (
    <EntityTrigger
      type="team"
      id={code}
      className={cn(
        "group flex min-w-0 items-center gap-2 hover:no-underline",
        align === "right" && "flex-row-reverse text-right",
      )}
    >
      <Image
        src={team.logo}
        alt={team.name}
        width={28}
        height={28}
        className="size-7 shrink-0 object-contain"
      />
      <span
        className={cn(
          "truncate text-sm font-medium transition group-hover:underline",
          winner && "font-semibold",
        )}
      >
        {team.shortName}
      </span>
    </EntityTrigger>
  )
}

function ResultLine({ fixture }: { fixture: CompletedFixture }) {
  const teamAWon = fixture.scoreA > fixture.scoreB
  const teamBWon = fixture.scoreB > fixture.scoreA

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-xl px-2 py-2.5 transition hover:bg-muted/70 sm:gap-3">
      <ArchiveTeam code={fixture.teamA} winner={teamAWon} align="right" />
      <div className="min-w-12 rounded-lg border bg-background px-2 py-1 text-center text-sm font-bold tabular-nums">
        {fixture.scoreA}–{fixture.scoreB}
      </div>
      <ArchiveTeam code={fixture.teamB} winner={teamBWon} />
    </div>
  )
}

export function BeerPongSeasonResults({
  fixtures,
}: {
  fixtures: BeerPongFixture[]
}) {
  const rounds = fixtures
    .filter(isCompletedFixture)
    .reduce<CompletedFixture[][]>((groups, fixture) => {
      const roundIndex = fixture.round - 1
      const currentRound = groups[roundIndex] ?? []
      currentRound.push(fixture)
      groups[roundIndex] = currentRound
      return groups
    }, [])
    .filter(Boolean)
    .map((round) => [...round].sort((a, b) => a.game - b.game))

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rounds.map((round, index) => (
        <section
          key={index}
          className="overflow-hidden rounded-2xl border bg-card shadow-sm"
        >
          <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
            <h3 className="text-sm font-semibold">Round {index + 1}</h3>
            <span className="text-xs text-muted-foreground">{round.length} matches</span>
          </div>
          <div className="divide-y px-2 py-1">
            {round.map((fixture) => (
              <ResultLine
                key={`${fixture.round}-${fixture.game}-${fixture.teamA}-${fixture.teamB}`}
                fixture={fixture}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
