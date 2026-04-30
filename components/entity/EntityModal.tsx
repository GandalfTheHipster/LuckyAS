"use client"

import { X } from "lucide-react"

import type { EntityType } from "@/components/entity/EntityTrigger"
import { TeamModalContent } from "@/components/entity/TeamModalContent"
import { PersonModalContent } from "@/components/entity/PersonModalContent"

type EntityModalProps = {
  type: EntityType
  id: string
  onClose: () => void
}

export function EntityModal({ type, id, onClose }: EntityModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-lg rounded-2xl border bg-background p-5 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {type === "team" && <TeamModalContent teamCode={id} />}
        {type === "person" && <PersonModalContent personId={id} />}
      </div>
    </div>
  )
}