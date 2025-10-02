 const punchTypes: Record<
  string,
  { name: string; color: string; icon: string; description: string }
> = {
  "1": {
    name: "Jab",
    color: "#ef4444",
    icon: "👊",
    description: "Lead hand straight punch",
  },
  "2": {
    name: "Cross",
    color: "#3b82f6",
    icon: "💥",
    description: "Rear hand straight punch",
  },
  "3": {
    name: "Lead Hook",
    color: "#10b981",
    icon: "🤛",
    description: "Lead hand hook",
  },
  "4": {
    name: "Rear Hook",
    color: "#8b5cf6",
    icon: "🤜",
    description: "Rear hand hook",
  },
  "5": {
    name: "Lead Uppercut",
    color: "#f59e0b",
    icon: "⤴️",
    description: "Lead hand uppercut",
  },
  "6": {
    name: "Rear Uppercut",
    color: "#ec4899",
    icon: "⤴️",
    description: "Rear hand uppercut",
  },
  S: {
    name: "Slip",
    color: "#6366f1",
    icon: "↪️",
    description: "Defensive slip movement",
  },
  R: {
    name: "Roll",
    color: "#14b8a6",
    icon: "🔄",
    description: "Defensive roll movement",
  },
  D: {
    name: "Duck",
    color: "#f97316",
    icon: "⬇️",
    description: "Defensive duck movement",
  }
  

}; 
  export default punchTypes