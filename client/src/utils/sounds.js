const SOUNDS = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  submit: '/sounds/submit.mp3',
  skip: '/sounds/submit.mp3',
  finish: '/sounds/finish.mp3',
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
