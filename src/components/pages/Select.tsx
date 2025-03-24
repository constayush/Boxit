"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  ChevronRight,
  Dumbbell,
} from "lucide-react";

// Boxing combo codes:
// 1 = Jab (lead hand straight)
// 2 = Cross (rear hand straight)
// 3 = Lead Hook
// 4 = Rear Hook
// 5 = Lead Uppercut
// 6 = Rear Uppercut
// S = Slip
// R = Roll
// D = Duck

const boxingCombos = [
  { name: "Jab, Cross", code: "1-2" },
  { name: "Jab, Cross, Hook", code: "1-2-3" },
  { name: "Jab, Cross, Uppercut", code: "1-2-6" },
  { name: "Jab, Jab, Cross", code: "1-1-2" },
  { name: "Cross, Hook, Cross", code: "2-3-2" },
  { name: "Jab, Cross, Hook, Uppercut", code: "1-2-3-6" },
  { name: "Jab, Cross, Slip, Cross", code: "1-2-S-2" },
  { name: "Jab, Hook, Cross, Hook", code: "1-3-2-3" },
  { name: "Jab, Cross, Roll, Cross", code: "1-2-R-2" },
  { name: "Double Jab, Cross, Hook", code: "1-1-2-3" },
  { name: "Hook, Cross, Hook", code: "3-2-3" },
  { name: "Jab, Jab, Cross, Hook, Uppercut", code: "1-1-2-3-6" },
];

export default function Select() {
  const [customCombo, setCustomCombo] = useState("");
  const [showLegend, setShowLegend] = useState(false);
  const navigate = useNavigate();

  const handleSelectCombo = (combo: string) => {
    navigate(`/train?combo=${encodeURIComponent(combo)}`);
  };

  return (
    <div className="min-h-screen relative w-full bg-black text-white flex flex-col justify-center items-center px-4 md:py-24 py-12 md:px-12">
      <div className="absolute inset-0 h-full opacity-1 select-bg "></div>
      {/* Header with navigation */}
      <div className="w-full h-fit z-2">
        <div className="container flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center justify-center rounded-full bg-black border-red-600 border-2 p-3 hover:bg-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <h1 className="text-3xl md:text-6xl font-bold helvetica-font">
            Select Your Combo
          </h1>

          <Link
            to="/train"
            className="flex items-center justify-center rounded-full bg-black border-red-600 border-2 p-3 hover:bg-red-600 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center">
          {/* Legend toggle button */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition-colors"
          >
            <Info className="w-5 h-5" />
            <span>
              {showLegend ? "Hide Combo Legend" : "Show Combo Legend"}
            </span>
          </button>

          {/* Legend */}
          {showLegend && (
            <div className="w-full max-w-2xl bg-gray-900/70 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Boxing Combo Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    1
                  </span>
                  <span>Jab (Lead Straight)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    2
                  </span>
                  <span>Cross (Rear Straight)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    3
                  </span>
                  <span>Lead Hook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    4
                  </span>
                  <span>Rear Hook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    5
                  </span>
                  <span>Lead Uppercut</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    6
                  </span>
                  <span>Rear Uppercut</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    S
                  </span>
                  <span>Slip (Defensive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    R
                  </span>
                  <span>Roll (Defensive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    D
                  </span>
                  <span>Duck (Defensive)</span>
                </div>
              </div>
            </div>
          )}

          {/* Preset Combos */}
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Dumbbell className="w-6 h-6 mr-2 text-red-600" />
              Popular Combinations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {boxingCombos.map((combo, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectCombo(combo.name)}
                  className="bg-gray-900/50 border border-gray-800 hover:border-red-600 hover:bg-gray-800/70 text-white p-5 rounded-xl transition-all duration-300 flex flex-col items-start h-full"
                >
                  <div className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm font-mono mb-2">
                    {combo.code}
                  </div>
                  <span className="text-lg font-medium">{combo.name}</span>
                  <div className="mt-auto pt-2 w-full flex justify-end">
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Combo Input */}
          <div className="w-full max-w-4xl bg-gray-900/70 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Create Custom Combo</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="w-full bg-black border-2 border-gray-700 p-4 rounded-lg text-center focus:border-red-600 focus:outline-none"
                placeholder="Enter custom combo (e.g., Jab, Cross, Hook)"
                value={customCombo}
                onChange={(e) => setCustomCombo(e.target.value)}
              />
              <button
                onClick={() => handleSelectCombo(customCombo)}
                disabled={!customCombo}
                className="bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:hover:bg-red-600"
              >
                Train Custom Combo
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Tip: You can create any combination of punches and defensive
              moves. Use the legend above for reference.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-6 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            Select a combination to begin your training session
          </p>
        </div>
      </div>
    </div>
  );
}
