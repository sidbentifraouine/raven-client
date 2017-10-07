import io from 'socket.io-client';

export default {
  open(hostname) {
    const socket = io(hostname, { path: SIGNALING_PATH });

    return new Promise((resolve, reject) => {
      socket.on('connect', () => resolve(socket));
      socket.on('error', error => reject(new Error(error)));
    });
  },

  onMessage(socket, callback) {
    socket.on('msg', callback);
  },

  onPeerConnected(socket, callback) {
    socket.on('peer.connected', callback);
  },

  onPeerDisconnected(socket, callback) {
    socket.on('peer.disconnected', callback);
  },

  send(socket, namespace, message, fn) {
    socket.emit(namespace, message, fn);
  },

  onDisconnect(socket, callback) {
    socket.on('disconnect', callback);
  },

  close(socket) {
    socket.close();
  },
};
