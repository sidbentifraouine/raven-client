class VolumeMeter {
  constructor (context) {
    this.context = context
    this.instant = 0.0
    this.slow = 0.0
    this.clip = 0.0
    this.script = context.createScriptProcessor(2048, 1, 1)
    this.script.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0)
      global.console.log('onaudioprocess') // TODO: make like event emitter
      let i
      let sum = 0.0
      let clipcount = 0
      for (i = 0; i < input.length; ++i) {
        sum += input[i] * input[i]
        if (Math.abs(input[i]) > 0.99) {
          clipcount += 1
        }
      }
      this.instant = Math.sqrt(sum / input.length)
      this.slow = 0.95 * this.slow + 0.05 * this.instant
      this.clip = clipcount / input.length
    }
  }

  connectToSource = (stream, fn) => {
    console.log('Volumemeter connecting')
    try {
      this.mic = this.context.createMediaStreamSource(stream)
      this.mic.connect(this.script)
      this.script.connect(this.context.destination)
      if (typeof fn !== 'undefined') {
        fn(null)
      }
    } catch (error) {
      console.error(error)
      if (typeof fn !== 'undefined') {
        fn(error)
      }
    }
  }

  stop = () => {
    this.mic.disconnect()
    this.script.disconnect()
  }
}

export default VolumeMeter
