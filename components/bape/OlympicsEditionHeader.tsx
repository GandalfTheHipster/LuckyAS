import type { ReactNode } from "react"
import Image from "next/image"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

type OlympicsEditionLogo = {
  light: string
  dark: string
  alt: string
}

type OlympicsEditionHeaderProps = {
  data: OlympicPageData
  logo?: OlympicsEditionLogo
  isUpcoming?: boolean
}

export function OlympicsEditionHeader({
  data,
  logo,
  isUpcoming = false,
}: OlympicsEditionHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] border bg-card p-4 shadow-sm sm:p-5",
        isUpcoming &&
          "border-violet-300/70 bg-[radial-gradient(circle_at_78%_28%,rgba(196,181,253,0.5),transparent_27%),radial-gradient(circle_at_18%_110%,rgba(221,214,254,0.64),transparent_40%)] dark:border-violet-400/25 dark:bg-[radial-gradient(circle_at_78%_28%,rgba(124,58,237,0.28),transparent_27%),radial-gradient(circle_at_18%_110%,rgba(91,33,182,0.23),transparent_40%)]",
      )}
    >
      <Image
        src={data.imageOfTheDay}
        alt=""
        fill
        priority
        className={cn(
          "object-cover blur-[2px] scale-105",
          isUpcoming ? "opacity-10" : "opacity-20",
        )}
        sizes="(max-width: 768px) 100vw, 960px"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/60 dark:from-zinc-950/85 dark:via-zinc-950/70 dark:to-zinc-900/45",
          isUpcoming &&
            "from-background/95 via-background/80 to-violet-100/35 dark:from-zinc-950/90 dark:via-zinc-950/75 dark:to-violet-950/25",
        )}
      />
      {isUpcoming ? (
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 grid grid-cols-3 gap-3 opacity-60 sm:-right-10 sm:-top-16 sm:gap-4"
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="size-12 rounded-full border border-violet-500/20 bg-violet-400/10 sm:size-16 dark:border-violet-300/15 dark:bg-violet-300/10"
            />
          ))}
        </div>
      ) : null}

      <div className="relative grid gap-5 md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
        <div className="order-2 md:order-1">
          <p className="text-sm font-medium text-muted-foreground">
            {data.location}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          {data.description ? (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {data.description}
            </p>
          ) : null}

          <div
            className={cn(
              "mt-5 grid gap-2 text-sm",
              isUpcoming ? "max-w-sm sm:grid-cols-1" : "sm:grid-cols-3",
            )}
          >
            {isUpcoming ? (
              <HeaderStat label="Starts" className="bg-background/55 dark:bg-zinc-950/25">
                <HeaderStatValue value={data.startDate ?? "TBA"} />
              </HeaderStat>
            ) : (
              <>
                <HeaderStat label="Champion">
                  {data.winner ? (
                    <CountryProfileButton
                      country={data.winner}
                      compact
                      className="mt-1 w-full border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                    />
                  ) : (
                    <HeaderStatValue value="TBA" />
                  )}
                </HeaderStat>
                <HeaderStat label="MVP">
                  {data.mvp ? (
                    <PersonProfileButtonByName
                      name={data.mvp}
                      compact
                      className="mt-1 w-full border-0 bg-transparent px-0 py-0 shadow-none hover:translate-y-0 hover:bg-transparent hover:shadow-none"
                    />
                  ) : (
                    <HeaderStatValue value="TBA" />
                  )}
                </HeaderStat>
                <HeaderStat label="Host">
                  <HeaderStatValue value={data.host ?? "TBA"} />
                </HeaderStat>
              </>
            )}
          </div>
        </div>

        <div
          className={cn(
            "order-1 grid min-h-48 place-items-center rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur-sm dark:bg-zinc-900/45 md:order-2",
            isUpcoming &&
              "border-violet-300/60 bg-background/60 shadow-violet-950/5 dark:border-violet-300/25 dark:bg-violet-950/15",
          )}
        >
          {logo ? (
            <div className="relative flex h-36 w-full items-center justify-center sm:h-40">
              <Image
                src={logo.light}
                alt={logo.alt}
                width={360}
                height={220}
                priority
                className="relative h-full w-full object-contain dark:hidden"
              />
              <Image
                src={logo.dark}
                alt={logo.alt}
                width={360}
                height={220}
                priority
                className="relative hidden h-full w-full object-contain dark:block"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Bape Olympics
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                {data.date}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function HeaderStat({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-background/70 p-3 backdrop-blur-sm dark:bg-zinc-950/35",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  )
}

function HeaderStatValue({ value }: { value: string }) {
  return <p className="mt-1 truncate font-semibold">{value}</p>
}
