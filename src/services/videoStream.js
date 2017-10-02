export default () =>
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true });
