import { PersonProfileButton } from "@/components/entity/PersonProfileButton"
import type { AllTimeOlympicChampion } from "@/lib/data/olympics/all-time"
import { cn } from "@/lib/utils"

type AllTimeChampionsListProps = {
  champions: AllTimeOlympicChampion[]
}

export function AllTimeChampionsList({
  champions,
}: AllTimeChampionsListProps) {
  return (
    <div className="grid gap-3">
      {champions.map((champion, index) => (
        <ChampionCard
          key={champion.id}
          champion={champion}
          rank={index + 1}
        />
      ))}
    </div>
  )
}

function ChampionCard({
  champion,
  rank,
}: {
  champion: AllTimeOlympicChampion
  rank: number
}) {
  const isLeader = rank === 1

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-sm",
        isLeader && "bg-foreground/[0.03]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold tabular-nums",
            isLeader
              ? "border-foreground bg-foreground text-background shadow-sm"
              : "bg-muted/35 text-muted-foreground",
          )}
        >
          {rank}
        </span>

        <div className="min-w-0 flex-1">
          <PersonProfileButton
            bapeID={String(champion.id)}
            labelMode="full"
            className="max-w-full border-transparent bg-transparent px-0 shadow-none hover:bg-transparent hover:shadow-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {champion.wins.map((win) => (
              <span
                key={`${champion.id}-${win.year}-${win.country}`}
                className="rounded-full border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground"
              >
                {win.flag} {win.year}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Titles
          </p>
          <p className="text-2xl font-bold tabular-nums">
            {champion.championships}
          </p>
        </div>
      </div>
    </div>
  )
}
