import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
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
  const actionLabel =
    status === "Upcoming" ? "View Upcoming Edition" : "View Previous Edition"
  const actionClassName = cn(buttonVariants(), "w-full")

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-card shadow-sm",
        !disabled &&
          "transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl",
      )}
    >
      <div className="relative overflow-hidden p-4 pb-0">
        <EditionCardLink
          href={href}
          disabled={disabled}
          className={cn(
            "relative grid min-h-52 place-items-center overflow-hidden rounded-2xl border bg-muted/30",
          )}
        >
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
          <div
            className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/45 dark:from-zinc-950/75 dark:via-zinc-900/55 dark:to-zinc-800/35"
          />
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
        </EditionCardLink>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
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
              <div className="grid min-h-16 content-start rounded-xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Winner</p>
                {data.winner ? (
                  <CountryProfileButton
                    country={data.winner}
                    compact
                    className="mt-1 w-full border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                  />
                ) : (
                  <p className="truncate font-semibold">TBA</p>
                )}
              </div>
              <div className="grid min-h-16 content-start rounded-xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">MVP</p>
                {data.mvp ? (
                  <PersonProfileButtonByName
                    name={data.mvp}
                    compact
                    className="mt-1 w-full border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                  />
                ) : (
                  <p className="truncate font-semibold">TBA</p>
                )}
              </div>
            </div>
            <Link href={href} className={cn(actionClassName, "mt-auto")}>
              {actionLabel}
              <ArrowUpRight />
            </Link>
          </>
        )}
      </div>
    </article>
  )
}

function EditionCardLink({
  href,
  disabled,
  className,
  children,
}: {
  href: string
  disabled: boolean
  className: string
  children: ReactNode
}) {
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <Link href={href} className={cn("group", className)}>
      {children}
    </Link>
  )
}
