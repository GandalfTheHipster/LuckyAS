import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

type OlympicsEditionCardProps = {
  href: string
  data: OlympicPageData
  status: string
  disabled?: boolean
  logo?: {
    light: string
    dark: string
    alt: string
  }
}

export function OlympicsEditionCard({
  href,
  data,
  status,
  disabled = false,
  logo,
}: OlympicsEditionCardProps) {
  const card = (
    <>
      <div className="relative overflow-hidden p-4 pb-0">
        <div className="relative grid min-h-52 place-items-center overflow-hidden rounded-2xl border bg-muted/30">
          <Image
            src={data.imageOfTheDay}
            alt={data.title}
            fill
            className={cn(
              "object-cover opacity-25 blur-[2px] scale-105 transition duration-500",
              disabled ? "grayscale" : "group-hover:scale-110",
            )}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/45 dark:from-zinc-950/75 dark:via-zinc-900/55 dark:to-zinc-800/35" />
          {disabled ? (
            <Badge className="absolute left-4 top-4" variant="secondary">
              {status}
            </Badge>
          ) : null}
          {logo ? (
            <div className="relative flex h-32 w-full max-w-72 items-center justify-center p-4 sm:h-36">
              <Image
                src={logo.light}
                alt={logo.alt}
                width={320}
                height={180}
                className="h-full w-full object-contain drop-shadow-sm dark:hidden"
              />
              <Image
                src={logo.dark}
                alt={logo.alt}
                width={320}
                height={180}
                className="hidden h-full w-full object-contain drop-shadow-2xl dark:block"
              />
            </div>
          ) : (
            <div className="relative px-6 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Bape Olympics
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">
                {data.date}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {data.location}
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">
            {data.title}
          </h3>
        </div>
        {disabled ? (
          <>
            <p className="text-sm text-muted-foreground">
              Coming soon. Details will appear here once the format is
              confirmed.
            </p>
            <span
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "w-full opacity-70",
              )}
            >
              Coming Soon
            </span>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Winner</p>
                <p className="truncate font-semibold">{data.winner ?? "TBA"}</p>
              </div>
              <div className="rounded-xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">MVP</p>
                <p className="truncate font-semibold">{data.mvp ?? "TBA"}</p>
              </div>
            </div>
            <span className={cn(buttonVariants(), "w-full")}>
              View Edition
              <ArrowUpRight />
            </span>
          </>
        )}
      </div>
    </>
  )

  if (disabled) {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
        {card}
      </div>
    )
  }

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1.5rem] border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl"
    >
      {card}
    </Link>
  )
}
