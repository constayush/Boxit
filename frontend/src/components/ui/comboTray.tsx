import paperTex from "../../../public/paper-texture.webp";
function ComboTray({combo, currentIndex, isTraining, isPaused, punchTypes, comboString}: {combo: string[], currentIndex: number, isTraining: boolean, isPaused: boolean, punchTypes: Record<string, {color: string}>, comboString: string}) {
  return (
 <div className="bg-white/20 shadow-2xl rounded-xl p-6 w-full max-w-2xl mb-8 relative">
          <img src={paperTex} alt="Paper texture overlay" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay pointer-events-none rounded-xl" />
          <h2 className="text-xl font-semibold mb-4">Current Combo</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {combo.map((punch, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center size-10 sm:size-12 md:size-14 rounded-full text-white font-bold text-base sm:text-lg
                  ${
                    currentIndex === idx && isTraining && !isPaused
                      ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900"
                      : ""
                  }
                  ${idx < currentIndex && isTraining ? "opacity-50" : ""}
                `}
                style={{
                  backgroundColor: punchTypes[punch]?.color || "#6b7280",
                }}
              >
                {punch}
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-gray-400">{comboString}</p>
        </div>
  )
}

export default ComboTray