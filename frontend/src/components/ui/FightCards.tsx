import { Calendar, MapPin } from "lucide-react";

// Define the type for the fighter
type Fighter = {
  name: string;
  age: number;
  nationality: string;
  stance: string;
  wins: number;
  losses: number;
  ko_percentage: number;
};

type FightProps = {
  fight?: {
    title?: string;
    date_str?: string;
    location?: string;
    status?: string;
    scheduled_rounds?: number;
    fighters?: {
      fighter_1?: Fighter;
      fighter_2?: Fighter;
    };
  };
  index?: number;
};

export default function FightCards({ fight, index }: FightProps) {
  if (!fight) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-xl text-gray-500 text-center">Fight information unavailable</p>
      </div>
    );
  }

  const { fighters } = fight;
  const fighter1 = fighters?.fighter_1;
  const fighter2 = fighters?.fighter_2;

  return (
    <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col">
      <h3 className="text-xl font-bold mb-2">{fight.title || "Untitled Fight"}</h3>
      <p className="text-gray-400 mb-2">
        <Calendar className="inline w-4 h-4 mr-1" /> {fight.date_str || "Date TBA"}
      </p>
      <p className="text-gray-400 mb-4">
        <MapPin className="inline w-4 h-4 mr-1" /> {fight.location || "Location TBA"}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium">{fighter1?.name || "Fighter 1"}</p>
          <p className="text-sm text-gray-500">VS</p>
          <p className="font-medium text-right">{fighter2?.name || "Fighter 2"}</p>
        </div>

        {fighter1 && fighter2 && (
          <div className="flex justify-between text-xs text-gray-500">
            <p>
              {fighter1.wins}-{fighter1.losses} ({fighter1.ko_percentage}% KO)
            </p>
            <p>
              {fighter2.wins}-{fighter2.losses} ({fighter2.ko_percentage}% KO)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
