import * as React from "react"
import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function LuckyASLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  )
}