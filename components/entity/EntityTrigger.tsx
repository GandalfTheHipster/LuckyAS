"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { XIcon } from "lucide-react"

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
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "cursor-pointer text-left underline-offset-4 transition hover:underline focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className ?? "font-medium",
        )}
      >
        {children}
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpen(false)
              }}
            >
              <div
                className="relative grid max-h-[86vh] w-full max-w-2xl overflow-hidden rounded-2xl border bg-background shadow-2xl"
                role="dialog"
                aria-label={title}
                aria-modal="true"
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-muted-foreground shadow-sm ring-offset-background transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Close profile"
                >
                  <XIcon className="size-4" />
                </button>

                <div className="max-h-[86vh] overflow-y-auto p-5 sm:p-6">
                  {type === "team" ? (
                    <TeamModalContent teamCode={id} />
                  ) : (
                    <PersonModalContent personId={id} />
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
