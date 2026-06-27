import type { ReactNode } from "react"

import {
  BapeHero,
  BapePageShell,
  BapePanel,
} from "@/components/bape/BapePageChrome"
import { OlympicsStatsNav } from "@/components/bape/OlympicsStatsNav"

export function OlympicsStatsFrame({ children }: { children: ReactNode }) {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-8">
        <BapeHero title="Bape Olympics Stats" variant="wordmark" />

        <BapePanel className="p-5 sm:p-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              All-time records
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              The archive for medals, titles, and future records.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Browse dynamic rankings generated from completed Bape Olympics
              results. Athlete medals and title counts stay tied to the event
              and edition data.
            </p>
          </div>
        </BapePanel>

        <OlympicsStatsNav />

        {children}
      </div>
    </BapePageShell>
  )
}
