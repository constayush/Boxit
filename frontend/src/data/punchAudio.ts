import cross from "../assets/cross.mp3";
import jab from "../assets/jab.mp3";
import hook from "../assets/hook.mp3";
import uppercut from "../assets/uppercut.mp3";
import slip from "../assets/slip.mp3";
import roll from "../assets/roll.mp3";

const initializeAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
};
 const punchAudioMap: Record<string, HTMLAudioElement> = {
  "1": initializeAudio(jab),
  "2": initializeAudio(cross),
  "3": initializeAudio(hook),
  "4": initializeAudio(hook),
  "5": initializeAudio(uppercut),
  "6": initializeAudio(uppercut),
  S: initializeAudio(slip),
  R: initializeAudio(roll),
};

export default punchAudioMap;