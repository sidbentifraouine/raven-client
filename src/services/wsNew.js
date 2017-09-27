export default {
  open(hostname) {
    const ws = new WebSocket(hostname);

    return new Promise((resolve, reject) => {
      ws.onopen = () => resolve(ws);
      ws.onerror = error => reject(new Error(error));
    });
  },

  onMessage(ws, callback) {
    ws.onmessage = callback; // eslint-disable-line
  },

  onClose(ws, callback) {
    ws.onclose = callback; // eslint-disable-line
  },

  send(ws, message) {
    ws.send(message);
  },

  close(ws) {
    ws.close();
  },
};
