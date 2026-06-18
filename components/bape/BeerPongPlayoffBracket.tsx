import Image from "next/image"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"
import { TeamName } from "@/components/entity/TeamName"
import { TeamProfileButton } from "@/components/entity/TeamProfileButton"

type SeededTeam = (typeof BEERPONG_TEAMS)[number] & {
  seed: number
}

type BracketTeamSlotProps = {
  team?: SeededTeam
  label?: string
  note?: string
  isBye?: boolean
}

function sortTeamsForSeeding(): SeededTeam[] {
  return [...BEERPONG_TEAMS]
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts
      if (b.w !== a.w) return b.w - a.w
      if (b.netCups !== a.netCups) return b.netCups - a.netCups
      return a.name.localeCompare(b.name)
    })
    .map((team, index) => ({
      ...team,
      seed: index + 1,
    }))
}

function BracketTeamSlot({
  team,
  label = "TBD",
  note,
  isBye = false,
}: BracketTeamSlotProps) {
  if (!team) {
    return (
      <div className="flex min-h-16 items-center justify-between rounded-xl border border-dashed bg-muted/30 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {label}
          </p>

          {note && (
            <p className="truncate text-xs text-muted-foreground">{note}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        isBye
          ? "flex min-h-16 items-center justify-between gap-3 rounded-xl border bg-foreground/[0.03] px-3 py-2 shadow-sm"
          : "flex min-h-16 items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2 shadow-sm"
      }
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className={
            isBye
              ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background"
              : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-bold"
          }
        >
          {team.seed}
        </div>

        <TeamProfileButton
          code={team.code}
          compact
          showMeta={false}
          className="w-full min-w-0"
        />
      </div>

      {isBye && (
        <span className="shrink-0 rounded-full border bg-background px-2 py-1 text-[10px] font-semibold uppercase text-foreground">
          Bye
        </span>
      )}
    </div>
  )
}

function BracketMatch({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-card p-3 shadow-sm">
      <div className="mb-3">
        <p className="text-sm font-semibold">{title}</p>
      </div>

      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

export function BeerPongPlayoffBracket() {
  const seededTeams = sortTeamsForSeeding()

  const seed1 = seededTeams[0]
  const seed2 = seededTeams[1]
  const seed3 = seededTeams[2]
  const seed4 = seededTeams[3]
  const seed5 = seededTeams[4]
  const seed6 = seededTeams[5]

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            2025/2026 Playoff Bracket
          </h2>
        </div>

        <div className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
          6 Teams / Single Elimination
        </div>
      </div>

      <div className="rounded-[1.5rem] border bg-card p-4 shadow-sm md:p-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr] xl:items-start">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Quarter Finals
            </p>

            <BracketMatch title="Quarter Final 1">
                <BracketTeamSlot team={seed3} />
                <BracketTeamSlot team={seed6} />
              </BracketMatch>

            <div className="flex flex-col gap-4">
              <BracketMatch title="Quarter Final 2">
                <BracketTeamSlot team={seed4} />
                <BracketTeamSlot team={seed5} />
              </BracketMatch>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Semi Finals
            </p>

            <BracketMatch title="Semi Final 2">
              <BracketTeamSlot team={seed2} isBye />
              <BracketTeamSlot label="Winner of QF1" />
            </BracketMatch>

            <BracketMatch title="Semi Final 1">
              <BracketTeamSlot team={seed1} isBye />
              <BracketTeamSlot label="Winner of QF2" />
            </BracketMatch>
          </div>

          <div className="flex flex-col gap-4 xl:pt-[5.2rem]">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Grand Final
            </p>

            <BracketMatch title="Grand Final">
              <BracketTeamSlot label="Winner of SF1" />
              <BracketTeamSlot label="Winner of SF2" />
            </BracketMatch>

            {seed1 && (
              <div className="rounded-2xl border bg-foreground p-4 text-background shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-background/70">
                  Top Seed
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <Image
                    src={seed1.logo}
                    alt={seed1.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 object-contain"
                  />

                  <div className="min-w-0">
                    <TeamName
                      code={seed1.code}
                      className="truncate font-semibold text-background hover:underline"
                    />
                    <p className="text-sm text-background/75">
                      {seed1.code} · Seed 1
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
