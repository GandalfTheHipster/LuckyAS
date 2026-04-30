import Image from "next/image"

import { BEERPONG_TEAMS } from "@/lib/data/beerpong"
import { BAPE_PROFILES } from "@/lib/data/BapeProfiles"

type PersonModalContentProps = {
  personId: string
}

export function PersonModalContent({ personId }: PersonModalContentProps) {
  const numericPersonId = Number(personId)

  const profile = Object.values(BAPE_PROFILES).find(
    (profile) => profile.bapeID === numericPersonId,
  )

  const beerPongTeams = BEERPONG_TEAMS.filter((team) =>
    team.players.includes(numericPersonId),
  )

  if (!profile) {
    return (
      <div className="pr-8">
        <h2 className="text-xl font-semibold">Person not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No person exists for ID: {personId}
        </p>
      </div>
    )
  }

  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <div className="pr-8">
      <div className="flex items-center gap-4">
        <Image
          src={profile.avatarUrl}
          alt={fullName}
          width={72}
          height={72}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-sm text-muted-foreground">
            BAPE ID: {profile.bapeID}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/40 p-4">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Beer Pong Team
        </p>

        {beerPongTeams.length > 0 ? (
          <div className="mt-3 flex flex-col gap-3">
            {beerPongTeams.map((team) => (
              <div key={team.code} className="flex items-center gap-3">
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />

                <div>
                  <p className="font-semibold">{team.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {team.code} · {team.w}W / {team.l}L · {team.pts} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Not currently listed on a beer pong team.
          </p>
        )}
      </div>
    </div>
  )
}