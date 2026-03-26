const SOUNDS = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  submit: '/sounds/submit.mp3',
  skip: '/sounds/submit.mp3',
  start: '/sounds/start.mp3',
  finish: '/sounds/finish.mp3',
  timeTicking: '/sounds/time_ticking.mp3',
};

const audioCache = {};

function getAudio(key) {
  if (!audioCache[key]) {
    audioCache[key] = new Audio(SOUNDS[key]);
  }
  return audioCache[key];
}

export function playSound(key) {
  const audio = getAudio(key);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
