"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const items = [
  { href: "/bape/beerpong", label: "Playoffs" },
  { href: "/bape/beerpong/table", label: "League Table" },
  { href: "/bape/beerpong/schedule", label: "Schedule" },
]

export function BeerPongSectionNav() {
  const pathname = usePathname()

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
              isActive && "bg-foreground text-background hover:bg-foreground hover:text-background",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
