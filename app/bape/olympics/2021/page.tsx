import { OlympicsOverviewPage } from "@/components/bape/OlympicsEditionPages"
import { OLYMPICS_2021_DATA } from "@/lib/data/olympics/olympics-2021"

export default function Olympics2021Page() {
  return <OlympicsOverviewPage data={OLYMPICS_2021_DATA} />
}
