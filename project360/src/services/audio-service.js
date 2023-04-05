import move from "../assets/sfx/move.ogg";
import select from "../assets/sfx/select.ogg";
import deleteItem from "../assets/sfx/delete.ogg";
import rotate from "../assets/sfx/rotate.ogg";

const context = new AudioContext();
const C4 = 261.63;
const G4 = 392.0;
const C5 = 523.25;
const G5 = 784.0;
const D5 = 587.33;

const playSound = (frequency, startTime, duration, vol) => {
  const osc1 = context.createOscillator();
  const volume = context.createGain();

  osc1.type = "sine";

  volume.gain.value = vol;

  osc1.connect(volume);
  volume.connect(context.destination);

  osc1.frequency.value = frequency;

  // Fade out
  if (vol === 0.01) {
    volume.gain.setValueAtTime(0.01, startTime + duration - 0.05);
  } else {
    volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
  }
  volume.gain.linearRampToValueAtTime(0, startTime + duration);

  // Start oscillators
  osc1.start(startTime);

  // Stop oscillators
  osc1.stop(startTime + duration);
};

const playJoinSound = (vol) => {
  playSound(C4, context.currentTime, 0.1, vol);
  playSound(G4, context.currentTime, 0.1, vol);
  playSound(G4, context.currentTime + 0.1, 0.1, vol);
  playSound(D5, context.currentTime + 0.1, 0.1, vol);
  playSound(C5, context.currentTime + 0.2, 0.2, vol);
  playSound(G5, context.currentTime + 0.2, 0.2, vol);
};

const playLeaveSound = (vol) => {
  playSound(C5, context.currentTime, 0.1, vol);
  playSound(G5, context.currentTime, 0.1, vol);
  playSound(C4, context.currentTime + 0.1, 0.2, vol);
  playSound(G4, context.currentTime + 0.1, 0.2, vol);
};

const playSfx = (sound, vol) => {
  const audio = new Audio(sound);
  const source = context.createMediaElementSource(audio);
  const volume = context.createGain();
  volume.gain.value = vol;
  source.connect(volume);
  volume.connect(context.destination);
  audio.play();
};

const playMoveSound = (vol) => {
  playSfx(move, vol);
};

const playSelectSound = (vol) => {
  playSfx(select, vol);
};

const playDeleteSound = (vol) => {
  playSfx(deleteItem, vol);
};

const playRotateSound = (vol) => {
  playSfx(rotate, vol);
};

const audioService = {
  context,
  playSound,
  playJoinSound,
  playLeaveSound,
  playSfx,
  playMoveSound,
  playSelectSound,
  playDeleteSound,
  playRotateSound,
};

export default audioService;
