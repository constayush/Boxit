"use client"

import { useState } from "react"
import { Link } from "react-router"
import { ArrowLeft, Play, Info, ChevronRight, BookOpen, Award, CheckCircle } from "lucide-react"

// Punch tutorial data with YouTube video IDs
const punchTutorials = [
  {
    id: "1",
    name: "Jab",
    code: "1",
    color: "#ef4444",
    icon: "👊",
    description:
      "The jab is a quick, straight punch thrown with the lead hand from the guard position. The jab is the most important punch in a boxer's arsenal because it provides a fair amount of its own cover and it leaves the least amount of space for a counter punch from the opponent.",
    videoId: "jm2OaMiFexc",
    tips: [
      "Keep your elbow in",
      "Rotate your fist at the end of the punch",
      "Return to guard position quickly",
      "Don't telegraph the punch",
    ],
    difficulty: "Beginner",
    relatedPunches: ["2", "3"],
  },
  {
    id: "2",
    name: "Cross",
    code: "2",
    color: "#3b82f6",
    icon: "💥",
    description:
      "The cross is a powerful straight punch thrown with the rear hand. It's often thrown after a jab, creating the classic 'one-two' combination. The power comes from rotating your hips and shoulders, transferring weight from the back foot to the front foot.",
    videoId: "GXIshLTUHjk",
    tips: [
      "Rotate your hips and shoulders",
      "Keep your chin tucked",
      "Exhale sharply when punching",
      "Maintain your guard with your lead hand",
    ],
    difficulty: "Beginner",
    relatedPunches: ["1", "3", "4"],
  },
  {
    id: "3",
    name: "Lead Hook",
    code: "3",
    color: "#10b981",
    icon: "🤛",
    description:
      "The lead hook is a semi-circular punch thrown with the lead hand. It's aimed at the side of the opponent's head or body. The hook is a powerful punch that can catch opponents by surprise as it comes from the side rather than straight on.",
    videoId: "kxY5RMesarQ",
    tips: [
      "Keep your elbow at a 90-degree angle",
      "Pivot on your lead foot",
      "Turn your hips and shoulders into the punch",
      "Don't swing too wide",
    ],
    difficulty: "Intermediate",
    relatedPunches: ["1", "2", "5"],
  },
  {
    id: "4",
    name: "Rear Hook",
    code: "4",
    color: "#8b5cf6",
    icon: "🤜",
    description:
      "The rear hook is a powerful semi-circular punch thrown with the rear hand. Similar to the lead hook, it targets the side of the opponent's head or body. The rear hook generates significant power due to the weight transfer and rotation involved.",
    videoId: "vjYk_NvkN-s",
    tips: [
      "Rotate your body fully",
      "Keep your elbow at the right height",
      "Transfer weight from back to front foot",
      "Maintain balance throughout",
    ],
    difficulty: "Intermediate",
    relatedPunches: ["2", "6"],
  },
  {
    id: "5",
    name: "Lead Uppercut",
    code: "5",
    color: "#f59e0b",
    icon: "⤴️",
    description:
      "The lead uppercut is an upward punch thrown with the lead hand, targeting the opponent's chin or body. It's effective in close range and can be devastating when an opponent is leaning forward or has their guard too high.",
    videoId: "83TN2M8ZBuI",
    tips: [
      "Bend your knees slightly",
      "Keep your elbow close to your body",
      "Drive upward with your legs",
      "Don't telegraph by dropping your hand too much",
    ],
    difficulty: "Advanced",
    relatedPunches: ["1", "3", "6"],
  },
  {
    id: "6",
    name: "Rear Uppercut",
    code: "6",
    color: "#ec4899",
    icon: "⤴️",
    description:
      "The rear uppercut is a powerful upward punch thrown with the rear hand. It's one of the most powerful punches in boxing when executed correctly. The power comes from the legs, hips, and core rotation, making it effective for close-range fighting.",
    videoId: "YGhUADjl2oc",
    tips: [
      "Drive from your legs",
      "Rotate your hips and shoulders",
      "Keep your guard up with your lead hand",
      "Don't loop the punch - go straight up",
    ],
    difficulty: "Advanced",
    relatedPunches: ["2", "4", "5"],
  },
  {
    id: "S",
    name: "Slip",
    code: "S",
    color: "#6366f1",
    icon: "↪️",
    description:
      "Slipping is a defensive technique where you move your head to either side to avoid an incoming punch. It's a fundamental defensive skill that allows you to evade punches while staying in position to counter.",
    videoId: "mDyQFyTaCRE",
    tips: [
      "Bend slightly at the knees, not the waist",
      "Keep your eyes on your opponent",
      "Move just enough to avoid the punch",
      "Maintain your guard position",
    ],
    difficulty: "Intermediate",
    relatedPunches: ["1", "2", "R"],
  },
  {
    id: "R",
    name: "Roll",
    code: "R",
    color: "#14b8a6",
    icon: "🔄",
    description:
      "Rolling is a defensive technique where you move your upper body in a circular motion to avoid punches. It's particularly effective against hooks and allows you to position yourself for counter punches.",
    videoId: "nCWFoJYNUH4",
    tips: [
      "Bend your knees",
      "Keep your hands up to protect your face",
      "Move your upper body in a fluid motion",
      "Practice transitioning from defense to offense",
    ],
    difficulty: "Advanced",
    relatedPunches: ["S", "D"],
  },
  {
    id: "D",
    name: "Duck",
    code: "D",
    color: "#f97316",
    icon: "⬇️",
    description:
      "Ducking is a defensive technique where you lower your body by bending your knees to avoid punches aimed at your head. It's effective against straight punches and can set you up for body counter punches.",
    videoId: "ljkp",
    tips: [
      "Bend at the knees, not the waist",
      "Keep your eyes on your opponent",
      "Maintain your guard position",
      "Don't duck too low or for too long",
    ],
    difficulty: "Intermediate",
    relatedPunches: ["S", "R"],
  },
]

// Categories for organizing the tutorials
const categories = [
  { id: "basic", name: "Basic Punches", punches: ["1", "2"] },
  { id: "power", name: "Power Punches", punches: ["3", "4", "5", "6"] },
  { id: "defense", name: "Defensive Moves", punches: ["S", "R", "D"] },
]

export default function Learn() {
  const [selectedPunch, setSelectedPunch] = useState(punchTutorials[0])
  const [activeCategory, setActiveCategory] = useState("basic")

  // Function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600"
      case "Intermediate":
        return "bg-yellow-600"
      case "Advanced":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with navigation */}
      <div className="container mx-auto px-4 py-6 flex items-center">
        <Link
          to="/"
          className="flex items-center justify-center rounded-full bg-black border-red-600 border-2 p-3 hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold ml-4">Learn Boxing</h1>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with punch list */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/70 rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-red-600" />
                Boxing Techniques
              </h2>



              {/* Categories */}
              <div className="space-y-6">

              <div >
                    <h3
                      className={`text-lg font-medium mb-3 pb-2 border-b `}
                      
                    >
                     Important note 
                    </h3>
                    <p>This course is not created or owned by us. It is a Creative Commons-licensed course sourced from YouTube, originally produced by its respective creator(s). All credit goes to the original author(s) <a className="font-bold text-red-500" href="https://www.youtube.com/@MasterBoxingLLC" target="_blank">MASTER BOXING</a> for their work. We are simply providing access to this content for educational purposes.</p>
                 
                  </div>

                {categories.map((category) => (
                  <div key={category.id}>
                    <h3
                      className={`text-lg font-medium mb-3 pb-2 border-b ${activeCategory === category.id ? "border-red-600" : "border-gray-700"}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {punchTutorials
                        .filter((punch) => category.punches.includes(punch.id))
                        .map((punch) => (
                          <button
                            key={punch.id}
                            onClick={() => setSelectedPunch(punch)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedPunch.id === punch.id ? "bg-gray-800 border-l-4 border-red-600" : "hover:bg-gray-800/50"}`}
                          >
                            <div className="flex items-center">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-bold"
                                style={{ backgroundColor: punch.color }}
                              >
                                {punch.code}
                              </div>
                              <span>{punch.name}</span>
                            </div>
                            <ChevronRight
                              className={`w-5 h-5 transition-transform ${selectedPunch.id === punch.id ? "rotate-90" : ""}`}
                            />
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            {selectedPunch && (
              <div className="space-y-6">
                {/* Punch header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold"
                      style={{ backgroundColor: selectedPunch.color }}
                    >
                      {selectedPunch.code}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">{selectedPunch.name}</h2>
                      <div
                        className={`text-sm px-2 py-1 rounded-full inline-flex items-center mt-1 ${getDifficultyColor(selectedPunch.difficulty)}`}
                      >
                        <Award className="w-4 h-4 mr-1" />
                        {selectedPunch.difficulty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video player */}
                <div className="aspect-video bg-gray-900/70 rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedPunch.videoId}`}
                    title={`${selectedPunch.name} Tutorial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Description */}
                <div className="bg-gray-900/70 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-red-600" />
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{selectedPunch.description}</p>
                </div>

                {/* Tips */}
                <div className="bg-gray-900/70 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Key Technique Tips</h3>
                  <ul className="space-y-3">
                    {selectedPunch.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related punches */}
                <div className="bg-gray-900/70 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Related Techniques</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedPunch.relatedPunches.map((id) => {
                      const relatedPunch = punchTutorials.find((p) => p.id === id)
                      if (!relatedPunch) return null

                      return (
                        <button
                          key={id}
                          onClick={() => setSelectedPunch(relatedPunch)}
                          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors flex items-center"
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-bold"
                            style={{ backgroundColor: relatedPunch.color }}
                          >
                            {relatedPunch.code}
                          </div>
                          <span>{relatedPunch.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Practice button */}
                <div className="flex justify-center">
                  <Link to={`/train?combo=${selectedPunch.code}`}>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      <span>Practice This Technique</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-800">
        <p className="text-center text-gray-500 text-sm">Learn proper boxing techniques from professional tutorials</p>
      </div>
    </div>
  )
}

