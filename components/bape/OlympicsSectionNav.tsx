"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type OlympicsSectionNavProps = {
  year: string
}

export function OlympicsSectionNav({ year }: OlympicsSectionNavProps) {
  const pathname = usePathname()
  const baseHref = `/bape/olympics/${year}`
  const items = [
    { href: baseHref, label: "Overview" },
    { href: `${baseHref}/medaltable`, label: "Medal Table" },
    { href: `${baseHref}/events`, label: "Events" },
  ]

  return (
    <nav className="flex flex-wrap gap-2 rounded-[1.5rem] border bg-card p-2 shadow-sm">
      {items.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
              isActive &&
                "bg-foreground text-background hover:bg-foreground hover:text-background",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
