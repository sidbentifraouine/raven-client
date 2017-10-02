export default {
  iceServers: [
    { url: 'stun:23.21.150.121' },
    { url: 'stun:stun.l.google.com:19302' },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'your password goes here',
      username: 'example@example.com',
    },
  ],
};
