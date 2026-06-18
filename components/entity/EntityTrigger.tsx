"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PersonModalContent } from "@/components/entity/PersonModalContent"
import { TeamModalContent } from "@/components/entity/TeamModalContent"
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
  const title = type === "team" ? "Team profile" : "Player profile"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-pointer text-left underline-offset-4 transition hover:underline focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className ?? "font-medium",
          )}
        >
          {children}
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="max-h-[min(760px,86vh)] overflow-y-auto p-5 sm:p-6">
          {type === "team" ? (
            <TeamModalContent teamCode={id} />
          ) : (
            <PersonModalContent personId={id} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
