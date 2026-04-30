import Image from "next/image"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong"

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
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {note && <p className="text-xs text-muted-foreground">{note}</p>}
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        isBye
          ? "flex min-h-16 items-center justify-between rounded-xl border bg-red-500/5 px-3 py-2 shadow-sm"
          : "flex min-h-16 items-center justify-between rounded-xl border bg-background px-3 py-2 shadow-sm"
      }
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={
            isBye
              ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
              : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-bold"
          }
        >
          {team.seed}
        </div>

        <Image
          src={team.logo}
          alt={team.name}
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 object-contain"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{team.name}</p>
          <p className="text-xs text-muted-foreground">
            {team.pts} pts · {team.w}W/{team.l}L ·{" "}
            {team.netCups > 0 ? `+${team.netCups}` : team.netCups} net
          </p>
        </div>
      </div>

      {isBye && (
        <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase text-red-600 dark:text-red-400">
          Bye
        </span>
      )}
    </div>
  )
}

function BracketMatch({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-background p-3 shadow-sm">
      <div className="mb-3">
        <p className="text-sm font-semibold">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
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
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Current Playoff Bracket
        </h2>
        <p className="text-sm text-muted-foreground">
          Single-elimination bracket generated from the current league table.
          Seeds are ranked by points, then wins, then net cups.
        </p>
      </div>

      <div className="rounded-3xl border bg-gradient-to-br from-background via-background to-red-500/5 p-4 shadow-sm md:p-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Quarter Finals
              </p>

              <div className="flex flex-col gap-4">
                <BracketMatch title="Quarter Final 1" subtitle="Seed 3 vs Seed 6">
                  <BracketTeamSlot team={seed3} />
                  <BracketTeamSlot team={seed6} />
                </BracketMatch>

                <BracketMatch title="Quarter Final 2" subtitle="Seed 4 vs Seed 5">
                  <BracketTeamSlot team={seed4} />
                  <BracketTeamSlot team={seed5} />
                </BracketMatch>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed bg-muted/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Byes
              </p>

              <div className="mt-3 flex flex-col gap-2">
                <BracketTeamSlot team={seed1} isBye />
                <BracketTeamSlot team={seed2} isBye />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Semi Finals
            </p>

            <BracketMatch title="Semi Final 1" subtitle="Seed 1 vs QF2 winner">
              <BracketTeamSlot team={seed1} isBye />
              <BracketTeamSlot label="Winner of QF2" note="Seed 4 vs Seed 5" />
            </BracketMatch>

            <BracketMatch title="Semi Final 2" subtitle="Seed 2 vs QF1 winner">
              <BracketTeamSlot team={seed2} isBye />
              <BracketTeamSlot label="Winner of QF1" note="Seed 3 vs Seed 6" />
            </BracketMatch>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Grand Final
            </p>

            <BracketMatch title="Grand Final" subtitle="Winner takes the league">
              <BracketTeamSlot label="Winner of SF1" />
              <BracketTeamSlot label="Winner of SF2" />
            </BracketMatch>

            <div className="rounded-2xl border bg-red-600 p-4 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Current Top Seed
              </p>

              <div className="mt-3 flex items-center gap-3">
                <Image
                  src={seed1.logo}
                  alt={seed1.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />

                <div>
                  <p className="font-semibold">{seed1.name}</p>
                  <p className="text-sm text-white/75">
                    Seed 1 · {seed1.pts} points
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-background/80 p-3 text-xs text-muted-foreground">
          Format: 6-team single elimination. Seeds 1 and 2 receive semi-final
          byes. Seed 3 plays Seed 6, and Seed 4 plays Seed 5.
        </div>
      </div>
    </section>
  )
}