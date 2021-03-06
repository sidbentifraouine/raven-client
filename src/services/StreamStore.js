class StreamStore {
  static streams = {};

  static get (id) {
    return StreamStore.streams[id]
  }

  static save (id, stream) {
    StreamStore.streams[id] = stream
  }

  static remove (id) {
    delete StreamStore.streams[id]
  }

  static clear () {
    StreamStore.streams = {}
  }
}

export default StreamStore
