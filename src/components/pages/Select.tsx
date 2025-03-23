import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { BiLeftArrow, BiLogoFacebook, BiRightArrow } from "react-icons/bi";
const boxingCombos = [
  "Jab, Cross",
  "Jab, Cross, Hook",
  "Jab, Cross, Uppercut",
  "Jab, Jab, Cross",
  "Cross, Hook, Cross",
  "Jab, Cross, Hook, Uppercut",
  "Jab, Cross, Slip, Cross",
  "Jab, Hook, Cross, Hook",
  "Jab, Cross, Roll, Cross",
  "Double Jab, Cross, Hook",
  "Hook, Cross, Hook",
  "Jab, Jab, Cross, Hook, Uppercut",
];

function Select() {
  const [customCombo, setCustomCombo] = useState("");
  const navigate = useNavigate();

  const handleSelectCombo = (combo: string) => {
    navigate(`/train?combo=${encodeURIComponent(combo)}`);
  };

  return (
    <div className="Select w-full flex justify-center items-center">

<Link className="rounded-full bg-black border-[#f00] border-2 p-3" to="/"><BiLeftArrow/></Link>

      <div className=" flex flex-col items-center justify-center max-w-6xl min-h-screen p-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          Select Your Combo
        </h1>

        {/* Preset Combos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {boxingCombos.map((combo, index) => (
            <button
              key={index}
              onClick={() => handleSelectCombo(combo)}
              className="card-gradient border-[#ffffff90] border-3 bg-[#000000e6] cursor-pointer hover:bg-red-600 text-white p-4 rounded-lg font-semibold duration-300 transition-all"
            >
              {combo}
            </button>
          ))}
        </div>

        {/* Custom Combo Input */}
        <div className="mt-6 flex w-full flex-col items-center">
          <input
            type="text"
            className="border-2 w-full normal-font border-gray-300 p-2 rounded-lg text-center mb-2"
            placeholder="Enter custom combo (e.g., Jab, Cross, Hook)"
            value={customCombo}
            onChange={(e) => setCustomCombo(e.target.value)}
          />
          <button
            onClick={() => handleSelectCombo(customCombo)}
            disabled={!customCombo}
            className="bg-black border-4 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
          >
            Train Custom Combo
          </button>
        </div>
      </div>
      
      <Link className="rounded-full bg-black border-[#f00] border-2 p-3" to="/train"><BiRightArrow/></Link>
    </div>
  );
}

export default Select;
