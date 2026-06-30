import type { ReactNode } from "react"
import Image from "next/image"

import { CountryProfileButton } from "@/components/entity/CountryProfileButton"
import { PersonProfileButtonByName } from "@/components/entity/PersonProfileButton"
import type { OlympicPageData } from "@/lib/data/olympics/olympics-template"

type OlympicsEditionLogo = {
  light: string
  dark: string
  alt: string
}

type OlympicsEditionHeaderProps = {
  data: OlympicPageData
  logo?: OlympicsEditionLogo
}

export function OlympicsEditionHeader({
  data,
  logo,
}: OlympicsEditionHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border bg-card p-4 shadow-sm sm:p-5">
      <Image
        src={data.imageOfTheDay}
        alt=""
        fill
        priority
        className="object-cover opacity-20 blur-[2px] scale-105"
        sizes="(max-width: 768px) 100vw, 960px"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/60 dark:from-zinc-950/85 dark:via-zinc-950/70 dark:to-zinc-900/45" />

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

          <div className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
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
          </div>
        </div>

        <div className="order-1 grid min-h-48 place-items-center rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur-sm dark:bg-zinc-900/45 md:order-2">
          {logo ? (
            <>
              <Image
                src={logo.light}
                alt={logo.alt}
                width={360}
                height={220}
                priority
                className="h-36 w-full object-contain dark:hidden sm:h-40"
              />
              <Image
                src={logo.dark}
                alt={logo.alt}
                width={360}
                height={220}
                priority
                className="hidden h-36 w-full object-contain dark:block sm:h-40"
              />
            </>
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
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border bg-background/70 p-3 backdrop-blur-sm dark:bg-zinc-950/35">
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
