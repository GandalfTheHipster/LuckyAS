"use client"

import { useState } from "react"

import { EntityModal } from "@/components/entity/EntityModal"
import { cn } from "@/lib/utils"

export type EntityType = "team" | "person"

type EntityTriggerProps = {
  type: EntityType
  id: string
  children: React.ReactNode
  className?: string
}

export function EntityTrigger({
  type,
  id,
  children,
  className,
}: EntityTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "cursor-pointer text-left underline-offset-4 transition hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className ?? "font-medium",
        )}
      >
        {children}
      </button>

      {open && (
        <EntityModal
          type={type}
          id={id}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
