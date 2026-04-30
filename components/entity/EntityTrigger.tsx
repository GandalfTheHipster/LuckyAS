"use client"

import { useState } from "react"

import { EntityModal } from "@/components/entity/EntityModal"

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
        className={
          className ??
          "text-left font-medium transition hover:text-red-600 hover:underline"
        }
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