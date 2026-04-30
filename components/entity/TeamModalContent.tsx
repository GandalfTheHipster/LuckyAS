import Image from "next/image"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong"

type TeamModalContentProps = {
  teamCode: string
}

export function TeamModalContent({ teamCode }: TeamModalContentProps) {
  const team = BEERPONG_TEAMS.find((team) => team.code === teamCode)

  if (!team) {
    return (
      <div className="pr-8">
        <h2 className="text-xl font-semibold">Team not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No team exists for code: {teamCode}
        </p>
      </div>
    )
  }

  return (
    <div className="pr-8">
      <div className="flex items-center gap-4">
        <Image
          src={team.logo}
          alt={team.name}
          width={72}
          height={72}
          className="h-16 w-16 object-contain"
        />

        <div>
          <h2 className="text-2xl font-bold">{team.name}</h2>
          <p className="text-sm text-muted-foreground">
            {team.shortName} · {team.code}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">MP</p>
          <p className="text-lg font-bold">{team.mp}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">W</p>
          <p className="text-lg font-bold">{team.w}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">L</p>
          <p className="text-lg font-bold">{team.l}</p>
        </div>

        <div className="rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">PTS</p>
          <p className="text-lg font-bold">{team.pts}</p>
        </div>
      </div>
    </div>
  )
}