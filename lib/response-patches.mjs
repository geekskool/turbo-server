
export default {

  send: function (data) {
    if (typeof data === 'string' || Buffer.isBuffer(data)) {
      this.setHeader('Content-Length', data.length)
      this.write(data)
      return
    }
    if (typeof data === 'object') {
      let json = JSON.stringify(data)
      this.setHeader('Content-Type', 'application/json')
      this.setHeader('Content-Length', json.length)
      this.write(json)
    }
  }
}
