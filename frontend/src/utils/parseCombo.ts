  const parseCombo = (comboStr: string): string[] => {
    // If it's already in code format like "1-2-3"
    if (comboStr.includes("-")) {
      return comboStr.split("-");
    }
    const punchMap: Record<string, string> = {
      Jab: "1",
      Cross: "2",
      Hook: "3",
      "Lead Hook": "3",
      "Rear Hook": "4",
      Uppercut: "6",
      "Lead Uppercut": "5",
      "Rear Uppercut": "6",
      Slip: "S",
      Roll: "R",
      Duck: "D",
    };

    return comboStr
      .split(", ")
      .map((punch: string): string => punchMap[punch] || punch);
  };

  export default parseCombo;