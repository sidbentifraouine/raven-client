import io from 'socket.io-client';
import uuidv1 from 'uuid/v1';
import { server, options } from '../config/servers';

const ME = uuidv1();
const peers = {};

function Connection() {
  const socket = io('http://localhost:3334');

  function sendViaSocket(type, message, to) {
    socket.emit('webrtc', JSON.stringify({ id: ME, to, type, data: message }));
  }

  function initConnection(pc, id, sdpType) {
    global.console.log('[initConnection]');

    pc.onicecandidate = function onICECandidateHandler(event) { // eslint-disable-line
      global.console.log('[onicecandidate] - ', event);

      if (event.candidate) {
        peers[id].candidateCache.push(event.candidate);
      } else {
        sendViaSocket(sdpType, pc.localDescription, id);

        for (let i = 0; i < peers[id].candidateCache.length; i++) { // eslint-disable-line
          sendViaSocket('candidate', peers[id].candidateCache[i], id);
        }
      }
    };

    pc.oniceconnectionstatechange = function onICEConnectionStateChangeHandler() { // eslint-disable-line
      global.console.log('[oniceconnectionstatechange]');

      if (pc.iceConnectionState === 'disconnected') {
        global.console.log('on disconnected');
        delete peers[id];
      }
    };
  }

  function bindEvents(channel) {
    global.console.log('[bindEvents]', channel);

    channel.onopen = function onOpenChannerHandler() { // eslint-disable-line
      global.console.log('on open channel');
    };

    channel.onmessage = function onMessageReceivedHandler(e) { // eslint-disable-line
      global.console.log(e.data);
    };
  }

  function createConnection(id) {
    global.console.log('[createConnection]', id);

    if (!peers[id]) {
      peers[id] = {
        candidateCache: [],
      };

      const pc = new RTCPeerConnection(server, options);
      initConnection(pc, id, 'answer');

      peers[id].connection = pc;
      pc.ondatachannel = function onDataChannelHandler(e) {
        global.console.log('[ondatachannel]');

        peers[id].channel = e.channel;
        peers[id].channel.owner = id;
        bindEvents(peers[id].channel);
      };
    }
  }

  function remoteOfferReceived(id, data) {
    global.console.log('[remoteOfferReceived] ', id, data);

    createConnection(id);
    const pc = peers[id].connection;

    pc.setRemoteDescription(new RTCSessionDescription(data));

    pc.createAnswer()
      .then((answer) => {
        pc.setLocalDescription(answer);
      });
  }

  function remoteAnswerReceived(id, data) {
    global.console.log('[remoteAnswerReceived] ', id, data);

    const pc = peers[id].connection;
    pc.setRemoteDescription(new RTCSessionDescription(data));
  }

  function remoteCandidateReceived(id, data) {
    global.console.log('[remoteCandidateReceived] ', id, data);

    createConnection(id);
    const pc = peers[id].connection;
    pc.addIceCandidate(new RTCIceCandidate(data))
      .then(() => {
        global.console.log('candidate is successfully passed to the ICE agent');
      });
  }

  window.addEventListener('beforeunload', () => {
    global.console.log('on leave');
    const peerKeys = Object.keys(peers);

    peerKeys.forEach((peer) => {
      if (peers[peer].channel) {
        peers[peer].channel.close();
      }
    });
  });

  socket.on('webrtc', (data) => {
    const message = JSON.parse(data);

    console.log('on webrtc: ', message);

    switch (message.type) {
      case 'candidate':
        remoteCandidateReceived(message.id, message.data);
        break;
      case 'offer':
        remoteOfferReceived(message.id, message.data);
        break;
      case 'answer':
        remoteAnswerReceived(message.id, message.data);
        break;
      default:
        break;
    }
  });

  socket.on('new', (peerID) => {
    console.log('a new peer connected: ', peerID);

    peers[peerID] = {
      candidateCache: [],
    };

    const pc = new RTCPeerConnection(server, options);

    initConnection(pc, peerID, 'offer');

    peers[peerID].connection = pc;

    const channel = pc.createDataChannel('mychannel', {});
    channel.owner = peerID;
    peers[peerID].channel = channel;

    console.log(peers);

    bindEvents(channel);

    pc.createOffer()
      .then((offer) => {
        pc.setLocalDescription(offer);
      });
  });

  return {
    join(roomID) {
      socket.emit('room', JSON.stringify({ id: ME, room: roomID }));
    },

    send(message) {
      const peerKeys = Object.keys(peers);

      peerKeys.forEach((peer) => {
        if (peers[peer].channel) {
          peers[peer].channel.send(message);
        }
      });
    },
  };
}

export default Connection;
