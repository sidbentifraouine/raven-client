class StreamStore {
  static streams = {};

  static get(id) {
    return StreamStore.streams[id];
  }

  static save(id, stream) {
    StreamStore.streams[id] = stream;
  }
}

export default StreamStore;
