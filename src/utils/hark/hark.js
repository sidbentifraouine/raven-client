import WildEmitter from 'wildemitter';
import defaultConfig from './config';

const getMaxVolume = (analyser, fftBins) => {
  let maxVolume = -Infinity;
  analyser.getFloatFrequencyData(fftBins);
  const fftBinsLength = fftBins.length;

  for (let i = 4; i < fftBinsLength; i += 1) {
    if (fftBins[i] > maxVolume && fftBins[i] < 0) {
      maxVolume = fftBins[i];
    }
  }

  return maxVolume;
};

let AudioContextType;
if (typeof window !== 'undefined') {
  AudioContextType = window.AudioContext || window.webkitAudioContext;
}

const hark = (stream, settings) => {
  const harker = new WildEmitter();

  // make it not break in non-supported browsers
  if (!AudioContextType) return harker;

  // Config
  const config = { ...defaultConfig, settings };

  const {
    smoothing,
    interval,
    threshold,
    history,
    predefinedAudioContext,
    fftSize,
  } = config;
  let { play } = config;

  const running = true;
  const audioContext = predefinedAudioContext || new AudioContextType();
  let sourceNode;

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = fftSize;
  analyser.smoothingTimeConstant = smoothing;
  const fftBins = new Float32Array(analyser.frequencyBinCount);

  if (stream.jquery) stream = stream[0]; //eslint-disable-line
  if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
    // Audio Tag
    sourceNode = audioContext.createMediaElementSource(stream);
    if (typeof play === 'undefined') play = true;
  } else {
    // WebRTC Stream
    sourceNode = audioContext.createMediaStreamSource(stream);
  }

  sourceNode.connect(analyser);
  if (play) analyser.connect(audioContext.destination);

  harker.speaking = false;

  harker.suspend = () => audioContext.suspend();
  harker.resume = () => audioContext.resume();

  Object.defineProperty(harker, 'state', { get: () => audioContext.state });

  audioContext.onstatechange = () => harker.emit('state_change', audioContext.state);

  harker.stop = () => {
    // running = false;
    harker.emit('volume_change', -100, threshold);
    if (harker.speaking) {
      harker.speaking = false;
      harker.emit('stopped_speaking');
    }
    analyser.disconnect();
    sourceNode.disconnect();
  };

  harker.speakingHistory = [];
  for (let i = 0; i < history; i += 1) {
    harker.speakingHistory.push(0);
  }

  // Poll the analyser node to determine if speaking
  // and emit events if changed
  const looper = () => {
    setTimeout(() => {
      // check if stop has been called
      if (!running) {
        return;
      }

      const currentVolume = getMaxVolume(analyser, fftBins);

      harker.emit('volume_change', currentVolume, threshold);

      let looperHistory = 0;
      if (currentVolume > threshold && !harker.speaking) {
        // trigger quickly, short history
        for (let i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i += 1) {
          looperHistory += harker.speakingHistory[i];
        }
        if (looperHistory >= 2) {
          harker.speaking = true;
          harker.emit('speaking');
        }
      } else if (currentVolume < threshold && harker.speaking) {
        for (let i = 0; i < harker.speakingHistory.length; i += 1) {
          looperHistory += harker.speakingHistory[i];
        }
        if (history === 0) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }
      }
      harker.speakingHistory.shift();
      harker.speakingHistory.push(0 + (currentVolume > threshold));

      looper();
    }, interval);
  };
  looper();


  return harker;
};

export default hark;
