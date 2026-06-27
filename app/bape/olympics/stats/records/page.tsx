import { BapePanel, BapeSectionHeader } from "@/components/bape/BapePageChrome"
import { OlympicsStatsFrame } from "@/components/bape/OlympicsStatsFrame"

export default function OlympicsFutureStatsPage() {
  return (
    <OlympicsStatsFrame>
      <section className="grid gap-6">
        <BapeSectionHeader
          title="Future Stats"
          description="A reserved home for upcoming Olympics records and deeper archive categories."
        />

        <BapePanel className="p-6">
          <p className="text-sm font-medium text-muted-foreground">
            More stats categories will appear here as the archive expands.
          </p>
        </BapePanel>
      </section>
    </OlympicsStatsFrame>
  )
}
