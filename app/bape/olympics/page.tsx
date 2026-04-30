import Link from "next/link"

export default function Hello() {
  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Olympics Stats</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/bape/olympics/all-time"
          className="rounded-xl border p-5 transition hover:bg-muted"
        >
          <h2 className="text-lg font-medium">All-Time Stats</h2>
          <p className="text-sm text-muted-foreground">
            View the full all-time leaderboard.
          </p>
        </Link>

        <div className="cursor-not-allowed rounded-xl border p-5 opacity-50">
          <h2 className="text-lg font-medium">Olympics 2026 Stats</h2>
          <p className="text-sm text-muted-foreground">Coming soon.</p>
        </div>

        <div className="cursor-not-allowed rounded-xl border p-5 opacity-50">
          <h2 className="text-lg font-medium">Olympics 2023 Perth CBD Stats</h2>
          <p className="text-sm text-muted-foreground">Coming soon.</p>
        </div>

        <div className="cursor-not-allowed rounded-xl border p-5 opacity-50">
          <h2 className="text-lg font-medium">Olympics 2021 Rockingham Stats</h2>
          <p className="text-sm text-muted-foreground">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}