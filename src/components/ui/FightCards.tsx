import { Calendar, MapPin } from "lucide-react"

// Define the type for the fight object
type Fighter = {
  name: string
  age: number
  nationality: string
  stance: string
  wins: number
  losses: number
  ko_percentage: number
}

type FightProps = {
  fight?: {
    title?: string
    date_str?: string
    location?: string
    status?: string
    scheduled_rounds?: number
    fighter_1?: Fighter
    fighter_2?: Fighter
  }
  index?: number
}

export default function FightCards({ fight, index }: FightProps) {
  // Return a placeholder if fight is undefined
  if (!fight) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-xl text-gray-500 text-center">Fight information unavailable</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col">
      <h3 className="text-xl font-bold mb-2">{fight.title || "Untitled Fight"}</h3>
      <p className="text-gray-400 mb-2">
        <Calendar className="inline w-4 h-4 mr-1" /> {fight.date_str || "Date TBA"}
      </p>
      <p className="text-gray-400 mb-4">
        <MapPin className="inline w-4 h-4 mr-1" /> {fight.location || "Location TBA"}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium">{fight.fighter_1?.name || "Fighter 1"}</p>
          <p className="text-sm text-gray-500">VS</p>
          <p className="font-medium text-right">{fight.fighter_2?.name || "Fighter 2"}</p>
        </div>

        {fight.fighter_1 && fight.fighter_2 && (
          <div className="flex justify-between text-xs text-gray-500">
            <p>
              {fight.fighter_1.wins}-{fight.fighter_1.losses} ({fight.fighter_1.ko_percentage}% KO)
            </p>
            <p>
              {fight.fighter_2.wins}-{fight.fighter_2.losses} ({fight.fighter_2.ko_percentage}% KO)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

