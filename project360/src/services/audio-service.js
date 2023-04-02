const context = new AudioContext();
const C4 = 261.63;
const G4 = 392.0;
const C5 = 523.25;
const G5 = 784.0;
const D5 = 587.33;


const playSound = (frequency, startTime, duration) => {
  const osc1 = context.createOscillator();
  const volume = context.createGain();

  osc1.type = "sine";

  volume.gain.value = 0.08;

  osc1.connect(volume);
  volume.connect(context.destination);

  osc1.frequency.value = frequency;

  // Fade out
  volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
  volume.gain.linearRampToValueAtTime(0, startTime + duration);

  // Start oscillators
  osc1.start(startTime);

  // Stop oscillators
  osc1.stop(startTime + duration);
};

const playJoinSound = () => {
  playSound(C4, context.currentTime, 0.1);
  playSound(G4, context.currentTime, 0.1);
  playSound(G4, context.currentTime + 0.1, 0.1);
  playSound(D5, context.currentTime + 0.1, 0.1);
  playSound(C5, context.currentTime + 0.2, 0.2);
  playSound(G5, context.currentTime + 0.2, 0.2);
};

const playLeaveSound = () => {
  playSound(C5, context.currentTime, 0.1);
  playSound(G5, context.currentTime, 0.1);
  playSound(C4, context.currentTime + 0.1, 0.2);
  playSound(G4, context.currentTime + 0.1, 0.2);
};


const audioService = {
  playSound,
  playJoinSound,
  playLeaveSound,
};



export default audioService;
