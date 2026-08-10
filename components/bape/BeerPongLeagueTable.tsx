import { TeamProfileButton } from "@/components/entity/TeamProfileButton"
import { BEERPONG_TEAMS } from "@/lib/data/beerpong/beerpong"

const finalStandings = [...BEERPONG_TEAMS].sort((a, b) => {
  if (b.pts !== a.pts) return b.pts - a.pts
  if (b.w !== a.w) return b.w - a.w
  return b.netCups - a.netCups
})

function netCupsLabel(value: number) {
  return value > 0 ? `+${value}` : value.toString()
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={
        rank === 1
          ? "grid size-7 place-items-center rounded-full bg-foreground text-xs font-bold text-background"
          : "grid size-7 place-items-center rounded-full border bg-background text-xs font-semibold"
      }
    >
      {rank}
    </span>
  )
}

function Stat({ label, value, positive = false }: { label: string; value: string | number; positive?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/50 px-2 py-1.5 text-center">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={
          positive
            ? "mt-0.5 text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400"
            : "mt-0.5 text-sm font-semibold tabular-nums"
        }
      >
        {value}
      </p>
    </div>
  )
}

export function BeerPongLeagueTable() {
  return (
    <>
      <div className="grid gap-2 md:hidden">
        {finalStandings.map((team, index) => {
          const rank = index + 1

          return (
            <article
              key={team.code}
              className={
                rank === 1
                  ? "rounded-xl border bg-muted/35 p-3"
                  : "rounded-xl border bg-card p-3"
              }
            >
              <div className="flex items-center gap-3">
                <RankBadge rank={rank} />
                <TeamProfileButton
                  code={team.code}
                  compact
                  labelMode="full"
                  showMeta={false}
                  className="min-w-0 flex-1"
                />
                <div className="text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Pts
                  </p>
                  <p className="text-xl font-bold tabular-nums">{team.pts}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                <Stat label="P" value={team.mp} />
                <Stat label="W" value={team.w} />
                <Stat label="L" value={team.l} />
                <Stat label="Net" value={netCupsLabel(team.netCups)} positive={team.netCups > 0} />
              </div>
            </article>
          )
        })}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="border-b text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="w-14 px-3 py-3">#</th>
              <th className="px-3 py-3">Club</th>
              <th className="w-16 px-3 py-3 text-right">P</th>
              <th className="w-16 px-3 py-3 text-right">W</th>
              <th className="w-16 px-3 py-3 text-right">L</th>
              <th className="w-20 px-3 py-3 text-right">Net</th>
              <th className="w-20 px-3 py-3 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {finalStandings.map((team, index) => {
              const rank = index + 1

              return (
                <tr
                  key={team.code}
                  className={
                    rank === 1
                      ? "border-b bg-muted/35 last:border-b-0"
                      : "border-b last:border-b-0"
                  }
                >
                  <td className="px-3 py-3"><RankBadge rank={rank} /></td>
                  <td className="min-w-[260px] px-3 py-3">
                    <TeamProfileButton
                      code={team.code}
                      compact
                      labelMode="full"
                      showMeta={false}
                      className="w-full"
                    />
                  </td>
                  <td className="px-3 py-3 text-right font-medium tabular-nums">{team.mp}</td>
                  <td className="px-3 py-3 text-right font-medium tabular-nums">{team.w}</td>
                  <td className="px-3 py-3 text-right font-medium tabular-nums">{team.l}</td>
                  <td
                    className={
                      team.netCups > 0
                        ? "px-3 py-3 text-right font-semibold tabular-nums text-emerald-700 dark:text-emerald-400"
                        : "px-3 py-3 text-right font-medium tabular-nums text-muted-foreground"
                    }
                  >
                    {netCupsLabel(team.netCups)}
                  </td>
                  <td className="px-3 py-3 text-right text-base font-bold tabular-nums">{team.pts}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
