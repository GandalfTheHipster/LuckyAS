import Link from "next/link"

export default function Hello() {
  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Olympics Stats
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse all-time records and individual Olympics results by year.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard
          href="/bape/olympics/all-time"
          title="All-Time Stats"
          description="View the full all-time leaderboard."
        />

        <StatsCard
          href="/bape/olympics/2026"
          title="Olympics 2026 Stats"
          description="View the 2026 Olympics results and standings."
        />

        <StatsCard
          href="/bape/olympics/2023"
          title="Olympics 2023 Perth CBD Stats"
          description="View the 2023 Perth CBD Olympics results and standings."
        />

        <StatsCard
          href="/bape/olympics/2021"
          title="Olympics 2021 Rockingham Stats"
          description="View the 2021 Rockingham Olympics results and standings."
        />
      </div>
    </div>
  )
}

function StatsCard({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border p-5 transition hover:-translate-y-0.5 hover:bg-muted hover:shadow-sm"
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}