import {
  BapeHero,
  BapePageShell,
  BapePanel,
} from "@/components/bape/BapePageChrome"

export default function Olympics2026Page() {
  return (
    <BapePageShell>
      <div className="flex flex-col gap-6">
        <BapeHero
          title="2026 Coming Soon"
          variant="wordmark"
        />

        <BapePanel className="p-6">
          <p className="text-sm leading-6 text-muted-foreground">
            Event list, teams, host details, and results will be added once the
            format is locked in.
          </p>
        </BapePanel>
      </div>
    </BapePageShell>
  )
}
